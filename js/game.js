var game = {
    date: new Date(),
    phisics: {gravity:0.3, friction:0.8},
    players: new Array(),
    objects: new Array(),
    background: new Array(),
    objectives: new Array(),
    creatures: new Array(),
    controllers: new Array(),
    collectables: new Array(),
    screenPlay: null,
    errorAllowedY: 5,
    errorAllowedX: 1,
    debug: true,
    debugData: [],
    endScreen: false,
    self: this,
    canvas: null,
    pauseInput:false,
    cinematics:false,
    centered:0,
    centerVelocity:5,
    statusGame:null,
    score:0,
    activeObjective:null,
    sceneActions:function(){},
    titleScreen: false,
    isMobile: function(){
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
     return false;
    },
    colCheck: function(shapeA, shapeB) {
            // get the vectors to check against
            var vX = (shapeA.position.x + (shapeA.width / 2)) - (shapeB.position.x + (shapeB.width / 2)),
                vY = (shapeA.position.y + (shapeA.height / 2)) - (shapeB.position.y + (shapeB.height / 2)),
                // add the half widths and half heights of the objects
                hWidths = (shapeA.width / 2) + (shapeB.width / 2),
                hHeights = (shapeA.height / 2) + (shapeB.height / 2),
                colDir = null;
            // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // figures out on which side we are colliding (top, bottom, left, or right)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                        shapeA.position.y += oY;
                    } else {
                        colDir = "b";
                        shapeA.position.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                        shapeA.position.x += oX;
                    } else {
                        colDir = "r";
                        shapeA.position.x -= oX;
                    }
                }
            }
            return colDir;
        },
    colCheck_temp: function(shapeA, shapeB) {
            // get the vectors to check against
            var vX = (shapeA.position.x + (shapeA.width / 2)) - (shapeB.position.x + (shapeB.width / 2)),
                vY = (shapeA.position.y + (shapeA.height / 2)) - (shapeB.position.y + (shapeB.height / 2)),
                // add the half widths and half heights of the objects
                hWidths = (shapeA.width / 2) + (shapeB.width / 2),
                hHeights = (shapeA.height / 2) + (shapeB.height / 2),
                colDir = null;

            // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // figures out on which side we are colliding (top, bottom, left, or right)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                    //    shapeA.position.y += oY;
                    } else {
                        colDir = "b";
                     //   shapeA.position.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                     //   shapeA.position.x += oX;
                    } else {
                        colDir = "r";
                     //   shapeA.position.x -= oX;
                    }
                }
            }
            return colDir;
        },        
    drawBackground: function(){
        for(var c=0; c < this.background.length; c++ ){
            this.background[c].animate('');
        }
    },
    drawCreatures: function(){
        for(var c=0; c < this.creatures.length; c++ ){
            this.creatures[c].animate('');
        }    
    },
    drawObjects: function(){
        for(var c=0; c < this.objects.length; c++ ){
            this.objects[c].animate('');
        }    
    },    
    drawControllers: function(){
        for(var c=0; c < this.controllers.length; c++ ){
            this.controllers[c].animate('');
        }    
    },     
    drawCollectables: function(){
        for(var c=0; c < this.collectables.length; c++ ){
            this.collectables[c].animate('');
        }    
    },     
    drawObjectives: function(){
        for(var c=0; c < this.objectives.length; c++ ){
            this.objectives[c].animate();
        }    
    },     
    drawCharacters: function(displaceX){
        for(var c=0; c < this.players.length; c++ ){
            this.players[c].animate(displaceX);
        } 
    },
   disableInput: function(){
                game.pauseInput= true;
                document.body.removeEventListener("keydown",handlerKeyDown);
                document.body.removeEventListener("keyup",handlerKeyUp);
    },
   enableInput: function(){
        game.pauseInput= false;
        document.body.addEventListener("keydown",handlerKeyDown);
        document.body.addEventListener("keyup", handlerKeyUp);
    },
    enableMouse: function(){
        document.body.addEventListener("mousemove",handlerMouseMove);
        document.body.addEventListener("mousedown",handlerMouseDown);
        document.body.addEventListener("mouseup", handlerMouseUp);
    },
    renderMainScreen: function(){
        game.titleScreen= true;
        TitleScreen();
    },
    render: function(){
        game.titleScreen= false;
        if(game.statusGame === 'terminated'){
            cancelAnimationFrame(game.render);      
            return false;
        }
        game.canvas.ctx.clearRect(0, 0, game.canvas.container.width, game.canvas.container.height); 
        if(!game.pauseInput && game.players[0].position.x > game.canvas.container.width*9.2/10 && game.creatures.length == 0){
            game.centered=Math.abs(game.canvas.container.width/2);
        }
        if( game.players[0].life<1){
            game.statusGame = 'terminated';
            finishGame(false);
            return false;
        }
        game.drawBackground();
        game.drawObjects();
        game.drawCollectables();
        game.drawCharacters();
        game.drawCreatures();
        game.drawObjectives();
        game.players[0].collidingObjectives();
        game.canvas.drawText('Life: '+game.players[0].life,{color:'#000', x:1, y:30,font:'30px Arial'});
        game.canvas.drawText('Score: '+game.score,{color:'#000', x:1, y:80,font:'30px Arial'});        
        if(game.activeObjective !== null){
        //    console.log('Activo', game.activeObjective,game.creatures.length, game.getObjective(game.activeObjective));            
            game.getObjective(game.activeObjective).doObjectives();
        }
        game.players[0].collidingCreatures();
        game.sceneActions();
        game.drawControllers();
        game.clearFinishedObjectives();
        game.centerAll();
        requestAnimationFrame(game.render);
    },
    addPlayer: function(player){
        this.players.push(player);
    },
    addObject: function(object){
        this.objects.push(object);
    },
    addCollectable: function(object){
        this.collectables.push(object);
    },    
    addBackground: function(object){
           this.background.push(object);
       },
    addObjective: function(object){
        this.objectives.push(object);
    },    
    addCreature: function(object){
        this.creatures.push(object);
    },    
    addController: function(object){
        this.controllers.push(object);
    },    
    setCanvas: function(canvas){
        this.canvas = canvas;
    },    
    removeCreature: function(id){
        for (var i = 0; i < game.creatures.length; i++) {
            if(game.creatures[i].id==id){
                if(typeof(game.creatures[i].objectives.onDie)==='function') game.creatures[i].objectives.onDie();                
                game.creatures.splice(i,1); 
                return true;
            }
       }
       return false;
    },
    removeCollectable: function(id){
        for (var i = 0; i < game.collectables.length; i++) {
            if(game.collectables[i].id==id){
                game.collectables.splice(i,1);    
                return true;
            }
       }
       return false;
    },   
    getObjective: function(id){
        for (var i = 0; i < game.objectives.length; i++) {
            if(game.objectives[i].id==id){
                return game.objectives[i];
            }
       }
       return false;
    },     
    getCreatureByName: function(name){
        for (var i = 0; i < game.creatures.length; i++) {
            if(game.creatures[i].name==name){
                return game.creatures[i];
            }
       }
       return false;
    },    
    doCinematics: function(){},
    centerAll: function(){
        //objects
        //player
        //Background
        //objectives
        //creatures
       if(game.centered>0){
          this.centered-=3;
      }
    },
    clearFinishedObjectives: function(){
        for(var c=0; c < this.objectives.length; c++ ){
            if(this.objectives[c].finish){
                game.objectives[c].doObjectives();
                game.objectives.splice(c,1);
            }
        }    
    }
};



