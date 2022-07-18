import { Vector3 } from "three";
import * as THREE from 'three'
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

import { Camera } from "../core";
import event from "../event";
import { container } from "..";
export default class Player {
    private camera:Camera
    private movement:Vector3 = new Vector3(0, 0, 0)
    private velocity:number
    private pointerLockControls:PointerLockControls
    private readonly moveKey:Map<string, any> = new Map(
        [
            ['w', {dir: 'x', reverse: false}],
            ['a', {dir: 'z', reverse: true}],
            ['s', {dir: 'x', reverse: true}],
            ['d', {dir: 'z', reverse: false}],
            ['Shift', {dir: 'y', reverse: true}],
            [' ', {dir: 'y', reverse: false}],
        ]
    )
    constructor(
        camera:Camera, 
        speed:number
    ) {
        this.camera = camera
        this.velocity = speed

        this.pointerLockControls = new PointerLockControls(camera, container)
        const modal = document.getElementById('modal')
        modal?.addEventListener('click', () => {
            this.pointerLockControls.lock()
        })
        this.pointerLockControls.addEventListener( 'lock', function () {
            modal!.style.display = 'none'
        });
        this.pointerLockControls.addEventListener( 'unlock', function () {
            modal!.style.display = ''
        });
        event("keydown", this.keydown, this)
        event("keyup", this.keyup, this)
    }
    update() {
        this.pointerLockControls.moveForward(this.movement.x)
        this.pointerLockControls.moveRight(this.movement.z)
        this.camera.position.y += this.movement.y
    }
    startMove(dir:string, reverse: boolean) {
        
        if(dir == 'x') this.movement.x = reverse ? -this.velocity : this.velocity
        else if(dir == 'y') this.movement.y = reverse ? -this.velocity : this.velocity
        else if(dir == 'z') this.movement.z = reverse ? -this.velocity : this.velocity
    }
    stopMove(dir:string) {
        if(dir == 'x') this.movement.x = 0
        else if(dir == 'y') this.movement.y = 0
        else if(dir == 'z') this.movement.z = 0
    }
    keydown(e:any, that:any) {
        const move = that.moveKey.get(e.key)
        if(move != null) {
            that.startMove(move.dir, move.reverse)
        }
    }
    keyup(e:any, that:any) {
        const moveKey = that.moveKey.get(e.key)
        if(moveKey != null) {
            that.stopMove(moveKey.dir)
        }
    }
}
