const express = require('express')
const next = require('next')
const cors = require('cors')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.use(cors())

        server.get('/word/:wordId', (req, res) => {
            const queryParams = { wordId: req.params.wordId }
            app.render(req, res, '/word', queryParams)
        })

        server.get('/bucket/:bucketId', (req, res) => {
            const queryParams = { bucketId: req.params.bucketId }
            app.render(req, res, '/bucketDetail', queryParams)
        })

        server.get('/:userName', (req, res) => {
            const queryParams = { username: req.params.userName }
            app.render(req, res, '/index', queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(process.env.PORT || 80, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
