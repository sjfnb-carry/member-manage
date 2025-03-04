const db = require('../../db/index');
const shortid = require('shortid');
const MemberLevelService = {
    add: async ({ level_name, min_points, max_points, discount_rate }) => {
        try {
            const level_id = shortid.generate();
            const query = `insert into member_levels(level_id, level_name, min_points, max_points, discount_rate) values(?,?,?,?,?)`
            const params = [level_id, level_name, min_points, max_points, discount_rate];
            const result = await db.query(query, params);
            return result;
        } catch (error) {
            throw new Error(`添加会员等级失败: ${error.message}`);
        }
    },
    getList: async ({ id }) => {
        try {
            const query = id ? `select * from member_levels where level_id = ?` : `select * from member_levels`
            const params = id ? [id] : []
            const [rows] = await db.query(query, params)
            return id ? rows[0] : rows
        } catch (error) {
            throw new Error(`查询会员等级失败: ${error.message}`);
        }
    },
    delList: async ({ id }) => {
        try {
            const query = `delete from member_levels where level_id = ?`
            const params = [id]
            const result = await db.query(query, params);
            return result;
        } catch (error) {
            throw new Error(`删除会员等级失败: ${error.message}`);
        }
    },
    putList: async ({ level_id, level_name, min_points, max_points, discount_rate }) => {
        try {
            const query = `update member_levels set level_name = ?, min_points = ?, max_points = ?, discount_rate = ? where level_id = ?`
            const params = [level_name, min_points, max_points, discount_rate, level_id]
            const result = await db.query(query, params);
            return result;
        } catch (error) {
            throw new Error(`修改会员等级失败: ${error.message}`);
        }
    }
}

module.exports = MemberLevelService;