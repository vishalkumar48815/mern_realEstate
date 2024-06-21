
const errorHandlerMiddleware = () => {
    return (err, req, res, next) => {
        console.log("error: ", err)
        const statusCode = err.statusCode || 500;
        const error = err.message || 'Internal Server Error';
    
        return res.status(statusCode).error({
            success: false,
            statusCode,
            error
        })
    }
}

export default errorHandlerMiddleware