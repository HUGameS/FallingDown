import Phaser from 'phaser'
import WebFont from 'webfontloader'
import * as firebase from "firebase";

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Nunito']
      },
      active: this.fontsLoaded
    })
    
        var config = {
        apiKey: "AIzaSyBRHRa-szoMtMlkInMfQBaelI1XKJGzWes",
        authDomain: "fallingdown-aa1cd.firebaseapp.com",
        databaseURL: "https://fallingdown-aa1cd.firebaseio.com",
        storageBucket: "fallingdown-aa1cd.appspot.com",
    };
      
    firebase.initializeApp(config);  
     
      
      var storage = firebase.storage();
      var storageRef = storage.ref();
      var highScoreStorageRef = storageRef.child('highscore.txt');

    

    // Highscore from localstorage (one entry) 
    if(localStorage.getItem('FallingDownHighscore') === null){

        localStorage.setItem('FallingDownHighscore',this.game.score);

    }

    else if(this.game.score > localStorage.getItem('FallingDownHighscore')){

        localStorage.setItem('FallingDownHighscore',this.game.score);

    }

    let gameOverSound,
    message = `YOU FUCKED UP  

    SCORE: ${this.game.score}
    HIGHSCORE: ${localStorage.getItem('FallingDownHighscore')}

    Press up arrow to play again`;
      
    highScoreStorageRef.putString(this.game.score.toString()).then(function(snapshot) {
    console.log('Uploaded a raw string!');
    });

    let text = this.add.text(this.world.centerX, this.world.centerY, message, { font: '16px Arial', fill: '#000000', align: 'center' })
    text.anchor.setTo(0.5, 0.5)
    

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    gameOverSound = this.add.audio('gameOverSound');
    gameOverSound.play();
    console.log(this);
  }

  render () {
    if (this.cursors.up.isDown) {
        this.state.start('Game')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
