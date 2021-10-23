console.log("Hello");

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`${req.method} request received at ${req.url}`);
    if (req.url === '/html') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1>Timer Page</h1>")
        res.end();
    } else if (req.url === '/plain') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write("<h1>Timer Page</h1>")
        res.end();
    } else if (req.url === '/json') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ "title": "Timer Page" }));
        res.end();
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        res.write("<h1> Sorry, this page is not available </h1>");
        res.end();
    }
});

server.listen(3000, () => {
    console.log("Server is up on http://localhost:3000/");
})