FROM node:15

WORKDIR /app
COPY ./package*.json ./
RUN npm install

EXPOSE 3000
EXPOSE 1337

COPY ./ ./
RUN [ "npm", "run", "build" ]

CMD [ "npm", "start" ]