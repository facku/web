/**
 * Imports
 */
import {
    Scene, Color, AmbientLight, GridHelper, AxesHelper, DirectionalLight, PointLight, FogExp2
} from '../../node_modules/three/build/three.module.js'
/**
 * Set Camera
 */
export const SetScene = () => {
    const scene = new Scene();
    scene.background = new Color('#0c0c0c');

    /**
    * Set Helpers (dev)
    */
    const helpers = [
        new GridHelper(100, 100),
        new AxesHelper(3)
    ];
    // scene.add(...helpers);

    /**
     * Add Lights
     */
    const ambient = new AmbientLight('white', 5);

    const directionalLight = new DirectionalLight('white', 2);

    const point = new PointLight('violet', 10);
    point.position.set(-0.6, -1.1, 2.5);

    scene.add(ambient, directionalLight, point);

    scene.fog = new FogExp2('#0c0c0c', 0.1);

    return { scene };
}