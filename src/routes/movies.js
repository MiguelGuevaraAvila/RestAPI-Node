const { Router} = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('./sample.json');


//console.log(movies);

router.get('/', (req, res) => {
        res.json(movies);
});

router.post('/', [
        req.body('year', 'ingrese correctamente el campo de año')
        .exists().isNumeric().isLength({min:4,max:4}),
        req.body('title', 'ingrese un titulo válido')
        .exists().isLength({min:4,max:4}),
        req.body('director', 'ingrese un director válido')
        .exists().isLength({min:4,max:4}),
        req.body('type', 'ingrese una categoria de pelicula')
        .exists().isLength({min:4,max:4})
    ],(req, res) => {

        //const errors = validationResult();
        const {title, director, year, type}= req.body;
        if(title && director && year && type)
        {
            const id = movies.length + 1;

            const newMovie = {...req.body, id};
            res.json(movies);
            //console.log(newMovie);
            movies.push(newMovie);
        }
        else{
            //res.send('Wrong request');
            res.status(500).json({error: 'There was an error'});
        }
    });

router.delete('/:id', (req, res) => {
    const { id} =req.params; 
    _.each(movies, (movie, i)=>{
        if(movie.id == id)
        {
            movies.splice(i, 1);
        }
    });
    //console.log(req.params);
    res.send(movies);
});

router.put('/:id',(req, res)=>{
    const {id} =req.params; // url params
    const { title, year, director, type } = req.body; //data body
    if(title && director && year && type){
        _.each(movies, (movie, i)=>{
            if(movie.id == id){
                movie.title= title;
                movie.year = year;
                movie.director = director;
                movie.type = type;
            }
            res.json(movies);
        })
    }
    else{
        res.status(500).json('all data are required');
    }
});
module.exports = router;

// 46:00 minutos
//https://www.youtube.com/watch?v=bK3AJfs7qNY&list=PLTzdf6VDuldGEgyhQFKzTDXRQQ3lMJUoQ&index=3