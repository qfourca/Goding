import Structure from "./Structure";
import Block from '../block/Block'

export default class StructureRender {
    private structure: Structure
    private blocks: Array<Array<Array<Block>>>;
    constructor(structure: Structure) {
        this.structure = structure
        this.blocks = new Array(structure.size.z).fill(0).map(() => new Array(structure.size.y).fill(0).map(() => new Array(structure.size.x)));
        structure.blockArrange.forEach(z => {
            z.forEach(y => {
                y.forEach(x => {
                    
                })
            })
        })
    }
}