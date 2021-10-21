const express = require("express");
const app = express();
const path = require('path')
const cors = require('cors')
require("dotenv").config();
const port = process.env.PORT || 6000;




app.use('/files', express.static(path.join(__dirname, 'assets/images')))

const mongoose = require("mongoose");


// use
app.use(express.json());
app.use(cors());
// routes
const adminRoutes = require('./routes/admin')
const frontRoutes = require('./routes/front')
const catRoutes = require('./routes/category')



app.get("/", (req, res) => {
  res.send({ msg: "this is not a route" });
});


app.use('/api/admin/',adminRoutes)
app.use('/api/front/',frontRoutes)
app.use('/api/admin/',catRoutes)



/*
  online  -> `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@umesh.hybg3.mongodb.net/12PM?retryWrites=true&w=majority`
*/



mongoose.connect(`mongodb://127.0.0.1:27017/eapp`,
  (err) => {
    if (err) {
      console.log("err", err);
    }else{
        console.log("connected");
        app.listen(port, () =>
          console.log(`listening on http://localhost:${port}`)
        );
    }
  }
);
