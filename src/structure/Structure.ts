import * as THREE from 'three'

export default class Structure {
    public size: THREE.Vector3
    public blockOffset: Map<number, string> = new Map()
    private blockArray:Array<number> = new Array()
    private coefZ:number
    constructor(nbt: any) {
        this.size = new THREE.Vector3(nbt.Width.value, nbt.Length.value, nbt.Height.value)
        this.coefZ = this.size.y * this.size.x
        Object.entries(nbt.Palette.value).forEach((element: any) => {
            this.blockOffset.set(element[1].value, element[0].substring(10))
        })
        this.blockArray = nbt.BlockData.value.filter((data: number) => {
            return data > -1
        })
    }

    in(pos:THREE.Vector3):number {
        return this.blockArray[pos.z * this.coefZ + pos.y * this.size.x + pos.x]
    }
    toMaterial(code:number):string {
        let ret = this.blockOffset.get(code)!
        let temp = ret.substring(0, ret.indexOf('['))
        if(temp == '') {
            return ret
        }
        else {
            return temp
        }
    }
}