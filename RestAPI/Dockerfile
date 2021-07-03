FROM node:latest

ENV NODE_ENV=production \
    GROUP_ID=1001 \
    USER_ID=1001 \
    GROUP=flask \
    USER=flask

WORKDIR /flask

COPY app/package.json /flask
RUN npm install

RUN apt update -y && apt upgrade npm -y

COPY app /flask

RUN groupadd -r -g ${GROUP_ID} ${GROUP} && \
    useradd -rm -s /bin/bash -g ${GROUP} -u ${USER_ID} ${USER} && \
    chown -R ${GROUP}:${USER} /flask

USER flask

EXPOSE 3000

CMD [ "npm", "run", "start" ]
