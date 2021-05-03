const fs = require('fs')
const express = require('express')
const path = require('path')

const router = express.Router()

const buildList = fs.readdirSync(path.join(__dirname, '../build'))

buildList.forEach((value) => {
  const route = value.includes('index')
    ? '/'
    : value.replace('.js', '')
  router.get(route, (_, res) => {
    res.render('index', { src: value })
  })
})

module.exports = router
