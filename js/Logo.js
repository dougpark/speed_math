/**************************************************************************************
* Logo Scene (Povin Speed Math)
* @author Doug Park
* @version v1.0
* @desc Show logo
* @date 2018-09-06
**************************************************************************************/
"use strict";

var Logo = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function logo() {
                Phaser.Scene.call(this, {
                    key: "Logo"
                });
            },

    create: function () {
        this.logo = this.add.sprite(10, 5, "logo").setOrigin(0.5, 0.5);
       
        this.logo.setScale(0.5 * deviceScale);
        //this.logo.anchor.setTo(0.5, 0.5);
        Povin.place(this.logo, 0.5, .5)  
    },

    update: function () {
        //this.time.events.add(1000, this.nextScene, this);   
        var timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.nextScene,
            callbackScope: this
        });
 
    },

    nextScene: function() {
        this.scene.start('MainMenu');
    }

});
