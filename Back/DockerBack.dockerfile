FROM node:12.19.0

LABEL version="1.0"
LABEL description="This is the base docker image for the backend API."
LABEL maintainer = ["rafael.alvarez@hotmail.es"]

WORKDIR /Back

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 8888

CMD ["nodemon", "server.js"]