import * as THREE from 'three'
import camera from './Camera'
import scene from './Scene'

class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, domElement: HTMLElement) {
		super({
			antialias: true
		})
		this.setSize(width, height)
		domElement.appendChild(this.domElement);
	}

	
	renderAuto() {
		this.render(scene, camera)
	}
}
export default new Renderer(window.innerWidth, window.innerHeight, document.getElementById('three-js container')!)