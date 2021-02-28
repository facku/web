import TWEEN from '../node_modules/@tweenjs/tween.js/dist/tween.esm.js'

import { Audio, AudioLoader, AudioListener, AudioAnalyser } from '../node_modules/three/build/three.module.js';

import { SetScene } from './core/setScene.js';
import { SetRenderer } from './core/setRender.js';
import { SetCamera } from './core/setCamera.js';
import { LoadModel } from './core/loadModel.js';

class Main {
    static sound;
    static analyser;

    constructor() {
        const { scene } = SetScene();

        const { renderer } = SetRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);

        const { camera } = SetCamera({ renderer });
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.init();
    }

    init = async () => {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.render(this.scene, this.camera);
        })


        /**
         * Load Soulless
         */
        await LoadModel().then(soulless => this.scene.add(soulless))

        /**
         * Music
         */

        const audioLoader = new AudioLoader();
        audioLoader.load('../../sounds/[ONTIVA.COM]-DIE ANTWOORD - I FINK U FREEKY (Instrumental)-HQ.ogg', function (buffer) {
            const listener = new AudioListener();
            Main.sound = new Audio(listener);
            Main.sound.setBuffer(buffer);
            Main.sound.setLoop(true);
            Main.sound.setVolume(0.1);
            Main.sound.play();
        });

        /**
         * Add Tween
         */
        const soulless = this.scene.getObjectByName('Soulless');

        soulless.position.z = -200;

        const tweenPosition = new TWEEN.Tween(soulless.position).to({ z: 0 }, 7000).delay(2000);
        tweenPosition.easing(TWEEN.Easing.Elastic.In);

        const lookRight = new TWEEN.Tween(soulless.rotation).to({ y: this.rn() }, 500).delay(3000);
        lookRight.easing(TWEEN.Easing.Exponential.InOut);
        lookRight.onComplete(() => {
            lookRight.to({ y: this.rn() }, 500);
        })

        const lookLeft = new TWEEN.Tween(soulless.rotation).to({ y: -this.rn() }, 1000);
        lookLeft.easing(TWEEN.Easing.Exponential.InOut);
        lookLeft.onComplete(() => {
            lookLeft.to({ y: -this.rn() }, 1000);
        })

        const lookCenter = new TWEEN.Tween(soulless.rotation).to({ y: 0 }, 500);
        lookCenter.easing(TWEEN.Easing.Exponential.InOut);

        tweenPosition.chain(lookRight);

        lookRight.chain(lookLeft);
        lookLeft.chain(lookCenter);
        lookCenter.chain(lookRight);

        tweenPosition.start();


        setTimeout(() => {
            document.querySelector('.loading').remove();
            this.animation();
        }, 100);
    }

    animation = () => {
        requestAnimationFrame(this.animation)

        TWEEN.update();

        this.renderer.render(this.scene, this.camera);
    }

    rn() {
        const random = Math.floor(Math.random() * (11 - 8)) + 8;
        return Math.PI / random;
    }
}

const app = new Main();
