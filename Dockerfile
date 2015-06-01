FROM ubuntu:15.04

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade
RUN apt-get install -y nodejs nodejs-legacy npm

RUN mkdir -p /opt
COPY hackathon-citoyen /opt/hackathon-citoyen
ENV NODE_ENV=production
WORKDIR /opt/hackathon-citoyen

RUN npm install
CMD npm start
