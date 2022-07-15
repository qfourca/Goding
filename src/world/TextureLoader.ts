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
        "up",
        "down",
        "east",
        "west",
        "north",
        "south"
    ]
    constructor() {

    }
    
    private async loadTexture(fileName:string, rotate:number): Promise<THREE.Texture> {
        if(this.textures.has(fileName)) {
            const loadTexture = this.textures.get(fileName)!.clone()
            loadTexture.rotation += rotate
            return loadTexture
        }
        else {
            
            const loadTexture = await new THREE.TextureLoader().loadAsync(this.textureDirectory + fileName + this.textureExtension)
            // loadTexture.wrapS = loadTexture.wrapT = THREE.RepeatWrapping;
            // loadTexture.offset.set( 0, 0 );
            // loadTexture.repeat.set( 2, 2 );
            this.textures.set(fileName, loadTexture)
            loadTexture.rotation += rotate
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

        return await Promise.all([
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["east"].texture, "minecraft:"), 0)}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["north"].texture, "minecraft:"), 0)}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["south"].texture, "minecraft:"), 0)}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["west"].texture, "minecraft:"), 0)}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["up"].texture, "minecraft:"), 0)}),
            new THREE.MeshBasicMaterial({map: await this.loadTexture(this.removeString(allTexture.elements[0].faces["down"].texture, "minecraft:"), 0)})
        ])
    }
}

interface strObj {
    [key: string]: any
}