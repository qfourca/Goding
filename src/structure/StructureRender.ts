import Structure from "./Structure";
import Block from '../block/Block'
import { Scene, Vector3, Group, Material, Vector2 } from "three";
import material from '../material'
import mouseEvent from '../event/mouseEvent'
import * as THREE from 'three'
export default class StructureRender {
    private structure: Structure
    private blocks: Array<Block>;
    private group:Group = new Group();
    private chunk:Array<Vector2> = new Array()
    
    constructor(structure: Structure) {
        this.structure = structure
        this.blocks = new Array()
        console.log(this.structure.size)
        let counter: number = 0
        for(let z = 0; z < this.structure.size.z; z++) {
            for(let y = 0; y < this.structure.size.y; y++) {
                for(let x = 0; x < this.structure.size.x; x++) {
                    const element = this.structure.in(new Vector3(x, y, z))
                    let material
                    if(element == 1) {
                        material = new THREE.MeshStandardMaterial({ color: 0xffffff })
                    }
                    this.blocks[counter] = new Block(new Vector3(x * 10, y * 10, z * 10), material)
                    this.group.add(this.blocks[counter].mesh)
                    console.log('.')
                }
            }
        }
    }
    render(scene:Scene) {
        mouseEvent(document.getElementById("three-js container")!, this.group)
        scene.add(this.group)
    }
}