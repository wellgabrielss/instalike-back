import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Importa as dependências necessárias: o framework Express para criar a API e a função 'conectarAoBanco' para estabelecer a conexão com o banco de dados.

const app = express();
// Cria uma instância do aplicativo Express.

app.use(express.static("uploads"));
routes(app)

app.listen(3000, () => {
    console.log("Servidor escutando...");
});
// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo as requisições.

