const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
	if (req.method === 'POST' && req.url === '/save') {
		let body = '';

		req.on('data', chunk => {
			body += chunk.toString();
		});

		req.on('end', () => {
			const data = JSON.parse(body);
			const file = 'results.json';

			fs.readFile(file, (err, content) => {
				const results = err ? [] : JSON.parse(content);
				results.push(data);

				fs.writeFile(file, JSON.stringify(results, null, 2), err => {
					if (err) {
						res.writeHead(500, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ success: false }));
					} else {
						res.writeHead(200, { 'Content-Type': 'application/json' });
						res.end(JSON.stringify({ success: true }));
					}
				});
			});
		});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

server.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
