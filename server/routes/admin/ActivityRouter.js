var express = require('express');
const ActivityController = require('../../controllers/admin/ActivityController');
//图片上传
const multer = require('multer')
const upload = multer({ dest: 'public/activityupload' })

const ActivityRouter = express.Router();

ActivityRouter.post('/adminapi/activity/add', upload.single('file'), ActivityController.add);

ActivityRouter.get('/adminapi/activity/list', ActivityController.getList);
ActivityRouter.get('/adminapi/activity/list/:id', upload.single('file'), ActivityController.getList);

ActivityRouter.delete('/adminapi/activity/list/:id', ActivityController.delList);
ActivityRouter.put('/adminapi/activity/list/:id', ActivityController.putList);

module.exports = ActivityRouter;