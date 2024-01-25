import 'dotenv/config';
import axios from 'axios';
import {generateOTP} from '../utils/generate_otp.js';
import { HTTP_200_OK, HTTP_400_BAD_REQUEST } from '../utils/http_status_codes.js';

'use strict';

class InfoBipAPIService{
    #api;
    constructor(){
        this.#api =axios.create({baseURL: process.env.INFOBIP_BASE_URL, headers: {
            Authorization: `App ${process.env.INFOBIP_API_KEY}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }});
    }

    sendSMS = async (req, res) =>{
        try {
            const {phone} =req.body;
            const response =await this.#api.post('/sms/2/text/advanced', {
                messages: [
                    {
                        destinations: [{to: phone,},],
                        from: "InfoSMS",
                        text: `Your Verification PIN is: ${generateOTP()}`
                    }
                ]
            });
            const {messages} =await response.data;
            const {to} =messages[0];
            return res.status(HTTP_200_OK).json({message: `A verification code was sent to ${to}`});
        } catch (error) {
            console.log(error);
            return res.status(HTTP_400_BAD_REQUEST).json({message:error});
        }
    }
}

export default InfoBipAPIService;