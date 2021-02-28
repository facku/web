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

                return resolve(gltf.scene);

            },
            progress => {
                const elapsedTime = 100 * (progress.loaded / progress.total)
                console.log(elapsedTime);
            });
    })

}