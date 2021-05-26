FROM node:latest
ENV NODE_ENV=production

COPY app .

WORKDIR /app

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "run", "start" ]
