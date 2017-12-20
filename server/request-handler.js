/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var messages = [{username: 'Jono', message: 'Do my bidding!'}];
// % added exports
var exports = module.exports = {};

exports.requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode;
  var endpoints = {'/classes/messages': 'messages'};
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/JSON';

  if (request.method === 'GET') {
    //OK
    statusCode = 200;
    if (request.url !== '/classes/messages') {
      statusCode = 404;
    }
    response.writeHead(statusCode, headers);
    //turns message into similar data structure with resulst as a key, and object as val
    const responseBody = {};
    responseBody.results = messages;
    response.end(JSON.stringify(responseBody));
  }

  if (request.method === 'POST') {

    if (request.url !== '/classes/messages') {
      response.writeHead(404);
      response.end();
    }
    let body = '';

    request.on('data', (chunk) => {
      //build up stringified messages object
      body += chunk;
    });
    response.writeHead(201);
    response.end();
  }
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.


