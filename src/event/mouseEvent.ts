import { Vector3 } from "three";

var mouseDown = false,
        mouseX = 0,
        mouseY = 0;

function onMouseMove(evt:any, mesh:any) {
    if (!mouseDown) {
        return;
    }

    evt.preventDefault();

    var deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY, mesh);
}

function onMouseDown(evt:any) {
    evt.preventDefault();

    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
}

function onMouseUp(evt:any) {
    evt.preventDefault();
    mouseDown = false;
}

export default (element:HTMLElement, mesh:any) => {
    element.addEventListener('mousemove', function (e) {
        onMouseMove(e, mesh);
    }, false);
    element.addEventListener('mousedown', function (e) {
        onMouseDown(e);
    }, false);
    element.addEventListener('mouseup', function (e) {
        onMouseUp(e);
    }, false);
}

function rotateScene(deltaX:number, deltaY:number, root:any) {
    if(root.rotation == undefined) {
        root.mesh.rotation.y += deltaX / 100;
        root.mesh.rotation.x += deltaY / 100;
    }
    else {
        root.rotation.y += deltaX / 100;
        root.rotation.x += deltaY / 100;
    }
    
}