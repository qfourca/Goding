import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'

const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const raycaster = new Core.Raycaster()
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, document.getElementById('three-js container')!)
const scene = new Core.Scene()

const ligit = new THREE.DirectionalLight(0xffffff)
ligit.position.set(0, 0, 1000)
scene.add(ligit)

axios.get('/home.json')
.then((response) => {
	console.log(response.data.value)
    const world:World = new World(response.data.value)
    world.render(scene)
})
.catch(error => {
    console.log(error)
})


;(function main() {
	requestAnimationFrame(main)
	renderer.render(scene, camera)
})()