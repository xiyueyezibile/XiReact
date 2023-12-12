/**
 * @description 组件 类型
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Type = any;
/**
 * @description 组件 Key
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Key = any;
/**
 * @description 组件 Ref
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Ref = any;
/**
 * @description 组件 Props
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Props = any;
/**
 * @description 组件 Type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ElementType = any;

/**
 * @description React 节点对象
 */
export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: ReferenceError;
}
/**
 * @description 触发更新类型
 */
export type Action<State> = State | ((prevState: State) => State);
