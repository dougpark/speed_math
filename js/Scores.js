/**************************************************************************************
* Scores State (Povin Speed Math)
* @author Doug Park
* @version v1.0
* @desc Display Menu Options
* @date 2018-09-06
**************************************************************************************/
"use strict";

var Scores = new Phaser.Class({
            Extends: Phaser.Scene,
            initialize: function scores() {
                Phaser.Scene.call(this, {
                    key: "Scores"
                });
            },

    init: function () {

        this.myFont = 'VenusRising';

        // copy level array into history array
        this.copyToHistory();
        this.typeId = option.getTypeId(); // current typeId
        game.ctx = this;

    },

    copyToHistory: function () {


        for (let key of Object.keys(Povin.scoreArr)) {

            Povin.historyArr[key] =  Povin.scoreArr[key]; 
           

        }
        
        
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

        //  Title Text
        this.title = this.add.sprite(0, 0, 'title');
        this.title.setOrigin(0.5, 0.5);
        this.title.setScale(1, 1);
        Povin.place(this.title, 0.5, 0.07);


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
       Povin.setSpeakerFrame(this.buttonSpeaker);

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

        // Go Button
        this.buttonGo = this.add.image(0, 0, 'buttonGo').setInteractive();
        this.buttonGo.on('pointerdown', this.nextState, this);

        this.buttonGo.setOrigin(0.5, 0.5);
        this.buttonGo.setScale(1, 1);
        Povin.place(this.buttonGo, 0.5, 0.90);
        this.buttonGo.inputEnabled = true;

        // History Heading
        this.aString = option.getTypeSt();
        this.aText = this.add.text(0, 0, this.aString, { font: '20px ' + this.myFont, fill: '#ad0000', align: 'center' });
        this.aText.setOrigin(0.5, 0.5);
        Povin.place(this.aText, 0.5, 0.20);
        // ArPlus
        this.buttonArPlus = this.add.image(0, 0, 'buttonPlus').setInteractive();
        this.buttonArPlus.on('pointerdown', function () {
            game.ctx.actionOnClickAr({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonArPlus.direction = 1;
        this.buttonArPlus.setOrigin(0.5, 0.5);
        //this.buttonArPlus.setScale(.8, .8);
        Povin.place(this.buttonArPlus, 0.9, 0.20);

        // ArMinus
        this.buttonArMinus = this.add.image(0, 0, 'buttonMinus').setInteractive();
        this.buttonArMinus.on('pointerdown', function () {
            game.ctx.actionOnClickAr({
                target: this,
                ctx: game.ctx
            });
        });
        this.buttonArMinus.direction = -1;
        this.buttonArMinus.setOrigin(0.5, 0.5);
        //this.buttonArPlus.setScale(.8, .8);
        Povin.place(this.buttonArMinus, 0.1, 0.20);

        // History Text
        this.hString = '';
        this.hText = this.add.text(0, 0, this.hString, { font: '14px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.hText.setOrigin(0, 0);
        Povin.place(this.hText, 0.15, 0.25);

        this.hyText = this.add.text(0, 0, '', { font: '14px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.hyText.setOrigin(0, 0);
        Povin.place(this.hyText, 0.1, 0.28);

        this.hxText = this.add.text(0, 0, '', { font: '14px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        this.hxText.setOrigin(0, 0);
        Povin.place(this.hxText, 0.15, 0.28);

        // create a new graphics obj for the chart grid
        this.chart = this.add.graphics(Povin.placeX(.16), Povin.placeY(.285));

        this.displayChart();

        this.displayHistory();
        
    }, // end create:

    actionOnClickAr: function (config) {
        config.ctx.typeId += config.target.direction;
        if (config.ctx.typeId > 4) {
            config.ctx.typeId = 1;
        }
        if (config.ctx.typeId < 1) {
            config.ctx.typeId = 4;
        }
        config.ctx.aText.text = option.getTypeSt(config.ctx.typeId);

        config.ctx.displayChart();

        config.ctx.displayHistory();
    },

    onInputDown: function (target) {
        target.sx = target.scale.x;
        target.sy = target.scale.y;
        game.add.tween(target.scale).to({
            x: target.sx * .8,
            y: target.sy * .8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUp: function (target) {
        game.add.tween(target.scale).to({
            x: target.sx,
            y: target.sy
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    // draw the chart grid
    displayChart: function() {

        
        //this.chart.key ='img'; 
        //this.chart.dirty=true;
        //this.chart.update();
        this.chart.clear();
        this.chart.update();

        // place the outline of the chart grid on the screen
        Povin.place(this.chart,.16,.285);
        this.chart.lineStyle(2, 0xebebeb, 1);
        this.chart.strokeRect(0,0,300,300);

        // position horiz numbers
        var basehX = Povin.placeX(.185);
        var basehY = Povin.placeY(.26);

        // position vertical numbers
        var basevX = Povin.placeX(.115);
        var basevY = Povin.placeY(.31);

        var iCount = 0;

        this.add.text(Povin.placeX(.05), Povin.placeY(.42),'F\nA\nC\nT\nO\nR\nS', { font: '12px ' + this.myFont, fill: '#ebebeb', align: 'center' });
        var m = this.add.text(Povin.placeX(.5), Povin.placeY(.8),'Met acuracy and speed requirements', { font: '12px ' + this.myFont, fill: '#005300', align: 'center' });
        m.setOrigin(0.5, 0.5);
        var p = this.add.text(Povin.placeX(.5), Povin.placeY(.82),'Need to keep practicing', { font: '12px ' + this.myFont, fill: '#ad0000', align: 'center' });
        p.setOrigin(0.5, 0.5);
        this.q = this.add.text(Povin.placeX(.5), Povin.placeY(.84), 'Avg time per problem: ', {
            font: '12px ' + this.myFont,
            fill: '#ebebeb',
            align: 'center'
        });
        this.q.setOrigin(0.5, 0.5);

        // show the type symbol outside the top left of grid
        //game.add.text(Povin.placeX(.1),Povin.placeY(.245), option.getTypeSym(), { font: '18px ' + this.myFont, fill: '#ebebeb', align: 'center' });

        this.hText = {};
       
        for (var i=0; i<=280; i+=20) {
            iCount++;
        
            // show the vertical numbers down left side of grid
            this.hText[i] = { num: this.add.text(0, 0, '', { font: '12px ' + this.myFont, fill: '#ebebeb', align: 'center' }) }
            this.hText[i].num.text = iCount;
            this.hText[i].num.setOrigin(0.5, 0.5);
            this.hText[i].num.x = basevX;
            this.hText[i].num.y = basevY + i;

            // show the horiz numbers across top of grid        
            this.hText[i+16] = { num: this.add.text(0, 0, '', { font: '12px ' + this.myFont, fill: '#ebebeb', align: 'center' }) }
            this.hText[i+16].num.text = iCount;
            this.hText[i+16].num.setOrigin(0.5, 0.5);
            this.hText[i+16].num.x = basehX + i;
            this.hText[i+16].num.y = basehY;

            // draw internal lines of grid
            this.chart.lineStyle(1, 0xebebeb, .5);
            this.chart.beginPath();
            this.chart.moveTo(0,i);
            this.chart.lineTo(300,i);
            this.chart.moveTo(i,0);
            this.chart.lineTo(i,300);
            this.chart.closePath();
            this.chart.strokePath();
            
        }
    },

    // fill in the little rectangles based on the score
    drawRect: function(x,y,color) {
        
        var myColor;
        var baseX = Povin.placeX(.185);
        var baseY = Povin.placeY(.26);
        var myX = 3+(x-1)*20;
        var myY = 3+(y-1)*20;

        if (color == 1) { myColor = '0x005300'}
        if (color == 2) { myColor = '0xad0000'}

        this.chart.lineStyle(1, myColor, .75);
        this.chart.fillStyle(myColor,.75);
        this.chart.fillRect(myX, myY, 15, 15);
    },


    // process history array for current type and display on grid
    displayHistory: function() {
        var x;
        var y;
        var key;
        var playerId = option.getPlayerId()+'.';
        var type = ' '+option.getTypeSym(this.typeId)+' ';
        var color = 1;
        var count = 0;
        var avg = 0;
        var totAvg = 0;

        for (y = 1; y<= 15; y++) {
            
            for (x = 1; x <= 15; x++) {
                key = playerId+ x + type + y;

                // if (x) {
                //     if (x%2==0) {color = 2} else {color =1}
                //     this.drawRect(x, y, color);
                // }

                if (Povin.historyArr[key]) {
                    if (Povin.historyArr[key].totCount > 1) {color =2} else {color=1}
                    // draw rectangle
                    this.drawRect(x,y,color);
                    count ++;
                    avg += Povin.historyArr[key].runningTimeAvg;
                } 
            }
            
        }

        // calc avg time for all problems
        totAvg = avg / count;
        this.q.text += (totAvg/1000).toFixed(4); // update text with avg time
    },


    onInputDown: function (target) {
        target.sx = target.scale.x;
        target.sy = target.scale.y;
        game.add.tween(target.scale).to({
            x: target.sx * .8,
            y: target.sy * .8
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    onInputUp: function (target) {
        game.add.tween(target.scale).to({
            x: target.sx,
            y: target.sy
        }, 100, Phaser.Easing.Cubic.Out, true);
    },

    update: function () {
    },


    render2: function () {
        var debug = this.game.debug;
        debug.text('height ' + game.world.height, 10, 120);
        debug.text('gameLevel ' + Povin.gameLevel, 10, 140);
        debug.text('Povin ' + Povin, 10, 160);

        debug.text("Phasers " + Phaser.VERSION + " " + ['AUTO', 'CANVAS', 'WEBGL', 'HEADLESS', 'WEBGL_MULTI'][this.game.renderType], 10, 540, 'white', debug.font);

    },

    nextState: function () {

        // reset and ready to play again
        Povin.scoreArr = {};
        Povin.next = 1; // add one to the next level number
    
        this.scene.start('MainMenu', true, false);
    },

});