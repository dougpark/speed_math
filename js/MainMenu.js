/**************************************************************************************
* MainMenu State (Povin Speed Math)
* @author Doug Park
* @version v1.0
* @desc Display Menu Options
* @date 2018-09-06
**************************************************************************************/
"use strict";

// game defined options
var option = {};

option.timeGoal = 3;
option.timeGoalValues = [0,1,1.5,2,2.5,3];
option.timeGoalArray = ['Error','1 Second', '1.5 Seconds', '2 Seconds', '2.5 Seconds', '3 Seconds'];
option.getTimeGoal = function () {return option.timeGoalArray[option.timeGoal]};

option.playerId = 1;
option.playerIdArray = ['Error','Player 1','Player 2','Player 3','Player 4','Player 5'];
option.getPlayerId = function () { return option.playerIdArray[option.playerId]};

option.arithmeticType = 3;
option.arithmeticArray = ['Error','Add +','Subtract -','Multiply x','Divide ÷'];
option.arithmeticSymbol = ['e', '+', '-', 'x','÷'];
option.getTypeId = function () {return option.arithmeticType}
option.getTypeSym = function (id = option.arithmeticType) { 
    return option.arithmeticSymbol[id];
};
option.getTypeSt = function (id=option.arithmeticType) { 
    return option.arithmeticArray[id];
};

option.level = 5;
option.factor = 10;
option.minFactor = 2;

option.buzzer = option.getTimeGoal()*1000;
option.id = option.getPlayerId() + '.';
//option.level = option.maxLevel; // x 
//option.factor = option.factor; // y
option.questionType = option.arithmeticType;

// game UI settings
var style = {};

style.headerFont = '19px VenusRising';
style.headerBackgroundH = '0xb92b27'; // #b92b27
style.headerText = '#ffffff';
style.headerGraphicH = '0xffffff'; //#ffffff

style.bodyFont = '18px VenusRising';
style.bodyBackgroundH = '0xffffff'; // #ffffff
style.bodyBackground = '#ffffff';
//style.bodyBackgroundHighlight = '0xe6e6e6'; // #e6e6e6
style.bodyHeading = '#b92b27';
style.bodyText = '#333333';
style.bodyGraphicH = '0xb92b27'; //#b92b27 //'0x2092ea'; //#2092ea

style.resultBackgroundH = '0x222222';

style.footerFont = '24px VenusRising';
style.footerBackgroundH = '0x333333'; // #333333
style.footerTextBackground = '#ffffff'; //#ffffff
style.footerTextBackgroundH = '0xffffff'; //#ffffff
style.footerText = '#b92b27'; //'#2092ea'

class TextButton extends Phaser.GameObjects.Container {
    constructor(config) { // {scene, width, height, text, textFont, textStyle, 0xbackgroundColor}
        super(config.scene, 0, 0);

        var b1 = config.scene.add.rectangle(0, 0, config.width, config.height, config.backgroundColor);
        var b2 = config.scene.add.text(0, 0, config.text, {
            font: config.textFont,
            fill: config.textStyle,
            align: 'center'
        });
        b2.setOrigin(.5,.5);
           
        this.add([b1, b2]);
        this.setSize(config.width, config.height);
        this.setInteractive();
        config.scene.add.existing(this);
    }
};

class RoundButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
 
        var b1 = config.scene.add.arc(0, 0, 20, 0, 360, false);
        b1.setStrokeStyle(2, config.style);
        if (config.type=='plus') {
            var b2 = config.scene.add.line(0, 0, 0, 20, 0, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);
            
        } else if (config.type =='minus') {
            var b2 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);

        } else if (config.type == 'select') {
            var b2 = config.scene.add.rectangle(0, 0, 20, 20);
            b2.visFrame = 1;
            var b3 = config.scene.add.rectangle(0, 0, 20, 20);
            b3.visFrame = 1;
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);
        }
        this.add([b1, b2, b3]);
        this.setSize(40,40);
        this.setInteractive();
        config.scene.add.existing(this);
        this.setFrame(0);
    }

    setFrame(frame) {
        this.getAll().forEach(function (item) {
            if (item.visFrame == frame) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            if (item.visFrame === undefined) {
                item.visible = true;
            }

        }, this);

    }
};

class MenuButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
            //var b2 = scene.add.rectangle(0, 0, 20, 20);
            var b1 = config.scene.add.line(0, 0, 0, 0, 30, 0);
            var b2 = config.scene.add.line(0, 0, 0, 10, 30, 10);
            var b3 = config.scene.add.line(0, 0, 0, 20, 30, 20);
            b1.setStrokeStyle(1, config.style);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);
        
            this.add([b1, b2, b3]);
            this.setSize(40, 40);
            this.setInteractive();
            config.scene.add.existing(this);

            
    }
};

class SpeakerButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
        
        //var b2 = scene.add.rectangle(0, 0, 20, 20);
        var b1 = config.scene.add.line(8, 0, 0, 20, 20, 0, config.style);
        b1.setLineWidth(2, 2);
        b1.visFrame = 1;

        var b1a = config.scene.add.line(8, 0, 0, 0, 20, 20, config.style);
        b1a.setLineWidth(2, 2);
        b1a.visFrame = 1;

        var b2 = config.scene.add.line(0, 0, 0, 0, 15, 0, config.style);
        b2.setLineWidth(1, 9);
        var b2c = config.scene.add.rectangle(-4, 1, 7, 7, config.style);
        
        var b2a = config.scene.add.arc(10, 0, 8, 270, 450, false);
        b2a.setStrokeStyle(1, config.style);
        
        var b2b = config.scene.add.arc(14, 0, 10, 270, 450, false);
        b2b.setStrokeStyle(1, config.style);
         config.scene.tweens.add({
             targets: [b2a,b2b],
             scaleX: 1.2,
             scaleY: 1,
             yoyo: true,
             repeat: -1,
             ease: 'Sine.easeInOut'

         });
    
        // add the graphicObjects to the container
        this.add([b1, b1a, b2, b2a, b2b, b2c]);
        this.setSize(40, 40);
        this.setInteractive();
        
        // add container to the scene
        config.scene.add.existing(this);

        // set initial frame to show
        this.setFrame(0);

    }

    setFrame (frame) { 
        this.getAll().forEach(function(item) {
            if (item.visFrame == frame) {
                item.visible = true;
            } else {
                item.visible = false;
            }
            if (item.visFrame === undefined) {
                item.visible = true;
            }

        },this);
      
    }
};

