import * as THREE from 'three'

import scene from './easy/Scene'
import renderer from './easy/Renderer'
import Block from './block/Block'

import './structure/Structure'

const autoRender = () => { 
	renderer.renderAuto()
	requestAnimationFrame(autoRender); 
}
const main = () => {
	const ligit = new THREE.DirectionalLight(0xffffff)
	ligit.position.set(0, 0, 1000)
	scene.add(ligit)
	let block:Block = new Block(new THREE.Vector3(0,0,0))
	block.render(scene)
	
	autoRender()
}

main()