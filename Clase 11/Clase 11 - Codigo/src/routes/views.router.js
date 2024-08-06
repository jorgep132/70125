const { Router } = require('express')

const router = Router()

router.use('/', (req, res)=>{
    res.render('chat', {
        isMenu: true
    })
})

module.exports = router 