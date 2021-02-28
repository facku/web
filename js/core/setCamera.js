/**
 * Imports
 */
import { PerspectiveCamera } from '../../node_modules/three/build/three.module.js'
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js'
/**
 * Set Camera
 */
export const SetCamera = ({ renderer }) => {
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.set(0, 0, 7)
    camera.lookAt(0, 0, 0)

    /**
     * Set OrbitControls (dev)
     */
    const controls = new OrbitControls(camera, renderer.domElement);

    return { camera, controls }
}