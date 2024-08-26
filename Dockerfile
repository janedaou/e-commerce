FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# FROM node:18-alpine
# RUN npm install -g http-server
# COPY --from=build /app/dist/e-commerce-jd /app
# WORKDIR /app
# EXPOSE 8080
CMD ["npm", "start"]
