const fs = require('fs')
const path = require('path')


const datafolder = path.join(__dirname, 'data');
if(!fs.existsSync(datafolder)){
    fs.mkdirSync(datafolder)
    console.log("Datafolder created successfully")
}

const filePath = path.join(datafolder, ' example.txt')
// Sync way creating file 
fs.writeFileSync(filePath, "HellO from node js Eugene")
console.log("file crrated successfully")

const readContentFromFile = fs.readFileSync(filePath, "utf8")
console.log("file content " , readContentFromFile)


fs.appendFileSync(filePath, "\nThis the added new content to the file")
console.log("New content added")

// async way of ctrating file 

const asyncfilePath = path.join(datafolder , "async-example.txt")

fs.writeFile(asyncfilePath, "Hello async node js" , (err) =>{
    if(err)throw err ;
    console.log("Async file created with content")

    fs.appendFile(asyncfilePath, "\nThis the appended content to the async file",(err)=>{
    if(err)throw err ;
    console.log("new file added to async file")

    })

    fs.readFile(asyncfilePath,'utf8' ,(err,updatedData) =>{
        console.log("Updated file content", updatedData)
    })
})