FROM node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN apt-get update && apt-get install docker \
 && rm -rf /usr/src/app/node_modules \
 && rm /usr/src/app/Dockerfile \
 && npm install

CMD [ "node", "test/test.js" ]
