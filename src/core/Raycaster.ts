import * as THREE from 'three'
import { Vector2 } from 'three'

export default class Raycaster extends THREE.Raycaster {
    constructor(camera:THREE.Camera, scene:THREE.Scene) {
        super()
        const click = (event:any) => {
            let gap1 = event.clientX - event.offsetX
            let gap2 = event.clientY - event.offsetY
            let mouse = new Vector2()
            mouse.x = ( (event.clientX - gap1)/(window.innerWidth) )*2 -1;
            mouse.y =  -( (event.clientY-gap2)/(window.innerHeight ) )*2 +1;
            this.setFromCamera(mouse, camera);
            const intersectObjects = this.intersectObjects(scene.children)
            console.log(intersectObjects[0].object)
        }
        window.addEventListener('click', click)
    }
    
}
//export default new Raycaster()