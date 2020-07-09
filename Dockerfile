FROM node:10.9-alpine

RUN mkdir -p /app
WORKDIR /app

COPY . /app/
RUN npm install

RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=5000

CMD [ "npm", "start" ]