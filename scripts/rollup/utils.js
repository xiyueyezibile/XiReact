import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

import replace from '@rollup/plugin-replace';
/**
 * @description 包路径 根目录/packages
 */
const pkgPath = path.resolve(__dirname, '../../packages');
/**
 * @description 打包路径 根目录/dist/packages
 */
const distPath = path.resolve(__dirname, '../../.dist/node_modules');
/**
 * @description 解析包路径
 */
export function resolvePkgPath(pkgName, isDist) {
	// 如果打包返回打包路径
	if (isDist) {
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`;
}
/**
 * @description 通过包名获取package.json 信息
 */
export function getPackageJSON(pkgName) {
	// 包路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	const str = fs.readFileSync(path, {
		encoding: 'utf-8'
	});
	return JSON.parse(str);
}
/**
 * @description 获取所有rollup plugins
 */
export function getBaseRollupPlugins({
	alias = {
		__DEV__: true,
		preventAssignment: true
	},
	typescript = {}
} = {}) {
	return [replace(alias), cjs(), ts(typescript)];
}
