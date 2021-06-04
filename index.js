var express = require('express');
var path = require('path');
var fs = require('fs');
var cors = require('cors');
var serveIndex = require('serve-index');
var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Find out the current working directory
const workingDirectory = path.dirname(__filename);

//To show the files available.
app.use('/videos', serveIndex(workingDirectory + '/videos'));

app.get('/videos/:name', function(req, res) {
    const video = req.params.name
    
    //get the video directory contents
    videoDirectoryName = 'videos';
    const videoList = fs.readdirSync(videoDirectoryName);
    
    //check if the url param name is present in the video directory
    if(!videoList.includes(video)){
        console.log('File not found')
        res.status(404);
        res.send('The requested file is not available')
    }
    res.download(`videos/${video}`);
  });



//Start the server
const PORT = 4400;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    console.log(`Home Directory: ${workingDirectory}`)
})
