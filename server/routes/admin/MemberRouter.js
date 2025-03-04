var express = require('express');
const MemberController = require('../../controllers/admin/MemberController');

// //图片上传
// const multer = require('multer')
// const upload = multer({ dest: 'public/memberupload' })

const MemberRouter = express.Router();

MemberRouter.post('/adminapi/member/add', MemberController.add);

MemberRouter.get('/adminapi/member/list', MemberController.getList);
MemberRouter.get('/adminapi/member/list/:id', MemberController.getList);

MemberRouter.delete('/adminapi/member/list/:id', MemberController.delList);
MemberRouter.put('/adminapi/member/list/:id', MemberController.putList);

module.exports = MemberRouter;