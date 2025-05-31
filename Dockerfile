FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev
EXPOSE 8007
CMD ["npm", "dev"]