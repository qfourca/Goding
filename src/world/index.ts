import { Scene } from "../core"
import WorldInfo from "./WorldInfo"
import * as THREE from 'three'
import empty from "../material/empty"
import Chunk from "../chunk"
import { Instance } from "./Instance"

export default class Main {
    private worldinfo:WorldInfo | undefined
    private chunkNum:THREE.Vector2
    private chunkSize:number
    private chunks:Array<Array<Chunk>>
    private mapFile:any
    private instances:Map<number, Instance> = new Map()

    constructor(mapFile:any, chunkSize:number) {
        this.mapFile = mapFile
        this.worldinfo = new WorldInfo(mapFile)
        this.chunkSize = chunkSize
        this.chunkNum = new THREE.Vector2(Math.ceil(this.worldinfo.size.x / this.chunkSize), Math.ceil(this.worldinfo.size.y / this.chunkSize))
        this.chunks = Array.from(Array(this.chunkNum.x), () => Array(this.chunkNum.y).fill(null))
    }
    render(scene:Scene) {
        this.worldinfo?.loadTexture()
        .then(() => {
            this.mapFile.palette.forEach((element:Array<any>) => {
                if(element[1].count > 10) {
                    if(!empty.includes(element[1].name)) {
                        this.instances.set(element[0], 
                            new Instance(
                                element[0],
                                this.worldinfo?.blockOffset.get(element[0])?.material,
                                element[1].count
                            ))
                    }
                }
            })
            console.log(this.worldinfo)
            console.log(this.chunkNum)
            this.chunks.forEach((element, x) => {
                element.forEach((unNeed, y) => {
                    this.chunks[x][y] = new Chunk(
                        this.worldinfo!,
                        [
                            new THREE.Vector2(x * this.chunkSize, y * this.chunkSize),
                            new THREE.Vector2(
                                (x + 1) * this.chunkSize > this.worldinfo!.size.x ? this.worldinfo!.size.x : (x + 1) * this.chunkSize,
                                (y + 1) * this.chunkSize > this.worldinfo!.size.y ? this.worldinfo!.size.y : (y + 1) * this.chunkSize)
                        ],
                        this.instances)
                })
            })
            this.chunks.forEach((sec, x) => {
                sec.forEach(async (element, y) => {
                    await element.render(scene)
                })
            })
        })
    }
}