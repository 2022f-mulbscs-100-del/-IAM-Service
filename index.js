import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {loggerMiddleware} from './Middleware/logger.middleware.js';
import SignUpRoutes from './Routes/SignUpRoutes.js'; 
import LoginRoutes from './Routes/LoginRoutes.js';

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.send(`IAM Service is running on port ${process.env.PORT}`);
});


app.use('/signup',SignUpRoutes );
app.use('/login',LoginRoutes );



//--------------Health Check----------------
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Healthy' });
});


//--------------Error Middleware----------------
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    });
});


app.listen(process.env.PORT, () => {
    console.log(`IAM Service is running on port http://localhost:${process.env.PORT}`);
});
