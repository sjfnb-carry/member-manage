const db = require('../../db/index')
const shortid = require('shortid');


const MemberService = {
    add: async ({ name, phone, email, id_card, address, register_time, level_name, points_balance }) => {
        try {
            const member_id = shortid.generate(); // 生成一个短ID
            const query = `insert into members(member_id, name, phone, email, id_card, address, register_time, level_name, points_balance) values(?,?,?,?,?,?,?,?,?)`;
            const params = [member_id, name, phone, email, id_card, address, register_time, level_name, points_balance];
            const result = await db.query(query, params);
            return result;
        } catch (error) {
            throw new Error(`添加会员失败: ${error.message}`);
        }
    },
    getList: async ({ id }) => {
        try {
            const query = id ? `select * from members where member_id = ?` : `select * from members`
            const params = id ? [id] : []
            const [rows] = await db.query(query, params)
            return id ? rows[0] : rows
        } catch (error) {
            throw new Error(`查询会员失败: ${error.message}`);
        }
    },
    delList: async ({ id }) => {
        try {
            const query = `delete from members where member_id = ?`
            const params = [id]
            const result = await db.query(query, params)
            return result
        } catch (error) {
            throw new Error(`删除会员失败: ${error.message}`);
        }
    },
    putList: async ({ member_id, name, phone, email, id_card, address, register_time, level_name, points_balance }) => {
        try {
            const query = `update members set name = ?,phone = ?,email = ?,id_card = ?,address = ?,register_time = ?,level_name = ?,points_balance = ? where member_id = ?`
            const params = [name, phone, email, id_card, address, register_time, level_name, points_balance, member_id]
            const result = await db.query(query, params)
            return result

        } catch (error) {
            throw new Error(`修改会员失败: ${error.message}`);
        }
    }


}

module.exports = MemberService