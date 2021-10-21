const express = require("express");
const Product = require("../models/productSchema");
const multer = require("multer");

const router=express.Router()

// upload files
let path = "./assets/images/products";
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

        cb(null, `${randomString(25)}-${originalname.toLowerCase().replaceAll(" ", '-')}`);
    },
});

const upload = multer({ storage}).single("pic");


router.post("/add-pro", (req, res) => {

    upload(req, res, (err) => {
        if (err) {
            res.send({ err: 500, msg: err.message });
        } else {
            const { name, desc,category,price, addedBy } = req.body;
            let pic = req.file.filename;


            let insPro = new Product({
                name,
                desc,
                category,
                price,
                addedBy,
                pic,
            });

            insPro.save((err) => {
                if (err) {
                    res.json({ status: 500, msg: err.message });
                } else {
                    res.json({ status: 200, msg: "Done" });
                }
            });

            // end
        }
    });



})


router.get("/product", async (req, res) => {
    try {
      let z = await Product.find();
      res.send({ status: 200, msg: z });
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = router;
