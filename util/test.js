const fs = require('fs').promises
const { Schematic } = require('prismarine-schematic')

async function main () {

    const schematic = await Schematic.read(await fs.readFile('./dormitory.schem'))
    console.log(schematic.blocks.length)

}

main()