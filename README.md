# 🚀 Copilot Proxy UI

一个现代化、漂亮的 GitHub Copilot Proxy 管理界面。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![Vue](https://img.shields.io/badge/vue-3.4-brightgreen.svg)

## 📸 截图预览

### 📊 仪表盘
![仪表盘](screenshots/dashboard.png)

### 💬 AI 对话
![AI 对话](screenshots/chat.png)

### 🤖 模型管理
![模型管理](screenshots/models.png)

### ⚙️ 设置
![设置](screenshots/settings.png)

## ✨ 特性

- 🎨 **现代化 UI** - 使用 Vue 3 + SCSS 构建的精美界面
- 📊 **实时监控** - 仪表盘显示服务状态、模型数量等
- 💬 **AI 对话** - 内置聊天界面测试 API
- 🤖 **模型管理** - 可视化浏览所有可用模型
- 📈 **使用统计** - 查看 API 使用量
- ⚙️ **配置管理** - 可视化配置代理服务
- 🔐 **认证管理** - 简化 GitHub OAuth 授权流程
- 🌙 **深色主题** - 护眼的深色设计
- 📱 **响应式** - 适配各种屏幕尺寸

## 🖼️ 界面预览

```
┌─────────────────────────────────────────────────────────────┐
│  🚀 Copilot Proxy                                    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│  ┃ 📊 仪表盘    💬 AI 对话    🤖 模型    📈 统计   ⚙️ 设置 ┃
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│                                                             │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐              │
│  │  12    │ │  ✅    │ │ 4399   │ │  2h    │              │
│  │ 模型数  │ │ 已认证  │ │  端口   │ │ 运行时间│              │
│  └────────┘ └────────┘ └────────┘ └────────┘              │
│                                                             │
│  ┌─ API 端点 ────────────────────┐ ┌─ 快速开始 ────────────┐ │
│  │ POST /v1/chat/completions    │ │ curl http://...     │ │
│  │ POST /v1/messages            │ │ ...                 │ │
│  │ GET  /v1/models              │ │                     │ │
│  └──────────────────────────────┘ └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5
- **样式**: SCSS with CSS Variables
- **HTTP 客户端**: Fetch API
- **后端**: [copilot-proxy](https://github.com/Jer-y/copilot-proxy)

## 📦 安装

### 前置要求

1. 安装 [copilot-proxy](https://github.com/Jer-y/copilot-proxy):
```bash
npm install -g @jer-y/copilot-proxy
```

2. 启动 copilot-proxy 服务:
```bash
copilot-proxy start
```

### 安装 UI

```bash
# 克隆仓库
git clone https://github.com/960208781/copilot-proxy-ui.git
cd copilot-proxy-ui

# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build
```

## 🚀 使用

1. 确保 copilot-proxy 服务运行在 `http://localhost:4399`
2. 访问 `http://localhost:3000`
3. 在设置页面完成 GitHub 授权
4. 开始使用！

## 🌐 API 端点

UI 界面会显示以下 API 端点：

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | `/v1/chat/completions` | OpenAI 兼容聊天 |
| POST | `/v1/messages` | Anthropic 兼容消息 |
| GET | `/v1/models` | 获取模型列表 |
| POST | `/v1/responses` | OpenAI Responses API |

## ⚙️ 配置

### 环境变量

```env
VITE_PROXY_URL=http://localhost:4399
```

### 开发

```bash
npm run dev
```

### 构建

```bash
npm run build
npm run serve  # 预览生产构建
```

## 🤝 贡献

欢迎提交 Pull Request！

1. Fork 本仓库
2. 创建你的分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📝 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Jer-y/copilot-proxy](https://github.com/Jer-y/copilot-proxy) - 强大的 Copilot 代理后端
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

## 📧 联系

如果你有任何问题，请 [开一个 Issue](https://github.com/960208781/copilot-proxy-ui/issues)

---

⭐ 如果这个项目对你有帮助，请给一个 Star！
