import { Material } from "three";
import * as THREE from 'three'
export class Instance {
    public readonly code: number
    private material:Material | Array<Material>
    private amount:number
    private mesh
    private geometry:THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
    private count = 0;
    constructor(
        code: number,
        material:Material | Array<Material> | null | undefined,
        amount:number
    ) {
        this.code = code
        this.material = material == null ? new THREE.MeshStandardMaterial({ color: 0xFF00FF }) : material
        this.amount = amount + 1
        this.mesh = new THREE.InstancedMesh( this.geometry, this.material, this.amount );
    }

    render(pos:THREE.Vector3, scene:THREE.Scene) {
        const matrix = new THREE.Matrix4();
        matrix.setPosition( pos.x, pos.y, pos.z );
        this.mesh.setMatrixAt( this.count, matrix );
        this.count++
        scene.add( this.mesh )
    }
}