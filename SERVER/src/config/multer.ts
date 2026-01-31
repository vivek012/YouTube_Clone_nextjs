import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, res,cb)=>{
        cb(null, "uploads");
    },
    filename:(req, file, cb)=>{
        cb(null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
        );
    },
});

const fileFilter = (req: Request, file: Express.Multer.File  , cb: FileCallback)=>{
    if(file.mimetype.startsWith("video/")){
        cb(null, true);

    }else{
        cb(new Error("Only video files are allowed"), false);
    }
};
const upload = multer({storage, fileFilter})
export default upload;