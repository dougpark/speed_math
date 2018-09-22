/**************************************************************************************
* MainMenu State (Povin Speed Math)
* @author Doug Park
* @version v1.0
* @desc Display Menu Options
* @date 2018-09-06
**************************************************************************************/
"use strict";

// user defined options
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

option.level = 1;
option.factor = 1;
option.minFactor = 1;

option.buzzer = option.getTimeGoal()*1000;
option.id = option.getPlayerId() + '.';
//option.level = option.maxLevel; // x 
//option.factor = option.factor; // y
option.questionType = option.arithmeticType;

// game UI settings
var style = {};

style.myFont = '18px VenusRising';
style.titleFont = '19px VenusRising';
style.goFont = '24px VenusRising';

//style.myFont = 'arial'

style.backHeader = '0xb92b27'; // #b92b27
style.textHeader = '#ffffff';
style.textHeaderH = '0xffffff';
style.backFooter = '0x333333'; // #333333
style.textBackFooterH = '#ffffff'; //#ffffff
style.textFooter = '#2092ea';

style.backColor = '0xffffff'; // #ffffff
style.backColorH = '#ffffff';
style.backHighLight = '0x2092ea'; // #e6e6e6
style.headingColor = '#b92b27';
style.textColor = '#333333';

style.upDown = '0x2092ea'; //#2092ea

// #2092ea
// #e6e6e6
 class RoundButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
 
        var b1 = config.scene.add.arc(0, 0, 20, 0, 360, false);
        b1.setStrokeStyle(2, config.style);
        if (config.type=='plus') {
            //var b2 = scene.add.rectangle(0, 0, 20, 20);
            var b2 = config.scene.add.line(0, 0, 0, 20, 0, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);
        } else {
            var b2 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            var b3 = config.scene.add.line(0, 0, 0, 0, 20, 0);
            b2.setStrokeStyle(1, config.style);
            b3.setStrokeStyle(1, config.style);

        } 
        this.add([b1, b2, b3]);
        this.setSize(40,40);
        this.setInteractive();
        config.scene.add.existing(this);
    }
};

class MenuButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene, 0, 0);
            //var b2 = scene.add.rectangle(0, 0, 20, 20);
            var b1 = config.scene.add.line(0, -10, 0, 0, 30, 0);
            var b2 = config.scene.add.line(0, 0, 0, 0, 30, 0);
            var b3 = config.scene.add.line(0, 10, 0, 0, 30, 0);
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
        this.c = config;
        
        if (!config) {config = this.c;}
        //var b2 = scene.add.rectangle(0, 0, 20, 20);
        var b1 = config.scene.add.line(0, -10, 0, 0, 30, 0);
        var b2 = config.scene.add.line(0, 0, 0, 30, 0, 0);
        var b3 = config.scene.add.line(0, 10, 0, 0, 30, 0);
        b1.setStrokeStyle(1, config.style);
        b1.myFrame = 0;
        b3.myFrame = 0;
        b2.setStrokeStyle(1, config.style);
        b3.setStrokeStyle(1, config.style);

        this.add([b1, b2, b3]);
        this.setSize(40, 40);
        this.setInteractive();
        b2.visible = false;
        b2.myFrame = 1;
        config.scene.add.existing(this);

    }

    showFrame0() {
        this.getAll('myFrame', 0).forEach(this.show);
        this.getAll('myFrame', 1).forEach(this.hide);
    }

    show(item,index) {
        item.visible = true;

    }
    hide(item,index) {
        item.visible = false;
    }

    showFrame1() {
        this.getAll('myFrame', 1).forEach(this.show);
        this.getAll('myFrame', 0).forEach(this.hide);
    }
    
    setFrame (frame) { 
        if (frame ==0) { 
            this.showFrame0();   
        } else {
            this.showFrame1();
        }
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

         game.ctx = this;

        
    },

    preload: function () {

    },

    create: function () {

        this.input.keyboard.on('keydown_SPACE', function (event) {

            game.ctx.nextState();

        });

        // background image
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.background.alpha = 1;

        // screen rectangle
        this.graphics = this.add.graphics(0, 0);
        this.graphics.clear();
        this.graphics.lineStyle(4, 0x979595, 1);
        this.graphics.strokeRect(0, 0, game.config.width, game.config.height);

        // background colors
        this.green = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), style.backColor).setOrigin(.5, 0);
        Povin.place(this.green, 0.5, 0);

        this.green = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.backHeader).setOrigin(.5, 0);
        Povin.place(this.green, 0.5, 0);

        this.green = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.backFooter).setOrigin(.5, 0);
        Povin.place(this.green, 0.5, 0.85);

        
       

        //  Title Text
        // this.title = this.add.sprite(0, 0, 'title');
        // this.title.setOrigin(0.5, 0.5);
        // this.title.setScale(1, 1);
        // Povin.place(this.title, 0.5, 0.07);

         this.tString = 'Povin Speed Math';
         this.tText = this.add.text(0, 0, this.tString, {
             font: style.titleFont,
             fill: style.textHeader,
             align: 'center'
         });
         this.tText.setOrigin(0.5, 0.5);
         Povin.place(this.tText, 0.5, 0.07);

        // Speaker button to start/stop the background music
        this.buttonSpeaker = new SpeakerButton({
            scene: this,
            style: style.textHeaderH,
        });
        this.buttonSpeaker.on('pointerdown', function () {
            Povin.actionOnClickSpeaker({
                target: this,
                ctx: game.ctx
            });
        });
        //this.buttonSpeaker.setOrigin(0.5, 0.5);
        this.buttonSpeaker.setScale(1, 1);
        Povin.place(this.buttonSpeaker, 0.9, 0.07);
        Povin.setSpeakerTexture(this.buttonSpeaker);

        // Home button to return to the main menu
        this.buttonHome = new MenuButton({
            scene: this,
            style: style.textHeaderH,
        });
        
        this.buttonHome.on('pointerdown', function () {
            Povin.actionOnClickHome({
                target: this,
                ctx: game.ctx
            });
        });
        //this.buttonHome.setOrigin(0.5, 0.5);
        this.buttonHome.nextState = 'MainMenu';
        this.buttonHome.setScale(.8);
        this.buttonHome.normScale=.8;
        Povin.place(this.buttonHome, 0.07, 0.07);

        

        // Go Button
        // this.buttonGo = this.add.image(0, 0, 'buttonGo').setInteractive();
        // this.buttonGo.on('pointerdown', this.nextState, this);
        // this.buttonGo.setOrigin(0.5, 0.5);
        // this.buttonGo.setScale(1, 1);
        // Povin.place(this.buttonGo, 0.5, 0.93);
        // this.buttonGo.inputEnabled = true;

        this.buttonGo = this.add.text(0, 0, '      Go      ', {
             font: style.goFont,
             fill: style.textFooter,
             backgroundColor: style.textBackFooterH,
             align: 'center'
         }).setInteractive();
         this.buttonGo.on('pointerdown', this.nextState, this);
         this.buttonGo.fixedHeight=(Povin.placeY(.1));
         //this.buttonGo.setFixedSize(Povin.placeX(.2),Povin.placeY(.1));
         this.buttonGo.setOrigin(0.5, 0.5);

         Povin.place(this.buttonGo, 0.5, 0.93);
       

        //
        // Arithmetic Heading
        //
        this.aString = 'Test Type';
        this.aText = this.add.text(0, 0, this.aString, { font: style.myFont, fill: style.headingColor, align: 'center' });
        this.aText.setOrigin(0.5, 0.5);
        Povin.place(this.aText, 0.5, 0.25);
        // Arithmetic Text
        this.a2String = option.arithmeticArray[option.arithmeticType];
        this.a2Text = this.add.text(0, 0, this.a2String, { font: style.myFont, fill: style.textColor, align: 'center' });
        this.a2Text.setOrigin(0.5, 0.5);
        Povin.place(this.a2Text, 0.5, 0.30);
        // ArPlus

        

        this.buttonArPlus = new RoundButton({scene:this, style:style.upDown,type:'plus'});

        // this.buttonArPlus = this.add.container();
        // this.buttonArPlus1 = this.add.arc(0, 0, 20, 0, 360, false);
        // this.buttonArPlus1.setStrokeStyle(4, style.upDown);
        // this.buttonArPlus2 = this.add.rectangle(0, 0, 10,10);
        // this.buttonArPlus2.setStrokeStyle(1, style.upDown);
        // this.buttonArPlus.add([this.buttonArPlus1, this.buttonArPlus2]);
         //this.buttonArPlus.setSize(20,20);
         //this.buttonArPlus.setInteractive();
        



        //this.buttonArPlus = this.add.image(0, 0, 'buttonPlus').setInteractive();
        this.buttonArPlus.on('pointerdown', function () {
            game.ctx.actionOnClickAr({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonArPlus.direction = 1;
        //this.buttonArPlus.setOrigin(0.5, 0.5);
        //this.buttonArPlus.setScale(.8, .8);
        Povin.place(this.buttonArPlus, 0.9, 0.30);
        
        // ArMinus
        this.buttonArMinus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'minus'
        });
        //this.buttonArMinus = this.add.image(0, 0, 'buttonMinus').setInteractive();
        this.buttonArMinus.on('pointerdown', function () {
            game.ctx.actionOnClickAr({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonArMinus.direction = -1;
        //this.buttonArMinus.setOrigin(0.5, 0.5);
        //this.buttonArPlus.setScale(.8, .8);
        Povin.place(this.buttonArMinus, 0.1, 0.30);
        
        
        //
        // Factor Heading
        //
        this.factorString = 'Factors';
        this.factorText = this.add.text(0, 0, this.factorString, { font: style.myFont, fill: style.headingColor, align: 'center' });
        this.factorText.setOrigin(0.5, 0.5);
        Povin.place(this.factorText, 0.5, 0.55);
        // Factor Text
        this.factor2String = option.minFactor + " to "+ option.factor;
        this.factor2Text = this.add.text(0, 0, this.factor2String, { font: style.myFont, fill: style.textColor, align: 'center' });
        this.factor2Text.setOrigin(0.5, 0.5);
        Povin.place(this.factor2Text, 0.5, 0.60);
        // factorPlus
        this.buttonfactorPlus = new RoundButton({
            scene: this,
            style: style.upDown,
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
        //this.buttonfactorPlus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonfactorPlus, 0.9, 0.60);
        
        // factorMinus
        this.buttonfactorMinus = new RoundButton({
            scene: this,
            style: style.upDown,
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
        //this.buttonfactorMinus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonfactorMinus, 0.75, 0.60);
       
        // minFactorPlus
        this.buttonminFactorPlus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'plus'
        });;
        this.buttonminFactorPlus.on('pointerdown', function () {
            game.ctx.actionOnClickFactor({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonminFactorPlus.type = 'min';
        this.buttonminFactorPlus.direction = 1;
        //this.buttonminFactorPlus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonminFactorPlus, 0.25, 0.60);
       
        // minFactorMinus
        this.buttonminFactorMinus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'minus'
        });;
        this.buttonminFactorMinus.on('pointerdown', function () {
             game.ctx.actionOnClickFactor({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonminFactorMinus.type = 'min';
        this.buttonminFactorMinus.direction = -1;
        //this.buttonminFactorMinus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonminFactorMinus, 0.1, 0.60);
        

        //
        // Level Heading
        //
        this.levelString = 'Level';
        this.levelText = this.add.text(0, 0, this.levelString, { font: style.myFont, fill: style.headingColor, align: 'center' });
        this.levelText.setOrigin(0.5, 0.5);
        Povin.place(this.levelText, 0.5, 0.40);
        // Level Text
        this.level2String = option.level;
        this.level2Text = this.add.text(0, 0, this.level2String, { font: style.myFont, fill: style.textColor, align: 'center' });
        this.level2Text.setOrigin(0.5, 0.5);
        Povin.place(this.level2Text, 0.5, 0.45);

        // levelPlus
        this.buttonlevelPlus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'plus'
        });
        this.buttonlevelPlus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelPlus.direction = 1;
        //this.buttonlevelPlus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonlevelPlus, 0.9, 0.45);
       
        // levelMinus
        this.buttonlevelMinus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'minus'
        });;
        this.buttonlevelMinus.on('pointerdown', function () {
            game.ctx.actionOnClickLevel({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonlevelMinus.direction = -1;
        //this.buttonlevelMinus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonlevelMinus, 0.1, 0.45);
       
        //
        // Time Goal Heading
        //
        this.tgString = 'Time Goal';
        this.tgText = this.add.text(0, 0, this.tgString, { font: style.myFont, fill: style.headingColor, align: 'center' });
        this.tgText.setOrigin(0.5, 0.5);
        Povin.place(this.tgText, 0.5, 0.70);
        // Time Goal Text
        this.tg2String = option.timeGoalArray[option.timeGoal];
        this.tg2Text = this.add.text(0, 0, this.tg2String, { font: style.myFont, fill: style.textColor, align: 'center' });
        this.tg2Text.setOrigin(0.5, 0.5);
        Povin.place(this.tg2Text, 0.5, 0.75);

        // TgPlus
        this.buttonTgPlus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'plus'
        });
        this.buttonTgPlus.on('pointerdown', function () {
            game.ctx.actionOnClickTg({target:this, ctx:game.ctx});
        });
        this.buttonTgPlus.direction = 1;
        //this.buttonTgPlus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonTgPlus, 0.9, 0.75);

        // TgMinus
        this.buttonTgMinus = new RoundButton({
            scene: this,
            style: style.upDown,
            type: 'minus'
        });;
        this.buttonTgMinus.on('pointerdown', function () {
             game.ctx.actionOnClickTg({
                 target: this,
                 ctx: game.ctx
             });
         });
        this.buttonTgMinus.direction = -1;
        //this.buttonTgMinus.setOrigin(0.5, 0.5);
        Povin.place(this.buttonTgMinus, 0.1, 0.75);
        

        // for a specific interactive button
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
        this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);

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
        Povin.place(this.invader, .5, .15);

        

    }, // end create:

    onObjectDown: function (pointer, target) {    
        game.ctx.tweens.add({
            targets: target,
            scaleX: (target.normScale ? target.normScale*.8 : .8),
            scaleY: (target.normScale ? target.normScale*.8: .8),
            ease: 'Bounce.easeOut',
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

    tgDown: function (config) {
        config.ctx.tweens.add({
            targets: config.target,
            scaleX: 2,
            scaleY: 2,
            ease: 'Bounce.easeOut',
            duration: 100
        });
    },
    tgUp: function (config) {
        config.ctx.tweens.add({
            targets: config.target,
            scaleX: 1,
            scaleY: 1,
            ease: 'Sine.easeInOut',
            duration: 100
        });
        target.angle = 0;
    },

    tgOver: function (config) {
         config.ctx.tweens.add({
             targets: config.target,
             scaleX: 1.4,
             scaleY: 1.4,
             ease: 'Sine.easeInOut',
             duration: 100
         });
    },
    tgOut: function (config) {
        config.ctx.tweens.add({
            targets: config.target,
            scaleX: 1,
            scaleY: 1,
            ease: 'Sine.easeInOut',
            duration: 100
        });
    },

    actionOnClickAr: function (config) {
        option.arithmeticType += config.target.direction;
        if (option.arithmeticType > 4) {
            option.arithmeticType = 1;
        }
        if (option.arithmeticType < 1) {
            option.arithmeticType = 4;
        }
        config.ctx.a2Text.text = option.arithmeticArray[option.arithmeticType];

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
        config.ctx.factor2Text.text = option.minFactor + " to " + option.factor;

    },

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
        config.ctx.level2Text.text = option.level;

    },

    actionOnClickTg: function (config) {
        option.timeGoal += config.target.direction;
        if (option.timeGoal > 5) {
            option.timeGoal = 1;
        }
        if (option.timeGoal < 1) {
            option.timeGoal = 5;
        }
        config.ctx.tg2Text.text = option.timeGoalArray[option.timeGoal];

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