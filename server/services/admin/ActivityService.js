const db = require('../../db/index');
const shortid = require('shortid');

const ActicityServie = {
    add: async ({ activity_name, activity_description, activity_picture, status, start_time, end_time }) => {
        try {
            const activity_id = shortid.generate()
            const query = `insert into member_activities(activity_id,activity_name,activity_description,activity_picture,status,start_time,end_time) values(?,?,?,?,?,?,?)`
            const params = [activity_id, activity_name, activity_description, activity_picture, status, start_time, end_time]
            const result = await db.query(query, params)
            return result
        } catch (error) {
            throw new Error(`添加活动失败: ${error.message}`);
        }
    },
    getList: async ({ id }) => {
        try {
            const query = id ? 'SELECT * FROM member_activities WHERE activity_id = ?' : 'SELECT * FROM member_activities';
            const params = id ? [id] : [];
            const [rows] = await db.execute(query, params);
            return id ? rows[0] : rows;
        } catch (error) {
            throw new Error(`获取活动信息失败: ${error.message}`);
        }
    },
    delList: async ({ id }) => {
        try {
            const query = 'DELETE FROM member_activities WHERE activity_id = ?';
            const params = [id];
            const result = await db.execute(query, params);
            return result;
        } catch (error) {
            throw new Error(`删除活动失败: ${error.message}`);
        }
    },
    putList: async ({ id }, body) => {
        try {
            const activity_id = id
            const { activity_name, activity_description, status, start_time, end_time } = body
            const query = 'UPDATE member_activities SET activity_name = ?, activity_description = ?, status = ?, start_time = ?, end_time = ? WHERE activity_id = ?';
            const params = [activity_name, activity_description, status, start_time, end_time, activity_id];
            const result = await db.execute(query, params);
        } catch (error) {
            throw new Error(`更新活动失败: ${error.message}`);
        }
    }

}

module.exports = ActicityServie;