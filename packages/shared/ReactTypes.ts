/**
 * @description 组件 类型
 */
export type Type = any;
/**
 * @description 组件 Key
 */
export type Key = any;
/**
 * @description 组件 Ref
 */
export type Ref = any;
/**
 * @description 组件 Props
 */
export type Props = any;
/**
 * @description 组件 Type
 */
export type ElementType = any;

/**
 * @description ReactElement 函数定义
 */
export interface ReactElement {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	props: Props;
	ref: ReferenceError;
}
