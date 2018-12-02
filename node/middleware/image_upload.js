const multer = require('multer');
const storage = require('multer').memoryStorage();
const upload = multer({ storage, dest: 'uploads/' });

module.exports = {
    singleImageUpload(req, res, next) {
        upload.single(req.params.image_name)(req, res, next);
    }
};
