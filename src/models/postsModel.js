import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Cria uma conexão com o banco de dados utilizando a string de conexão fornecida pela variável de ambiente 'STRING_CONEXAO'. A função 'conectarAoBanco' provavelmente contém a lógica para conectar ao banco de dados específico (MongoDB, PostgreSQL, etc.).

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    // Obtém uma referência ao banco de dados com o nome "imersao-instabytes" a partir da conexão estabelecida.
    const colecao = db.collection("posts");
    // Obtém uma referência à coleção de posts dentro do banco de dados.
    return colecao.find().toArray();
    // Executa uma consulta para encontrar todos os documentos (posts) na coleção e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
    
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
    
}