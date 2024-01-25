export const generateOTP =(len =4) =>{
    let otp ='';
    const NUMBERS =[0,1,2,3,4,5,6,7,8,9];
    for(let i =0; i<len; i++){
        const index =Math.floor(Math.random() *NUMBERS.length);
        otp =`${otp}${NUMBERS[index]}`;
    }
    return otp;
}