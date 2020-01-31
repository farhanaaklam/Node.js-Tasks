//Task-1 Spin up a node.js driven server at port 3000
//Task-2 Handle two routes "/" and "/users" and return some greet (at "/" route) and a list of dummy users (at "/users" route)
//Task-3 Add a form with a username <input> to the "/" page and submit a POST request to "/create-user" upon a button click
//Task-4 Add the "/create-user" route and parse the incoming data (i.e username) and log to console
const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
   if(url === '/') {
       // res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<h1>Welcome to my page</h1>'); 
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">send</button></form></body>');   
        res.write('</html>');
        return res.end();    
    }
    if (url === '/users') {
        //res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<ul><li>First user</li><li>Second user</li></ul>');   
        res.write('</html>');  
        return res.end();  
    } 

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const username = parsedBody.split('=')[1];
            console.log(username);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        return res.end();

    }
    /*res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Welcome to my page</h1></body>');   
    res.write('</html>');
    res.end(); */ 
  
});

server.listen(3000);

