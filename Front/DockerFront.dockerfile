FROM node:12.19.0

LABEL version="1.0"
LABEL description="This is the base docker image for the frontend react app."
LABEL maintainer = ["rafael.alvarez@hotmail.es"]

WORKDIR /Front

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]