const { Router } = require('express');
const router = Router();

router.get('/',(req,res) =>{
    console.log("Hola Mundo! Hello world! Ciao tutti");
    //res.json({"Title":"Hello World"});
})

router.get('/test',(req,res) =>{
    const data ={
        "name": "Miguel",
        "website": "http://miguel.com",
    }
    res.json(data);
})


module.exports = router;