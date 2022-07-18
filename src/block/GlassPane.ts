// import * as THREE from 'three'
// export default class GlassPane {
//     protected readonly defaultMaterial: THREE.Material = new THREE.MeshStandardMaterial({ color: 0xFF00FF })
//     public mesh: THREE.Mesh
//     protected geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1, 1)
//     private static materials:Map<string, THREE.Texture> = new Map()
    
//     constructor(position: THREE.Vector3, name:string) {
//         if(material == null) {
//             material = this.defaultMaterial
//         }
//         this.mesh = new THREE.Mesh(this.geometry, material)
//         this.mesh.castShadow = true
//         this.mesh.receiveShadow = true;
//         this.mesh.position.set(position.x, position.y, position.z)
//     }
//     render(scene: THREE.Scene) {
//         scene.add(this.mesh)
//     }
// }