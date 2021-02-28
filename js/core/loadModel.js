/**
 * Imports
 */
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
/**
 * Load Soulless Models
 * 
 */
export const LoadModel = () => {
    const loader = new GLTFLoader();

    return new Promise(resolve => {
        loader.load('../models/soulless/scene.gltf',
            gltf => {
                gltf.scene.scale.multiplyScalar(1 / 100)
                gltf.scene.position.set(0, -2.2, 0);
                gltf.scene.name = "Soulless";

                resolve(gltf.scene);

            },
            progress => {
                const loaderStatus = document.getElementById('loader_status');
                const _p = `${(progress.loaded / progress.total) * 100}%`;
                console.log(_p);
                loaderStatus.style.width = _p;
            });
    })

}