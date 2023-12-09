import { Container } from 'hostConfig';
import { FiberNode, FiberRootNode } from './fiber';
import { HostRoot } from './workTags';
import {
	UpdateQueue,
	createUpdate,
	createUpdateQueue,
	enqueueUpdate
} from './updateQueue';
import { ReactElementType } from 'shared/ReactTypes';
import { scheduleUpdateOnFiber } from './workLoop';
/**
 * @description 创建容器
 * @param container
 * @returns
 */
export function createContainer(container: Container) {
	// 创建根节点
	const hostRootFiber = new FiberNode(HostRoot, {}, null);
	/**
	 * @description 容器
	 */
	const root = new FiberRootNode(container, hostRootFiber);
	hostRootFiber.updateQueue = createUpdateQueue();
	return root;
}
/**
 * @description 更新容器
 * @param element React元素
 * @param root 容器
 * @returns
 */
export function updateContainer(
	element: ReactElementType,
	root: FiberRootNode
) {
	const hostRootFiber = root.current;
	const update = createUpdate(element);
	enqueueUpdate(
		hostRootFiber.updateQueue as UpdateQueue<ReactElementType>,
		update
	);
	scheduleUpdateOnFiber(hostRootFiber);
	return element;
}
