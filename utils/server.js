import 'dotenv/config';
import express from "express";
import OTPRouter from '../router/OTPRoute.js';

const app =express();

class Server{

    constructor(){

        
        /* middlewares */
        app.use(express.json({limit: '30mb', extended: true}));
        app.use(express.urlencoded({limit: '30mb', extended: true}));
        
        this.route();
    }

    start(host =process.env.SERVER_HOST || 'localhost', port =process.env.SERVER_PORT|| 5500){
        try {
            app.listen(port, host, () =>{
                console.log(`[+] Server Running On Port ${port}`)
            })
            
        } catch ({message}) {
            console.log(`[-] ${message}`);
        }
    }

    route(){
        app.use('/otp', OTPRouter);
    }
}

export default Server;