import axios from 'axios'
import * as THREE from 'three'

export default class TextureLoader{
    private datas:Map<string, Object> = new Map()
    private ignores:Array<string>
    private textures: Map<string, THREE.Texture> = new Map()
    private readonly textureExtension:string = '.png'
    private readonly textureDirectory:string = '/texture/assets/minecraft/textures/'
    private readonly arrange:Array<string> = [
        "south",
        "north",
        "up",
        "down",
        "west",
        "east",
    ]
    constructor(local:any, ignores:Array<string>) {
        this.datas = new Map(local)
        this.ignores = ignores
    }
    private copyObj(obj:any) {
        const result:any = {};
        for (let key in obj) {
          if (typeof obj[key] === 'object') {
            result[key] = this.copyObj(obj[key]);
          } else {
            result[key] = obj[key];
          }
        }
        return result;
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

    private loadData(fileName:string): any {
        return this.datas.get(fileName)
    }

    private loadTextureStructure(fileName: string):Array<any> {
        let array = new Array()
        let load = this.loadData(fileName)
        array.push(load)
        try {
            while(array.at(-1).parent != undefined) {
                let parent = array.at(-1).parent
                parent = this.removeString(parent, "minecraft:")
                let load = this.loadData(parent)
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
        if(this.ignores.includes(block)) { return null }
        const structure:Array<any> = this.loadTextureStructure(block)
        let allTexture:strObj = {
            textures: {},
            elements: {}
        }
        structure.forEach(element => {
            allTexture.textures = { ...allTexture.textures, ...element.textures }
            allTexture.elements = { ...allTexture.elements, ...element.elements }
        })
        allTexture = this.copyObj(allTexture)
        try {
            for (let element in allTexture.textures) {
                if(allTexture.textures[element][0] == "#") {
                    allTexture.textures[element] = allTexture.textures[allTexture.textures[element].substring(1)]
                }
            }
            this.arrange.forEach(element => {
                if(allTexture.elements[0].faces[element].texture[0] == '#') {
                    allTexture.elements[0].faces[element].texture 
                    = allTexture.textures[allTexture.elements[0].faces[element].texture.substring(1)]
                }
            })
            return await Promise.all(
                this.arrange.map(element => 
                    this.getMeshBasicMaterial(allTexture.elements[0].faces[element].texture)
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