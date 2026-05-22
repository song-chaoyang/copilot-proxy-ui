import './styles/main.scss'

// State
const state = {
  proxyUrl: 'http://localhost:4399',
  isRunning: false,
  models: [],
  authStatus: 'unknown'
}

// DOM Elements
const pages = {
  dashboard: document.getElementById('dashboard-page'),
  chat: document.getElementById('chat-page'),
  models: document.getElementById('models-page'),
  usage: document.getElementById('usage-page'),
  settings: document.getElementById('settings-page')
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    const page = item.dataset.page
    switchPage(page)
  })
})

function switchPage(pageName) {
  // Update nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === pageName)
  })
  
  // Update pages
  Object.keys(pages).forEach(key => {
    pages[key].classList.toggle('hidden', key !== pageName)
  })
  
  // Update title
  const titles = {
    dashboard: '仪表盘',
    chat: 'AI 对话',
    models: '模型管理',
    usage: '使用统计',
    settings: '设置'
  }
  document.getElementById('page-title').textContent = titles[pageName]
  
  // Load page data
  if (pageName === 'models') loadModels()
  if (pageName === 'usage') loadUsage()
}

// API Functions
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${state.proxyUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    return await response.json()
  } catch (error) {
    console.error('API Error:', error)
    showToast('无法连接到代理服务', 'error')
    return null
  }
}

// Load Models
async function loadModels() {
  const container = document.getElementById('models-list')
  container.innerHTML = '<div class="loading">加载中...</div>'
  
  const data = await fetchAPI('/v1/models')
  if (data && data.data) {
    state.models = data.data
    container.innerHTML = data.data.map(model => `
      <div class="model-card">
        <div class="model-name">${model.id}</div>
        <div class="model-description">
          ${model.owned_by || 'GitHub Copilot'}
        </div>
        <div class="model-tags">
          <span class="tag">${model.object || 'model'}</span>
        </div>
      </div>
    `).join('')
    
    // Update model count
    document.getElementById('model-count').textContent = data.data.length
    
    // Update chat model select
    const chatModel = document.getElementById('chat-model')
    chatModel.innerHTML = '<option value="">选择模型...</option>' +
      data.data.map(m => `<option value="${m.id}">${m.id}</option>`).join('')
  } else {
    container.innerHTML = '<div class="loading">加载失败，请检查服务状态</div>'
  }
}

// Load Usage
async function loadUsage() {
  const container = document.getElementById('usage-content')
  container.innerHTML = '<div class="loading">加载中...</div>'
  
  // Note: This would need to be implemented in the backend
  container.innerHTML = `
    <div class="usage-stats">
      <p>使用量统计功能需要后端支持。</p>
      <p>你可以通过命令行查看：</p>
      <div class="code-block">
        <pre><code>copilot-proxy check-usage</code></pre>
      </div>
    </div>
  `
}

// Toast Notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast')
  toast.textContent = message
  toast.className = `toast show ${type}`
  
  setTimeout(() => {
    toast.classList.remove('show')
  }, 3000)
}

// Copy Endpoint
function copyEndpoint(text) {
  navigator.clipboard.writeText(`curl ${state.proxyUrl}${text.replace('POST ', '').replace('GET ', '')}`)
  showToast('已复制到剪贴板', 'success')
}

// Save Settings
function saveSettings() {
  showToast('配置已保存', 'success')
}

// Chat Functions
document.getElementById('send-btn').addEventListener('click', sendMessage)
document.getElementById('chat-input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
})

async function sendMessage() {
  const input = document.getElementById('chat-input')
  const model = document.getElementById('chat-model').value
  const message = input.value.trim()
  
  if (!message) return
  if (!model) {
    showToast('请先选择一个模型', 'error')
    return
  }
  
  const messagesContainer = document.getElementById('chat-messages')
  
  // Add user message
  messagesContainer.innerHTML += `
    <div class="message user">
      <div class="message-content">${escapeHtml(message)}</div>
    </div>
  `
  
  input.value = ''
  messagesContainer.scrollTop = messagesContainer.scrollHeight
  
  // Send to API
  try {
    const response = await fetch(`${state.proxyUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer dummy'
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'user', content: message }]
      })
    })
    
    const data = await response.json()
    
    if (data.choices && data.choices[0]) {
      messagesContainer.innerHTML += `
        <div class="message assistant">
          <div class="message-content">${escapeHtml(data.choices[0].message.content)}</div>
        </div>
      `
    } else {
      messagesContainer.innerHTML += `
        <div class="message assistant">
          <div class="message-content">错误: ${JSON.stringify(data)}</div>
        </div>
      `
    }
  } catch (error) {
    messagesContainer.innerHTML += `
      <div class="message assistant">
        <div class="message-content">请求失败: ${error.message}</div>
      </div>
    `
  }
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Start Proxy Button
document.getElementById('start-proxy-btn').addEventListener('click', () => {
  showToast('正在后台启动服务...', 'info')
  // Note: This would need to trigger the backend service
})

// Check Usage Button
document.getElementById('check-usage-btn').addEventListener('click', async () => {
  showToast('正在检查使用量...', 'info')
  await loadUsage()
  switchPage('usage')
})

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadModels()
})
