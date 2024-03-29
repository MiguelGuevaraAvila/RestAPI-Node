const { Router} = require('express');
const router = Router();
const _ = require('underscore');

const movies = require('./sample.json');
const {check} = require('express-validator');

//console.log(movies);

router.get('/', (req, res) => {
    res.json(movies);
});


const createMovie = async(req, res) => {
    const {title, director, year, type} =req.body;
    id=movies.length+1;
    const newMovie ={id, ...req.body};
    console.log(newMovie);
    movies.push(newMovie);
    res.send(movies);
}


const {validationResult} = require('express-validator');
const validateResult =  (req,res,next)=>{
    //console.log(req.body.year);
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        res.status(403);
        res.send({errors:error.array()});
    }
}

const validateCreate = [
    check('year')
        .exists()
        .withMessage('not found')
        .isLength({min:4})
        .withMessage('at least has to be 4 characters long')
        .isLength({max:4})
        .withMessage('maximun 4 characters long')
        .isNumeric()
        .withMessage('only numeric values are allowed')
        .not().isEmpty()
        .withMessage('is empty')
        .trim().escape()
    ,
    check('title')
        .exists()
        .withMessage('not found')
        .not().isEmpty()
        .withMessage('is empty')
        .trim().escape()
    ,
    check('director')
        .exists()
        .withMessage('not found')
        .not().isEmpty()
        .withMessage('is empty')
        .trim().escape()
    ,    
    check('type')
        .exists()
        .withMessage('not found')
        .not().isEmpty()
        .withMessage('is empty')
        .trim().escape()
    ,
    check('rate')
        .exists()
        .withMessage('not found')
        .isLength({min:2})
        .withMessage('at least has to be 4 characters long')
        .isLength({max:2})
        .withMessage('maximun 4 characters long')
        .isNumeric()
        .withMessage('only numeric values are allowed')
        .not().isEmpty()
        .withMessage('is empty')
        .trim().escape()        
    ,
    (req,res,next)=>{
        validateResult(req,res,next);
    }
];

router.post('/',  validateCreate, createMovie);

router.delete('/:id', (req, res) => {
    const { id} =req.params; 
    _.each(movies, (movie, i)=>{
        if(movie.id == id)
        {
            movies.splice(i, 1);
            res.send(movies);
        }
    });
});

router.put('/:id',(req, res)=>{
    const {id} =req.params; // url params
    const { title, year, director, type, rate } = req.body; //data body
    if(title && director && year && type && rate){
        _.each(movies, (movie, i)=>{
            if(movie.id == id){
                movie.title= title;
                movie.year = year;
                movie.director = director;
                movie.type = type;
                movie.rate = rate;
            }
        })
    }
    else{
        res.status(500).json('all data are required');
    }
    res.json(movies);
});




module.exports = router;