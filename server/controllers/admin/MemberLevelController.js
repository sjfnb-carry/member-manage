const MemberLevelService = require("../../services/admin/MemberLevelService")

const MemberLevelController = {
    add: async (req, res) => {
        const { level_name, min_points, max_points, discount_rate } = req.body
        await MemberLevelService.add({ level_name: Number(level_name), min_points: Number(min_points), max_points: Number(max_points), discount_rate: Number(discount_rate) })
        res.send({
            ActionType: "OK",
            data: "测试"
        })
    },
    getList: async (req, res) => {
        const { id } = req.params
        const data = await MemberLevelService.getList({ id })
        res.send({
            ActionType: "OK",
            data
        })
    },
    delList: async (req, res) => {
        const { id } = req.params
        await MemberLevelService.delList({ id })
        res.send({
            ActionType: "OK",
            data: "删除成功"
        })
    },
    putList: async (req, res) => {
        const { level_id, level_name, min_points, max_points, discount_rate } = req.body
        await MemberLevelService.putList({ level_id, level_name: Number(level_name), min_points: Number(min_points), max_points: Number(max_points), discount_rate: Number(discount_rate) })
        res.send({
            ActionType: "OK",
            data: "修改成功"
        })
    }
}

module.exports = MemberLevelController