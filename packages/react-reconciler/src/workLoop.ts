import { beginWork } from './beginWork';
import { commitMutationEffects } from './commitWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { MutationMask, NoFlags } from './fiberFlags';
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
	// 向上遍历
	while (parent !== null) {
		node = parent;
		parent = parent.return;
	}
	// 根节点 此时 node.stateNode 应该为容器节点
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
			// 核心方法
			workLoop();
			// render 阶段结束
			break;
		} catch (e) {
			if (__DEV__) {
				console.warn('workLoop发生错误', e);
			}
			workInProgress = null;
		}
	} while (true);
	const finishedWork = root.current.alternate;
	root.finishedWork = finishedWork;
	// 进入 commit 阶段
	commitRoot(root);
}
/**
 * @description commit 阶段入口方法
 * @param root
 */
function commitRoot(root: FiberRootNode) {
	const finishedWork = root.finishedWork;
	if (finishedWork === null) {
		return;
	}
	if (__DEV__) {
		console.warn('commit阶段开始', finishedWork);
	}
	// 重置
	root.finishedWork = null;
	// 判断三个子阶段需要执行的操作
	/**
	 * @description 子树是否有 mutation 阶段需要执行的操作
	 */
	const subtreeHasEffect =
		(finishedWork.subtreeFlags & MutationMask) !== NoFlags;
	/**
	 * @description 当前节点是否有 mutation 阶段需要执行的操作
	 */
	const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

	if (subtreeHasEffect || rootHasEffect) {
		// beforeMutation
		// mutation Placement
		commitMutationEffects(finishedWork);
		// 切换 fiber 树
		root.current = finishedWork;
		// layout
	} else {
		root.current = finishedWork;
	}
}

/**
 * @description  render 阶段入口方法，执行递归操作遍历整棵 fiber 树, 同时标记 flags 副作用
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
	// 到达叶子节点开始归操作
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		// 赋值为子 fiber 或 null
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
