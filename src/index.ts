import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

import { Vector3 } from 'three'

export const container = document.getElementById('three-js container')!
const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const raycaster = new Core.Raycaster()
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
const scene = new Core.Scene()
const player:Player = new Player(camera, 0.15)


const ligit = new THREE.DirectionalLight(0xffffff)
ligit.position.set(0, 1000, 0)
scene.add(ligit)


import BedRock from './block/BedRock'
import Player from './player'

const bedrock = new BedRock()
bedrock.render(scene)

axios.get('/test.json')
.then((response) => {
    const world:World = new World(response.data, 16)
    world.render(scene)
})
.catch(error => {
    console.log(error)
})

;(function main() {

	requestAnimationFrame(main)
	player.update()
	renderer.render(scene, camera)
})()
