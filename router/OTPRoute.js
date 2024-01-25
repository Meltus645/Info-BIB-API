import { Router } from "express";
import InfoBipAPIService from "../service/InfoBipAPIService.js";

const service =new InfoBipAPIService();


const router =Router();

router.post('/send-sms', service.sendSMS);

export default router;