const router = require('express').Router();
const { MongoClient } = require('mongodb');
const employee = require('./employeelist.json');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

let employeedb;
let todoCollection;

const main = async () => {  
    await client.connect(); 
    employeedb = client.db('emoplyeedb');
    todoCollection = employeedb.collection('todo');
}
main();

const pushOne = async (gotIt) => {
    try{
         const result = await todoCollection.insertOne(gotIt);
         return result;
    } catch(e){
        console.log(e)
    }
 }

const findAll = async () => {
   try{
        const result = await todoCollection.find({}).toArray();
        return result;
   } catch(e){
       console.log(e)
   }
   
}

router.get('/', (req, res) =>{
    res.render('home',{
        employeelist: employee
    })
})

router.get('/todolist', async (req, res) =>{
    const todolist = await findAll();
    res.render('todolist', {
        employeelist: employee,
        todolist
    })
})

router.get('/admin', async (req, res) =>{
    const todolist = await findAll();
    res.render('admin', {
        employeelist: employee,
        todolist
    })
})

router.post('/assign', async (req, res)=>{
    const task = {
        department: req.body.department,
        task: req.body.task
    }
    const pushIt = await pushOne(task);
    res.redirect('/admin');
});

module.exports = router;