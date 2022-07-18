
var fs = require('fs'),
    nbt = require('prismarine-nbt')
    io = require('fs').promises
const { Schematic } = require('prismarine-schematic')

const infoDir = './texture/assets/minecraft/models/'
const dataExtension = '.json'


fs.readFile(process.argv[2], function(error, data) {
    if(error) {
        console.log(error.message)
    }
    nbt.parse(data, async function(error, data) {
        let result = new Object()
        result.length = data.value.Length.value
        result.width = data.value.Width.value
        result.height = data.value.Height.value
        result.blockData = (await Schematic.read(await io.readFile(process.argv[2]))).blocks
        result.palette = new Map()
        Object.entries(data.value.Palette.value).forEach(element => { result.palette.set(element[1].value, { name: removeMinecraft(element[0])} )})
        for(let i = 0; i < result.palette.size; i++) {
            const element = result.palette.get(i)
            element.count = result.blockData.reduce((cnt, element) => cnt + (i === element))
            console.log((i + 1) + ' / ' + result.palette.size)
        }
        result.palette = Array.from(new Map([...result.palette].sort((a, b) => a[0] - b[0])));
        const { info, unexist } = loadAllFiles(Array.from(result.palette).map(element => 'block/' + removeOpction(element[1].name)))
        result.info = Array.from(info)
        result.unexist = unexist
        fs.writeFileSync(`./${process.argv[2].split('.')[0]}.json`, JSON.stringify(result));
        console.log("Preprocessing Success! filename: " + `${process.argv[2].split('.')[0]}.json`)
    });

});

function loadAllFiles(files) {
    let info = new Map()
    let unexist = []
    function loadFile(file) {
        if(!info.has(file)) {
            try {
                info.set(file, (JSON.parse(fs.readFileSync(infoDir + file + dataExtension))))
                if(info.get(file).parent != undefined) {
                    loadFile(removeMinecraft(info.get(file).parent))
                }
            }
            catch(e) {
                if(!unexist.includes(file)) {
                    unexist.push(file)
                }
            }
        }
    }
    files.forEach(loadFile)
    console.log("")
    return { info, unexist }
}

function removeOpction(str) {
    let tempStr = str.substring(0, str.indexOf('['))
    if(tempStr == '') {
        return str
    }
    else {
        return tempStr
    }
}

function removeMinecraft(str) {
    if(str.includes("minecraft:")) return str.substring(10)
    else return str
}