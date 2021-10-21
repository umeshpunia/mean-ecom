const express = require("express");
const Users = require("../models/userSchema");
const multer = require("multer");

// upload files
let path = "./assets/images/users";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const { originalname } = file;

    const fileArr = originalname.split(".");

    const ext = fileArr[fileArr.length - 1];

    // const randomName=

    function randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    cb(null, `${randomString(25)}-${originalname.toLowerCase().replaceAll(" ", '-')}.${ext}`);
  },
});

const upload = multer({ storage: storage }).single("profile");

// upload files ends

// encryption
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/test", (req, res) => {
  console.log("route working");
});

// insert user
router.post("/adduser", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send({ err: 1, msg: err.message });
    } else {
      const { name, email, password, registeredBy } = req.body;
      let profile = req.file.filename;

      bcrypt.hash(password, 10, (err, hash) => {
        let insUser = new Users({
          name,
          email,
          registeredBy,
          profile,
          password: hash,
        });

        insUser.save((err) => {
          if (err) {
            res.json({ status: 500, msg: err.message });
          } else {
            res.json({ status: 200, msg: "Done" });
          }
        });
      });

      // end
    }
  });
});

// login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let z = await Users.find({ email });
    if (z.length == 0) {
      res.json({ status: 404, msg: "Not Valid User" });
    } else {
      bcrypt.compare(password, z[0].password, function (err, result) {
        if (result) {
          res.status(200).json({ status: "200", msg: z });
        } else {
          res.status(400).json({ msg: "Wrong Password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "Soemthing Wrong Password" });
  }
});

// get users
router.get("/users", async (req, res) => {
  try {
    let z = await Users.find();
    res.send({ status: 200, msg: z });
  } catch (error) {
    console.log(error.message);
  }
});


// change password
router.post("/change-pass", async (req, res) => {
  const { email, password,op } = req.body;

  let resUser = await Users.findOne({ email });
  let dbPass = resUser.password
  let _id=resUser._id
  


  bcrypt.compare(op, dbPass, function (err, result) {
    if(result){
      // hash password
      bcrypt.hash(password, 10, function(err, hash) {
        // Store hash in your password DB.
        if(err) return res.json({"status":500,"msg":err.message})
        // update password
        Users.updateOne({email},{$set:{password:hash}},err=>{
          if(!err){
            res.json({"status":200,"msg":"Successfully Changed"})
          }else{
            res.json({"status":500,"msg":"Please Try Again"})
  
          }
        })


         

    });


    }else{
      res.json({"status":401,"msg":"Please Enter Correct Password"})
    }
  });



})

module.exports = router;
