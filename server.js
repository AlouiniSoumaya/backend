const express = require('express');
const cors = require('cors');
const app = express();

const connectDb = require ('./config/connectDb')
const userRouter = require('./routes/userRoutes/user.routes')
const init = require ('./config/setup')

require ('dotenv').config();
app.use(express.json());
app.use(cors());
app.use('/api',userRouter);

const PORT = process.env.PORT || 5050

connectDb();
init ();
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log(`listen to port...${PORT}`);
})





