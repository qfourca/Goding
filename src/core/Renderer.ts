import * as THREE from 'three'

export default class Renderer extends THREE.WebGLRenderer{
	constructor (width: number, height: number, domElement: HTMLElement) {
		super({
			antialias: true
		})
		this.setSize(width, height)
		domElement.appendChild(this.domElement);
	}
}
//export default new Renderer(window.innerWidth, window.innerHeight, document.getElementById('three-js container')!)