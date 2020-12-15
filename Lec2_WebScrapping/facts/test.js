let fs = require("fs");
let obj = {
    name:"Steve"
}


fs.writeFileSync( "./obj.json" , JSON.stringify(obj));

