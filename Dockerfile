FROM node:16-alpine as build
WORKDIR /app
COPY package.json /app/package.json
COPY . /app
RUN yarn
EXPOSE 3000
CMD ["yarn", "start"]