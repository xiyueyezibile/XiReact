import {
	Key,
	ElementType,
	Type,
	Props,
	ReactElement,
	Ref
} from 'shared/ReactTypes';
/**
 *
 * @param type 组件 类型
 * @param props 组件 props
 * @param key 组件 key
 * @param ref 组件 ref
 */
const ReactElement = function (
	type: Type,
	props: Props,
	key: Key,
	ref: Ref
): ReactElement {
	const element = {
		$$typeof: Symbol.for('react.element'),
		key,
		ref,
		props,
		type
	};
	return element;
};

export const jsx = function (
	type: ElementType,
	config: any,
	...maybeChildren: any
) {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;
	// 通过 config 对 props 进行赋值
	Object.keys(config || {}).forEach((prop) => {
		const val = config[prop];
		// 对 key 进行单独处理
		if (prop === 'key') {
			if (val !== undefined) {
				key = `${val}`;
			}
			// 对 ref 进行单独处理
		} else if (prop === 'ref') {
			ref = val;
			// 剩下的 props 进行逐个赋值
		} else {
			props[prop] = val;
		}
	});
	// 判断是否传入第三个参数
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength > 0) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, props, key, ref);
};
/**
 * @description 开发环境 dev
 */
export const jsxDEV = jsx;
