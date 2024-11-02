const mongoose = require('mongoose');



const userSchema = mongoose.Schema(
    {

        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        },
    username:{
        type: 'string',
        required: [true , "please enter a username"]
    },

    email:{
        type: 'string',
        required: [true , "please enter user email address"],
        unique: [true, "email address already exists"],
    },
    password:{
        type: 'string',
        required: [true , "please enter user password"],
    },
},
    {
        timestamp: true,
    }
);

    module.exports = mongoose.model("User", userSchema);