import { Hono } from 'hono'

const app = new Hono()

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/modes', (c) => {
  return c.json({
    modes: [
      {
        id: 'five-second',
        name: '5秒ルール',
        description: 'オートパイロットを遮断し、即座に行動を開始させる',
        duration: 5,
      },
      {
        id: 'two-minute',
        name: '2分間ルール',
        description: 'タスクの初期起動に必要な摩擦を下げ、行動を開始した事実を作る',
        duration: 120,
      },
      {
        id: 'ten-minute',
        name: '10分間ルール',
       description: 'ツァイガルニク効果と行動活性化を利用し、作業の継続を促す',
        duration: 600,
      },
    ],
  })
})

export default app
