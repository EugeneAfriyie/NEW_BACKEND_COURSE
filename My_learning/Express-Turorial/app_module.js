const express = require('express');
const app = express();
const port = 3000;



// application-level settings
app.set('view engine', 'ejs');

// routing
app.get('/', (req, res) => {
  res.send('Hello from Express.js with app module!');
});

app.post('api/data', (req, res) => {

    res.json({
    message: 'Data received successfully',
    data: req.body
    })
  res.send('POST request to the /api/data endpoint');
});

app.use(err,req,res,next) =>{
    console.log(err.stsck);
    res.status(500).send('Internal Server Error');
}

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
