import { Scene } from "../core"
import Structure from "./World"
import StructureRender from "./WorldRenderer"
export default class Map {
    private structure:Structure | undefined
    constructor(mapFile:any) {
        this.structure = new Structure(mapFile)
    }
    render(scene:Scene) {
        const structureRender:StructureRender = new StructureRender(this.structure!)
        structureRender.render(scene)
    }
}