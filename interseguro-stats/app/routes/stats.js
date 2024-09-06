const express = require('express')
const router = express.Router()
const checkOrigin = require('../middleware/origin')

const { getStats } = require('../controllers/stats')

router.post('/', checkOrigin, getStats)



module.exports = router