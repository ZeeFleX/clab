FROM node:16-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN npm install -g yarn
COPY . /app
RUN yarn
RUN yarn build
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]