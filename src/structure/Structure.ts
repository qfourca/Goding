import * as THREE from 'three'



export default class Structure {
    public size: THREE.Vector3
    public blockOffset: Map<number, string> = new Map()
    public blockArrange: Array<Array<Array<number>>>
    constructor(nbt: any) {
        console.log(nbt.BlockData.value)

        this.size = new THREE.Vector3(nbt.Width.value, nbt.Length.value, nbt.Height.value)
        Object.entries(nbt.Palette.value).forEach((element: any) => {
            
            this.blockOffset.set(element[1].value, element[0])
        })
        this.blockOffset.forEach((value:string, key:number) => {
            console.log(`${key}: ${value}`)
        })
        this.blockArrange = new Array(this.size.z + 1).fill(0).map(() => new Array(this.size.y).fill(0).map(() => new Array(this.size.x)));
        let counter = new THREE.Vector3(0, 0, 0)     

        nbt.BlockData.value.forEach((element: number) => {
            this.blockArrange[counter.z][counter.y][counter.x] = element
            counter.x++
            if(counter.x > this.size.x) {
                counter.x = 0
                counter.y++
            }
            if(counter.y > this.size.x) {
                counter.y = 0
                counter.z++
            }
        });
        console.log(this.blockArrange)
    }
    at(pos:THREE.Vector3):number {
        return this.blockArrange[pos.z][pos.y][pos.x]
    }
}