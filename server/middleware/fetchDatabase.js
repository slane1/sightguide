import pool from '../db/data.js';

const fetchAllDatabase = async (req, res, next) => {
    try {
        const data = await pool.query('SELECT * FROM sights');
        console.log(data);
        res.json(data.rows);
    } catch (error) {
        res.status(500).json({ message: 'something broke' });
    }
}

export default fetchAllDatabase;