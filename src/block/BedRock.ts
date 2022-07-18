import * as THREE from 'three'
import { Vector3 } from 'three'
import Block from './Block'

export default class BedRock extends Block {
    constructor() {
        super(new Vector3(0, 0, 0))
        const loader = new THREE.TextureLoader()
        const texture = loader.load('/texture/assets/minecraft/textures/block/bedrock.png')
        texture.repeat.x = 1000;
        texture.repeat.y = 1000;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter
        this.mesh.receiveShadow = true;
        this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1000, 1, 1000), new THREE.MeshStandardMaterial({map: texture, side: THREE.BackSide}))
    }

}