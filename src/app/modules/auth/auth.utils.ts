


import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { TJwtPayload } from './auth.interface';


export const createToken = (
    jwtPayload: TJwtPayload,
    secret: Secret,
    expiresIn: string | number
) => {
    const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };

    return jwt.sign(jwtPayload, secret, options);
};


// Veryfy token
export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};