import axios from 'axios'
import Structure from '../structure/Structure'
import StructureRender from '../structure/StructureRender'
import scene from '../easy/Scene'
axios.get('/home.json')
.then((response) => {
    // console.log(response.data.value)
    const structure:Structure = new Structure(response.data.value)
    const structureRender:StructureRender = new StructureRender(structure)
    structureRender.render(scene)
})
.catch(error => {
    console.log(error)
})