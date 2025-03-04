const ActivityService = require('../../services/admin/ActivityService')

const ActivityController = {
    add: async (req, res) => {
        const { activity_name, activity_description, status, start_time, end_time } = req.body
        const activity_picture = req.file ? `/activityupload/${req.file.filename}` : ""
        await ActivityService.add({ activity_name, activity_description, activity_picture, status: Number(status), start_time, end_time })
        res.send({
            ActionType: "OK",
        })
    },
    getList: async (req, res) => {

        const result = await ActivityService.getList(req.params)
        // console.log(req.params.id);

        res.send({
            ActionType: "OK",
            data: result
        })
    },
    delList: async (req, res) => {
        await ActivityService.delList(req.params)
        res.send({
            ActionType: "OK"
        })
    },
    putList: async (req, res) => {
        await ActivityService.putList(req.params,req.body)
        res.send({
            ActionType: "OK"
        })

    }
}

module.exports = ActivityController;