/**************************************************************************************
* Math Scene (Povin Speed Math)
* @author Doug Park, Povingames.com
* @email doug@povingames.com
* @version v1.0
* @desc Play the Povin Speed Math Game
* @date 2018-09-06
**************************************************************************************/
"use strict"
    
var PMath = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function pmath() {
                Phaser.Scene.call(this, {
                    key: "PMath"
                });
            },

    init: function() {

        this.myFont = 'VenusRising';
        this.myFont2 = 'VenusRising';
     
        this.timer = false;
        this.roundComplete = false;
        this.needToPass = option.factor-option.minFactor+1;

         // Global Properties  
        this.trigger = true;   
        this.questCurr = 0;
        this.questRight = 0;
        this.questCum = 0;
        this.lastRandom = 0;
        Povin.next = 0;  
        game.ctx = this;
    },

    preload: function() {
        //this.time.advancedTiming = true;
    },

    create: function() 
    {
        // this.wasd = {
        //     w: game.input.keyboard.addKey(Phaser.Keyboard.W),
        //     s: game.input.keyboard.addKey(Phaser.Keyboard.S),
        //     a: game.input.keyboard.addKey(Phaser.Keyboard.A),
        //     d: game.input.keyboard.addKey(Phaser.Keyboard.D),
        //     sp: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        // };
        // this.wasd.a.onDown.add(this.actionOnClick1, this)
        // this.wasd.s.onDown.add(this.actionOnClick2, this)
        // this.wasd.d.onDown.add(this.actionOnClick3, this)
        // this.wasd.sp.onDown.add(this.actionOnClickGo, this)

        this.input.keyboard.on('keydown_A', function (event) {
            game.ctx.actionOnClick1({ctx:game.ctx});
        });
        this.input.keyboard.on('keydown_S', function (event) {
            game.ctx.actionOnClick2({
                ctx: game.ctx
            });
        });
        this.input.keyboard.on('keydown_D', function (event) {
            game.ctx.actionOnClick3({
                ctx: game.ctx
            });
        });
        this.input.keyboard.on('keydown_SPACE', function (event) {
            game.ctx.actionOnClickGo({
                ctx: game.ctx

            });
        });

        // audio
        this.perfectSfx = this.sound.add('perfectSfx');
        this.wrongSfx = this.sound.add('wrongSfx');
        this.lateSfx = this.sound.add('lateSfx');

        // background Tile
        this.backTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(1), style.bodyBackgroundH).setOrigin(.5, 0);
        Povin.place(this.backTile, 0.5, 0);

        // header Tile
        this.headerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.headerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.headerTile, 0.5, 0);

        // question Tile
        this.questionTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.questionTile, 0.5, 0.4);


        // footer Tile
        this.footerTile = this.add.rectangle(0, 0, game.config.width, Povin.placeY(.15), style.footerBackgroundH).setOrigin(.5, 0);
        Povin.place(this.footerTile, 0.5, 0.85);

        // Title Heading
        this.titleHeading = this.add.text(0, 0, 'Povin Speed Math', {
            font: style.headerFont,
            fill: style.headerText,
            align: 'center'
        }).setScale(deviceScale);
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
        this.buttonHome.nextScene = 'Scores';
        Povin.place(this.buttonHome, 0.07, 0.055);

        // Go Button
        // this.buttonGo = this.add.text(0, 0, '      Go      ', {
        //     font: style.footerFont,
        //     fill: style.footerText,
        //     backgroundColor: style.footerTextBackground,
        //     align: 'center'
        // }).setInteractive();

        this.buttonGo = new TextButton({
            scene: this,
            width: Povin.placeX(.40),
            height: Povin.placeY(.08),
            text: 'Go',
            textFont: style.footerFont,
            textStyle: style.footerText,
            backgroundColor: style.footerTextBackgroundH
        });
        // //this.buttonGo.on('pointerdown', this.actionOnClickGo,this);
        this.buttonGo.on('pointerdown', function () {
            game.ctx.actionOnClickGo({
                target: this,
                ctx: game.ctx
            });
        });
        Povin.place(this.buttonGo, 0.5, 0.93);
        this.buttonGo.inputEnabled = true;

        // for all interactive objects
        this.input.on('gameobjectdown', this.onObjectDown);
        //this.input.on('gameobjectup', this.onObjectUp);
        this.input.on('gameobjectover', this.onObjectOver);
        this.input.on('gameobjectout', this.onObjectOut);

        // welcome invader
        this.invader = this.add.sprite(0, 0, 'invader').play('fly').setScale(deviceScale);
        this.invader.setOrigin(0.5, 0.5);
        Povin.place(this.invader, .5, .18);
   
        // Time invader
        this.timeInvader = this.add.sprite(0, 0, 'invader').play('fly').setScale(deviceScale);
        this.timeInvader.setOrigin(0.5, 0.5);
        Povin.place(this.timeInvader, .2, .81);
        
        game.ctx.tweens.add({
            targets: this.timeInvader,
            x: Povin.placeX(.8),
            y: Povin.placeY(.81),
            ease: 'Phaser.Math.Easing.Linear',
            yoyo: true,
            repeat: -1,
            duration: option.buzzer
        });
        
        

        // One Button
         this.button1 = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'select'
        });
        this.button1.on('pointerdown', function () {
            game.ctx.actionOnClick1({
                target: this,
                ctx: game.ctx
            });
        });
        this.button1.inputEnabled = true;
        Povin.place(this.button1, 0.3, 0.67);
    
        // Two Button
         this.button2 = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'select'
        });
        this.button2.on('pointerdown', function () {
            game.ctx.actionOnClick2({
                target: this,
                ctx: game.ctx
            });
        });
        this.button2.inputEnabled = true;
        Povin.place(this.button2, 0.5, 0.67);

        // Three Button
      this.button3 = new RoundButton({
            scene: this,
            style: style.bodyGraphicH,
            type: 'select'
        });
        this.button3.on('pointerdown', function () {
            game.ctx.actionOnClick3({
                target: this,
                ctx: game.ctx
            });
        });
        this.button3.inputEnabled = true;
        Povin.place(this.button3, 0.7, 0.67);
        
        // Disable until Go
        this.button1.inputEnabled = false;
        this.button2.inputEnabled = false;
        this.button3.inputEnabled = false;
 
        //  Question Text
        this.qString = ' Press Go \n to Start ';
        this.qText = this.add.text(0, 0, this.qString, { 
            font: '30px ' + this.myFont2, 
            fill: style.bodyBackground, //'#ebebeb', 
            //backgroundColor: style.bodyText, // new
            align: 'center' 
        }).setScale(deviceScale);
        this.qText.setOrigin(0.5,0.5);
        Povin.place(this.qText, 0.5, 0.47);

        //  Status Text
        this.sString = '';
        this.sText = this.add.text(0, 0, this.sString, { 
            font: '24px ' + this.myFont, 
            fill: style.bodyText, //'#ebebeb',
            //backgroundColor: style.bodyText, // new
            align: 'center'
            }).setScale(deviceScale);
        this.sText.setOrigin(0.5, 0.5);
        Povin.place(this.sText, 0.5, 0.37);

        //  Question Result Text
        this.qRString = '';
        this.qRText = this.add.text(0, 0, this.qRString, { 
            font: '24px ' + this.myFont, 
            fill: style.bodyText, //'#ebebeb', 
            //backgroundColor: style.bodyText, // new
            align: 'center' 
        }).setScale(deviceScale);
        this.qRText.setOrigin(0.5, 0.5);
        Povin.place(this.qRText, 0.5, 0.760);

        //  Question Wrong Result Text
        this.qWString = '';
        this.qWText = this.add.text(0, 0, this.qRString, { 
            font: '24px ' + this.myFont, 
            fill: style.bodyBackground, //'#ebebeb', 
            backgroundColor: style.bodyHeading, //'#ad0000', // new
            align: 'center'
            }).setScale(deviceScale);
        this.qWText.setOrigin(0.5, 0.5);
        Povin.place(this.qWText, 0.5, 0.760);

        //  Answer 1 Text
        this.a1String = '';
        this.a1Text = this.add.text(0, 0, this.a1String, {
                    font: style.bodyFont,
                    fill: style.bodyText,
                    align: 'center'
                }).setScale(deviceScale);
        this.a1Text.setOrigin(0.5, 0.5);
        Povin.place(this.a1Text, 0.3, 0.6);

        //  Answer 2 Text
        this.a2String = '';
        this.a2Text = this.add.text(0, 0, this.a2String, {
            font: style.bodyFont,
            fill: style.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.a2Text.setOrigin(0.5, 0.5);
        Povin.place(this.a2Text, 0.5, 0.6);

        //  Answer 3 Text
        this.a3String = '';
        this.a3Text = this.add.text(0, 0, this.a3String, {
            font: style.bodyFont,
            fill: style.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.a3Text.setOrigin(0.5, 0.5);
        Povin.place(this.a3Text, 0.7, 0.6);

        // Level Heading
        this.cString = 'Level';
        this.cText = this.add.text(0, 0, this.cString, {
            font: style.bodyFont,
            fill: style.bodyHeading,
            align: 'center'
        }).setScale(deviceScale);
        this.cText.setOrigin(0.5, 0.5);
        Povin.place(this.cText, 0.2, 0.24);
        // Level Text
        this.c2String = option.level;
        this.c2Text = this.add.text(0, 0, this.c2String, {
            font: style.bodyFont,
            fill: style.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.c2Text.setOrigin(0.5, 0.5);
        Povin.place(this.c2Text, 0.2, 0.3);

        // Right Count Heading
        this.rString = 'Right';
        this.rText = this.add.text(0, 0, this.rString, {
            font: style.bodyFont,
            fill: style.bodyHeading,
            align: 'center'
        }).setScale(deviceScale);
        this.rText.setOrigin(0.5, 0.5);
        Povin.place(this.rText, 0.8, 0.24);
        // Right Count Text
        this.r2String = '0';
        this.r2Text = this.add.text(0, 0, this.r2String, {
            font: style.bodyFont,
            fill: style.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.r2Text.setOrigin(0.5, 0.5);
        Povin.place(this.r2Text, 0.8, 0.3);

        // Timer Heading
        this.tHString = 'Time';
        this.tHText = this.add.text(0, 0, this.tHString, {
            font: style.bodyFont,
            fill: style.bodyHeading,
            align: 'center'
        }).setScale(deviceScale);
        this.tHText.setOrigin(0.5, 0.5);
        Povin.place(this.tHText, 0.5, 0.24);
        // Timer Text
        this.timerString = '0';
        this.timerText = this.add.text(0, 0, this.timerString, {
            font: style.bodyFont,
            fill: style.bodyText,
            align: 'center'
        }).setScale(deviceScale);
        this.timerText.setOrigin(0.5, 0.5);
        Povin.place(this.timerText, 0.5, 0.3);

        // setup questions
        this.initQuestion();
        
    }, // end create

    //
    // for all interactive buttons
    //
    onObjectDown: function (pointer, target) {
            game.ctx.tweens.add({
                targets: target,
                scaleX: (target.normScale ? target.normScale * .8 : .8),
                scaleY: (target.normScale ? target.normScale * .8 : .8),
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

    
    update: function() {
        if (this.timer) {
            this.timerText.text = ((this.time.now - this.startTime)/1000).toFixed(4);
            //late
            var diff = (this.time.now - this.startTime);
            
            if ((this.trigger) && ( diff >= option.buzzer)) {
                this.trigger = false;
                this.slow = true;
                if (Povin.SFXStatus) { this.lateSfx.play(); }
            }
            
            // to slow, time out
            if (diff > option.buzzer*2) {
                this.trigger = false;
                this.slow = true;
                if (Povin.SFXStatus) { this.lateSfx.play(); }
                this.checkAnswer(0);
            }

        }
        
    }, // end update

    initQuestion: function () {

        this.x = option.level; // get first x value
        this.y = option.factor+1; // get first y value
        this.a = 0;
    },

    nextQuestion: function () {

        // determine next x and y values
        this.y--;
        if (this.y<option.minFactor) {this.y=option.factor}
        this.makeKey(); // make next key
        var count = 0;

        try {
            while (this.gotIt(this.key)) { // loop till not got it
                this.y--;
                if (this.y < option.minFactor) {this.y=option.factor}
                this.makeKey();

                count ++;
                if (count>this.needToPass) {
                    //this.roundComplete = true;
                    break
                } // got it all
            }
        } catch(err) {} // ignore error, they don't got it yet 
   
        // display question
        this.qText.text = this.keyD;

        
        // display answers in random order
        // no two same answers in a row
        //var random = 1;
        var random = Phaser.Math.RND.integerInRange(1, 3);
        while (random == this.lastRandom) {
             random = Phaser.Math.RND.integerInRange(1, 3);
         }
        this.lastRandom = random;

        switch (random) {
            case 1:
                //code block
                this.answerButton = 1;
                this.b1Text = this.a
                this.b2Text = this.w1
                this.b3Text = this.w2
                break;
            case 2:
                //code block
                this.answerButton = 2;
                this.b1Text = this.w1
                this.b2Text = this.a
                this.b3Text = this.w2
                break;
            case 3:
                //code block
                this.answerButton = 3;
                this.b1Text = this.w2
                this.b2Text = this.w1
                this.b3Text = this.a
                break;
            
            default:
                //code block
                break;
        }
    },

    makeKey: function () {
        
        switch (option.questionType) {
            case 3: // Multiplication
                //code block
                this.a = this.x * this.y;
                this.key = this.x + ' x ' + this.y;
                this.keyD = this.x + ' x ' + this.y;
                this.w1 = (this.x - 1) * this.y;
                this.w2 = this.x * (this.y + 1);
                if (this.y == 0 && this.x == 0) {
                    this.w1 = 1;
                    this.w2 = -1;
                } else {
                    if (this.y == 0) {
                        this.w1 = 1;
                        this.w2 = this.x;
                    } else {
                        if (this.x == 0) {
                            this.w1 = 1;
                            this.w2 = this.y;
                        }
                    }
                }
                break;
            case 4: // Division
                //code block
                this.a = this.x*this.y / this.x;
                this.key = this.x + ' ÷ ' + this.y;
                this.keyD = this.x*this.y + ' ÷ ' + this.x;
                this.w1 = Math.round(((this.x) * this.y) / this.x)-1;
                this.w2 = Math.round(((this.x) * (this.y)) / this.x)+2;
                if (this.y == 0 && this.x == 0) {
                    this.w1 = 1;
                    this.w2 = -1;
                } else {
                    if (this.y == 0) {
                        this.w1 = 'Und';
                        this.w2 = this.x;
                    } else {
                        if (this.x == 0) {
                            this.w1 = 1;
                            this.w2 = this.y;
                        }
                    }
                }
                break;
            case 1: // addition
                //code block
                this.a = this.x + this.y;
                this.key = this.x + ' + ' + this.y;
                this.keyD = this.x + ' + ' + this.y;
                this.w1 = (this.x - 1) + this.y;
                this.w2 = this.x + (this.y + 1);
                if (this.y == 0 && this.x == 0) {
                    this.w1 = 1;
                    this.w2 = -1;
                } else {
                    if (this.y == 0) {
                        this.w1 = 1;
                        this.w2 = this.x;
                    } else {
                        if (this.x == 0) {
                            this.w1 = 1;
                            this.w2 = this.y;
                        }
                    }
                }
                break;
            case 2: // subtraction
                //code block
                this.a = this.x - this.y;
                this.key = this.x + ' - ' + this.y;
                this.keyD = this.x + ' - ' + this.y;
                this.w1 = ((this.x) - this.y)-1;
                this.w2 = (this.x - (this.y))+1;
                if (this.y == 0 && this.x == 0) {
                    this.w1 = 1;
                    this.w2 = -1;
                } else {
                    if (this.y == 0) {
                        this.w1 = 1;
                        this.w2 = this.x;
                    } else {
                        if (this.x == 0) {
                            this.w1 = 1;
                            this.w2 = this.y;
                        }
                    }
                }
                break;
            default:
                //code block
                break;
        }

    },


    go: function() {
        this.button1.setFrame(0);
        this.button2.setFrame(0);
        this.button3.setFrame(0);
        this.button1.inputEnabled = true;
        this.button2.inputEnabled = true;
        this.button3.inputEnabled = true;
        this.buttonGo.inputEnabled = false;
        this.qRText.text = '';
        this.qWText.text = '';
        this.trigger = true;
        this.slow = false;
        //this.qText.style.backgroundColor = '#000000';

        this.questCurr++;
        this.nextQuestion();
        this.updateText();
        
        this.startTime = this.time.now;
        this.timer = true;

    },

    checkAnswer: function(answerButton) {
        // stop the timer
        this.timer = false;
        this.myTime = this.timerText.text;

        // disable answer buttons
        this.button1.inputEnabled = false;
        this.button2.inputEnabled = false;
        this.button3.inputEnabled = false;
        this.buttonGo.inputEnabled = true;
        var right = false;
        // check if correct button pressed
        if (this.answerButton == answerButton) { // right answer
            this.questRight++;
            if (this.slow) {
                this.qRText.text = " Slow but Correct! ";
                } else {
                    this.qRText.text = " Correct! ";
            }
            right = true;
            if(Povin.SFXStatus) {this.perfectSfx.play();}
        } else { // wrong answer
            this.myTime ++; // 1 second penalty for wrong
            if (this.slow) {
                this.qWText.text = " Slow and Wrong! ";
            } else {
                this.qWText.text = " Wrong! ";
            }
            right = false;
            if(Povin.SFXStatus) {this.wrongSfx.play();}
        }

        // total cummulative questions so far
        this.questCum++;
        // update the text on the screen
        this.updateText(true);

        this.saveResults(right, this.key, Number(this.myTime)*1000);

        this.checkIfFinished(); // show if finished base round or gotIt all
      
    },

    checkIfFinished: function () {

        if (this.needToPass == this.countOfPassed()) {
            this.roundComplete=true;
        } else {
            this.roundComplete=false;
        }
  
        // console.log('checkIfFinished: needToPass='+this.needToPass+
        // ', countOfTried='+ this.countOfTried()+
        // ', countOfPassed='+this.countOfPassed()+
        // ", finishedBaseRound="+this.finishedBaseRound()+
        // ', roundComplete='+this.roundComplete);

        if (this.finishedBaseRound()) {

            // display 'Extended Round' message
            this.sText.text = ' Extended Round ';
            //this.sText.style.backgroundColor = '#979696';
        }

        if (this.roundComplete) {

            // display 'Round Complete' message
            this.sText.text = ' Round Complete! '
            //this.sText.style.backgroundColor = '#005300';
        }
    },

    saveResults: function (right, key, timer) {
        key = option.getPlayerId()+'.' + key; // key = playerid + equation. ex. "player1.6 x 7"

        var currTime;
        var runningTimeAvg;
        var prevKey;
        var prevCount;
        var totCount;
        var prevAvg;
    
        try {
            currTime = Number(timer); // convert this try timer into number for current try

            // check array for previous trys on this key
            prevKey = Povin.scoreArr[key]; // get previous try data from array, fails 1st time
            prevCount = Number(prevKey.totCount); // previous number of tries     
            prevAvg = Number(prevKey.runningTimeAvg); // previous running avg for all tries

            // calc new total number of tries on this key
            totCount = prevCount + 1;

            // calc running avg here
            // new average = old average + (next data - old average) / next count
            runningTimeAvg = prevAvg + (currTime - prevAvg) / totCount; 
            ///console.log('trid this key before, running avg= ' + key + ' '+runningTimeAvg);
        } catch (err) { 
            // no previous key so create it all new
            runningTimeAvg = Number(timer);
            totCount = 1; // first time to try this key
            ///console.log('first time trying this key '+key)
        }

        // store time, right, avg, and count
        Povin.scoreArr[key] = { student: option.getPlayerId(), time: currTime, level: option.level, factor: this.y, right: right, runningTimeAvg: runningTimeAvg, totCount: totCount, keyD: this.keyD };
        //console.log(Povin.scoreArr);
    },

    countOfPassed: function() {

        var count = 0;
        for (let obj of Object.values(Povin.scoreArr)) {

            if (obj.right && obj.time <= option.buzzer) {
                count++// right and fast - GotIt!
            } else {
                // still not correct
            }
        }
        return count;
    },

    countOfTried: function() {

        return Object.keys(Povin.scoreArr).length;

    },

    finishedBaseRound: function() { 

        if (this.countOfTried() == (option.factor-option.minFactor)+1 ) {
            return true;
        } else {
            return false;
        }

    },

    // check if key has been answered correctly and in required time
    gotIt: function (key) {

        key = option.getPlayerId()+'.' + key;
        //console.log('gotIt='+key + Povin.scoreArr[key])
        if (Povin.scoreArr[key].right && Povin.scoreArr[key].time <= option.buzzer) {
            return true; // right and fast - GotIt!
        } else {
            return false; // still needs to study this one
        }
    },

    // update the text on the screen
    updateText: function (showAnswer) {

        // showAnswer
        if (showAnswer) {
            this.qText.text = '     '+this.qText.text+' = '+this.a + '     ';
            //this.qText.style.backgroundColor = '#005300';
        }

        // correct number of questions
        this.r2Text.text = this.questRight + '/' + this.questCum;

        // update button text to the correct ans and 2 non correct
        this.a1Text.text = this.b1Text;
        this.a2Text.text = this.b2Text;
        this.a3Text.text = this.b3Text;

    },

    // button One
    actionOnClick1: function (config) {
        if (config.ctx.button1.inputEnabled) {
            config.ctx.button1.setFrame(1);
            
            config.ctx.checkAnswer(1);
        }
        
    },

    // button Two
    actionOnClick2: function (config) {
        if (config.ctx.button2.inputEnabled) {
            config.ctx.button2.setFrame(1);
            
            config.ctx.checkAnswer(2);
        }

    },

    // button Three
    actionOnClick3: function (config) {
        if (config.ctx.button3.inputEnabled) {
            config.ctx.button3.setFrame(1);
            config.ctx.checkAnswer(3);
        }

    },

    // button Go
    actionOnClickGo: function (config) {
        
        if (config.ctx.buttonGo.inputEnabled) {
            if (config.ctx.roundComplete) {
                config.ctx.nextScene();
            }

            // not complete so go again
            config.ctx.go();
        }

    },
    
    nextScene: function() {
        this.scene.start('Scores', true, false); // go to Scores
    },
  
});
