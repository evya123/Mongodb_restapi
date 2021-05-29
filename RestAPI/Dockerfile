FROM node:latest
ENV NODE_ENV=production
RUN apt update -y && apt upgrade npm -y
RUN npm i npm@latest -g

COPY app .

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
