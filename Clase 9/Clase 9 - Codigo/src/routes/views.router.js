const { Router } = require('express')

const router = Router()

const users = [
    {
        id: '1',
        full_name: 'user example 1',
        email: 'user1@gmail.com'
    },
    {
        id: '2',
        full_name: 'user example 2',
        email: 'user2@gmail.com'
    },
    {
        id: '3',
        full_name: 'user example 3',
        email: 'user3@gmail.com'
    }
]

// Todo esto tiene que ir renderizado en la plantilla
// verificar index.handlebars
router.get('/views', (req, res)=>{
    // Faltaria la clase manager
    const userLogin = {
        full_name: 'Jorge',
        role: 'admin'
    }
    res.render('index', {
        user: userLogin,
        isAdmin: userLogin.role === 'admin',
        users,
        title: 'HOME - Clase 9',
        styles: 'index.css'
    })
})

module.exports = router 