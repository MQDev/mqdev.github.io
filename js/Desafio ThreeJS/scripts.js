import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { OBJLoader2 } from 'https://threejs.org/examples/jsm/loaders/OBJLoader2.js';
import { MTLLoader } from 'https://threejs.org/examples/jsm/loaders/MTLLoader.js';

function main() {

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.autoClear = false; // important!
  
    const fov = 75;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;
  
    const camera2 = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera2.position.z = 200;
  
    var controls = new OrbitControls(camera2, renderer.domElement);
  
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
  
    var controls2 = new OrbitControls(camera, renderer.domElement);
  
    controls2.enableDamping = true;
    controls2.dampingFactor = 0.25;
    controls2.enableZoom = false;    
  
    const scene2 = new THREE.Scene();

    var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    scene2.add(keyLight);
    scene2.add(fillLight);
    scene2.add(backLight);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');
    const pickingScene = new THREE.Scene();
    pickingScene.background = new THREE.Color(0);

    // put the camera on a pole (parent it to an object)
    // so we can spin the pole to move the camera around the scene
    const cameraPole = new THREE.Object3D();
    scene.add(cameraPole);
    cameraPole.add(camera);

    {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        camera.add(light);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function rand(min, max) {
        if (max === undefined) {
        max = min;
        min = 0;
        }
        return min + (max - min) * Math.random();
    }

    function randomColor() {
        return `hsl(${rand(360) | 0}, ${rand(50, 100) | 0}%, 50%)`;
    }

    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/frame.png');

    const arrayElements = new Array();
    const numObjects = 10;
    const idToObject = {};

    function preencheArrayElementosTeste(arrayElements,numObjects){
        class elemento {
            constructor() {
                this.posx=rand(-20, 20);
                this.posy=rand(-20, 20);
                this.posz=rand(-20, 20);
                this.rotx=rand(Math.PI);
                this.roty=rand(Math.PI);
                this.rotz=0;
                this.escx=rand(3, 6);
                this.escy=rand(3, 6);
                this.escz=rand(3, 6);
            }
        }
        for (let i = 0; i < numObjects; i++) {
            arrayElements[i] = new elemento();
        }
    }

    preencheArrayElementosTeste(arrayElements,numObjects);
    posicionaElementosXML(numObjects,arrayElements,idToObject);

    function posicionaElementosXML(numObjects, arrayElements, idToObject){
        
        for (let i = 0; i < numObjects; ++i) {
            const id = i + 1;
            const material = new THREE.MeshPhongMaterial({
                color: randomColor(),
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                alphaTest: 0.5,
            });

            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            idToObject[id] = cube;

            cube.position.set(arrayElements[i].posx,arrayElements[i].posy,arrayElements[i].posz);
            cube.rotation.set(arrayElements[i].rotx,arrayElements[i].roty,arrayElements[i].rotz);
            cube.scale.set(arrayElements[i].escx,arrayElements[i].escy,arrayElements[i].escz);

            const pickingMaterial = new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(id),
                color: new THREE.Color(0, 0, 0),
                specular: new THREE.Color(0, 0, 0),
                map: texture,
                transparent: true,
                side: THREE.DoubleSide,
                alphaTest: 0.5,
                blending: THREE.NoBlending,
            });

            const pickingCube = new THREE.Mesh(geometry, pickingMaterial);
            pickingScene.add(pickingCube);
            pickingCube.position.copy(cube.position);
            pickingCube.rotation.copy(cube.rotation);
            pickingCube.scale.copy(cube.scale);
        }
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }
    
    class GPUPickHelper {
        constructor() {
          // create a 1x1 pixel render target
          this.pickingTexture = new THREE.WebGLRenderTarget(1, 1);
          this.pixelBuffer = new Uint8Array(4);
          this.pickedObject = null;
          this.pickedObjectSavedColor = 0;
        }
        pick(cssPosition, scene, camera, time) {
          const {pickingTexture, pixelBuffer} = this;
    
          // restore the color if there is a picked object
          if (this.pickedObject) {
            this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
            this.pickedObject = undefined;
          }
    
          // set the view offset to represent just a single pixel under the mouse
          const pixelRatio = renderer.getPixelRatio();
          camera.setViewOffset(
              renderer.getContext().drawingBufferWidth,   // full width
              renderer.getContext().drawingBufferHeight,  // full top
              cssPosition.x * pixelRatio | 0,             // rect x
              cssPosition.y * pixelRatio | 0,             // rect y
              1,                                          // rect width
              1,                                          // rect height
          );
          // render the scene
          renderer.setRenderTarget(pickingTexture);
          renderer.render(scene, camera);
          renderer.setRenderTarget(null);
          // clear the view offset so rendering returns to normal
          camera.clearViewOffset();
          //read the pixel
          renderer.readRenderTargetPixels(
              pickingTexture,
              0,   // x
              0,   // y
              1,   // width
              1,   // height
              pixelBuffer);
    
          const id =
              (pixelBuffer[0] << 16) |
              (pixelBuffer[1] <<  8) |
              (pixelBuffer[2]      );
    
          const intersectedObject = idToObject[id];
          if (intersectedObject) {
            // pick the first object. It's the closest one
            this.pickedObject = intersectedObject;
            // save its color
            this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
            // set its emissive color to flashing red/yellow
            this.pickedObject.material.emissive.setHex((time * 8) % 2 > 1 ? 0xFFFF00 : 0xFF0000);
          }
        }
    }
    
    const pickPosition = {x: 0, y: 0};
    const pickHelper = new GPUPickHelper();
    clearPickPosition();

    var mtlLoader = new MTLLoader();  
    mtlLoader.load('assets/r2-d2.mtl', function (materials) {
        materials.preload();
        var objLoader = new OBJLoader2();
        objLoader.load('assets/r2-d2.obj', function (object) {
            scene2.add(object);
            object.position.y -= 60;
        });
    });

    function render(time) {
        time *= 0.001;  // convert to seconds;
    
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        pickHelper.pick(pickPosition, pickingScene, camera, time);
    
        renderer.render(scene, camera);
        renderer.render(scene2, camera2);
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function getCanvasRelativePosition(event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * canvas.width  / rect.width,
            y: (event.clientY - rect.top ) * canvas.height / rect.height,
        };
    }
    
    function setPickPosition(event) {
        const pos = getCanvasRelativePosition(event);
        pickPosition.x = pos.x;
        pickPosition.y = pos.y;
    }
    
    function clearPickPosition() {
        // unlike the mouse which always has a position
        // if the user stops touching the screen we want
        // to stop picking. For now we just pick a value
        // unlikely to pick something
        pickPosition.x = -100000;
        pickPosition.y = -100000;
    }

    function displayInfo(){
        alert("Info displayed");
    }
    
    window.addEventListener('mousemove', setPickPosition);
    window.addEventListener('mouseout', clearPickPosition);
    window.addEventListener('mouseleave', clearPickPosition);
    // window.addEventListener("click", (event) => {
    //     // prevent the window from scrolling
    //     event.preventDefault();
    //     setPickPosition(event.touches[0]);
    // }, {passive: false});
    
    // window.addEventListener('touchmove', (event) => {
    //     setPickPosition(event.touches[0]);
    // });
    
    // window.addEventListener('touchend', clearPickPosition);

    window.addEventListener('touchstart', (event) => {
        // prevent the window from scrolling
        event.preventDefault();
        setPickPosition(event.touches[0]);
    }, {passive: false});
    
    window.addEventListener('touchmove', (event) => {
        setPickPosition(event.touches[0]);
    });
    
    window.addEventListener('touchend', clearPickPosition);
}    

main();