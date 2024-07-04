FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npx prisma migrate dev --name init

RUN npx prisma migrate deploy

EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]
