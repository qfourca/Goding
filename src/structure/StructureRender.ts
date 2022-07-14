import Structure from "./Structure";
import Block from '../block/Block'
import { Scene, Vector3, Group, Material, Vector2 } from "three";
import materialList from '../material/material'
import skip from '../material/skip'
import mouseEvent from '../event/mouseEvent'

export default class StructureRender {
    private structure: Structure
    private blocks: Array<Block>;
    private group:Group = new Group();
    
    private debugger:Debugger = new Debugger()
    constructor(structure: Structure) {
        this.structure = structure
        this.blocks = new Array()

        let counter: number = 0
        for(let z = 0; z < this.structure.size.z; z++) {
            for(let y = 0; y < this.structure.size.y; y++) {
                for(let x = 0; x < this.structure.size.x; x++) {
                    const element = this.structure.in(new Vector3(x, y, z))
                    const materialName:string = this.structure.toMaterial(element)
                    if(!skip.includes(materialName)) {
                        const material:Material = materialList.get(materialName)!
                        if(material == undefined) {
                            this.debugger.add(materialName)
                        }
                        this.blocks[counter] = new Block(new Vector3(x, y, z), material)
                        this.group.add(this.blocks[counter].mesh)
                    }
                }
            }
        }
        // this.debugger.print()
    }
    render(scene:Scene) {
        mouseEvent(document.getElementById("three-js container")!, this.group)
        scene.add(this.group)
    }

}

class Debugger {
    private unknown:Array<string>
    constructor() {
        this.unknown = new Array()
    }
    add(arg:string) {

        if(!this.unknown.includes(arg)) {
            this.unknown.push(arg)
        }
    }
    print() {
        this.unknown.forEach((element:string) => {
            console.log(element)
        })
    }
}