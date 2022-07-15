import { Scene } from "../core"
import World from "./World"
import * as THREE from 'three'

import Chunk from "../chunk"
export default class Main {
    private world:World | undefined
    private chunkNum:THREE.Vector2
    private chunkSize:number
    private chunks:Array<Array<Chunk>>
    constructor(mapFile:any, chunkSize:number) {
        this.world = new World(mapFile)
        this.chunkSize = chunkSize
        this.chunkNum = new THREE.Vector2(Math.ceil(this.world.size.x / this.chunkSize), Math.ceil(this.world.size.x / this.chunkSize))
        this.chunks = Array.from(Array(this.chunkNum.x), () => Array(this.chunkNum.y).fill(null)) 
    }
    render(scene:Scene) {
        this.world?.loadTexture()
        .then(() => {
            this.chunks.forEach((element, x) => {
                element.forEach((unNeed, y) => {
                    this.chunks[x][y] = new Chunk(
                        this.world!,
                        [
                            new THREE.Vector2(x * this.chunkSize, y * this.chunkSize),
                            new THREE.Vector2(
                                (x + 1) * this.chunkSize > this.world!.size.x ? this.world!.size.x : (x + 1) * this.chunkSize,
                                (y + 1) * this.chunkSize > this.world!.size.y ? this.world!.size.y : (y + 1) * this.chunkSize)
                        ])
                    this.chunks[x][y].render(scene)
                })
            })

        })

    }
}