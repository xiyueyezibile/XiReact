import { Action } from 'shared/ReactTypes';
/**
 * @description 更新
 */
export interface Update<State> {
	action: Action<State>;
}
/**
 * @description 更新队列
 */
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
/**
 * @description 创建 Update 实例
 */
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};
/**
 * @description 创建 UpdateQueue 实例
 */
export const createUpdateQueue = <State>(): UpdateQueue<State> => {
	return {
		shared: {
			pending: null
		}
	};
};
/**
 * @description 对 updateQueue 实例的 pending 进行赋值
 */
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	update: Update<State>
) => {
	return (updateQueue.shared.pending = update);
};
/**
 * @description 消费 update
 * @param baseState 初始 state
 * @param pendingUpdate 更新 state
 * @returns
 */
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		// 如果 action 是函数则传入 baseState进行调用
		// useState(pre => pre + 1)
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}
	return result;
};
