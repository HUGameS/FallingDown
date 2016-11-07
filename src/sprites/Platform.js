import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)

    this.game = game
    console.log(this)
    this.anchor.setTo(0.5)
  }

  update () {
  }

}
