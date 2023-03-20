# FROM node:16

# WORKDIR /app

# COPY package.json .

# RUN npm install

# COPY . .

# EXPOSE 8800

# CMD ["npm","start"]

FROM node:16 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /var/www/html/
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
CMD ["nginx","-g","daemon off;"]

# FROM nginx:stable-alpine
# COPY - from=build /app/build /usr/share/nginx/html
# COPY - from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# docker build -t react-image .