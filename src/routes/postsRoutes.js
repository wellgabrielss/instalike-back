// Importa o framework Express.js para criar a API
import express from "express";

// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer";

import fs from "fs"
import cors from "cors"

// Importa funções controladoras de posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  // Define o diretório de destino para arquivos enviados (cria 'uploads' se não existir)
  destination: function (req, file, cb) {
    const dir = './uploads';
    fs.exists(dir, (exists) => {
      if (!exists) {
        fs.mkdir(dir, (err) => {
          if (err) {
            console.error('Erro criando diretório uploads:', err);
            return cb(err, null);
          }
        });
      }
      return cb(null, dir);
    });
  },

  // Define o nome do arquivo enviado (mantém o nome original)
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do Multer usando o armazenamento configurado
const upload = multer({ storage });

// (Opcional: Configuração específica para ambiente)
// Para Linux/Mac, o destino padrão é suficiente
// const upload = multer({ dest: "./uploads" }); // Comente se usar config separada

// Define as rotas da API
const routes = (app) => {
  // Habilita o parseamento de dados JSON na requisição
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota para listar posts (implementada na função listarPosts)
  app.get("/posts", listarPosts);

  // Rota para criar um novo post (implementada na função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota para upload de imagem (usa middleware upload.single('imagem'))
  // Esta rota espera um único arquivo chamado 'imagem' no corpo da requisição
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

// Exporta a função de rotas para uso em outros arquivos
export default routes;