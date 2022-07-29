From node:alpine
WORKDIR /genesis
COPY package*.json .
RUN npm install
COPY . .
RUN npm run gen
EXPOSE 3000
CMD [ "node", "server.js" ]