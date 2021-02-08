FROM node:14-alpine

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

CMD ["node", "./index.js"]
