const MemberService = require("../../services/admin/MemberService")

const MemberController = {
    add: async (req, res) => {
        await MemberService.add(req.body)
        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {
        const data = await MemberService.getList(req.params)
        res.send({
            ActionType: "OK",
            data
        })
    },
    delList: async (req, res) => {
        await MemberService.delList(req.params)
        res.send({
            ActionType: "OK"
        })
    },
    putList: async (req, res) => {
        await MemberService.putList(req.body)
        res.send({
            ActionType: "OK"
        })
    }
}

module.exports = MemberController