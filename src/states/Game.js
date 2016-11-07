/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Platform from '../sprites/Platform'
import {setResponsiveWidth} from '../utils'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack')
    banner.font = 'Nunito'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)
    console.log(this.game);

    this.mushroom = new Mushroom({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'mushroom'
    })

    this.platform = new Platform({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY + 80,
      asset: 'loaderBar'
    })

    // set the sprite width to 30% of the game width
    setResponsiveWidth(this.mushroom, 30, this.game.world)
    this.game.add.existing(this.mushroom)
    this.mushroom.scale.setTo(1, 1);
    this.game.add.existing(this.platform)
    this.platform.scale.setTo(1, 1);

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.y = 100;
    game.physics.enable( [ this.mushroom, this.platform ], Phaser.Physics.ARCADE);
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;

    this.mushroom.body.collideWorldBounds = true;
      
    this.cursors = game.input.keyboard.createCursorKeys();
    this.platform.body.velocity.y = -50;
    this.resetPlatform();
  }

  resetPlatform() {
    this.platform.body.position.y = this.game.height;
    this.platform.body.velocity.y -= 10;
  }

  update () {
    game.physics.arcade.collide(this.mushroom, this.platform);
      
    if (this.cursors.left.isDown) {
       this.mushroom.body.velocity.x -= 3;
    
    } else if (this.cursors.right.isDown) {
        this.mushroom.body.velocity.x += 3;
    }

    if(this.platform.y <= 0) {
      this.resetPlatform();
    }

    if(this.mushroom.body.y === 0) {
      this.state.start('Game over')
    }
  }

  render () {
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
      this.game.debug.spriteInfo(this.platform, 32, 32)
    }
  }
}
