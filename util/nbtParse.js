
var fs = require('fs'),
    nbt = require('prismarine-nbt')

fs.readFile(process.argv[2], function(error, data) {
    if(error) {
        console.log(error.message)
    }
    nbt.parse(data, function(error, data) {
        fs.writeFileSync(`./${process.argv[2].split('.')[0]}.json`, JSON.stringify(data));
    });

});