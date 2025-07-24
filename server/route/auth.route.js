import express from 'express';
import { login } from '../controller/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/google-login', login)
authRoute.get('/get-user', login)


export default authRoute;