FROM  node

WORKDIR /app

COPY    package*.json .

RUN     npm install

# install axios
RUN    npm install axios    

COPY    . .

EXPOSE  3001

CMD     ["npm", "start"]