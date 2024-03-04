import { Sequelize } from "sequelize";
import Express from "express";

const app = Express();


app.use(Express.json());

const connect = async (bd, host, user, password, sql) => {
    const db = new Sequelize(bd, user, password, {
        host: host.split(':')[0], 
        port: parseInt(host.split(':')[1]), 
        dialect: 'mysql'
    });

    try {
        await db.authenticate();
        console.log('Conexão feita com sucesso');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }

    const result = await db.query(sql, { type: Sequelize.QueryTypes.SELECT });

    return result;
}

const consult = async (req, res) => {
    const { bd, host, user, password, sql } = req.body;

    
    try {
        const result = await connect(bd, host, user, password, sql);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

app.post('/', consult);

const server = app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
