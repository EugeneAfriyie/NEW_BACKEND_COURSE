const path = require('path')


console.log('Directory Name', path.dirname(__dirname))
console.log('filename directory Name', path.dirname(__filename))

console.log("Filename", path.basename(__filename))
console.log("file Extention name", path.extname(__filename))


const joinPath = path.join('/users', 'documents' , 'node' , 'projects' , 'eugne')
console.log('Joined Path' , joinPath)

const resolvePath = path.resolve('users', 'documents' , 'node' , 'projects' , 'eugne')
console.log('Resolved path ' , resolvePath)

const normalizePath = path.normalize('/users/.document/..node/projects')
console.log("Normalised  path ", normalizePath)