import * as THREE from 'three'
export default class Scene extends THREE.Scene{
    constructor() {
        super()
        this.background = new THREE.Color(0xf0f0f0)
        this.fog = new THREE.Fog( 0xffffff, 0, 750 );
    }
}
//export default new Scene()
