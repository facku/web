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
        this.scene.add(await LoadModel());

        /**
         * Music
         */

        const audioLoader = new AudioLoader();
        audioLoader.load('../../sounds/[ONTIVA.COM]-DIE ANTWOORD - I FINK U FREEKY (Instrumental)-HQ.ogg', function (buffer) {
            const listener = new AudioListener();
            Main.sound = new Audio(listener);
            Main.sound.setBuffer(buffer);
            Main.sound.setLoop(true);
            Main.sound.setVolume(0.75);
            Main.sound.play();
        });

        /**
         * Add Tween
         */
        const soulless = this.scene.getObjectByName('Soulless');

        soulless.position.y = -10;

        const tweenPosition = new TWEEN.Tween(soulless.position).to({ y: -2.2 }, 2000);
        tweenPosition.easing(TWEEN.Easing.Elastic.InOut);

        const tween = new TWEEN.Tween(soulless.rotation).to({ y: Math.PI / 11 }, 1500).delay(3000).yoyo(true);
        tween.easing(TWEEN.Easing.Elastic.Out);


        tweenPosition.chain(tween);
        tweenPosition.start();

        setTimeout(() => document.querySelector('.loading').remove(), 1000);
        this.animation();
    }

    animation = () => {
        requestAnimationFrame(this.animation)

        TWEEN.update();

        this.renderer.render(this.scene, this.camera);
    }
}

const app = new Main();