var MainMenu = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function mainMenu() {
                Phaser.Scene.call(this, {
                    key: "MainMenu"
                });
            },

    init: function () {
        option.level += Povin.next; // increase the level from last game
        this.boundLevel();

        // save scene context for callback functions
        game.ctx = this;    
    },

    preload: function () {

    },

    create: function () {

        this.input.keyboard.on('keydown_SPACE', function (event) {
            this.nextState();
        },this);

        // background Tile
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), style.bodyBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);

        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);

        // footer Tile
        this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.footerTile, 0.5, 0.85);

        // Title Heading
        this.titleHeading = this.add.text(0, 0, 'Povin Speed Math', {
            font: style.headerFont,
            fill: style.headerText,
            align: 'center'
        });
        this.titleHeading.setOrigin(0.5, 0.5);
        Povin.place(this.titleHeading, 0.5, 0.07);

        // Speaker button to start/stop the background music
        this.buttonSpeaker = new SpeakerButton({
            scene: this,
            style: style.headerGraphicH,
        });
        this.buttonSpeaker.on('pointerdown', function () {
            Povin.actionOnClickSpeaker({
                target: this,
                ctx: game.ctx
            });
        });
        Povin.place(this.buttonSpeaker, 0.9, 0.07);
        Povin.setSpeakerFrame(this.buttonSpeaker);

        // Home button to return to the main menu
        this.buttonHome = new MenuButton({
            scene: this,
            style: style.headerGraphicH,
        });
        this.buttonHome.on('pointerdown', function () {
            Povin.actionOnClickHome({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonHome.nextState = 'Scores';
        Povin.place(this.buttonHome, 0.07, 0.055);

        // Go Button
        // this.buttonGo = this.add.text(0, 0, '      Go      ', {
        //      font: style.footerFont,
        //      fill: style.footerText,
        //      backgroundColor: style.footerTextBackground,
        //      align: 'center'
        //  }).setInteractive();

         this.buttonGo = new TextButton({
             scene: this,
             width: Povin.placeX(.40),
             height: Povin.placeY(.08),
             text: 'Go',
             textFont: style.footerFont,
             textStyle: style.footerText,
             backgroundColor: style.footerTextBackgroundH
         });

         this.buttonGo.on('pointerdown', this.nextState, this);
         //this.buttonGo.fixedHeight=(Povin.placeY(.1));
         //this.buttonGo.setFixedSize(Povin.placeX(.2),Povin.placeY(.1));
         //this.buttonGo.setOrigin(0.5, 0.5);
         Povin.place(this.buttonGo, 0.5, 0.93);
       

        //
        // Test Type Heading
        //
        this.testTypeHeading = this.add.text(0, 0, 'Test Type', { 
            font: style.bodyFont, 
            fill: style.bodyHeading, 
            align: 'center' 
        });
        this.testTypeHeading.setOrigin(0.5, 0.5);
        Povin.place(this.testTypeHeading, 0.5, 0.25);

        // Test Type Text
        this.testTypeString = option.arithmeticArray[option.arithmeticType];
        this.testTypeText = this.add.text(0, 0, this.testTypeString, { 
            font: style.bodyFont, 
            fill: style.bodyText, 
            align: 'center' 
        });
        this.testTypeText.setOrigin(0.5, 0.5);
        Povin.place(this.testTypeText, 0.5, 0.30);

        // Test Type Plus Button
        this.buttonTestTypePlus = new RoundButton({
            scene:this, 
            style:style.bodyGraphicH,
            type:'plus'
        });
        this.buttonTestTypePlus.on('pointerdown', function () {
            game.ctx.actionOnClickTestType({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonTestTypePlus.direction = 1;
        Povin.place(this.buttonTestTypePlus, 0.9, 0.30);
        
        // Test Type Minus Button
        this.buttonTestTypeMinus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'minus'
        });
        this.buttonTestTypeMinus.on('pointerdown', function () {
            game.ctx.actionOnClickTestType({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonTestTypeMinus.direction = -1;
        Povin.place(this.buttonTestTypeMinus, 0.1, 0.30);
        
        
        //
        // Factor Heading
        //
        this.factorHeading = this.add.text(0, 0, 'Factors', { 
            font: style.bodyFont, 
            fill: style.bodyHeading, 
            align: 'center' 
        });
        this.factorHeading.setOrigin(0.5, 0.5);
        Povin.place(this.factorHeading, 0.5, 0.55);
        // Factor Text
        this.factorString = option.minFactor + " to "+ option.factor;
        this.factorText = this.add.text(0, 0, this.factorString, { 
            font: style.bodyFont, 
            fill: style.bodyText, 
            align: 'center' 
        });
        this.factorText.setOrigin(0.5, 0.5);
        Povin.place(this.factorText, 0.5, 0.60);

        // factor Plus Button
        this.buttonfactorPlus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'plus'
        });
        this.buttonfactorPlus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonfactorPlus.type = 'max';
        this.buttonfactorPlus.direction = 1;
        Povin.place(this.buttonfactorPlus, 0.9, 0.60);
        
        // factor Minus Button
        this.buttonfactorMinus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonfactorMinus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonfactorMinus.type = 'max';
        this.buttonfactorMinus.direction = -1;
        Povin.place(this.buttonfactorMinus, 0.75, 0.60);
       
        // minFactor Plus Button
        this.buttonMinFactorPlus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'plus'
        });;
        this.buttonMinFactorPlus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonMinFactorPlus.type = 'min';
        this.buttonMinFactorPlus.direction = 1;
        Povin.place(this.buttonMinFactorPlus, 0.25, 0.60);
       
        // minFactor Minus Button
        this.buttonMinFactorMinus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonMinFactorMinus.on('pointerdown', function () {
             game.ctx.actionOnClickFactor({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonMinFactorMinus.type = 'min';
        this.buttonMinFactorMinus.direction = -1;
        Povin.place(this.buttonMinFactorMinus, 0.1, 0.60);
        

        //
        // Level Heading
        //
        this.levelHeading = this.add.text(0, 0, 'Level', { 
            font: style.bodyFont, 
            fill: style.bodyHeading, 
            align: 'center' 
        });
        this.levelHeading.setOrigin(0.5, 0.5);
        Povin.place(this.levelHeading, 0.5, 0.40);
        // Level Text
        this.levelString = option.level;
        this.levelText = this.add.text(0, 0, this.levelString, { 
            font: style.bodyFont, 
            fill: style.bodyText, 
            align: 'center' 
        });
        this.levelText.setOrigin(0.5, 0.5);
        Povin.place(this.levelText, 0.5, 0.45);

        // level Plus Button
        this.buttonlevelPlus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'plus'
        });
        this.buttonlevelPlus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelPlus.direction = 1;
        Povin.place(this.buttonlevelPlus, 0.9, 0.45);
       
        // level Minus Button
        this.buttonlevelMinus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonlevelMinus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelMinus.direction = -1;
        Povin.place(this.buttonlevelMinus, 0.1, 0.45);
       
        //
        // Time Goal Heading
        //
        this.tgHeading = this.add.text(0, 0, 'Time Goal', { font: style.bodyFont, fill: style.bodyHeading, align: 'center' });
        this.tgHeading.setOrigin(0.5, 0.5);
        Povin.place(this.tgHeading, 0.5, 0.70);
        // Time Goal Text
        this.tgString = option.timeGoalArray[option.timeGoal];
        this.tgText = this.add.text(0, 0, this.tgString, { font: style.bodyFont, fill: style.bodyText, align: 'center' });
        this.tgText.setOrigin(0.5, 0.5);
        Povin.place(this.tgText, 0.5, 0.75);

        // Tg Plus Button
        this.buttonTgPlus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'plus'
        });
        this.buttonTgPlus.on('pointerdown', function () {
            game.ctx.actionOnClickTg({
                target:this, 
                ctx:game.ctx});
        });
        this.buttonTgPlus.direction = 1;
        Povin.place(this.buttonTgPlus, 0.9, 0.75);

        // Tg Minus Button
        this.buttonTgMinus = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'minus'
        });;
        this.buttonTgMinus.on('pointerdown', function () {
             game.ctx.actionOnClickTg({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonTgMinus.direction = -1;
        Povin.place(this.buttonTgMinus, 0.1, 0.75);
        
        //
        // For a specific interactive button
        //
        // this.buttonTgMinus.on('pointerover', function (pointer) {
        //     game.ctx.tgOver({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerout', function (pointer) {
        //     game.ctx.tgOut({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerdown', function (pointer) {
        //     game.ctx.tgDown({pointer:pointer, target:this, ctx:game.ctx});
        // });
        // this.buttonTgMinus.on('pointerup', function (pointer) {
        //     game.ctx.tgUp({pointer:pointer, target:this, ctx:game.ctx});
        // });

        // for all interactive objects
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);

        // Animate the invader
        var config = {
            key: 'fly',
            frames: this.anims.generateFrameNumbers('invader', {
                frames: [0, 1, 2, 3]
            }),
            frameRate: 20,
            repeat: -1
        };

        this.anims.create(config);
        this.invader = this.add.sprite(400, 100, 'invader').play('fly');
        this.invader.setOrigin(0.5, 0.5);
        Povin.place(this.invader, .5, .18);

        

    }, // end create:

    //
    // for all interactive buttons
    //
    onObjectDown: function (pointer, target) {    
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale*.8 : .8),
            scaleY: (target.normScale ? target.normScale*.8: .8),
            ease: 'Bounce.easeOut',
            duration: 100
        });
         game.ctx.tweens.add({
             targets: target,
             scaleX: (target.normScale ? target.normScale : 1),
             scaleY: (target.normScale ? target.normScale : 1),
             ease: 'Sine.easeInOut',
             delay: 100,
             duration: 100
         });
    },
    onObjectUp: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
    },
    onObjectOver: function (pointer, target) {
        // game.ctx.tweens.add({
        //     targets: target,
        //     scaleX: 1.1,
        //     scaleY: 1.1,
        //     ease: 'Sine.easeInOut',
        //     duration: 100
        // });
        ///target.setTint(0xeb0000);
    },
    onObjectOut: function (pointer, target) {
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale : 1),
            scaleY: (target.normScale ? target.normScale : 1),
            ease: 'Sine.easeInOut',
            duration: 100
        });
       /// target.setTint(0xffffff);
    },

    

    actionOnClickTestType: function (config) {
        option.arithmeticType += config.target.direction;
        if (option.arithmeticType > 4) {
            option.arithmeticType = 1;
        }
        if (option.arithmeticType < 1) {
            option.arithmeticType = 4;
        }
        config.ctx.testTypeText.text = option.arithmeticArray[option.arithmeticType];
    },

    actionOnClickFactor: function (config) {
        if (config.target.type == 'max') {
            option.factor += config.target.direction;
            if (option.factor > 15) {
                option.factor = option.minFactor;
            }
            if (option.factor < option.minFactor) {
                option.factor = 15;
            }
            
        } else {
            option.minFactor += config.target.direction;
            if (option.minFactor > option.factor) {
                option.minFactor = 1;
            }
            if (option.minFactor < 1) {
                option.minFactor = option.factor;
            }
        }
        config.ctx.factorText.text = option.minFactor + " to " + option.factor;
    },

    // used by Factor min and max buttons
    boundLevel: function() {
        if (option.level > 15) {
            option.level = 1;
        }
        if (option.level < 1) {
            option.level = 15;
        }

    },

    actionOnClickLevel: function (config) {
        option.level += config.target.direction;
        config.ctx.boundLevel();
        config.ctx.levelText.text = option.level;

    },

    actionOnClickTg: function (config) {
        option.timeGoal += config.target.direction;
        if (option.timeGoal > 5) {
            option.timeGoal = 1;
        }
        if (option.timeGoal < 1) {
            option.timeGoal = 5;
        }
        config.ctx.tgText.text = option.timeGoalArray[option.timeGoal];
    },


    update: function () {
    },
 

    render2: function () {
        var debug = this.this.debug;
        debug.text('height ' + game.config.height, 10, 120);
       
        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.this.renderType], 10, 540, 'white', debug.font);

    },

    nextState: function () {
        option.buzzer = option.timeGoalValues[option.timeGoal] * 1000;
        option.id = option.playerIdArray[option.playuerId] + '.';
        //option.level = option.maxLevel; // x 
        //option.min = option.minFactor; // y
        option.questionType = option.arithmeticType;
        this.scene.start('PMath');
    },
});