import { Sequelize } from "sequelize";

export const conn = async (bd, host, user, password, sql) => {
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