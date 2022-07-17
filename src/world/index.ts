import { Scene } from "../core"
import WorldInfo from "./WorldInfo"
import * as THREE from 'three'

import Chunk from "../chunk"
export default class Main {
    private worldinfo:WorldInfo | undefined
    private chunkNum:THREE.Vector2
    private chunkSize:number
    private chunks:Array<Array<Chunk>>
    constructor(mapFile:any, chunkSize:number) {
        this.worldinfo = new WorldInfo(mapFile)
        this.chunkSize = chunkSize
        this.chunkNum = new THREE.Vector2(Math.ceil(this.worldinfo.size.x / this.chunkSize), Math.ceil(this.worldinfo.size.x / this.chunkSize))
        this.chunks = Array.from(Array(this.chunkNum.x), () => Array(this.chunkNum.y).fill(null))
    }
    render(scene:Scene) {
        this.worldinfo?.loadTexture()
        .then(() => {
            this.chunks.forEach((element, x) => {
                element.forEach((unNeed, y) => {
                    this.chunks[x][y] = new Chunk(
                        this.worldinfo!,
                        [
                            new THREE.Vector2(x * this.chunkSize, y * this.chunkSize),
                            new THREE.Vector2(
                                (x + 1) * this.chunkSize > this.worldinfo!.size.x ? this.worldinfo!.size.x : (x + 1) * this.chunkSize,
                                (y + 1) * this.chunkSize > this.worldinfo!.size.y ? this.worldinfo!.size.y : (y + 1) * this.chunkSize)
                        ])
                })
            })

            this.chunks.forEach(async (element, x) => {
                element.forEach(async (unNeed, y) => {
                    await this.chunks[x][y].render(scene)
                })
            })
        })
    }
}