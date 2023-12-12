import { ReactElementType } from 'shared/ReactTypes';
import { FiberNode, createFiberFromElement } from './fiber';
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { HostText } from './workTags';
import { Placement } from './fiberFlags';
/**
 * @description 决定是否跟踪副作用的高阶函数
 * @param shouldTrackEffects
 * @returns
 */
function ChildReconciler(shouldTrackEffects: boolean) {
	/**
	 * @description react 节点转 fiber 节点
	 * @param returnFiber
	 * @param currentFiber
	 * @param element
	 * @returns
	 */
	function reconcilerSingleElement(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		element: ReactElementType
	) {
		const fiber = createFiberFromElement(element);
		fiber.return = returnFiber;
		return fiber;
	}
	/**
	 * @description 文本节点转 fiber 节点
	 * @param returnFiber
	 * @param currentFiber
	 * @param element
	 * @returns
	 */
	function reconcilerSingleTextNode(
		returnFiber: FiberNode,
		currentFiber: FiberNode | null,
		content: string | number
	) {
		const fiber = new FiberNode(HostText, { content }, null);
		fiber.return = returnFiber;
		return fiber;
	}
	/**
	 * @description 标记插入节点
	 * @param fiber
	 * @returns
	 */
	function placeSingleChild(fiber: FiberNode) {
		if (shouldTrackEffects && fiber.alternate === null) {
			fiber.flags |= Placement;
		}
		return fiber;
	}
	/**
	 * @description 调度子 fiber 核心函数
	 */
	return function reconcilerChildFibers(
		/**
		 * @description 父 fiber 节点
		 */
		returnFiber: FiberNode,
		/**
		 * @description 当前 fiber 节点
		 */
		currentFiber: FiberNode | null,
		/**
		 * @description 新 react 节点
		 */
		newChild?: ReactElementType
	) {
		// 是 react 节点
		if (typeof newChild === 'object' && newChild !== null) {
			switch (newChild.$$typeof) {
				case REACT_ELEMENT_TYPE:
					return placeSingleChild(
						reconcilerSingleElement(returnFiber, currentFiber, newChild)
					);
				default:
					if (__DEV__) {
						console.warn('为实现的reconcile类型', newChild);
					}
			}
		}
		// 是文本节点
		if (typeof newChild === 'string' || typeof newChild === 'number') {
			return placeSingleChild(
				reconcilerSingleTextNode(returnFiber, currentFiber, newChild)
			);
		}
		if (__DEV__) {
			console.warn('为实现的reconcile类型', newChild);
		}
		return null;
	};
}
/**
 * @description update 阶段使用追踪副作用的
 */
export const reconcilerChildFibers = ChildReconciler(true);
/**
 * @description mount 阶段使用不追踪副作用的
 */
export const mountChildFibers = ChildReconciler(false);
