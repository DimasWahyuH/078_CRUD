const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dimaswh190805',
  database: 'mahasiswa',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:' + err.stack);
    return;
  }
  console.log('Connected to MySQL Succesfully!') ;
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM mahasiswa',(err,result) => {
        if (err) {
            console.error('Error executing query:0' + err.stack);
            res.status(500).send('Error fetching users');
            return;
        }
        res.json(result);
    })
})

app.post('/api/users', (req, res) => {
    const { nama, nim, kelas } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).send('nama, nim, dan kelas harus diisi');
    }

    db.query
    ('INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
         (err, result) => {
        if (err) {
            console.err(err);
            return res.status(500).json({message : 'Database error'});
            }
            res.json({message : 'User added successfully'});
        });
});