import * as THREE from 'three'
export default class Blcok {
    private readonly defaultWidth: number = 10;
    private readonly defaultHeight: number = 10;
    private readonly defaultDepth: number = 10;
    private readonly defaultMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0x55D7D7 })
    private readonly geometry: THREE.BoxGeometry = new THREE.BoxGeometry(this.defaultWidth, this.defaultHeight, this.defaultDepth)

    private mesh: THREE.Mesh
    
    constructor(position: THREE.Vector3, material?: THREE.Material) {
        this.mesh = new THREE.Mesh(this.geometry, material ? material : this.defaultMaterial)  
        this.mesh.position.set(position.x, position.y, position.z)
    }

    render(scene: THREE.Scene) {
        scene.add(this.mesh)
    }
}