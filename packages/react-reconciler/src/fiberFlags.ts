/**
 * @description 没有 flags
 */
export const NoFlags = 0b0000001;
/**
 * @description 放置节点
 */
export const Placement = 0b000010;
/**
 * @description 更新属性
 */
export const Update = 0b000100;
/**
 * @description 删除子节点
 */
export const ChildDeletion = 0b001000;

export type Flags = number;
