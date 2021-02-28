/**
 * Imports
 */
import { WebGLRenderer } from '../../node_modules/three/build/three.module.js'
/**
 * Set Camera
 */
export const SetRenderer = () => {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    return { renderer }
}