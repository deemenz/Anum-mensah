const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', require('./routes/app'))




const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});


