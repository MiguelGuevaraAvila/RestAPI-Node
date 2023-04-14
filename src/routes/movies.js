const { Router} = require('express');
const router = Router();

const movies = require('./sample.json');
//console.log(movies);

router.get('/', (req, res) => {
        res.json(movies);
});

router.post('/', (req, res) => {
    //console.log(req.body);
    const {title, director, year, type}=req.body    
    if(title && director && year && type)
    {
        const id = movies.length+1
        const newMovie ={id, ...req.body};
        res.json('saved');
        console.log(newMovie);
        //movies.push();
    }
    else{
        res.send('Wrong request');
    }

    //res.send('received');
});

module.exports = router;

// 46:00 minutos
//https://www.youtube.com/watch?v=bK3AJfs7qNY&list=PLTzdf6VDuldGEgyhQFKzTDXRQQ3lMJUoQ&index=3