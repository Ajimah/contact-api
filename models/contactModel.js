const mongoose = require('mongoose');



const contactSchema = mongoose.Schema({
    name:{type: 'string',
        required:[true,"please add a name"],
    },
    email:{type: 'string',
        required:[true,"please add a email"],
    },
    phone:{type: 'string',
        required:[true,"please add a phone number"],
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("contact" , contactSchema);