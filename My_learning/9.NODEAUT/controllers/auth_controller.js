


//  register controller

const registerUser = async (req,res) =>{
    try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: " something went wrong"
        })
    }
}


// login controller

const loginUser = async (req,res) =>{
       try {
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: " something went wrong"
        })
    }
}

module.exports = {registerUser,loginUser}