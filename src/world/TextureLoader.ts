import axios from 'axios'
import * as THREE from 'three'
import { Vector2 } from 'three'

export default class TextureLoader{
    private datas:Map<string, Object> = new Map()
    private textures: Map<string, THREE.Texture> = new Map()
    private readonly textureExtension:string = '.png'
    private readonly textureDirectory:string = '/texture/assets/minecraft/textures/'
    private readonly dataExtension:string = '.json'
    private readonly dataDirectory:string = '/texture/assets/minecraft/models/'
    private readonly arrange:Array<string> = [
        "south",
        "north",
        "up",
        "down",
        "west",
        "east",
    ]
    constructor() {

    }
    
    private async loadTexture(fileName:string): Promise<THREE.Texture> {
        if(this.textures.has(fileName)) {
            const loadTexture = this.textures.get(fileName)!.clone()
            return loadTexture
        }
        else {
            const loadTexture:THREE.Texture = await new THREE.TextureLoader().loadAsync(this.textureDirectory + fileName + this.textureExtension)
            loadTexture.magFilter = THREE.NearestFilter
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
                const loadedData = await (await axios.get(this.dataDirectory + fileName + this.dataExtension)).data
                this.datas.set(fileName, loadedData)
                return loadedData
            }
            catch(e) {
                // console.log(this.dataDirectory + fileName + this.dataExtension)
                throw this.dataDirectory + fileName + this.dataExtension
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
            throw e
        }
        return array
    }
    private removeString(original:string, remove:string) {
        if(original == undefined) {
            return ''
        }
        return original.replace(remove, "") == undefined ? original : original.replace(remove, "")
    }
    
    private async getMeshBasicMaterial(texture: string):Promise<THREE.MeshBasicMaterial> {
        const loadedTexture = await this.loadTexture(this.removeString(texture, "minecraft:"))
        return new THREE.MeshBasicMaterial({
            map: loadedTexture,
            transparent: true
        })
    }
    public async blockToMaterial(block:string):Promise<Array<THREE.Material> | THREE.Material | null>{
        try {
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
            })
            return await Promise.all(
                this.arrange.map(element => 
                    this.getMeshBasicMaterial(this.removeString(allTexture.elements[0].faces[element].texture, "minecraft:"))
                )
            )
        }
        catch(e) {
            return null
        }
    }
}

interface strObj {
    [key: string]: any
}