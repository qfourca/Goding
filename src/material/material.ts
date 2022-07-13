
import { Material, MeshStandardMaterial } from 'three';


export default new Map(
    [
        ["dirt", new MeshStandardMaterial({ color: 0x893737 })],
        ["grass_block", new MeshStandardMaterial({ color: 0x21C177 })],
        ["red_terracotta", new MeshStandardMaterial({ color: 0xB71823 })],
        ["acacia_wood", new MeshStandardMaterial({ color: 0xC4701C, roughness: 1})],
        ["acacia_leaves", new MeshStandardMaterial({ color: 0x0FC139, roughness: 1})],
        ["wall_torch", new MeshStandardMaterial({ color: 0xD81933, roughness: 1})],
        ["acacia_log", new MeshStandardMaterial({ color: 0x540610, roughness: 1})],
        ["acacia_stairs", new MeshStandardMaterial({ color: 0x4B030C, roughness: 1})],
        ["acacia_planks", new MeshStandardMaterial({ color: 0x4B030C, roughness: 1})],
    ]
);