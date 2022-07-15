import Structure, { TextureInfo } from "./World";
import Block from '../block/Block'
import { Scene, Vector3, Group, Material, Vector2 } from "three";
import materialList from '../material/material'
import empty from '../material/empty'
import mouseEvent from '../event/mouseEvent'

export default class StructureRender {
    private structure: Structure
    private blocks: Array<Block>;
    private group:Group = new Group();

    constructor(structure: Structure) {
        console.log(structure)
        this.structure = structure
        this.blocks = new Array()
        this.structure.blockOffset.forEach((val, key, map) => {
            console.log(key, val)
        })
        structure.loadTexture().then(() => {
            console.log(structure.blockOffset)
            let counter: number = 0
            for(let z = 0; z < this.structure.size.z; z++) {
                for(let y = 0; y < this.structure.size.y; y++) {
                    for(let x = 0; x < this.structure.size.x; x++) {
                        const element = this.structure.in(new Vector3(x, y, z))
                        const textureInfo:TextureInfo = this.structure.blockOffset.get(element)!
                        if(!empty.includes(textureInfo.noOpction())) {
                            const material: Material | Array<Material> = textureInfo.material
                            this.blocks[counter] = new Block(new Vector3(x, y, z), material)
                            this.group.add(this.blocks[counter].mesh)
                        }
                    }
                }
            }
        })
        
    }

    render(scene:Scene) {
        mouseEvent(document.getElementById("three-js container")!, this.group)
        scene.add(this.group)
    }
}

