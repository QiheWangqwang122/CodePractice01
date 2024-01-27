class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init(){
        this.PLAYER_VLOCITY = 350;
    }
    preload() {
        // 先给key也就是名字 // key  然后地址，然后宽
        this.load.spritesheet('character','./assets/spritesheets/Character_002.png',
        {
            frameWidth : 48
        

        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        // 括号里面宽，身高，和sprite sheet 名字最后是第几个1frame

        this.anims.create({
            key: 'walk-down',
            frameRate : 5,      // frame rate
            repeat : -1, // -1 is infinity repeat
            frames : this.anims.generateFrameNumbers('character', {
                start : 0,  // start frame 
                end : 2     // end frame 
            })
        })

        this.anims.create({
            key: 'idel-down',
            frames: [{ key: 'character', frame: 0 }],
            frameRate: 0

        })
        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
            frameRate: 5,
            repeat: -1
        });



        // Define idle animations for each direction
        // Example:
        this.anims.create({
            key: 'idel-left',
            frames: [{ key: 'character', frame: 3 }],
            frameRate: 0
        });

        this.anims.create({
            key: 'walk-right',
            frameRate : 5,      // frame rate
            repeat : -1, // -1 is infinity repeat
            frames : this.anims.generateFrameNumbers('character', {
                start : 6,  // start frame 
                end : 8     // end frame 
            })
        })
        this.anims.create({
            key: 'idel-right',
            frames: [{ key: 'character', frame: 6 }],
            frameRate: 0
        });
        this.anims.create({
            key: 'walk-up',
            frameRate : 5,      // frame rate
            repeat : -1, // -1 is infinity repeat
            frames : this.anims.generateFrameNumbers('character', {
                start : 9,  // start frame 
                end : 11     // end frame 
            })
        })
        this.anims.create({
            key: 'idel-up',
            frames: [{ key: 'character', frame: 9 }],
            frameRate: 0
        });
        
        this.player = this.physics.add.sprite(width/2 , height/2 , 'character' , 1).setScale(2)
        cursors = this.input.keyboard.createCursorKeys()
        this.player.body.setCollideWorldBounds(true)
        // collation box
        this.player.body.setSize(32,32).setOffset(8,16)
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0);
        let playerDirection = 'down'; // Ensure consistent variable naming
    
        // handle left and right 
        if (cursors.left.isDown) {
            playerVector.x = -1;
            playerDirection = 'left';
        } else if (cursors.right.isDown) {
            playerVector.x = 1;
            playerDirection = 'right';
        }
    
        // handle up/down
        if (cursors.up.isDown) {
            playerVector.y = -1;
            playerDirection = 'up';
        } else if (cursors.down.isDown) {
            playerVector.y = 1;
            playerDirection = 'down';
        }
    
        playerVector.normalize();
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y);
    
        let playerMovement = playerVector.length() ? 'walk-' + playerDirection : 'idel-' + playerDirection;
        this.player.play(playerMovement, true);
    }
}