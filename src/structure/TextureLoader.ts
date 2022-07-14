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
            return this.textures.get(fileName)!
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
        const structure = await this.loadTextureStructure(block)
        const textureName:strObj = {
            up: '',
            down: '',
            east: '',
            west: '',
            north: '',
            south: ''
        }
        for(let i = structure.length - 1; i >= 0; i--) {
            const textures:strObj = structure[i].textures
            if(textures != undefined) {
                for (const key of Object.keys(textureName)) {
                    if(textureName[key] == '') {
                        textureName[key] = textures[key]
                    }
                    else if(textureName[key].includes('#')) {
                        textureName[key] = textures[textureName[key].substring(1)]
                    }
                }
            }
        }
        return await Promise.all([
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["up"], "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["down"], "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["east"], "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["west"], "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["south"], "minecraft:"))}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(textureName["north"], "minecraft:"))})
        ])
    }
}

interface strObj {
    [key: string]: string
}