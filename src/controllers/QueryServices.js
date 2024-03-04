import { conn } from "../services/db.js";

export const consult = async (req, res) => {
    const { bd, host, user, password, sql } = req.body;

    try {
        const result = await conn(bd, host, user, password, sql);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
