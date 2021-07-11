FROM node:latest

ENV NODE_ENV=production \
    GROUP_ID=1001 \
    USER_ID=1001 \
    GROUP=app \
    USER=app

WORKDIR /app

COPY app/package.json /app
RUN npm install

RUN apt update -y && apt upgrade npm -y

COPY app /app

RUN groupadd -r -g ${GROUP_ID} ${GROUP} && \
    useradd -rm -s /bin/bash -g ${GROUP} -u ${USER_ID} ${USER} && \
    chown -R ${GROUP}:${USER} /app

USER app

EXPOSE 3000

CMD [ "npm", "run", "start" ]
