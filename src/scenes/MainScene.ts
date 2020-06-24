import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'MainScene',
      active: false,
    });
  }

  public create() {
    this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'hello world').setOrigin(0.5);
  }
}
