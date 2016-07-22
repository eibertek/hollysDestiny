var background = function(jsonOptions){
    this.img = null;
    this.name = '';
    this.id = Math.random().toString(36).substr(2);
    this.position= new game.canvas.vector(0,0);
    this.width = 0;
    this.height = 0;
    this.ethereal = true;
    this.visible = true;
    this.movable = true;
    this.velX = 0;
    this.velY = 0;
    this.speed= 3; 
    this.self = this;
    this.floor= false;
    this.limitWall = false;
    this.status = null;
    this.orientation = null;
    this.objectives = null;
    this.repeatX = false;
    this.skyColor = '#01FBFB';
    this.create = function(jsonOptions){
            if( typeof(jsonOptions.image) != "undefined" && jsonOptions.image != null){
                this.img= jsonOptions.image;
            }
            if( typeof(jsonOptions.position) != "undefined"  && jsonOptions.position instanceof game.canvas.vector ){
                this.position= jsonOptions.position;
            }
            if( typeof(jsonOptions.width) != "undefined" ){
                this.width= jsonOptions.width;
            }
            if( typeof(jsonOptions.height) != "undefined" ){
                this.height= jsonOptions.height;
            }
            if(typeof(jsonOptions.ethereal) != "undefined" ) {
                this.ethereal = jsonOptions.ethereal;
            }
            if(typeof(jsonOptions.movable) != "undefined" ) {
                this.movable = jsonOptions.movable;
            }
            if(typeof(jsonOptions.name) != "undefined" ) {
                this.name = jsonOptions.name;
            }
            if(typeof(jsonOptions.repeatX) != "undefined" ) {
                this.repeatX = jsonOptions.repeatX;
            }
            if(typeof(jsonOptions.skyColor) != "undefined" ) {
                this.skyColor = jsonOptions.skyColor;
            }            
            if(typeof(jsonOptions.visible) != "undefined" ) {
                this.visible = jsonOptions.visible;
            }else{
                this.visible = true;
            }
            if(typeof(jsonOptions.speed) != "undefined" ) {
                this.speed = jsonOptions.speed;
            }
    };
    this.animate = function(status, displacedX){
            if(this.visible){
                if( typeof(this.img) != "undefined" && this.img!=null ){
                    game.canvas.drawImage(this.img, this.self.position.x,this.self.position.y,
                                          this.width, this.height, {repeatX:this.repeatX});
                }else{
                    game.canvas.fillRect(this.position, this.height, this.width,{color:this.skyColor, name:name});
                }
            }
        this.movement(displacedX);
    };
    this.movement = function(displacedX){
            if(game.centered>0){
                this.self.position.x-= this.self.speed;
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
    this.doObjectives = function(){
        this.objectives();
    }
    this.create(jsonOptions);
};