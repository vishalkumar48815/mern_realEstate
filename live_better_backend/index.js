import express from 'express' ;

let app = express();
const port = 5000 ;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})