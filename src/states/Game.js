/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Platform from '../sprites/Platform'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
      
    var gameOverSound;
    var music;
      
    this.music = this.add.audio('gameMusic');
    this.music.play();
      
   
    // let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack')
    // banner.font = 'Nunito'
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.anchor.setTo(0.5)

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'falling-down-face'
    })

    this.platform1 = new Platform({
      game: this.game,
      x: this.game.world.centerX + 200,
      y: this.game.world.centerY + 80,
      asset: 'loaderBar'
    })

    this.platform2 = new Platform({
      game: this.game,
      x: this.game.world.centerX - 810,
      y: this.game.world.centerY + 80,
      asset: 'loaderBar'
    })

    // set the sprite width to 30% of the game width
    setResponsiveWidth(this.mushroom, 30, this.game.world)
    this.game.add.existing(this.mushroom)
    this.mushroom.scale.setTo(1, 1);
    this.game.add.existing(this.platform1)
    this.platform1.scale.setTo(3, 1);
    this.game.add.existing(this.platform2)
    this.platform2.scale.setTo(3, 1);

    this.level = 1;
    this.levelInc = 0;
    this.game.score = 0;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.scoreText = this.add.text(this.game.width - 100, 20, this.game.score, { font: '16px Arial', fill: '#000000', align: 'center' });
    this.scoreText.anchor.setTo(0.5, 0.5);
      
    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.y = 500;
    game.physics.enable( [ this.mushroom, this.platform1, this.platform2 ], Phaser.Physics.ARCADE);
    this.mushroom.body.bounce.set(0.3);
    this.mushroom.body.setSize(40, 40, 20, 20);
    this.platform1.body.allowGravity = false;
    this.platform1.body.immovable = true;
    this.platform2.body.allowGravity = false;
    this.platform2.body.immovable = true;

    this.mushroom.body.collideWorldBounds = true;
      
    this.cursors = game.input.keyboard.createCursorKeys();
    this.platform1.body.velocity.y = -50;
    this.platform2.body.velocity.y = -50;
    this.resetPlatform();
  }

  resetPlatform() {
    this.levelInc += 1;
    if(this.levelInc === 4) {
      this.levelInc = 0;
      this.level += 1;
      this.platform1.body.velocity.y -= 30;
      this.platform2.body.velocity.y -= 30;
    }
    const offset = Math.floor(Math.random() * 610);
    this.platform1.body.position.y = this.game.height;
    this.platform1.body.position.x = offset + 200;
    this.platform2.body.position.y = this.game.height;
    this.platform2.body.position.x = offset - 810 ;
  }

  update () {
    this.game.score += this.level;
    this.scoreText.setText(`level: ${this.level} score: ${this.game.score}`);
      
    // TODO: add preload bar and play the music when it's loaded
    // if(this.cache.isSoundDecoded('gameMusic') === true)

    game.physics.arcade.collide(this.mushroom, this.platform1);
    game.physics.arcade.collide(this.mushroom, this.platform2);
    if (this.cursors.left.isDown) {
       this.mushroom.body.velocity.x -= 10;
    
    } else if (this.cursors.right.isDown) {
        this.mushroom.body.velocity.x += 10;
    }

    if(this.platform1.y <= 0) {
      this.resetPlatform();
    }

    if(this.mushroom.body.y === 0) {
        this.music.stop();
        this.state.start('Game over')
    }
  }
    


  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
      // this.game.debug.spriteInfo(this.platform1, 32, 32)
    }
  }
}
