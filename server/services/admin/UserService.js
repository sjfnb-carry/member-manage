const db = require('../../db/index');
const shortid = require('shortid');

const UserService = {
    //用户登录验证
    login: async ({ username, password }) => {
        try {
            const [rows] = await db.execute(
                'SELECT * FROM users WHERE username = ? AND password = ?',
                [username, password]
            );
            // 返回匹配结果，无结果时返回null
            return rows || null;
        } catch (error) {
            throw new Error(`登录验证失败: ${error.message}`);
        }
    },

    // 更新用户信息（支持条件更新）
    upload: async ({ id, username, introduction, gender, avatar }) => {
        try {
            let query = 'UPDATE users SET username = ?, introduction = ?, gender = ?';
            const params = [username, introduction, gender];

            // 动态添加avatar字段更新（当存在时）
            if (avatar) {
                query += ', avatar = ?';
                params.push(avatar);
            }

            // 添加WHERE条件确保更新指定用户
            query += ' WHERE id = ?';
            params.push(id);

            const [result] = await db.execute(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`更新用户信息失败: ${error.message}`);
        }
    },

    //  添加新用户（支持可选字段）
    add: async ({ username, password, introduction, gender, avatar, role }) => {
        try {
            const id = shortid.generate();
            // 基础字段列表
            const fields = ['id', 'username', 'password', 'introduction', 'gender', 'role'];
            const values = [id, username, password, introduction, gender, role];

            // 动态处理avatar字段（当存在时）
            if (avatar) {
                fields.push('avatar');
                values.push(avatar);
            }

            // 生成参数占位符（如 ?, ?, ?）
            const placeholders = values.map(() => '?').join(', ');

            // 构建最终SQL语句
            const query = `INSERT INTO users (${fields.join(', ')}) VALUES (${placeholders})`;

            const [result] = await db.execute(query, values);
            return result.insertId;
        } catch (error) {
            throw new Error(`添加用户失败: ${error.message}`);
        }
    },

    //  获取用户信息（支持单个或全部查询）
    getList: async ({ id } = {}) => {
        try {
            // 根据是否传入id决定查询方式
            const query = id
                ? 'SELECT id, username,password, introduction, gender, avatar, role FROM users WHERE id = ?'
                : 'SELECT id, username, introduction, gender, avatar, role FROM users';

            const params = id ? [id] : [];
            const [rows] = await db.execute(query, params);

            // 单个用户查询返回对象，否则返回数组
            return id ? rows[0] : rows;
        } catch (error) {
            throw new Error(`获取用户信息失败: ${error.message}`);
        }
    },


    //   删除用户
    delList: async ({ id }) => {
        try {
            const [result] = await db.execute(
                'DELETE FROM users WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`删除用户失败: ${error.message}`);
        }
    },


    //   管理员更新用户信息（全量更新）
    putList: async (body) => {
        try {
            const { username, password, role, introduction, id } = body;
            // 参数验证（基础校验）
            if (!id) throw new Error('用户ID不能为空');

            const query = `
        UPDATE users 
        SET username = ?, password = ?, role = ?, introduction = ? 
        WHERE id = ?
      `;
            const params = [username, password, role, introduction, id];

            const [result] = await db.execute(query, params);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`更新用户信息失败: ${error.message}`);
        }
    }
};

module.exports = UserService;