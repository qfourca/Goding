import * as THREE from 'three'
import mouseEvent from '../event/mouseEvent'
import World from '../World/World'
import empty from '../material/empty'
import Block from '../block/Block'

export default class Chunk {
    private size:THREE.Vector3
    private part: Array<THREE.Vector2>
    private world:World
    private blocks = new Array()
    private group:THREE.Group = new THREE.Group()

    constructor(world: World, part:Array<THREE.Vector2>) {
        this.world = world
        this.size = new THREE.Vector3(part[1].x - part[0].x, part[0].y - part[1].y, world.size.z)
        this.part = part
        console.log('debug1')
    }

    async render(scene:THREE.Scene) {
        console.log('debug2')
        let counter = 0
        for (let x = this.part[0].x; x < this.part[1].x; x++) {
            for (let y = this.part[0].y; y < this.part[1].y; y ++) {
                for (let z = 0; z < this.world.size.z ; z ++) {
                    const element = this.world.in(new THREE.Vector3(x, y, z))
                    const textureInfo:any = this.world.blockOffset.get(element)
                    if(!empty.includes(textureInfo.noOpction())) {
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
