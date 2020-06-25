/**
 * References and Credit:
 *  - Images: https://kenney.nl/assets/ui-pack-space-expansion
 *  - Health Bar Tutorial: https://blog.ourcade.co/posts/2020/animated-health-bar-phaser-3/
 *
 * TODO: refactor code into a seperate re-usable component
*/

import Phaser from 'phaser';

class Day1 extends Phaser.Scene {
  private fullWidth!: number;
  private leftCap!: Phaser.GameObjects.Image;
  private middle!: Phaser.GameObjects.Image;
  private rightCap!: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: 'Day1',
      active: false,
    });
  }

  public init() {
    this.fullWidth = 300;
  }

  public preload() {
    this.load.image('left-cap', '../../images/barHorizontal_green_left.png');
    this.load.image('middle', '../../images/barHorizontal_green_mid.png');
    this.load.image('right-cap', '../../images/barHorizontal_green_right.png');

    this.load.image('left-cap-shadow', '../../images/barHorizontal_shadow_left.png');
    this.load.image('middle-shadow', '../../images/barHorizontal_shadow_mid.png');
    this.load.image('right-cap-shadow', '../../images/barHorizontal_shadow_right.png');
  }

  public create() {
    const y = this.cameras.main.height / 2;
    const x = this.cameras.main.width / 3;

    // background shadow
    const leftShadowCap = this.add.image(x, y, 'left-cap-shadow').setOrigin(0, 0.5);

    const middleShaddowCap = this.add.image(leftShadowCap.x + leftShadowCap.width, y, 'middle-shadow').setOrigin(0, 0.5);
    middleShaddowCap.displayWidth = this.fullWidth;

    this.add.image(middleShaddowCap.x + middleShaddowCap.displayWidth, y, 'right-cap-shadow').setOrigin(0, 0.5);

    // health bar
    this.leftCap = this.add.image(x, y, 'left-cap').setOrigin(0, 0.5);

    this.middle = this.add.image(this.leftCap.x + this.leftCap.width, y, 'middle').setOrigin(0, 0.5);

    this.rightCap = this.add.image(this.middle.x + this.middle.displayWidth, y, 'right-cap').setOrigin(0, 0.5);

    this.setMeterPercentage(1);
    this.setMeterPercentageAnimated(0.2, 4000);
  }

  private setMeterPercentage(percent: number = 1): void {
    const width = this.fullWidth * percent;

    this.middle.displayWidth = width;
    this.rightCap.x = this.middle.x + this.middle.displayWidth;
  }

  private setMeterPercentageAnimated(percent: number = 1, duration: number = 1000): void {
    const width = this.fullWidth * percent;

    this.tweens.add({
      targets: this.middle,
      displayWidth: width,
      duration,
      ease: Phaser.Math.Easing.Sine.Out,
      onUpdate: () => {
        this.rightCap.x = this.middle.x + this.middle.displayWidth;

        this.leftCap.visible = this.middle.displayWidth > 0;
        this.middle.visible = this.middle.displayWidth > 0;
        this.rightCap.visible = this.middle.displayWidth > 0;
      },
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: 'game',
    width: 800,
    height: 600,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Day1],
};

export default new Phaser.Game(config);
