import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

import { Vector3 } from 'three'

const container = document.getElementById('three-js container')!
const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const raycaster = new Core.Raycaster()
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
const scene = new Core.Scene()


const ligit = new THREE.DirectionalLight(0xffffff)
ligit.position.set(0, 1000, 0)
scene.add(ligit)


const pointerControl = new PointerLockControls(camera, container)
const modal = document.getElementById('modal')
modal?.addEventListener('click', () => {
    pointerControl.lock()
})
pointerControl.addEventListener( 'lock', function () {
    modal!.style.display = 'none'
});

pointerControl.addEventListener( 'unlock', function () {
});

import BedRock from './block/BedRock'

const bedrock = new BedRock()
bedrock.render(scene)

axios.get('/home.json')
.then((response) => {
	console.log(response.data.value)
    const world:World = new World(response.data.value, 16)
    world.render(scene)
})
.catch(error => {
    console.log(error)
})

;(function main() {
	requestAnimationFrame(main)

	renderer.render(scene, camera)
})()