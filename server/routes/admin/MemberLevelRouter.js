const express = require('express');
const MemberLevelController = require('../../controllers/admin/MemberLevelController');
const MemberLevelRouter = express.Router();

MemberLevelRouter.post('/adminapi/memberlevel/add', MemberLevelController.add)
MemberLevelRouter.get('/adminapi/memberlevel/list', MemberLevelController.getList)
MemberLevelRouter.get('/adminapi/memberlevel/list/:id', MemberLevelController.getList)
MemberLevelRouter.put('/adminapi/memberlevel/list/:id', MemberLevelController.putList)
MemberLevelRouter.delete('/adminapi/memberlevel/list/:id', MemberLevelController.delList)

module.exports = MemberLevelRouter;


