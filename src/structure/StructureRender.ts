import Structure from "./Structure";
import Block from '../block/Block'
import { Scene, Vector3, Group } from "three";
import material from '../material'

export default class StructureRender {
    private structure: Structure
    private blocks: Array<Block>;
    private group:Group = new Group();
    constructor(structure: Structure) {
        this.structure = structure
        this.blocks = new Array()
        let counter: number = 10
        this.structure.blockArrange.forEach((z:Array<Array<number>>, zIdx:number) => {
            z.forEach((y:Array<number>, yIdx:number) => {
                y.forEach((x:number, xIdx:number) => {
                    this.blocks[counter] = new Block(new Vector3(xIdx * 10, yIdx * 10, zIdx * 10))
                    this.group.add(this.blocks[counter].mesh)
                    counter++
                })
            })
        })
        this.group.rotateX(90)
    }
    render(scene:Scene) {
        scene.add(this.group)
    }
}