# ENDSPACE_NAV

> 受《明日方舟：终末地》视觉美学启发的网页导航面板。

**ENDSPACE_NAV** 是一款风格强烈的网页导航面板，采用 Vite + React 构建，深度致敬了[《明日方舟：终末地》官方网站](https://endfield.hypergryph.com/)的视觉风格。

## ✨ 特性

- **工业科幻设计**：严谨的布局、等宽字体及科技感装饰元素
- **沉浸式加载体验**：包含系统初始化步骤与扫描动效的自定义加载序列
- **背景音乐系统**：加载阶段与进入后的音乐播放，支持开关控制
- **自定义主题色**：支持自定义颜色
- **网站图标自动获取**：多源 fallback 确保图标显示
- **响应式布局**：针对桌面端与移动端进行深度优化

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产

```bash
npm run build
```

## ⚙️ 配置

编辑项目根目录的 `config.yaml` 文件进行配置：

### 基础配置

```yaml
site_name: CLOUD09_NAV      # 站点名称
author: CLOUD09             # 作者
bio: Navigation Terminal    # 站点描述
avatar: /favicon.svg        # Logo 图片
since: 2024                 # 建站年份
```

### 导航链接配置

```yaml
endspace_nav_groups:
  - title: SEARCH
    links:
      - name: Google
        url: https://www.google.com
        desc: 全球搜索引擎
      # ...
  # ...
```

### 主题色配置

```yaml
endspace_theme_primary: '#FBFB46'    # 主色调
```

### Loading 配置

```yaml
endspace_loading_cover: true
endspace_loading_site_name: CLOUD09_NAV
endspace_loading_text_init: INITIALIZING
endspace_loading_text_loading: LOADING
endspace_loading_text_complete: READY
endspace_loading_text_sweeping: LAUNCHING
endspace_loading_text_fadeout: WELCOME
endspace_loading_image: /favicon.svg
```

## 📁 项目结构

```
config.yaml              # 配置文件（YAML 格式）
src/
├── config.js            # 配置读取模块
├── App.jsx              # 应用入口
├── main.jsx             # 渲染入口
├── lib/
│   ├── global.jsx       # 全局状态
│   └── theme.jsx        # 主题上下文
├── pages/
│   ├── HomePage.jsx     # 首页
│   └── NotFoundPage.jsx # 404 页面
├── styles/
│   └── global.css       # 全局样式
└── theme/
    ├── Layout.jsx       # 布局组件
    └── components/
        ├── NavPanel.jsx       # 导航面板
        ├── TitleBar.jsx       # 顶部栏
        ├── Footer.jsx         # 页脚
        ├── LoadingCover.jsx   # 加载动画
        ├── ThemeSelector.jsx  # 主题选择器
        └── ...
public/
├── background.mp3       # 背景音乐
└── enter.mp3            # 进入音效
```

## 🛠️ 技术栈

- **Vite** - 构建工具
- **React 18** - UI 框架
- **React Router** - 路由
- **Tailwind CSS** - 样式
- **Tabler Icons** - 图标库

## 😘 致谢
[原项目](https://github.com/cloud-oc/endspace) 没有您就没有这个项目，轻工业风太帅了


音乐 协议流 及 音效为[鹰角网络](https://www.hypergryph.com/)版权所有

