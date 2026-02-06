import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function localApiPlugin() {
  return {
    name: 'local-api',
    configureServer(server) {
      // Load .env vars into process.env for the API handler
      const env = loadEnv('development', server.config.root, '')
      Object.assign(process.env, env)

      server.middlewares.use('/api/recommend', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.writeHead(200)
          res.end()
          return
        }
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        const body = await new Promise((resolve) => {
          let data = ''
          req.on('data', chunk => { data += chunk })
          req.on('end', () => resolve(JSON.parse(data)))
        })

        const { default: handler } = await server.ssrLoadModule('./api/recommend.js')

        const mockRes = {
          setHeader(name, val) { res.setHeader(name, val) },
          status(code) {
            return {
              json(data) {
                res.writeHead(code, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(data))
              },
              end() {
                res.writeHead(code)
                res.end()
              }
            }
          }
        }

        try {
          await handler({ method: req.method, body }, mockRes)
        } catch (err) {
          console.error('API error:', err)
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: err.message }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localApiPlugin()],
  envPrefix: 'VITE_',
})
