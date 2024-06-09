import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { userRouter } from './main/main.router'


const app = new Hono()

app.get('/ok', (c) => {
  return c.text('Server already running')
})

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
})

// custom route
app.route('/',userRouter)

app.get('/state/:id', async (c) => {
  
});

