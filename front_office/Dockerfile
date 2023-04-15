FROM node:fermium
# Create app directory
WORKDIR /home/ismail/travail/pingPongChallenge/front_office
# Install app dependencies
ENV PATH node_modules/.bin:${PATH}
COPY package*.json ./
RUN apt-get update && apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN echo "NODE Version:" && node --version
RUN echo "NPM Version:" && npm --version
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]