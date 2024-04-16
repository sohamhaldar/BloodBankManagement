import express from 'express';
import cors from  'cors';
import cookieParser from 'cookie-parser';


const app=express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

import userRoutes from './routes/user.routes.js';
app.use('/',userRoutes);

export {app};