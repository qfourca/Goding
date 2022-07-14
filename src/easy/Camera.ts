import * as THREE from 'three'

class Camera extends THREE.PerspectiveCamera{
	constructor (FOV: number, size: number) {
		super(FOV, size)
		this.position.z = 10
	}
}

export default new Camera(75, window.innerWidth / window.innerHeight)