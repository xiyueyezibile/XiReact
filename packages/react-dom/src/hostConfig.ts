// 暂时用来存储宿主环境信息的文件
export type Container = Element;
export type Instance = Element;
/**
 * @description 创建宿主实例
 * @param args
 * @returns
 */
export const createInstance = (type: string): Instance => {
	const element = document.createElement(type);
	return element;
};
/**
 * @description 创建文字宿主实例
 * @param args
 * @returns
 */
export const createTextInstance = (content: string) => {
	return document.createTextNode(content);
};
/**
 * @description 插入方法
 * @param args
 * @returns
 */
export const appendInitialChild = (
	parent: Instance | Container,
	child: Instance
) => {
	parent.appendChild(child);
};

/**
 * @description 插入child到Container
 * @param args
 * @returns
 */
export const appendChildToContainer = appendInitialChild;
