import multer from 'multer'
// Al usar type module no contamos directamente con __dirname
import path from 'path'
import __dirname from './dirname.js'


const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, path.join(__dirname, './public/images'))
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({storage})
// exportamos el uploader
export { uploader }