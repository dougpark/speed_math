/**************************************************************************************
* Math State (Povin Speed Math)
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

        // background image
        this.background = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'background');
        this.background.alpha = 1;

        // screen rectangle
        this.graphics = this.add.graphics(0, 0);
        this.graphics.clear();
        this.graphics.lineStyle(4, 0x979595, 1);
        this.graphics.strokeRect(0, 0, game.config.width, game.config.height);

        // audio
        this.perfectSfx = this.sound.add('perfectSfx');
        this.wrongSfx = this.sound.add('wrongSfx');
        this.lateSfx = this.sound.add('lateSfx');

        // Speaker button to start/stop the background music
        this.buttonSpeaker = this.add.image(0, 0, 'buttonSpeaker').setInteractive();
        this.buttonSpeaker.on('pointerdown', function () {
            Povin.actionOnClickSpeaker({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonSpeaker.setOrigin(0.5, 0.5);
        this.buttonSpeaker.setScale(1, 1);
        Povin.place(this.buttonSpeaker, 0.9, 0.07);
        Povin.setSpeakerTexture(this.buttonSpeaker);

        // Home button to return to the main menu
        this.buttonHome = this.add.image(0, 0, 'buttonHome').setInteractive();
        this.buttonHome.on('pointerdown', function () {
            Povin.actionOnClickHome({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonHome.setOrigin(0.5, 0.5);
        this.buttonHome.nextState = 'MainMenu';
        this.buttonHome.setScale(.8);
        this.buttonHome.normScale = .8;
        Povin.place(this.buttonHome, 0.09, 0.07);

        // animate the invader
        // var config = {
        //     key: 'fly',
        //     frames: this.anims.generateFrameNumbers('invader', {
        //         frames: [0, 1, 2, 3]
        //     }),
        //     frameRate: 20,
        //     repeat: -1
        // };

        //this.anims.create(config);
        this.invader = this.add.sprite(0, 0, 'invader').play('fly');
        this.invader.setOrigin(0.5, 0.5);
        Povin.place(this.invader, .2, .95);
        
        // this.invaderTween = this.tweens.add(this.invader).to({ x: Povin.placeX(.8), y: Povin.placeY(.95) },
        //     option.buzzer, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);
        game.ctx.tweens.add({
            targets: this.invader,
            x: Povin.placeX(.8),
            y: Povin.placeY(.95),
            ease: 'Phaser.Math.Easing.Linear',
            yoyo: true,
            repeat: -1,
            duration: option.buzzer
        });
        
        // invader 2
        this.invader2 = this.add.sprite(0, 0, 'invader').play('fly');
        this.invader2.setOrigin(0.5, 0.5);
        Povin.place(this.invader2, .5, .15);

        // One Button
        // this.button1 = game.add.button(0, 0, 'buttonAnswer', this.actionOnClick1, this, 1, 0, 0);
        // this.button1.setOrigin(0.5, 0.5);
        // this.button1.scale.setTo(1, 1);
        // Povin.place(this.button1, 0.3, 0.67);
        // this.button1.inputEnabled = true;
        this.button1 = this.add.image(0, 0, 'buttonAnswer').setInteractive();
        this.button1.on('pointerdown', function () {
            game.ctx.actionOnClick1({
                target: this,
                ctx: game.ctx
            });
        });
        this.button1.inputEnabled = true;
        this.button1.setOrigin(0.5, 0.5);
        Povin.place(this.button1, 0.3, 0.67);
    
        // Two Button
        // this.button2 = game.add.button(0, 0, 'buttonAnswer', this.actionOnClick2, this, 1, 0, 0);
        // this.button2.anchor.setTo(0.5, 0.5);
        // this.button2.scale.setTo(1, 1);
        // Povin.place(this.button2, 0.5, 0.67);
        // this.button2.inputEnabled = true;
        // this.button2.events.onInputDown.add(this.onInputDown, this);
        // this.button2.events.onInputUp.add(this.onInputUp, this);
        this.button2 = this.add.image(0, 0, 'buttonAnswer').setInteractive();
        this.button2.on('pointerdown', function () {
            game.ctx.actionOnClick2({
                target: this,
                ctx: game.ctx
            });
        });
        this.button2.inputEnabled = true;
        this.button2.setOrigin(0.5, 0.5);
        Povin.place(this.button2, 0.5, 0.67);

        // Three Button
        // this.button3 = game.add.button(0, 0, 'buttonAnswer', this.actionOnClick3, this, 1, 0, 0);
        // this.button3.anchor.setTo(0.5, 0.5);
        // this.button3.scale.setTo(1, 1);
        // Povin.place(this.button3, 0.7, 0.67);
        // this.button3.inputEnabled = true;
        // this.button3.events.onInputDown.add(this.onInputDown, this);
        // this.button3.events.onInputUp.add(this.onInputUp, this);
        this.button3 = this.add.image(0, 0, 'buttonAnswer').setInteractive();
        this.button3.on('pointerdown', function () {
            game.ctx.actionOnClick3({
                target: this,
                ctx: game.ctx
            });
        });
        this.button3.inputEnabled = true;
        this.button3.setOrigin(0.5, 0.5);
        Povin.place(this.button3, 0.7, 0.67);
        
        // Disable until Go
        this.button1.inputEnabled = false;
        this.button2.inputEnabled = false;
        this.button3.inputEnabled = false;

        // Go Button
        // this.buttonGo = game.add.button(0, 0, 'buttonGo', this.actionOnClickGo, this, 2, 2, 2);
        // this.buttonGo.anchor.setTo(0.5, 0.5);
        // this.buttonGo.scale.setTo(1, 1);
        // Povin.place(this.buttonGo, 0.5, 0.85);
        // this.buttonGo.inputEnabled = true;
        // this.buttonGo.events.onInputDown.add(this.onInputDown, this);
        // this.buttonGo.events.onInputUp.add(this.onInputUp, this);
        this.buttonGo = this.add.image(0, 0, 'buttonGo').setInteractive();
        this.buttonGo.on('pointerdown', function () {
            game.ctx.actionOnClickGo({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonGo.inputEnabled = true;
        this.buttonGo.setOrigin(0.5, 0.5);
        Povin.place(this.buttonGo, 0.5, 0.85);
        
        //  title Text
        this.title = this.add.sprite(0, 0, 'title');
        this.title.setOrigin(0.5, 0.5);
        this.title.setScale(1, 1);
        Povin.place(this.title, 0.5, 0.07);
  
        //  Question Text
        this.qString = ' Press Go \n to Start ';
        this.qText = this.add.text(0, 0, this.qString, { font: '30px ' + this.myFont2, fill: '#ebebeb', backgroundColor: '#005300', align: 'center' });
        this.qText.setOrigin(0.5,0.5);
        Povin.place(this.qText, 0.5, 0.45);

        //  Status Text
        this.sString = '';
        this.sText = this.add.text(0, 0, this.sString, { font: '24px ' + this.myFont, fill: '#ebebeb', backgroundColor: '#005300', align: 'center' });
        this.sText.setOrigin(0.5, 0.5);
        Povin.place(this.sText, 0.5, 0.37);

        //  Question Result Text
        this.qRString = '';
        this.qRText = this.add.text(0, 0, this.qRString, { font: '24px ' + this.myFont, fill: '#ebebeb', backgroundColor: '#005300', align: 'center' });
        this.qRText.setOrigin(0.5, 0.5);
        Povin.place(this.qRText, 0.5, 0.760);

        //  Question Wrong Result Text
        this.qWString = '';
        this.qWText = this.add.text(0, 0, this.qRString, { font: '24px ' + this.myFont, fill: '#ebebeb', backgroundColor: '#ad0000', align: 'center' });
        this.qWText.setOrigin(0.5, 0.5);
        Povin.place(this.qWText, 0.5, 0.760);

        //  Answer 1 Text
        this.a1String = '';
        this.a1Text = this.add.text(0, 0, this.a1String, { font: '20px ' + this.myFont2, fill: '#ebebeb', align: 'center' });
        this.a1Text.setOrigin(0.5, 0.5);
        Povin.place(this.a1Text, 0.3, 0.6);

        //  Answer 2 Text
        this.a2String = '';
        this.a2Text = this.add.text(0, 0, this.a2String, { font: '20px ' + this.myFont2, fill: '#ebebeb', align: 'center' });
        this.a2Text.setOrigin(0.5, 0.5);
        Povin.place(this.a2Text, 0.5, 0.6);

        //  Answer 3 Text
        this.a3String = '';
        this.a3Text = this.add.text(0, 0, this.a3String, { font: '20px ' + this.myFont2, fill: '#ebebeb', align: 'center' });
        this.a3Text.setOrigin(0.5, 0.5);
        Povin.place(this.a3Text, 0.7, 0.6);

        // Level Heading
        this.cString = 'Level';
        this.cText = this.add.text(0, 0, this.cString, { font: '20px ' + this.myFont, fill: '#ad0000', align: 'center' });
        this.cText.setOrigin(0.5, 0.5);
        Povin.place(this.cText, 0.2, 0.24);
        // Level Text
        this.c2String = option.level;
        this.c2Text = this.add.text(0, 0, this.c2String, { font: '20px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.c2Text.setOrigin(0.5, 0.5);
        Povin.place(this.c2Text, 0.2, 0.3);

        // Right Count Heading
        this.rString = 'Right';
        this.rText = this.add.text(0, 0, this.rString, { font: '20px ' + this.myFont, fill: '#ad0000', align: 'center' });
        this.rText.setOrigin(0.5, 0.5);
        Povin.place(this.rText, 0.8, 0.24);
        // Right Count Text
        this.r2String = '0';
        this.r2Text = this.add.text(0, 0, this.r2String, { font: '20px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.r2Text.setOrigin(0.5, 0.5);
        Povin.place(this.r2Text, 0.8, 0.3);

        // Timer Heading
        this.tHString = 'Time';
        this.tHText = this.add.text(0, 0, this.tHString, { font: '20px ' + this.myFont, fill: '#ad0000', align: 'center' });
        this.tHText.setOrigin(0.5, 0.5);
        Povin.place(this.tHText, 0.5, 0.24);
        // Timer Text
        this.timerString = '0';
        this.timerText = this.add.text(0, 0, this.timerString, { font: '20px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.timerText.setOrigin(0.5, 0.5);
        Povin.place(this.timerText, 0.5, 0.3);

        // setup questions
        this.initQuestion();
        
    }, // end create
    
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
        this.qText.style.backgroundColor = '#000000';

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
            this.sText.style.backgroundColor = '#979696';
        }

        if (this.roundComplete) {

            // display 'Round Complete' message
            this.sText.text = ' Round Complete! '
            this.sText.style.backgroundColor = '#005300';
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
            this.qText.style.backgroundColor = '#005300';
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
                config.ctx.nextState();
            }

            // not complete so go again
            config.ctx.go();
        }

    },

    onInputDown: function (target) {
        target.sx = target.scale.x;
        target.sy = target.scale.y;
        game.add.tween(target.scale).to({
            x: target.sx*.8,
            y: target.sy*.8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUp: function (target) {
        game.add.tween(target.scale).to({
            x: target.sx,
            y: target.sy
        }, 100, Phaser.Easing.Cubic.Out, true);
    },
    
    nextState: function() {
        this.scene.start('Scores', true, false); // go to Scores
    },

    
    

    scaleAt: function(n) {
        //scale n based on original-scale and current display scale
        
        n = n * (this.game.width / 400);

        return n;

    },



    one: function () {
        //  Top Center
        this.tString = 'top center ';
        this.tText = game.add.text(0,0, this.tString, { font: '16px ' + this.myFont, fill: '#0099ff', align: 'center' });
        this.tText.anchor.setTo(0.5, 0.5);
        Povin.place(this.tText, 0.5, 0.1);
        

        //  Bottom Center
        this.tString2 = 'bottom center ';
        this.tText2 = game.add.text(0,0, this.tString2, { font: '16px ' + this.myFont, fill: '#0099ff', align: 'center' });
        this.tText2.anchor.setTo(0.5, 0.5);
        Povin.place(this.tText2, 0.5, 0.9);
        

        //  Left Center
        this.tString3 = 'left center ';
        this.tText3 = game.add.text(0,0, this.tString3, { font: '16px ' + this.myFont, fill: '#0099ff', align: 'center' });
        this.tText3.anchor.setTo(0.5, 0.5);
        Povin.place(this.tText3, 0.1, 0.5);
        

        //  right Center
        this.tString4 = 'right center ';
        this.tText4 = game.add.text(0,0, this.tString4, { font: '16px ' + this.myFont, fill: '#0099ff', align: 'center' });
        this.tText4.anchor.setTo(0.5, 0.5);
        Povin.place(this.tText4, 0.9, 0.5);
        
        

    },

});
