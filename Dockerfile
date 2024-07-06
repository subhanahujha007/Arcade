FROM node:18-alpine
WORKDIR /app

COPY package* .

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD [ "npx", "next", "start" ]