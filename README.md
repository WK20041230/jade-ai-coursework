# 玉语 AI：AI 时代玉器的传承与创新

这是一个基于 uni-app / Vue 的课程作业 H5 项目，围绕玉器知识库、AI 灵感生成、作品鉴赏报告等页面，展示传统玉器文化与当代 AI 设计之间的连接。

## 本地运行

```bash
npm install
npm run dev:h5
```

## 检查与构建

```bash
npm run type-check
npm run build:h5
```

H5 构建产物会生成到：

```text
dist/build/h5
```

## GitHub Pages

仓库推送到 `main` 分支后，GitHub Actions 会自动执行类型检查、构建 H5，并把 `dist/build/h5` 发布到 GitHub Pages。

如果是第一次发布，需要在 GitHub 仓库的 `Settings -> Pages` 中把部署来源设置为 `GitHub Actions`。
