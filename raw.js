var express = require('express')
var getRawBody = require('raw-body')
var app = express()

const port = 3000

app.use(function (req, res, next) {
    getRawBody(req, {
        length: req.headers['content-length'],
        limit: '1mb',
        encoding: 'utf-8'
    }, function (err, string) {
        if (err) return next(err)
        req.text = string
        next()
    })
})

app.use(express.static('public'))

app.post('/bezeroa', function (req, res, next) {
    console.log('body:\n' + req.text)

    res.json({msg: 'success!'})

    next()
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

