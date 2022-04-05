FROM node:14-alpine

WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm ci --silent

COPY . ./

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]
