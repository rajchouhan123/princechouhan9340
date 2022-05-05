const internmodel = require("../model/internModel")
const collageModel = require("../model/collageModel")
const validator = require("email-validator");
const { default: mongoose } = require("mongoose");
// validator.validate("test@email.com");
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const createintern = async function (req,res){
    const data = req.body;

    if(Object.keys(data).length == 0){
        return res.status(201).send({status:false, Error:"Input is empty, provide data"})
    }

    if(!data.name || !data.email || !data.mobile || !data.collageId){
        return res.status(400).send({status:false, Error:"Please enter mandatory field"})
    }

    if(typeof(data.name)!= "string" || typeof(data.mobile) != "string"){
        return res.status(400).send({status:false, Error:"Invalid input"})
    }

    if(!validateEmail(data.email)){
        return res.status(400).send({ status: false, msg: "Invaild E-mail id " })
    }
    
    const isEmailUnique = await internmodel.findOne({email: data.email})
    if(isEmailUnique){
        return res.status(400).send({status:false, Error:"Email alrady registered"})
    }
     if((data.mobile).length != 10){
         return res.status(400).send({status:false,Error:"Invalid mobile number"})
    }

    const isuniquemobile = await internmodel.findOne({mobile:data.mobile})
    if(isuniquemobile){
        return res.status(400).send({status:false, Error:"mobile alrady registered"})
    }
    let isValid = mongoose.Types.ObjectId.isValid(data.collageId)
    if(!isValid){
        return res.status(400).send({status:false,Error:"Invalid ObjectId"})
    }

    let collageid = await collageModel.findOne({_id:data.collageId})
    if(!collageid){
        return res.status(400).send({status:false,Error:"collage not found"})
    }

    let result = await internmodel.create(data)
    res.status(201).send({status:false,data:result})
}



module.exports.createintern = createintern