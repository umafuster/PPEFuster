import { fileURLToPath } from 'url';
import { dirname } from 'path';

import multer from 'multer';

// Dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,__dirname+'/public/Images')
    },
    filename: function(req,file,cb){
        cb(null,file.originalname)
    }
})


export const uploader = multer({storage})

export default __dirname