import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Grab canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Load GLB model monobloc chair
const loader = new GLTFLoader();
loader.load(
    "./monobloc_-_plastic_garden_chair.glb",
    (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);

        // Make all materials transparent for fade-in effect
        model.traverse((child) => {
            if (child.isMesh) {
                child.material.transparent = true;
                child.material.opacity = 0; //  invisible
            }
        });

        scene.add(model);

        let opacity = 0;

        function animate() {
            requestAnimationFrame(animate);

            // Fade in effect
            if (opacity < 1) {
                opacity += 0.01; // speed of fade
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material.opacity = Math.min(opacity, 1);
                    }
                });
            }

            // Rotate slowly
            model.rotation.y += 0.01;

            renderer.render(scene, camera);
        }
        animate();
    },
    (xhr) => {
        console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
    },
    (error) => {
        console.error("An error happened while loading the model:", error);
    }
);

// Handle resize
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
