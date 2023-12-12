import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode } from './fiber';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { HostComponent, HostRoot, HostText } from './workTags';
import { mountChildFibers, reconcilerChildFibers } from './childFiber';

/**
 * @description 递归中的递阶段
 */
export const beginWork = (wip: FiberNode) => {
	switch (wip.tag) {
		// 根节点
		case HostRoot:
			return updateHostRoot(wip);
		// 组件
		case HostComponent:
			return updateHostComponent(wip);
		// 文本
		case HostText:
			return null;
		default:
			if (__DEV__) {
				console.warn('beginWork未实现类型');
			}
	}
	return wip;
};
/**
 * @description 更新根节点 hostroot
 * @param wip
 */
function updateHostRoot(wip: FiberNode) {
	/**
	 * @description 保存的 DOM
	 */
	const baseState = wip.memoizedState;
	const updateQueue = wip.updateQueue as UpdateQueue<Element>;
	const pending = updateQueue.shared.pending;
	updateQueue.shared.pending = null;
	const { memoizedState } = processUpdateQueue(baseState, pending);
	wip.memoizedState = memoizedState;

	const nextChildren = wip.memoizedState;

	reconcilerChildren(wip, nextChildren);
	return wip.child;
}
/**
 * @description 更新组件
 * @param wip
 * @returns
 */
function updateHostComponent(wip: FiberNode) {
	const nextProps = wip.pendingProps;
	const nextChildren = nextProps.children;
	reconcilerChildren(wip, nextChildren);
	return wip.child;
}
/**
 * @description 调度器，在 update 阶段和mount阶段调用不同方法
 * @param wip
 * @param children react 节点 或 文本节点
 */
function reconcilerChildren(wip: FiberNode, children?: ReactElementType) {
	const current = wip.alternate;
	if (current !== null) {
		// update
		wip.child = reconcilerChildFibers(wip, current?.child, children);
	} else {
		// mount 首屏渲染
		wip.child = mountChildFibers(wip, null, children);
	}
}
