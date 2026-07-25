# 前言 · 个人博客

基于 Jekyll 的个人博客：浅灰背景、白卡片、双栏布局（文章列表 + 侧栏排序/标签筛选）。

站点域名：`blog.yuchui.com`（见 `CNAME`）。

## 功能

- 首页文章卡片列表（标题 / 摘要 / 日期 / 标签）
- 侧栏排序（最新 / 最早）与按标签筛选
- 文章详情页
- 关于页
- 标签聚合页
- 站内搜索
- RSS 订阅（`/feed.xml`）

## 本地预览

需要安装 [Ruby](https://www.ruby-lang.org/) 与 Bundler。

```bash
bundle install
bundle exec jekyll serve
```

浏览器打开 <http://127.0.0.1:4000> 即可预览。

## 写文章

在 `_posts/` 目录新建 Markdown 文件，文件名格式：

```text
YYYY-MM-DD-slug.md
```

示例 front matter：

```yaml
---
layout: post
title: 文章标题
date: 2026-07-24 10:00:00 +0800
tags: [标签一, 标签二]
---
```

正文中可用 `<!--more-->` 分隔摘要与全文。

## 发布

推送到 `main` 分支后，GitHub Pages 会自动构建并发布。请确认仓库已开启 Pages，且构建源为 `main` 分支根目录。
