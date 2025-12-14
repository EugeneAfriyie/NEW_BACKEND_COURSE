const express = require('express');
const app = express();
const port = 3000;



myFirstMiddleware = (req,res,next) =>{
    console.log('This is my first middleware');
    // next();
}

app.use(myFirstMiddleware);

app.get('/', (req, res) => {
  res.send('Hello from Express.js with middleware!');
});
app.get('/about', (req, res) => {
  res.send('Hello from Express.js with middleware!');
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});