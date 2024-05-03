
const errorHandlerMiddleware = () => {
    return (err, req, res, next) => {
        console.log("error: ", err)
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
    
        return res.status(statusCode).error({
            success: false,
            statusCode,
            message
        })
    }
}

export default errorHandlerMiddleware