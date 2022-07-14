import axios from 'axios'
import * as THREE from 'three'

export default class TextureLoader{
    private datas:Map<string, Object> = new Map()
    private textures: Map<string, THREE.Texture> = new Map()
    private readonly textureExtension:string = '.png'
    private readonly textureDirectory:string = '/texture/assets/minecraft/textures/'
    private readonly dataExtension:string = '.json'
    private readonly dataDirectory:string = '/texture/assets/minecraft/models/'
    private readonly arrange:Array<string> = [
        "up",
        "down",
        "east",
        "west",
        "north",
        "south"
    ]
    constructor() {

    }
    
    private async loadTexture(fileName:string): Promise<THREE.Texture> {
        if(this.textures.has(fileName)) {
            return this.textures.get(fileName)!.clone()
        }
        else {
            
            const loadTexture = await new THREE.TextureLoader().loadAsync(this.textureDirectory + fileName + this.textureExtension)
            this.textures.set(fileName, loadTexture)
            return loadTexture
        }
    }

    private async loadData(fileName:string): Promise<any> {
        if(this.datas.has(fileName)) {
            return this.datas.get(fileName)
        }
        else {
            try {
                const loadedData = (await axios.get(this.dataDirectory + fileName + this.dataExtension)).data
                this.datas.set(fileName, loadedData)
                return loadedData
            }
            catch(e) {
                console.log(this.dataDirectory + fileName + this.dataExtension)
            }
            
        }
    }

    private async loadTextureStructure(fileName: string):Promise<any[]> {
        let array = new Array()
        const test = await this.loadData(fileName)
        array.push(test)
        try {
            while(array.at(-1).parent != undefined) {
                let parent = array.at(-1).parent
                parent = this.removeString(parent, "minecraft:")
                let load = await this.loadData(parent)
                array.push(load)
            }
        }
        catch(e) {
            console.log(array)
        }

        return array
    }
    private removeString(original:string, remove:string) {
        if(original == undefined) {
            return ''
        }
        return original.replace(remove, "") == undefined ? original : original.replace(remove, "")
    }
    
    public async blockToMaterial(block:string):Promise<Array<THREE.Material>> {
        console.log(block)
        const structure = await this.loadTextureStructure(block)
        const allTexture:strObj = {
            textures: {},
            elements: {}
        }
        structure.forEach(element => {
            allTexture.textures = { ...allTexture.textures, ...element.textures }
            allTexture.elements = { ...allTexture.elements, ...element.elements }
        })
        for (let element in allTexture.textures) {
            if(allTexture.textures[element][0] == "#") {
                allTexture.textures[element] = allTexture.textures[allTexture.textures[element].substring(1)]
            }
        } 
        this.arrange.forEach(element => {
            if(allTexture.elements[0].faces[element].texture[0] == '#') {
                allTexture.elements[0].faces[element].texture = allTexture.textures[allTexture.elements[0].faces[element].texture.substring(1)]
            }
            // console.log(block)
            if(block == 'block/acacia_wood[axis=x]') {
                console.log(element, allTexture.elements[0].faces[element].texture)
            }
            
        })

        return await Promise.all([
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["east"].texture, "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["north"].texture, "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["south"].texture, "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["west"].texture, "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["up"].texture, "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["down"].texture, "minecraft:"))})
        ])
    }
}

interface strObj {
    [key: string]: any
}