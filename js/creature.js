var creature = function(img, gravity, position, width, height, bounds, options){
    this.img = null;
    this.name = '';
    this.id = Math.random().toString(36).substr(2);
    this.gravity= true;
    this.position= new game.canvas.vector(0,0);
    this.width = 0;
    this.height = 0;
    this.bounds = {};
    this.extra = {};
    this.life = 0;
    this.attack = 0;
    this.ethereal = false;
    this.visible = false;
    this.movable = true;
    this.grounded = false;
    this.creature = false;
    this.touched=false;
    this.damage = false;    
    this.enemyVelocity=3;
    this.velX = 0;
    this.velY = 0;
    this.speed= 3; 
    this.self = this;
    this.floor= false;
    this.limitWall = false;
    this.status = null;
    this.orientation = null;
    this.fullLife = null;
    this.objectives = {};
    this.firstgrounded = false;
    this.sprite = null;
    this.objectives.onDie = null;
    this.objectives.onAppear = null;
    this.offset = {x:-10,y:-15};
    this.movingAnimation = function(){
        if(this.self.velX<1 && this.self.velX>-2 && this.self.velY>-1) {
           this.self.status = constants.IDLE;
        }
        if(this.self.velY<=-1) {
           this.self.status = constants.JUMP;
        }         
        if(this.self.velX>=1) {
//            this.self.orientation = constants.RIGHT;
            this.self.status = constants.GO;
        }        
        if(this.self.velX<=-2) {
//            this.self.orientation = constants.LEFT;
            this.self.status = constants.GO;
        }  
        if(this.self.touched) {
           this.self.status = constants.ATTACK;
           if(!game.players[0].attacking===true){
               // sortear efectividad
               var audio = new Audio('sounds/punch1.mp3');
           //    audio.play();               
               game.players[0].life-=this.doDamage();
               game.players[0].damage=true;               
           }
        }
        if(this.self.damage===true) {
           this.self.status = constants.HURT;            
        }      
     };    
    this.doDamage = function() {
        var damage = Math.floor(Math.random() * this.attack);
        return damage;
    };
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
                        this.fullLife = options.life;
                    }            
                    if(typeof(options.attack) != "undefined" ) {
                        this.attack = options.attack;
                    }     
                    if(typeof(options.visible) != "undefined" ) {
                        this.visible = options.visible;
                    }else{
                        this.visible = true;
                    }                    
                    if(typeof(options.enemyVelocity) != "undefined" ) {
                        this.enemyVelocity = options.enemyVelocity;
                    }  
                    if(typeof(options.offset) != "undefined" ) {
                        this.offset = options.offset;
                    }                      
                    if(typeof(options.sprite) != "undefined"){
                        this.sprite=options.sprite;       
                        with(this.sprite.left){
                             spritesheet = new SpriteSheet(img, spritesheet[0], spritesheet[1]);
                             idle = new Animation(spritesheet, idle[0], idle[1], idle[2]); 
                             go = new Animation(spritesheet, go[0], go[1], go[2]);      
                             attack = new Animation(spritesheet, attack[0], attack[1], attack[2]);      
                             jump = new Animation(spritesheet, jump[0], jump[1], jump[2]);
                             hurt = new Animation(spritesheet, hurt[0], hurt[1], hurt[2]);  
                        }
                        with(this.sprite.right){
                             spritesheet = new SpriteSheet(img, spritesheet[0], spritesheet[1]);
                             idle = new Animation(spritesheet, idle[0], idle[1], idle[2]); 
                             go = new Animation(spritesheet, go[0], go[1], go[2]);      
                             attack = new Animation(spritesheet, attack[0], attack[1], attack[2]);      
                             jump = new Animation(spritesheet, jump[0], jump[1], jump[2]);  
                             hurt = new Animation(spritesheet, hurt[0], hurt[1], hurt[2]);  
                        }                      
                    }
                    if(typeof(options.objectives) != "undefined" ) {
                        this.objectives = options.objectives;
                    }   
                    
            }
            return this.id;
    };
    this.animate = function(status, displacedX){
        this.movingAnimation();
        if(this.self.creature){
            if(this.self.life<=0){
                game.removeCreature(this.self.id);
                return null;
            }
            if(this.orientation==constants.RIGHT){                
                spriteTemp =  this.sprite.left;
            }else{
                spriteTemp =  this.sprite.right;
            }
            switch(this.status){
                case constants.GO:
                    spriteTemp.go.update();
                    spriteTemp.go.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    //animate Idle
                    break;
                case constants.IDLE:
                    spriteTemp.idle.update();
                    spriteTemp.idle.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    //animate Idle
                    break;                    
                case constants.ATTACK:
                    spriteTemp.attack.update();
                    spriteTemp.attack.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    //animate Idle
                    break;      
                case constants.JUMP:
                    spriteTemp.jump.update();
                    spriteTemp.jump.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    break;    
                case constants.HURT:
                    spriteTemp.hurt.update();
                    spriteTemp.hurt.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    break;                                
                case constants.GRUNT:
                    spriteTemp.hurt.update();
                    spriteTemp.hurt.draw(this.self.position.x+this.self.offset.x, this.self.position.y+this.self.offset.y);
                    break;                     
                default:
                    break;
            }
        }else{
            if(this.life>0){
                name = this.name + ' ' +this.life; 
            }else{
                name= this.name;
            }
            if(this.visible){
                if( typeof(this.img) != "undefined" && this.img!=null ){
                    canvas.drawImage(this.img, this.self.position.x,this.self.position.y, this.width, this.height);
                }else{
                    canvas.drawRect(this.position, this.height, this.width,{color:'#000', name:name, creature:true});                                        
                }
            }
        }
        game.canvas.fillRect(
                new game.canvas.vector(this.position.x,this.position.y-10),
                5,this.width,
                {color:'#FF0000'}
                );
        var tempLife = this.life*this.width/this.fullLife;
        game.canvas.fillRect(
                new game.canvas.vector(this.position.x,this.position.y-10),
                5,tempLife,
                {color:'#00FF00'}
                );         
        if(game.cinematics){
            this.cinematicsMovement();
        }else{
            this.movement(displacedX);
        }
    };
    this.cinematicsMovement = function(){
        this.self.velX *= game.phisics.friction;
        this.self.velY += game.phisics.gravity;
        this.colliding();
        if(this.self.grounded){
             this.self.velY = 0;
        }
        this.self.position.x += this.self.velX;
        this.self.position.y += this.self.velY;        
    };    
    this.movement = function(displacedX){
        this.self.velX *= game.phisics.friction;
        this.self.velY += game.phisics.gravity;
      
        this.self.grounded= false;
        this.colliding();
        if(this.self.grounded){
             this.firstgrounded = true;
             this.self.velY = 0;
        }else{
           this.self.jumping = true;
        }
        //this.self.position.x+= this.self.velX;
        this.self.position.y += this.self.velY;        
    if (input.key_code[39] || input.key_code[68] || input.key_code[37] || input.key_code[65]) {
            this.touched = false;
    }   
    if(this.firstgrounded && !this.touched){
        this.self.jumping = false;
        charPosition = game.players[0].position;
        var dir = game.colCheck(this.self, game.players[0]);
        if(dir !== null ){
            this.touched=true;
        }
        if(charPosition.x >= this.self.position.x){
           this.self.orientation = constants.RIGHT;                 
           if(dir == null){
                 this.self.velX = this.self.enemyVelocity;
                 this.self.position.x+= this.self.velX;
             }
        }else{
            this.self.orientation = constants.LEFT;                 
            if(dir == null){
              this.self.velX = this.self.enemyVelocity;  
              this.self.position.x-= this.self.velX;
            }
        }
    }        
    if(game.centered>0){
       this.self.position.x+= this.self.velX-game.centerVelocity;
    }
    };    
    this.colliding = function(){
        for (var i = 0; i < game.objects.length; i++) {
            if(game.objects[i].ethereal) continue;
            if(this.self.id != game.objects[i].id && !game.objects[i].limitWall){
                var dir = game.colCheck(this.self, game.objects[i]);
                if (dir === "l" || dir === "r") {
            /*        this.self.velX = 0;
                    this.self.jumping = false;
                    this.self.grounded = true;
                    */
                    this.self.jumping = true;
                    this.self.grounded = false;
                    this.self.velY = -this.self.speed * 2;                   
                } else if (dir === "b") {
                    this.self.grounded = true;
                    this.self.jumping = false;
                } else if (dir === "t") {
                    this.self.velY *= -1;
                }
            }
        }
    };  
    this.create(img, gravity, position, width, height, bounds, options);
    if(typeof(this.self.objectives.onAppear)==='function') this.self.objectives.onAppear();                
    
};