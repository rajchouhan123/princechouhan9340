const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({

    title: { type: String, required: true, unique: true,lowercase:true },
    excerpt: { type: String, required: true,lowercase:true },
    userId: { type: ObjectId, required: true, ref: "User" },
    ISBN: { type: String, required: true, unique: true },
    category: { type: String, required: true ,lowercase:true},
    subcategory: [{ type: String, required: true,lowercase:true }],
    reviews: { type: Number, default: 0, comment: { type: String } },
    deletedAt: { type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    releasedAt: { type: Date,required: true,default:new Date() }
},{ timestamps: true })

module.exports =  mongoose.model("Book",bookSchema)