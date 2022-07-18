import * as e from "express"
let functions = new Array()
export default (eventType:string, execute:Function, that?:any) => {
    functions.push({eventType, execute, that})
}
window.addEventListener('keydown', event => {
    functions
    .filter(({eventType}) => eventType == 'keydown')
    .forEach(({execute, that}) => {
        execute(event, that)
    })
})

window.addEventListener('keyup', event => {
    functions
    .filter(({eventType}) => eventType == 'keyup')
    .forEach(({execute, that}) => {
        execute(event, that)
    })
})

