import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, size: number) {
		super(FOV, size, 1, 1000)
		this.position.y = 15
		this.position.x = -5
		this.fov = 50
		this.lookAt(0, 0, 0)
		
		this.updateProjectionMatrix()
	}
}
export default Camera