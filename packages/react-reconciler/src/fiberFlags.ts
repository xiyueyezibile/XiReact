/**
 * @description 没有 flags
 */
export const NoFlags = 0b0000000;
/**
 * @description 插入节点
 */
export const Placement = 0b000001;
/**
 * @description 更新属性
 */
export const Update = 0b000010;
/**
 * @description 删除子节点
 */
export const ChildDeletion = 0b000100;

/**
 * @description mutation 阶段需要执行的操作
 */
export const MutationMask = Placement | Update | ChildDeletion;

export type Flags = number;
