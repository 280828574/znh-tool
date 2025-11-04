// 帮我生成 readme 文件 内容

# znh-tool

## 安装

```bash
npm install znh-tool
```

## 使用

```javascript
import znhTool from 'znh-tool'
```

## 项目简介

- 一个基于 Vite 的前端工具库，默认导出 `src/modules` 下的所有模块（如 `base`），通过 `import.meta.glob` 动态聚合并暴露。
- 内置 `axios` 请求封装（位于 `utils/api`），供内部工具函数使用，例如生成语音的接口 `getVideo`。

## 环境要求

- Node.js 版本：推荐 `>= 18`（建议 `20+`）。Vite 在解析配置时依赖 Web Crypto，过低版本会导致 `crypto.getRandomValues is not a function` 错误。
- 构建/运行工具：`Vite`。

## 快速开始

- 在你的前端项目中引入并使用常用工具函数：

```javascript
import znhTool from 'znh-tool'

demo()
```

- 如需修改基础地址或拦截器，请在库内的 `utils/api/request.js` 中调整 `baseURL`、拦截器逻辑或超时时间。

## 目录结构
