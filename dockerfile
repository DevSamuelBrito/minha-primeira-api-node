# Dockerfile
FROM node:18

#Define o diretorio de trabalho
WORKDIR /app

# Copia os arquivos package.json e lock
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante da aplicação 
COPY . .

# Gera os clientes do Prisma (se necessário)
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Comando para executar a aplicação
CMD ["node", "dist/index.js"]