/**************************************************************************************
* Boot Scene
* @author Doug Park
* @version v1.0
* @desc Bootstrap new game
* @date 2018-09-06
**************************************************************************************/
"use strict";
/*
    iphone device resolutions                                     
                                                    device
                                         landscape  pixel
    device          points      ratio    ratio      ratio   pixels      ppi

    Xs Max          414x896     0.4621   2.1643     x3 =    1242x2688   458
    Xr              414x896     0.4621   2.1643     x2 =    828x1792    326
    X,Xs            375x812     0.4618   2.1653     x3 =    1125x2436   458
    8+              414x736     0.5625   1.7778     x3 =    1242x2208   401
    8               375x667     0.5622   1.7787     x2 =    750x1334    326
    5,SE            320x568     0.5634   1.775      x2 =    640x1136    326

    ipad mini       768x1024    0.75     1.3333     x2 =    1536x2048   326 
    ipad                        0.75                        1536x2048
    ipad pro 10.5               0.75                        1668x2224   264
    ipad pro 12.9               0.75                        2048x2732   264

    source: https: //www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions

*/

var height= window.innerHeight * window.devicePixelRatio; // set game height by multiplying window height with devicePixelRatio
var width = window.innerWidth * window.devicePixelRatio; // set game width by multiplying window width with devicePixelRatio
var zoom = 1 / window.devicePixelRatio; // set zoom

// try to work with desktops and landscape phones
if (width / height > .7) { // compromize solution
    width = height * .5625; // default to 9/16 portrait aspect ratio
    zoom = width/height;
}
var deviceScale = 1/zoom;

//console.log('width='+width+' height='+height+' zoom='+zoom);

var game;

var GameOptions = {

    oriented: false

};

window.onload = function () {
    var gameConfig = {
        type: Phaser.AUTO,
        width: width, 
        height: height, 
        zoom: zoom,
        backgroundColor: 0x000000,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 200
                }
            }
        },
        scene: [Boot, CheckOrientation, Logo, MainMenu, PMath, Scores]
    };
    game = new Phaser.Game(gameConfig);
    
    
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}

//var game = new Phaser.Game(getWidth(), getHeight(), Phaser.AUTO, 'game');
var Boot = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function boot() {
                Phaser.Scene.call(this, {
                    key: "Boot"
                });
            },

    init: function () {
        this.cameras.main.setRoundPixels(true);

        // initialize the Povin object
        Povin.game = game;

        //this.physics.startSystem(Phaser.Physics.ARCADE);
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

        GameOptions.orientated = true;
        //this.scale.setMinMax(400, 300, 1200, 900);
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;

        // Orientation
        if (this.game.device.desktop) {
            //this.scale.maxWidth = this.game.width;
            //this.scale.maxHeight = this.game.height;
            //this.scale.setScreenSize(true);
        }
        else {
            //this.scale.maxWidth = this.game.width * 2.5;
            //this.scale.maxHeight = this.game.height * 2.5;

            //game.scale.forceOrientation(false, true);
            //game.scale.forceOrientation(forceLandscape, forcePortrait);
            //this.scale.hasResized.add(this.gameResized, this);
            //game.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //game.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            //this.scale.setScreenSize(true);
        }

    },

    preload: function () {
        // Logo Scene
        this.load.image('logo', 'assets/images/povinlogo.png');

        // Povin all Scenes
        this.load.spritesheet('buttonHome', 'assets/buttons/button_home.png', 
            {frameWidth: 53,
             frameHeight: 53
            });
        this.load.spritesheet('buttonSpeaker', 'assets/buttons/button_speaker3.png', {
            frameWidth: 38,
            frameHeight: 40
        });
        
        this.load.spritesheet('buttonPlus', 'assets/buttons/plus.png', {
            frameWidth: 46,
            frameHeight: 46
        });
        this.load.spritesheet('buttonMinus', 'assets/buttons/minus.png', {
            frameWidth: 46,
            frameHeight: 46
        });

        // For all Scenes
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('title', 'assets/images/PovinMath.png', {
            frameWidth: 400,
            frameHeight: 141
        });

        // Math Game Scene - Images
        this.load.spritesheet('invader', 'assets/images/invader32x32x4.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('buttonAnswer', 'assets/buttons/crosshair135a.png', {
            frameWidth: 48,
            frameHeight: 49
        });
        this.load.spritesheet('buttonGo', 'assets/buttons/button_go2.png', {
            frameWidth: 200,
            frameHeight: 52
        });

        // Math Game Scene - Audio
        this.load.audio('perfectSfx', 'assets/audio/SUCCESS_PICKUP_Collect_Chime_01.wav');
        this.load.audio('wrongSfx', 'assets/audio/TECH CHARGER Power Down 05.wav');
        this.load.audio('lateSfx', 'assets/audio/ELECTRIC Power Down 02.wav'); 

        // game.load.image('loading', 'assets/images/loading.png');
    },

    create: function () {
        
        this.nextScene();
    },

    nextScene: function() {
        this.scene.start("CheckOrientation");
    },

    gameResized: function (width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device.

    },

    enterIncorrectOrientation: function () {

        BasicGame.orientated = false;
        game.paused = true;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        BasicGame.orientated = true;

        document.getElementById('orientation').style.display = 'none';
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.paused = false;
        //console.log('scaleFactor= ' + Phaser.ScaleManager.scaleFactor);
        //console.log('bounds= ' + Phaser.ScaleManager.bounds);
        //this.scale.setScreenSize(true);

    }

});


function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}

