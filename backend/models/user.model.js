import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username: { 
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        select: false, // when user model is called password doesnot appears
        required: true,
        maxlength: 8,
    }
}, {timestamps: true});

// // hashed password using your pre("save") hook 
// UserSchema.pre("save", async function(next) {
//     // user.password
//     if(!this.isModified("password")){ return next(); }

//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });


// When you declare a Mongoose middleware as async, Mongoose expects you to return a Promise.You do not need to call next().
// So you're mixing two different styles:

// ✅ Promise / async style
// ✅ Callback(next) style
// Choose one, not both.


// ✅ Promise / async style
UserSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// // ✅ Callback(next) style
// UserSchema.pre("save", function (next) {
//     if (!this.isModified("password")) {
//         return next();
//     }
    
//     bcrypt.hash(this.password, 10)
//         .then((hash) => {
//             this.password = hash;
//             next();
//         })
//         .catch(next);
// });



UserSchema.methods.comparePassword = async function(givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
}

const UserModel = mongoose.model("User", UserSchema);

export {UserModel}