import mongoose from "mongoose";
const BookShema = mongoose.Schema(
    {
    title : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true , 
    },
    publishYear : {
        type : Number,
        require : true,
    }
    
},
{
    timestamps :true
}
)

export const Books = mongoose.model('Book',BookShema);