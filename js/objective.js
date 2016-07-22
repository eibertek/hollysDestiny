var objective = function(img, gravity, position, width, height, options){
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
    this.ethereal = true;
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
    this.interactive = false;
    this.counter = 0;
    this.currentFrame = 0;
    this.totalFrames = 0;
    this.dialog = "";
    this.actualDialog = "";
    this.finish = false;
    this.answers = [];
    this.answered = false;
    this.selectedAnswer = null;
    this.pendingAnswer = false;
    this.dependOn = null;
    this.frameSpeed=3;
    this.isCinematic = false;
    this.cinematicAction = null;
    this.cinematicData = null;
    this.dialogData = {
                        bckg:true, 
                        bcgColor:"rgba(0,0,0,0.2)", 
                        dialog:{font:'bolder 20px Arial', color:"#FFF",x:20,y:80}, 
                        answer:{font:"bolder 14px Arial", color:"#EEE", selectionColor:"#FF0000"}
                      };
    this.instant = false;
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
                        this.visible = true;
                    }                    
                    if(typeof(options.enemyVelocity) != "undefined" ) {
                        this.enemyVelocity = options.enemyVelocity;
                    }   
                    if(typeof(options.objectives) != "undefined" ) {
                        this.objectives = options.objectives;
                    }
                    if(typeof(options.frameSpeed) != "undefined" ) {
                        this.frameSpeed = options.frameSpeed;
                    }
                    if(typeof(options.dialog) != "undefined" ) {
                        this.dialog = options.dialog;
                    }
                    if(typeof(options.dependOn) != "undefined" ) {
                        this.dependOn = options.dependOn;
                    }
                    if(typeof(options.answers) != "undefined" ) {
                        this.answers = options.answers;
                        this.selectedAnswer =  0;
                    }
                    if(typeof(options.dialogData) != "undefined" ) {
                        this.dialogData = options.dialogData;
                    }                    
                    if(typeof(options.isCinematic) != "undefined" ) {
                        this.isCinematic = options.isCinematic;
                    }
                    if(typeof(options.cinematicAction) === "function" ) {
                        this.cinematicAction = options.cinematicAction;
                    }                       
                    if(typeof(options.cinematicData) !== "undefined" ) {
                        this.cinematicData = options.cinematicData;
                    }                    
                    if(typeof(options.instant) != "undefined" ) {
                        this.instant = options.instant;
                    }                    
            }                  
    };
    this.update = function(){
        if(this.isCinematic=== true){
            this.updateCinematic();
        }else{
            this.updateDialog();
        }
    };
    this.updateDialog = function() {
        // update to the next frame if it is time
        if (this.counter == (this.frameSpeed - 1) && this.dialog != ""){
            this.actualDialog+=this.dialog.slice(0,1);
            this.dialog = this.dialog.substr(1);
        }
        if(this.dialog == "" && this.pendingAnswer === false ){
            if(  this.answers.length > 0 && this.answered ){
                this.finish = true;
            }
            if( this.answers.length==0 ) {
                this.finish = true;
            }
        }
        // update the counter
        this.counter = (this.counter + 1) % this.frameSpeed;
    };
    this.updateCinematic = function() {
        if(typeof(this.cinematicAction)!== "function") return false;
        // update to the next frame if it is time
        input.clearKeys();
        if (this.counter == (this.frameSpeed - 1)){
            this.cinematicAction();
        }
        // update the counter
        this.counter = (this.counter + 1) % this.frameSpeed;
    };    
    this.animate = function(displacedX){
      //  game.canvas.drawRect(this.position, this.height, this.width,{color:'#000', name:name, creature:true});
        this.movement(displacedX);
    };
    this.movement = function(displacedX){
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
    /// agregar useDialogs y USeCinematics, de esa forma el objective actualizara hasta mostrar dialogo o
    /// mostrar el final del cinematics
  //      if(game.creatures.length !== 0) return false;
        game.pauseInput= true;
        game.cinematics = true;
        if(!game.pauseInput && !this.finish){
      //      game.disableInput();
            game.players[0].clearStatus();
        }
        if(!this.finish){
            this.update();
        }else{
            input.clearKeys();
            this.finish = true;
            if(this.selectedAnswer !=null && this.answers[this.selectedAnswer].goto != 0){
                this.answers[this.selectedAnswer].goto();
            }
            if(this.objectives != null) this.objectives();
            game.pauseInput = false;
            game.cinematics = false;
            if(game.activeObjective === this.self.id){    
                game.activeObjective = null;
            }
        }
        if(this.dialogData.bckg===true && this.actualDialog != ""){
            game.canvas.fillRect(new game.canvas.vector(this.dialogData.dialog.x-10,this.dialogData.dialog.y-25), 30 + this.answers.length * 30, 600, {color:this.dialogData.bcgColor});
        }
        game.canvas.drawText(this.actualDialog, {color:this.dialogData.dialog.color, 
                                                 x:this.dialogData.dialog.x, 
                                                 y:this.dialogData.dialog.y, 
                                                 font:this.dialogData.dialog.font});
        if( this.dialog == "" ) {
            for(var c = 0; c <  this.answers.length; c++){
                if(c == this.selectedAnswer){
                    game.canvas.drawText(this.answers[c].dialog, 
                                         {color:this.dialogData.answer.selectionColor, x:20, y:120 + 20*c, font:this.dialogData.answer.font});
                }else{
                    game.canvas.drawText(this.answers[c].dialog, 
                                         {color:this.dialogData.answer.color, x:20, y:120 + 20*c, font:this.dialogData.answer.font});
                }
            }
        }
        this.chooseAnswer();
        var enter;
        if(game.isMobile()){
            enter = input.move.attack;
        }else{
            enter = input.key_code[13];
        }
        if (enter=== true) {
                this.finish = true;
                game.pauseInput = false;
                input.clearKeys();
        }
    };
    this.chooseAnswer = function(){
        if(this.answers.length==0) return false;
        if (input.move.up || input.move.down) {
                for(var c = 0; c < this.answers.length; c++){
                    if( c == this.selectedAnswer) {
                        if (input.move.down === true) {
                            if(c+1 < this.answers.length){
                                this.selectedAnswer = c + 1;
                            }else{
                                this.selectedAnswer = 0;
                            }
                            input.clearKeys();
                            return true;
                        }
                        if (input.move.up) {
                            if(c == 0){
                                this.selectedAnswer = this.answers.length - 1;
                            }else{
                                this.selectedAnswer = c - 1;
                            }
                            input.clearKeys();
                            return true;
                        }
                    }
                }
        }
    };
    this.create(img, gravity, position, width, height, options);
    if(this.instant===true) game.activeObjective = this.id;
};


var dialogClass= function(){

    this.isInteractive=false;
    this.answers = [];

    this.init = function(){};

    this.nextSecuence = function(){};
};