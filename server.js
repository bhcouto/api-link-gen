import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const ConvertFileToBase64 = (str) => {
    return Buffer.from(str).toString('base64');
};

const ConvertBase64ToFile = (base64String) => {
    return Buffer.from(base64String, 'base64').toString('utf-8');
};


const token = "linkdb1.cp9gva7qjili.sa-east-1.rds.amazonaws.com:3306|homologacao|!DB2homologacao|homolog_baselink";
const sql = "select nome from lojas";

const token_base64 = ConvertFileToBase64(token);
const sql_base64 = ConvertFileToBase64(sql);
console.log(sql_base64);
console.log(token_base64);

const jsonDatast = JSON.stringify({
    "token": token_base64,
    "sql": sql_base64
});

const API_URL = "https://api.linkinformaticarj.com.br/apps/services/comunication";

const sendRequest = async () => {
    try {
        const data = Buffer.from(jsonDatast, 'utf-8');

        const response = await axios.post(API_URL, data, {
            headers: {
                'Accept': 'application/json;charset=UTF-8',
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        throw error;
    }
};

app.get("/conn", async (req, res) => {
    try {
        const responseData = await sendRequest();

        res.send(responseData);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});