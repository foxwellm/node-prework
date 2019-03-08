const http = require('http');
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is listening at Port 3000');
});

let messages = [
  { 'id': 1, 'user': 'brittany storoz', 'message': 'hi there!' },
  { 'id': 2, 'user': 'bob loblaw', 'message': 'check out my law blog' },
  { 'id': 3, 'user': 'lorem ipsum', 'message': 'dolor set amet' }
];

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }

  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };

    request.on('data', (data) => {
      console.log(JSON.parse(data))
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      console.log(newMessage)
      addMessage(newMessage, response);
    });
  }
});

const getAllMessages = (response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.write(JSON.stringify(messages))
  response.end()
}

const addMessage = (newMessage, response) => {
  response.statusCode = 201
  response.setHeader('Content-Type', 'application/json')
  messages.push(newMessage)
  response.write(JSON.stringify(messages))
  response.end()
}
