/**
 * @description 判断浏览器是否支持 Symbol
 */
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

/**
 * @description 支持 Symbol 返回 Symbol 值，否则返回一个数字
 */
export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;
