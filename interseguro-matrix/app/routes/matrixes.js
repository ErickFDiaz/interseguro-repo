const express = require('express')
const router = express.Router()
const { processMatrix } = require('../controllers/matrixes')
const { validateMatrix } = require('../validators/matrixes')
const checkRoleAuth = require('../middleware/roleAuth')

router.post('/',checkRoleAuth(['admin','user']), validateMatrix, processMatrix)

module.exports = router