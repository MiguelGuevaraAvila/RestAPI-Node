const express = require('express');
const app = express();
const morgan = require('morgan');

//settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);
app.set('view engine','ejs');


//middlewares
//app.use(morgan('combined'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

//routes 
app.use(require('./routes/index'));
app.use('/api/movies', require('./routes/movies'));


// starting the server
app.listen(3000,()=>{
    console.log(`server on port ${app.get('port')}`);
})