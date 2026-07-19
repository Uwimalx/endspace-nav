import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { readFileSync } from 'fs'
import { load as yamlLoad } from 'js-yaml'

const configPlugin = () => {
  return {
    name: 'config-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        const configPath = path.resolve(__dirname, 'config.yaml')
        const configContent = readFileSync(configPath, 'utf-8')
        const configObj = yamlLoad(configContent)
        const snakeToUpper = (str) => {
          return str.toUpperCase().replace(/-/g, '_')
        }
        const yamlToConfig = (yamlObj) => {
          const config = {}
          for (const key in yamlObj) {
            const upperKey = snakeToUpper(key)
            if (typeof yamlObj[key] === 'object' && yamlObj[key] !== null && !Array.isArray(yamlObj[key])) {
              config[upperKey] = yamlToConfig(yamlObj[key])
            } else {
              config[upperKey] = yamlObj[key]
            }
          }
          return config
        }
        const config = yamlToConfig(configObj)
        const script = `<script>window.__CONFIG__ = ${JSON.stringify(config)}</script>`
        return html.replace('</head>', `${script}</head>`)
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), configPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
