const express = require('express')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

const PORT = 3001
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')))

app.get('/api/notes', function (req, res) {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
      const dbInfo = JSON.parse(data)
      res.json(dbInfo)
    });
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    const jsonNote = {
        title: title,
        text: text,
        id: uuidv4()
    }
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        const dbData = JSON.parse(data)
        dbData.push(jsonNote)
        fs.writeFile('db/db.json', JSON.stringify(jsonNote, null, 4), (error) => error ? console.log(error) : console.log('Success'))
    })
})




app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))
