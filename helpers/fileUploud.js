const multer = require("multer")

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./url/file")
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "--" + file.originalname)
    }
});

const coverStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./url/cover")
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "--" + file.originalname)
    }
});

const demoStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, "./url/demo")
    },
    filename: (req, file, cd) => {
        cd(null, Date.now() + "--" + file.originalname)
    }
});


exports.fileUploud = multer({storage: fileStorageEngine})

exports.coverUploud = multer({storage: coverStorageEngine})

exports.demoUploud = multer({storage: demoStorageEngine})
