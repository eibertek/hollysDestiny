var controllerBox = function(img, gravity, position, width, height, bounds, options){
    this.img = null;
    this.name = '';
    this.id = Math.random().toString(36).substr(2);
    this.position= new game.canvas.vector(0,0);
    this.width = 0;
    this.height = 0;
    this.bounds = {};
    this.extra = {};
    this.life = 0;
    this.ethereal = false;
    this.visible = false;
    this.movable = true;
    this.grounded = false;
    this.creature = false;
    this.touched=false;
    this.enemyVelocity=3;
    this.velX = 0;
    this.velY = 0;
    this.speed= 3; 
    this.self = this;
    this.floor= false;
    this.limitWall = false;
    this.status = null;
    this.orientation = null;
    this.objectives = null;
    this.sprite = null;    
    this.create = function(img, gravity, position, width, height, options){
            if( typeof(img) != "undefined" && img != null){
                this.img= img;
            }
            if( typeof(gravity) != "undefined" ){
                this.gravity= gravity;
            }
            if( typeof(position) != "undefined"  && position instanceof game.canvas.vector ){
                this.position= position;
            }
            if( typeof(width) != "undefined" ){
                this.width= width;
            }
            if( typeof(height) != "undefined" ){
                this.height= height;
            }
            if ( typeof(options) != "undefined" ){
                    this.ethereal = options.ethereal;
                    if(typeof(options.movable) != "undefined" ) {
                        this.movable = options.movable;
                    }
                    if(typeof(options.floor) != "undefined" ) {
                        this.floor = options.floor;
                    }
                    if(typeof(options.name) != "undefined" ) {
                        this.name = options.name;
                    }                       
                    if(typeof(options.limitWall) != "undefined" ) {
                        this.limitWall = options.limitWall;
                    }         
                    if(typeof(options.creature) != "undefined" ) {
                        this.creature = options.creature;
                    } 
                    if(typeof(options.life) != "undefined" ) {
                        this.life = options.life;
                    }            
                    if(typeof(options.visible) != "undefined" ) {
                        this.visible = options.visible;
                    }else{
                        this.visible = false;
                    }                    
                    if(typeof(options.enemyVelocity) != "undefined" ) {
                        this.enemyVelocity = options.enemyVelocity;
                    }   
                    if(typeof(options.sprite) != "undefined"){
                        this.sprite=options.sprite;
                        if(typeof(this.sprite.static) != "undefined" && this.sprite.static){
                        }else{
                            with(this.sprite.left){
                                 spritesheet = new SpriteSheet(img, spritesheet[0], spritesheet[1]);
                                 idle = new Animation(spritesheet, idle[0], idle[1], idle[2]); 
                                 destroy = new Animation(spritesheet, destroy[0], destroy[1], destroy[2]);  
                            }
                            with(this.sprite.right){
                                 spritesheet = new SpriteSheet(img, spritesheet[0], spritesheet[1]);
                                 idle = new Animation(spritesheet, idle[0], idle[1], idle[2]); 
                                 destroy = new Animation(spritesheet, destroy[0], destroy[1], destroy[2]);
                            }  
                        }
                    }
            }                  
    };
    this.animate = function(status, displacedX){
        if(this.sprite === null) return false;
        if(this.sprite.static){
            game.canvas.drawImage(this.sprite.img, this.self.position.x,this.self.position.y,
                                          this.width, this.height, {});
        }else{
            if(this.orientation==constants.RIGHT){                
                spriteTemp =  this.sprite.left;
            }else{
                spriteTemp =  this.sprite.right;
            }
            switch(this.status){
                case constants.IDLE:
                    spriteTemp.idle.update();
                    spriteTemp.idle.draw(this.self.position.x-10, this.self.position.y-15);
                    //animate Idle
                    break;
                case constants.DESTROY:
                    spriteTemp.attack.update();
                    spriteTemp.attack.draw(this.self.position.x-10, this.self.position.y-15);
                    //animate Idle
                    break;         
                default:
                    spriteTemp.idle.update();
                    spriteTemp.idle.draw(this.self.position.x-10, this.self.position.y-15);
                    //animate Idle                    
                    break;
            }
        }
        this.movement(displacedX);
    };
    this.movement = function(displacedX){
     if(this.self.movable && !this.self.floor){   
        this.self.velX *= game.phisics.friction;
        this.self.velY += game.phisics.gravity;
        this.self.grounded= false;

        this.colliding();
        if(this.self.grounded){
             this.self.velY = 0;
        }
        //this.self.position.x+= this.self.velX;
        this.self.position.y += this.self.velY;
    }
    if (input.key_code[39] || input.key_code[68] || input.key_code[37] || input.key_code[65]) {
            this.touched = false;
    }   
    if(game.centered>0){
  //     this.self.position.x+= this.self.velX-game.centerVelocity;
    }
    
    };

    this.colliding = function(){
        for (var i = 0; i < game.objects.length; i++) {
            if(game.objects[i].ethereal) continue;
            if(this.self.id != game.objects[i].id && !game.objects[i].limitWall){
                var dir = game.colCheck(this.self, game.objects[i]);
                if (dir === "l" || dir === "r") {
                    this.self.velX = 0;
                } else if (dir === "b") {
                    this.self.grounded = true;
                } else if (dir === "t") {
                    this.self.velY *= -1;
                }
            }
        }
    };  
    this.create(img, gravity, position, width, height, bounds, options);
};