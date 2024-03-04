import app from "./src/routes.js";

app.listen(process.env.PORT || 3000, () => {
    console.log(`API rodando na porta ${process.env.PORT || 3000}`);
});

