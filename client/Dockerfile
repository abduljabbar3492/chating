# FROM node:16

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 8800

# CMD ["npm","start"]

FROM node:18-alpine3.17 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY --from=build /app/build /var/www/html/
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

# docker build -t react-image .