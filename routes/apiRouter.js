const router = require('express').Router()
const {singUp, verifyOtp} = require('../controller/apiController.js')

router.get('/', (req, res) => {
    res.status(202).json({message: 'api working'})
})

router.post('/sign-up',singUp )
router.post('/verify-otp', verifyOtp)

module.exports = router