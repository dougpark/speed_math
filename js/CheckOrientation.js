/**************************************************************************************
* CheckOrientation State
* @author Doug Park
* @version v1.0
* @desc On mobile force landscape orientation
* @date 2018-09-06
**************************************************************************************/
"use strict";

var CheckOrientation = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function checkOrientation() {
                Phaser.Scene.call(this, {
                    key: "CheckOrientation"
                });
            },
    create: function () {
    },

    update: function () {
        if (GameOptions.orientated) {
            this.scene.start('Logo');
        }
    }

});
