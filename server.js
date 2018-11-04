const express = require('express')
const next = require('next')
const cors = require('cors')
const dotenv = require('dotenv')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

dotenv.config();

const port = process.env.PORT || 3000;

console.log("process.env.HOST", process.env.HOST)

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

        server.get('/', (req, res) => {
            const queryParams = { username: req.params.userName }
            app.render(req, res, '/index', queryParams)
        })

        server.get('/notes/:userName', (req, res) => {
            const queryParams = { username: req.params.userName }
            app.render(req, res, '/notes', queryParams)
        })

        server.get('/confirmation/:token', (req, res) => {
            const queryParams = { token: req.params.token }
            app.render(req, res, '/confirmation', queryParams)
        })

        server.get('/info/update/confirm/:token', (req, res) => {
            const queryParams = { token: req.params.token }
            app.render(req, res, '/infoUpdate', queryParams)
        })


        server.get('/reset/password/:token', (req, res) => {
            const queryParams = { token: req.params.token }
            app.render(req, res, '/resetPassword', queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`Ready on port ${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })
