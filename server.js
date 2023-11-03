const express = require('express');
const serveIndex = require('serve-index');
const fs = require('fs');

const app = express();
const port = 3000;

// Require the upload middleware
const upload = require('./upload');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });
});

app.use(express.static('public'))
app.use('/uploads', express.static('uploads'), serveIndex('uploads', {}));

app.get('/videos', (req, res) => {
    fs.readdir(`${__dirname}/uploads`, (err, files) => {
        const videos = [];
        files.forEach((f) => {
            const extension = f.substring(f.lastIndexOf('.')+1);
            if(extension === 'mp4') {
                videos.push({ name: f.substring(0, f.lastIndexOf('.')), extension });
            }
        })
        res.json(videos);
    });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
