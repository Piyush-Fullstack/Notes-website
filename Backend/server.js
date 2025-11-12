const app = require('./src/app')
require('dotenv').config();
const connectDb = require('./src/db/db');

connectDb();

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})