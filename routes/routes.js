const express = require('express')
const path = require('path')

const router = express.Router()

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '../public/index.html'))
    res.render('home', {
        'Name': "Ankit"
    })
})

router.post('/submit', (req, res) => {
    async function work() {
        const ct = require(path.join(__dirname, "../express_index.js")).customToken
        console.log("start");
        let token = await ct(req.body.email, req.body.password)
        res.redirect(`/token:${token}`)
        console.log("end");
    }
    work()
})

router.get(`/token:token`, (req, res) => {
    res.send(`Your token is ${req.params.token}`)
})

router.get('/timer', (req, res) => {
    // console.log(req);
    async function getData() {
        const gd = require(path.join(__dirname, "../express_index.js")).getData
        let data = await gd()
        res.render('timer', {
            tabledata : data
        })
    }
    getData()
})

router.post('/timer/set', (req, res) => {
    console.log(req.body);
    async function setTimer() {
        const now = require(path.join(__dirname, "../express_index.js")).now()
        data = {
            "username": req.body.name,
            "set_timer_at": now,
            "duration": req.body.time,
            "content": "Timer has been set..."
        }
        const st = require(path.join(__dirname, "../express_index.js")).setTimer
        st(data)
        res.redirect('/timer')
    }
    setTimer()
})

module.exports = router

