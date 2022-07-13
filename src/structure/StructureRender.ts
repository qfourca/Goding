import Structure from "./Structure";
import Block from '../block/Block'
import { Scene, Vector3, Group, Material } from "three";
import material from '../material'
import mouseEvent from '../event/mouseEvent'
import * as THREE from 'three'
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
                    if(x == 6 || x == 7) {
                        // console.log(x)
                    }
                    else  {
                        let material
                        if(x == 1) {
                            material = new THREE.MeshStandardMaterial({ color: 0xffffff })
                        }
                        this.blocks[counter] = new Block(new Vector3(xIdx * 10, yIdx * 10, zIdx * 10), material)
                        this.group.add(this.blocks[counter].mesh)
                    }
                    // const block = x == 6 || x == 7 ? null : new Block(new Vector3(xIdx * 10, yIdx * 10, zIdx * 10))
                    counter++
                })
            })
        })

    }
    render(scene:Scene) {
        mouseEvent(document.getElementById("three-js container")!, this.group)
        scene.add(this.group)
    }
    rotateStrat() {

    }
    rotateStop() {

    }
}