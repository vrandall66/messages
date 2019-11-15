const http = require('http');
const url = require('url');
const server = http.createServer();

let messages = [
  { id: 1, user: 'vanessa randall', message: 'lookie here!' },
  { id: 2, user: 'bob loblaw', message: 'check out my law blog' },
  { id: 3, user: 'robbie jaeger', message: 'always pants' }
];

const getAllMessages = response => {
  response.writeHead(200, { 'Content-type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
};

const addMessage = (newMessage, response) => {
  response.writeHead(201, { 'Content-type': 'text/plain' });
  response.write(JSON.stringify(newMessage));
  response.end();
  messages.push(newMessage);
};

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000.');
});

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  } else if (request.method === 'POST') {
    let newMessage = { id: new Date() };

    request.on('data', data => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});
