import { Vector3 } from "three";
import Block from "../block/Block";
import TextureLoader from "../structure/TextureLoader";
import scene from '../easy/Scene'
import mouseEvent from '../event/mouseEvent'

const textureLoader:TextureLoader = new TextureLoader()
textureLoader.blockToMaterial('block/yellow_terracotta').then(result => {
    const block:Block = new Block(new Vector3(0, 0, 0), result)

    // mouseEvent(document.getElementById("three-js container")!, block)
    block.render(scene)
})

