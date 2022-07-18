import * as THREE from 'three'
export default class Block {
    protected static readonly defaultMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0xFF00FF })

    protected geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)

    public mesh: THREE.Mesh
    
    constructor(position: THREE.Vector3, material?: THREE.Material | Array<THREE.Material>) {
        if(material == null) {
            material = Block.defaultMaterial
        }
        this.mesh = new THREE.Mesh(this.geometry, material)
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true;
        this.mesh.position.set(position.x, position.y, position.z)
    }
    render(scene: THREE.Scene) {
        scene.add(this.mesh)
    }
}