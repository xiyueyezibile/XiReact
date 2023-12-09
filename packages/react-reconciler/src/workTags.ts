/**
 * @description 函数节点
 */
export const FunctionComponent = 0;
/**
 * @description 根节点
 */
export const HostRoot = 3;
/**
 * @description <div></div>
 */
export const HostComponent = 5;
/**
 * @description 文本
 */
export const HostText = 6;

/**
 * @description 节点标识
 */
export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;
