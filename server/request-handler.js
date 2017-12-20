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
    response.writeHead(statusCode, headers);
    //turns message into similar data structure with resulst as a key, and object as val
    const responseBody = {};
    responseBody.results = messages;
    response.end(JSON.stringify(responseBody));
  }

  if (request.method === 'POST') {
    request.on('error', (err) => {
      console.error(err);
      //bad request
      response.statusCode = 400;
      response.end();
    });
    response.on('error', (err) => {
      console.error(err);
    });
    if (request.method === 'POST' && request.url === '/classes/messages') {
      let body = '';

      request.on('data', (chunk) => {
        //build up stringified messages object
        body += chunk;

      });
      response.statusCode = 201;
      response.end();

    } else {
      //not found
      response.statusCode = 404;
      response.end();
    }

    //if endpoint is correct, run our post request
    // if (endpoints[request.url] === 'messages') {
    //   statusCode = 201;
    //   //check to see if our endpoints match
    //   const {method, url} = request;
    //   //stringified message object
    //   let body = '';

    //   request.on('error', (err) => {
    //     console.log('we hit an error');
    //     console.error(err);

    //   }).on('data', (chunk) => {
    //     //build up stringified messages object
    //     body += chunk;

    //   });
    // } else {
    //   //if endpoint is incorrect, update status code to 404
    //   statusCode = 404;
    // }


    // request.on('end', () => {

    //   response.on('error', (err) => {
    //     console.error(err);
    //   });
    //   //grab incoming message, parse it to object, add to messages array
    //   messages.push(JSON.parse(body));
    //   response.writeHead(statusCode, headers);
    //   const responseBody = {headers, method, url, body};
    //   response.end(JSON.stringify(responseBody));
    // });
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


