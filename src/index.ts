import * as THREE from 'three'
import * as Core from './core'
import axios from 'axios'
import World from './world'
import Player from './player'

export const container = document.getElementById('three-js container')!

const camera = new Core.Camera(75, window.innerWidth / window.innerHeight)
const renderer = new Core.Renderer(window.innerWidth, window.innerHeight, container)
const scene = new Core.Scene()
const raycaster = new Core.Raycaster(camera, scene)
const player:Player = new Player(camera, 0.15)


const ligit = new THREE.AmbientLight(0xeeeeee)
ligit.position.set(0, 1000, 0)
scene.add(ligit)


import BedRock from './block/BedRock'

const bedrock = new BedRock()
bedrock.render(scene)
axios.get('/dormitory.json')
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