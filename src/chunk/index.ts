import * as THREE from 'three'
import World from '../world/WorldInfo'
import empty from '../material/empty'
import Block from '../block/Block'
import { Instance } from '../world/Instance'

export default class Chunk {
    private size:THREE.Vector3
    private part: Array<THREE.Vector2>
    private world:World
    private blocks = new Array()
    private group:THREE.Group = new THREE.Group()
    private instances:Map<number, Instance>

    constructor( 
        world: World,
        part:Array<THREE.Vector2>,
        instances:Map<number, Instance>
    ) {
        this.world = world
        this.size = new THREE.Vector3(part[1].x - part[0].x, part[0].y - part[1].y, world.size.z)
        this.part = part
        this.instances = instances
    }

    async render(scene:THREE.Scene) {
        let counter = 0
        for (let x = this.part[0].x; x < this.part[1].x; x++) {
            for (let y = this.part[0].y; y < this.part[1].y; y ++) {
                for (let z = 0; z < this.world.size.z ; z ++) {
                    const hear:number = this.world.in(new THREE.Vector3(x, y, z))
                    const textureInfo:any = this.world.blockOffset.get(hear)
                    if(this.instances.has(hear)) {
                        this.instances.get(hear)?.render(new THREE.Vector3(x, z + 1, y), scene)
                    }
                    else if(!empty.includes(textureInfo.noOpction())) {


                        const material:any = textureInfo.material
                        this.blocks[counter] = new Block(new THREE.Vector3(x, z + 1, y), material)
                        this.group.add(this.blocks[counter].mesh)
                    }
                }
            }
        }
        scene.add( this.group );
    }
}