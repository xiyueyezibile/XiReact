import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
/**
 * @description fiber 节点
 */
export class FiberNode {
	/**
	 * @description FunctionComponent () => {}
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type: any;
	tag: WorkTag;
	key: Key;
	/**
	 * @description 保存 DOM
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	stateNode: any;

	/**
	 * @description 父亲节点
	 */
	return: FiberNode | null;
	/**
	 * @description 兄弟节点
	 */
	sibling: FiberNode | null;
	/**
	 * @description 孩子节点
	 */
	child: FiberNode | null;
	index: number;
	ref: Ref;
	/**
	 * @description 开始工作之前的 props
	 */
	pendingProps: Props;
	/**
	 * @description 工作完成之后把之前的 props 保存的地方
	 */
	memoizedProps: Props | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	memoizedState: any;
	/**
	 * @description 保存另一颗 Fiber 树
	 */
	alternate: FiberNode | null;
	/**
	 * @description 更新队列
	 */
	updateQueue: unknown;
	/**
	 * @description 副作用
	 */
	flags: Flags;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例属性
		this.tag = tag;
		this.key = key;
		this.ref = null;

		this.stateNode = null;

		this.type = null;

		this.return = null;

		this.sibling = null;

		this.child = null;
		this.index = 0;

		this.pendingProps = pendingProps;

		this.memoizedProps = null;
		this.memoizedState = null;

		this.alternate = null;
		this.flags = NoFlags;
		this.updateQueue = null;
	}
}
/**
 * @description 容器
 */
export class FiberRootNode {
	/**
	 * @description 宿主
	 */
	container: Container;
	/**
	 * @description 保存 hostRootFiber 根节点
	 */
	current: FiberNode;
	/**
	 * @description 更新完成之后的 hostRootFiber
	 */
	finishedWork: FiberNode | null;
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}
/**
 * @description 创建背面缓存
 * @param current
 * @param pendingProps
 * @returns
 */
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let wip = current.alternate;
	// mount 现在是单 fiber树
	if (wip === null) {
		// 创建第二个 fiber 树
		wip = new FiberNode(current.tag, pendingProps, current.key);

		wip.stateNode = current.stateNode;

		wip.alternate = current;
		current.alternate = wip;
		// update
	} else {
		wip.pendingProps = pendingProps;
		wip.flags = NoFlags;
	}
	wip.type = current.type;
	wip.updateQueue = current.updateQueue;
	wip.child = current.child;
	wip.memoizedState = current.memoizedState;
	return wip;
};
