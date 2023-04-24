const http = require('http');
const qs = require('querystring');
const mysql = require('mysql');

const hostname = 'localhost';
const port = 3000;

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'roomies'
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { name, email, password, confirm_password } = qs.parse(body);

      if (password !== confirm_password) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Passwords do not match');
      } else {
        pool.getConnection((err, conn) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Failed to connect to database');
            return;
          }

          const sql = 'INSERT INTO users (name, username, password) VALUES (?, ?, ?)';
          conn.query(sql, [name, email, password], (err, result) => {
            conn.release();
            if (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Failed to execute query');
            } else {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/plain');
              res.end('Registration successful');
            }
          });
        });
      }
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid request method');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
