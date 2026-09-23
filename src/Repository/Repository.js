import pool from '../configs/database.js';

const repository = {
    create: async (description, status) =>{
        const sql = "INSERT INTO activity (description, status) VALUES (?,?)";
        const [result] = await pool.execute(sql, [description, status]);
        return result;
    },
    list: async () =>{
        const sql = "SELECT * FROM activity;";
        const [result] = await pool.execute(sql);
        return result;
    },
    listId: async (id) =>{
        const sql = "SELECT * FROM activity WHERE id = ?;";
        const [result] = await pool.execute(sql, [id]);
        return result;
    },
    listStatus: async (status) =>{
        const sql = "SELECT * FROM activity WHERE status = ?;";
        const [result] = await pool.execute(sql, [id]);
        return result;
    },
    delete: async (id) =>{
        const sql = "DELETE FROM activity WHERE id = ?;";
        const [result] = await pool.execute(sql, [id]);
        return result; 
    },
    update: async (description, status,id) => {
        const sql = "UPDATE activity SET description = ?, status= ? WHERE id = ?;";
        const [result] = await pool.execute(sql, [description, status,id]);
        return result;
    }
}

export default repository;