// UserController.js - 用户相关路由处理

const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
    // 用户登录
    login: async (req, res) => {
        const result = await UserService.login(req.body)
        if (!result.length) {
            return res.send({
                code: "-1",
                message: "用户名或密码错误"
                
            })
        }
        // 生成JWT令牌并设置响应头
        const token = JWT.generate({
            id: result[0].id,
            username: result[0].username
        }, "1d")
        res.setHeader("Authorization", token)
        res.setHeader("Access-Control-Expose-Headers", "Authorization") // 允许前端读取header

        res.send({
            ActionType: "ok",
            data: {
                username: result[0].username,
                gender: result[0].gender || 0,
                introduction: result[0].introduction,
                avatar: result[0].avatar,
                role: result[0].role,
            }
        })
    },

    // 更新用户信息（含头像上传）
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const avatar = req.file ? `/avatarupload/${req.file.filename}` : ""
        const token = req.headers["authorization"].split(" ")[1]
        const payload = JWT.verify(token)

        await UserService.upload({
            id: payload.id,
            username,
            introduction,
            gender: Number(gender),
            avatar
        })

        res.send({
            ActionType: "OK",
            data: avatar ? { username, introduction, gender: Number(gender), avatar }
                : { username, introduction, gender: Number(gender) }
        })
    },

    // 添加新用户
    add: async (req, res) => {
        const { username, password, introduction, gender, role } = req.body
        const avatar = req.file ? `/avatarupload/${req.file.filename}` : ""
        await UserService.add({ username, password, introduction, gender: Number(gender), avatar, role: Number(role) })
        res.send({
            ActionType: "OK"
        })
    },

    // 获取用户列表/单个用户
    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK", data: result
        })
    },

    // 删除用户
    delList: async (req, res) => {
        await UserService.delList({ id: req.params.id })
        res.send({
            ActionType: "OK"
        })
    },

    // 更新用户信息
    putList: async (req, res) => {
        await UserService.putList(req.body)
        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = UserController