import * as THREE from 'three'
import TextureLoader from './TextureLoader'
import ignore from '../material/ignore'
import { Material } from 'three'

export default class WorldInfo {
    public size: THREE.Vector3
    public blockOffset: Map<number, TextureInfo> = new Map()
    private blockArray:Array<number> = new Array()
    private coefZ:number
    private textureLoader:TextureLoader
    private readonly defaultMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0xFF00FF })
    private nbt
    constructor(nbt: any) {
        this.nbt = nbt
        this.size = new THREE.Vector3(this.nbt.width, this.nbt.length, this.nbt.height)
        this.coefZ = this.size.y * this.size.x
        this.blockArray = this.nbt.blockData.filter((data: number) => data > -1)
        this.textureLoader = new TextureLoader(nbt.info, nbt.unexist)
        console.log(nbt)
    }
    loadTexture():Promise<void> {
       return new Promise((resolve, rejects) => {
           Promise.all(
               this.nbt.palette.map(async (element: any) => {
                    const blockName:string = this.temp(element[1].name)
                    let material:Material | Array<Material> | null = null
                    material = await this.textureLoader.blockToMaterial('block/' + blockName)
                    this.blockOffset.set(element[0], new TextureInfo(element[1].name, material))
            })
           ).then(() => resolve())
        })
    }

    in(pos:THREE.Vector3):number {
        return this.blockArray[pos.z * this.coefZ + pos.y * this.size.x + pos.x]
    }
    temp(str:string):string {
        let tempStr = str.substring(0, str.indexOf('['))
        if(tempStr == '') {
            return str
        }
        else {
            return tempStr
        }
    }
}

export class TextureInfo {
    textureName: string
    material: Array<THREE.Material> | THREE.Material | null
    constructor(name: string, material:Array<THREE.Material> | THREE.Material | null) {
        this.textureName = name
        this.material = material
    }
    noOpction() {
        return    this.textureName.substring(0, this.textureName.indexOf('[')) == '' 
                ? this.textureName 
                : this.textureName.substring(0, this.textureName.indexOf('['))
    }
}