# Usa uma imagem do docker hub com a versão carbon do Node.js
FROM node:alpine

# Define qual diretório será usado para nossa aplicação dentro do container
WORKDIR /usr/src/app

# Copia todos os arquivos que começam com package e tem extensão .json para o diretório definido acima
COPY package*.json ./

# Instala todas as dependências declaradas no package.json
RUN npm install

# Copia todos os arquivos da raiz da nossa aplicação para a pasta deinida no WORKDIR
COPY . .

# Expõe a porta 8082 do container
EXPOSE 8082

# Roda o comando 'npm start'
CMD [ "npm", "start" ]