import * as THREE from "../../../build/three.module.js";
import { OrbitControls } from "./OrbitControls.js";

var container, scene, camera, renderer, controls;
const fontLoader = new THREE.FontLoader();

// custom global variables
var cube;

init();
animate();

// FUNCTIONS 		
function init() {

    // SCENE
    scene = new THREE.Scene();


    // CAMERA
    var SCREEN_WIDTH = window.innerWidth,
        SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45,
        ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT,
        NEAR = 0.1,
        FAR = 20000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0, 150, 400);
    camera.lookAt(scene.position);


    // RENDERER
    if (Detector.webgl)
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
    else
        renderer = new THREE.CanvasRenderer();

    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    container = document.getElementById('ThreeJS');
    container.appendChild(renderer.domElement);


    // CONTROLS
    controls = new OrbitControls(camera, renderer.domElement);


    // LIGHT
    var light = new THREE.PointLight(0xffffff);
    light.position.set(0, 250, 0);
    scene.add(light);


    // FLOOR
    var floorTexture = new THREE.TextureLoader().load('img/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({
        map: floorTexture,
        side: THREE.DoubleSide
    });
    var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    floor.name = "Checkerboard Floor";
    scene.add(floor);


    // SKYBOX/FOG
    var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
    var skyBoxMaterial = new THREE.MeshBasicMaterial({
        color: 0x9999ff,
        side: THREE.BackSide
    });
    var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    scene.add(skyBox);

    ////////////
    // CUSTOM //
    ////////////

    var cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    var cubeMaterial = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, 50.1, 0);
    cube.name = "Cube";
    scene.add(cube);

    generateText(" Hello, ", {
        fontsize: 24,
        opacity: 0.5,
        x: -85,
        y: 105,
        z: 55,
        color: 0xff0000
    });

    generateText(" World! ", {
        fontsize: 32,
        x: 55,
        y: 105,
        z: 55,
        color: 0x0000ff
    });

}

window.addEventListener('resize', onWindowResize);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function generateText(message, parameters) {

    let text;

    fontLoader.load('font/gentilis_regular.typeface.json', function(font) {

        const opacity = parameters.hasOwnProperty("opacity") ?
            parameters["opacity"] : 1;

        if (parameters === undefined) parameters = {};

        const color = parameters.hasOwnProperty("color") ?
            parameters["color"] : 0x006699;

        const matLite = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: opacity
        });

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 2;

        const shapes = font.generateShapes(message, fontsize);

        const geometry = new THREE.ShapeGeometry(shapes);

        geometry.computeBoundingBox();

        const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

        geometry.translate(xMid, 0, 0);

        text = new THREE.Mesh(geometry, matLite);

        scene.add(text);

        var x = parameters.hasOwnProperty("x") ?
            parameters["x"] : text.position.x;

        var y = parameters.hasOwnProperty("y") ?
            parameters["y"] : text.position.y;

        var z = parameters.hasOwnProperty("z") ?
            parameters["z"] : text.position.z;

        var rotx = parameters.hasOwnProperty("rotx") ?
            parameters["rotx"] : text.rotation.x;

        var roty = parameters.hasOwnProperty("roty") ?
            parameters["roty"] : text.rotation.y;

        var rotz = parameters.hasOwnProperty("rotz") ?
            parameters["rotz"] : text.rotation.z;

        var name = parameters.hasOwnProperty("name") ?
            parameters["name"] : 'createdText';

        var countZ = parameters.hasOwnProperty("countZ") ?
            parameters["countZ"] : '---';

        text.position.set(x, y, z)
        text.rotation.set(rotx, roty, rotz)
        text.name = name;
        text.countZ = countZ;
    });
}

function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

function update() {
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}