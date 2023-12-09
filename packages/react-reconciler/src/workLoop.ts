import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';
/**
 * @description 背面缓存 fiber 树指针
 */
let workInProgress: FiberNode | null = null;
/**
 * @description 初始化 workInProgress 背面缓存 fiber 树
 * @param fiber
 */
function prepareFreshStack(root: FiberRootNode) {
	// 获取背面缓存 fiber 树
	workInProgress = createWorkInProgress(root.current, {});
}
/**
 * @description 调度Fiber
 */
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

/**
 * @description 拿到根节点
 * @param fiber
 */
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = parent.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
}

/**
 *@description 调度
 * @param root 根节点
 */
function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);
	// 开始递归
	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('workLoop发生错误', e);
			workInProgress = null;
		}
	} while (true);
}
/**
 * @description workInProgress 指针不为空时循环
 */
function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
/**
 * @description 递阶段操作
 */
function performUnitOfWork(fiber: FiberNode) {
	/**
	 * @description fiber 的子 fiber 或 null
	 */
	const next: FiberNode | null = beginWork(fiber);
	// 工作完成进行赋值
	fiber.memoizedProps = fiber.pendingProps;
	// 没有子 fiber
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

/**
 * @description 归阶段操作
 */
function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		// 如果有兄弟节点
		if (sibling !== null) {
			// 赋值为兄弟节点，然后会判断兄弟节点有没有子节点
			workInProgress = sibling;
			return;
			// 没有兄弟节点
		} else {
			// 向上归
			node = node.return;
			workInProgress = node;
		}
	} while (node !== null);
}
