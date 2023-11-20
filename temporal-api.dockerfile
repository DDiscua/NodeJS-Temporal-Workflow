FROM node:18.16.0-alpine

WORKDIR /src/

ENV PORT 6000

COPY ./package.json ./

RUN npm install

COPY . .

# Expose the PORT
EXPOSE $PORT

CMD [ "npm", "run", "dev" ]