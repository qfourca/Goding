
var fs = require('fs'),
    nbt = require('prismarine-nbt')


fs.readFile(process.argv[2], function(error, data) {
    if(error) {
        console.log(error.message)
    }    
    nbt.parse(data, function(error, data) {
        console.log(data)
        fs.writeFileSync('./home.json', JSON.stringify(data));
    });
    
});