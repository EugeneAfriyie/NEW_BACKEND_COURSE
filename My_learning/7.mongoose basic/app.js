const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://Eugene_developer:Eugene12@cluster0.k7h8bdm.mongodb.net/").then(()=>{
    console.log("Connected to MongoDB successfully");
}).catch((err)=>{
    console.log(err);

})


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    isActive:Boolean,
    tags:[String],
    createAt :{type:Date, default:Date.now}
})


// create user model 
const User = mongoose.model('User', userSchema)

async function runQuery(){
    try {
        // creating a new document 

        const newUser = await User.create({
        name: "update later",
        email:"updatelater@gmail.com",
        password:"123123123",
        age: 23,
        isActive:false,
        tags:["developer","programmer"],
    
    })



        // ANOTHER WAY TO CREATE A NEW DOCUMENT
        // const newUser = await new User({
        // name: " afriyie",
        // email:"eugene.afriyie@gmail.com",
        // password:"123123123",
        // age: 12,
        // isActive:true,
        // tags:["developer","programmer","engineer"],
        // })

        // await newUser.save()

        console.log("New User Created", newUser);


        // FETCH ALL USERS
        // const allUsers = await User.find({})
        // console.log(allUsers)

        // GET AbortController


    // get active false users

    // const getfalseUsers = await User.find({isActive:false})
    // console.log("Inactive Users", getfalseUsers);


    // getFirstOccur users

    // const getFirstOccur = await User.findOne({password:"123123123"})
    // console.log("FirstOccur Users", getFirstOccur);



            // get specific User by ID

            // const getUserById = await User.findById(newUser._id)
            // console.log("User By ID", getUserById);


            // Get selected fields

            // const getSelectedFields = await User.find().select("name email -_id")
            // console.log("Selected Fields", getSelectedFields);


            // get Limited Users

            // const getLimitedusers = await User.find().limit(3).skip(2)
            // console.log("Limited Users", getLimitedusers);


            // sorted user 

            // const sortedUser = await User.find().sort({age: -1})
            // console.log("Sorted Users", sortedUser);


            // count documents
            // const countUsers = await User.countDocuments({age: 12})
            // console.log("User Number", countUsers);


            // Delete user 

            // const deleteUser = await User.findByIdAndDelete("693eb84587469dea3acc0ab1")
            // console.log("Deleted User", deleteUser);

            // update user 

            const updatedUser = await User.findByIdAndUpdate(newUser._id, {
                age: 1000,
                isActive: true
            }, { new: true });
            console.log("Updated User", updatedUser);
            

    } catch (error) {
        console.log("Error",error);
    }finally{
        await mongoose.connection.close()
    }
}


runQuery()