/**************************************************************************************
* Povin Class
* @author Doug Park, Povingames.com
* @email doug@povingames.com
* @version v1.0
* @desc Helper Class
* @date 2018-09-06
**************************************************************************************/
"use strict";

// Global Object 
var Povin = {

    // Povin Properties 
    game: null, // must initialize in game init method: Povin.game = game; 
    gameLevel: 1,
    SFXStatus: true,
    scoreArr: {},  // storge obj for all levels and keys
    historyArr: {}, // store history of all level and all games
    next: 0,

    // Povin Methods 
    highScore: function () {
        hsGameMode = 0;
        hsGameLevel = 0;
        hsScore = 0;
        hsName = '';

    },

    // Action when click on the home button
    actionOnClickHome: function (config) {
        config.ctx.scene.start(config.target.nextState);
    },

    onInputDownHome: function (config) {
        config.ctx.add.tween(config.target.scale).to({
            x: 0.6,
            y: 0.6
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpHome: function (config) {
        config.ctx.add.tween(config.target.scale).to({
            x: .8,
            y: .8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    log: function () {
        console.log("Povin object created");
    },

    debug: function () {

        game.debug.inputInfo(32, 32);
    },

    debugSprite: function (sprite, y) {

        game.debug.sprite(sprite, 32, y, "#00ff00");
    },

    debugFps: function (y) {

        game.debug.text('FPS ' + game.time.fps || '--', 32, y, "#00ff00");

    },

    debugText: function (text, y) {

        game.debug.text(text || '--', 32, y, "#00ff00");

    },

    musicToggle: function () {
        if (Povin.bgMusic.isPlaying == true) {
            Povin.bgMusic.pause();
            Povin.musicEnabled = 0;
            localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);
        }
        else {
            Povin.bgMusic.stop();
            Povin.bgMusic.play();
            Povin.musicEnabled = 1;
            localStorage.setItem("PlutoAttacksMusicEnabled", Povin.musicEnabled);
        };
    },

    musicStop: function () {
        Povin.bgMusic.stop();
        Povin.musicEnabled = 0;

    },

    musicStatus: function () {

        return Povin.bgMusic.isPlaying;

    },

   
    // Action when click on the speaker button
    actionOnClickMusic: function (target) {
        Povin.musicToggle();
        Povin.setMusicTexture(target);

    },

    setMusicTexture(target) {
        if (Povin.musicStatus() == true) {
            target.setFrame(0);

        } else {
            target.setFrame(1);
        }

    },

    onInputDownSpeaker: function (config) {

        config.ctx.add.tween(config.target.scale).to({
            x: 0.6,
            y: 0.6
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUpSpeaker: function (config) {
        config.ctx.add.tween(config.target.scale).to({
            x: 1,
            y: 1
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // Action when click on the speaker button
    actionOnClickSpeaker: function (config) {
        Povin.SFXToggle();
        Povin.setSpeakerFrame(config.target);

    },

    SFXToggle: function () {
        if (this.SFXStatus == true) {
            this.SFXStatus = false;
        } else {
            this.SFXStatus = true;
        }
    },

    setSpeakerFrame(target) {
        if (Povin.SFXStatus == true) {
            target.setFrame(0);
        } else {
            target.setFrame(1);
        }
    },


    // Scaling Functions 
    getScaleToGameW: function (obj) {
        console.log(obj.width / Povn.gameConfig.width);
    },
    scaleToGameW: function (obj, percent) {
        obj.width = game.config.width * percent;
        obj.scale.y = obj.scale.x;
    },
    place: function (obj, xPercent, yPercent, Xoffset = 0, Yoffset = 0) {
        this.fromTop(obj, yPercent, Yoffset);
        this.fromLeft(obj, xPercent, Xoffset);
    },
    placeY: function (percent, offset = 0) {
        var y = game.config.height * percent;
        y += offset;
        return y;
    },
    placeX: function (percent, offset = 0) {
        var x = game.config.width * percent;
        x += offset;
        return x;
    },
    fromTop: function (obj, percent, offset = 0) {
        obj.y = game.config.height * percent;
        obj.y += offset;
    },
    fromLeft: function (obj, percent, offset = 0) {
        obj.x = game.config.width * percent;
        obj.x += offset;
    },

    center: function (obj) {
        obj.x = game.width / 2;
        obj.y = game.height / 2;
    },
    centerH: function (obj) {
        obj.x = game.width / 2;
    },
    centerV: function (obj) {
        obj.y = game.height / 2;
    },
    centerGroup: function (obj) {
        obj.x = game.width / 2 - obj.width / 2;
        obj.y = game.height / 2 - obj.height / 2;
    },
    centerGroupV: function (obj) {
        obj.y = game.height / 2 - obj.height / 2;
    },
    centerGroupH: function (obj) {
        obj.x = game.width / 2 - obj.width / 2;
    },
    alignToBottom: function (obj, offset = 0) {
        obj.y = game.height - obj.height / 2;
        obj.y += offset;
    },
    fromBottom: function (obj, percent, offset = 0) {
        obj.y = game.height - (game.height * percent);
        obj.y -= offset;
    },

    fromRight: function (obj, percent, offset = 0) {
        obj.x = game.width - (game.width * percent);
        obj.x -= offset;
        //obj.x -= obj.width / 2; 
    },

    fromCenterH: function (obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },
    fromCenterV: function (obj, percent) {
        obj.x = game.width / 2 - (game.width * percent);
        obj.x -= obj.width / 2;
    },

}; // End of Povin 

// Global Variables 
var test = 1;

// Call a method on the global object Povin 
Povin.log();
