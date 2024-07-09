// This is the Sapper server, which we only run during `sapper export`.

import * as sapper from '../__sapper__/server.js'
import express from 'express'

const { PORT = 4002 } = process.env
const app = express()

app.use(express.static('static'))
app.use(sapper.middleware())
app.listen(PORT)
process.on('SIGINT', () => process.exit(0))
