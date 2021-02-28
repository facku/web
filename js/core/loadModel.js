/**
 * Imports
 */
import { GLTFLoader } from "../../node_modules/three/examples/jsm/loaders/GLTFLoader.js";
/**
 * Load Soulless Models
 * 
 */
export const LoadModel = async () => {
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync('../models/soulless/scene.gltf');

    gltf.scene.scale.multiplyScalar(1 / 100)
    gltf.scene.position.set(0, -2.2, 0);
    gltf.scene.name = "Soulless";

    return gltf.scene;
}