import errorHandler from "./error.js";
import jwt from 'jsonwebtoken' ;

export const verifyUser = (req, res, next) => {
    const userToken = req.cookies.accessToken;
    // console.log("cookie", userToken, "status: ", !userToken)
    if(!userToken) return next(errorHandler(401, 'unauthorized')) ;

    jwt.verify(userToken, process.env.JWT_SECRET, (err, user) => {
        
        if(err) return next(errorHandler(401), 'Forbidden') ;

        req.user = user ;
        next();
    })
}