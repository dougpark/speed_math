/**************************************************************************************
* Boot State
* @author Doug Park
* @version v1.0
* @desc Bootstrap new game
* @date 2018-09-06
**************************************************************************************/
"use strict";

// fit all types of mobile phones and limit size on desktop
var getWidth = function () {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    //width = width * window.devicePixelRatio;
    if (width > 414) { width = 414 }
    return width;
}

var getHeight = function () {
    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    //height = height * window.devicePixelRatio;
    if (height > 896) { height = 896 }
    return height;
}

var game;

var GameOptions = {

    oriented: false

};

window.onload = function () {
    var gameConfig = {
        type: Phaser.AUTO,
        width: getWidth(),
        height: getHeight(),
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
        // Logo State
        this.load.image('logo', 'assets/images/povinlogo.png');

        // Povin all States
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

        // For all States
        this.load.image('background', 'assets/images/background.png');
        this.load.spritesheet('title', 'assets/images/PovinMath.png', {
            frameWidth: 400,
            frameHeight: 141
        });

        // Math Game State - Images
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

        // Math Game State - Audio
        this.load.audio('perfectSfx', 'assets/audio/SUCCESS_PICKUP_Collect_Chime_01.wav');
        this.load.audio('wrongSfx', 'assets/audio/TECH CHARGER Power Down 05.wav');
        this.load.audio('lateSfx', 'assets/audio/ELECTRIC Power Down 02.wav'); 

        // game.load.image('loading', 'assets/images/loading.png');
    },

    create: function () {
        //this.addGameStates();
        this.nextState();
    },

    addGameStates: function () {
        // these states are required before the primary state loader in Preloader
        game.state.add('CheckOrientation', BasicGame.CheckOrientation);
        game.state.add('Logo', BasicGame.Logo);
        game.state.add('MainMenu', BasicGame.MainMenu);
        game.state.add('Scores', BasicGame.Scores);
        game.state.add('Math', BasicGame.Math);
    },

    nextState: function() {
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

