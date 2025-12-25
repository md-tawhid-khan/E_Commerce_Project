import jwt from "jsonwebtoken"
import config from "../config";
export const generateToken = async(payload:any ) =>{
    const secret = config.secret as string;
    const token =  jwt.sign({
  data: payload
}, secret, { expiresIn: '1h'});

return token ;

}
