## commit 规范
- feat: 添加新功能
- fix: 修复 Bug
- chore: 一些不影响功能的更改
- docs: 专指文档的修改
- perf: 性能方面的优化
- refactor: 代码重构
- test: 添加一些测试代码等等

## 路径信息
- `packages` 包存放目录
- `scripts` 脚本目录


## fiber 树结构

```js
fiberRootNode 容器节点
 |        |
 current  stateNode
 |        |
hostRootFiber 根节点
|        |
 child  return
 |        |
App 树

```