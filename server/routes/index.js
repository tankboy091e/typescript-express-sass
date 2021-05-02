const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router();

const buildList = fs.readdirSync(path.join(__dirname, '../build'))

buildList.forEach((value, index) => {
    const path = value.includes('index') ? '/' : value.replace('.js', '')
    router.get(path, function(req, res, next) {
        res.render('index', { src: value });
    });
})

module.exports = router;
