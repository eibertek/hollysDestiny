
function TitleScreen(){
        game.canvas.drawImage(library.loadImages.bcgIntro,0,0,game.canvas.container.width,game.canvas.container.height,{});
        game.canvas.drawImage(library.loadImages.logo,1,-30,game.canvas.container.width-10,game.canvas.container.height/2,{});
        game.canvas.drawImage(library.loadImages.keysControl,1,200,250,200,{});
        game.canvas.drawImage(library.loadImages.btnStart,game.canvas.container.width*2/3,
                              game.canvas.container.height/2,game.canvas.container.width/3,game.canvas.container.height/5,{});
        input.setTouchEvents();
        if(input.mobile){
		     if (input.actions.btnStart===true){
                    cancelAnimationFrame(game.renderMainScreen);
                    requestAnimationFrame(game.render);
		     }else{
                requestAnimationFrame(game.renderMainScreen);
		     }
        }else{
            if((input.mouse.clicked===true
               &&  (input.mouse.x>=game.canvas.container.width/2
                    && input.mouse.x<=game.canvas.container.width)
                &&  (input.mouse.y>=game.canvas.container.height/2
                    && input.mouse.y<=game.canvas.container.height )) || input.key_code[input.key_enter]===true
                ){
                cancelAnimationFrame(game.renderMainScreen);
                requestAnimationFrame(game.render);
            }else{
                requestAnimationFrame(game.renderMainScreen);
            }
        }
}



function loadObjects(){
    game.addObject(new object('C1',true, new game.canvas.vector(350,1),50,60,
                    {ethereal:true, movable:true,
                     sprite: {
                                static: true,
                                img: library.loadImages.trashcan,
                                left: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                  },
                                right: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                }
                               }
                    })
               );

    game.addObject(new object('C1',true, new game.canvas.vector(650,1),50,60,
                    {ethereal:true, movable:true,
                     sprite: {
                                static: true,
                                img: library.loadImages.trashcan,
                                left: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                  },
                                right: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                }
                               }
                    })
               );

    game.addObject(new object('C1',true, new game.canvas.vector(1250,1),50,60,
                    {ethereal:true, movable:true,
                     sprite: {
                                static: true,
                                img: library.loadImages.trashcan,
                                left: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                  },
                                right: {
                                    img: library.loadImages.trashcan,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                }
                               }
                    })
               );

}

function loadCoin(x){
    game.addCollectable(new collectable('coin',true, new game.canvas.vector(x,1),32,32,
                    {ethereal:true, movable:true,
                     offset:{x:0,y:0},
                     sprite: {
                                static: false,
                                img: library.loadImages.coinBig,
                                left: {
                                    img: library.loadImages.coinBig,
                                    spritesheet: [32, 32],
                                    idle:[8, 1, 23],
                                    destroy:[8, 1, 23],
                                  },
                                right: {
                                    img: library.loadImages.coinBig,
                                    spritesheet: [32, 32],
                                    idle:[8, 1, 23],
                                    destroy:[8, 1, 23],
                                }
                               },
                        effects: { destroyAfter:true, callback: function(){
                                var value = Math.floor(Math.random()*500);
                                console.log(value);
                                game.score+=value;
                                            }
                                 }      
                    })
               );

}

function loadLife200(x){
    game.addCollectable(new collectable('life',true, new game.canvas.vector(x,1),32,32,
                    {ethereal:true, movable:true,
                     offset:{x:0,y:0},
                     sprite: {
                                static: false,
                                img: library.loadImages.logo,
                                left: {
                                    img: library.loadImages.logo,
                                    spritesheet: [32, 32],
                                    idle:[8, 1, 23],
                                    destroy:[8, 1, 23],
                                  },
                                right: {
                                    img: library.loadImages.logo,
                                    spritesheet: [32, 32],
                                    idle:[8, 1, 23],
                                    destroy:[8, 1, 23],
                                }
                               },
                        effects: { destroyAfter:true, callback: function(){
                                                game.players[0].life+=600;
                                            }
                                 }      
                    })
               );

}

function loadBackground(skyColor){
    if(typeof(skyColor)==="undefined") skyColor = "#01FBFB";
   game.addBackground(new background({image:null,
                                  position:new game.canvas.vector(0,0),
                                  width:4000,
                                  height: game.canvas.container.height,
                                  ethereal:true,
                                  movable:false,
                                  visible:true,
                                  repeatX:true,
                                  speed:2,
                                  skyColor:skyColor,
                                  background:true})
                   );
    game.addBackground(new background({image:library.loadImages.citybackground,
                                  position:new game.canvas.vector(0,0),
                                  width:4000,
                                  height: game.canvas.container.height,
                                  ethereal:true,
                                  movable:false,
                                  visible:true,
                                  repeatX:true,
                                  speed:3,
                                  background:true})
                   );
    game.addBackground(new background({image:library.loadImages.cityclouds,
                                  position:new game.canvas.vector(0,0),
                                  width:4000,
                                  height: game.canvas.container.height,
                                  ethereal:true,
                                  movable:false,
                                  visible:true,
                                  repeatX:true,
                                  speed:2,
                                  background:true})
                   );

}


function loadPlayer(){
  game.addPlayer(new player(
                        {name:'Player 1',
                         x:10,
                         y:10,
                         color:'#FF0000',
                         width:40,
                         height:50,
                         life:1000,
                         attack:20,
                         sprite: {
                                left: {
                                    img: library.loadImages.char1,
                                    spritesheet: [64, 64],
                                    idle:[14, 91, 92],
                                    go:[4, 146, 149],
                                    attack:[4, 196, 200],
                                    jump:[4, 0, 6],
                                    hurt:[4, 235, 236]

                                  },
                                right: {
                                    img: library.loadImages.char1,
                                    spritesheet: [64, 64],
                                    idle:[14, 65, 66],
                                    go:[4, 120, 123],
                                    attack:[4, 170, 174],
                                    jump:[4, 0, 6],
                                    hurt:[4, 235, 236]

                                }
                               }
                        })
                   );
}

function addEnemy(x,y, img, life, attack, onDie){
     game.addCreature(new creature(null,
                                  true,
                                  new game.canvas.vector(x,y),
                                  30,40,
                                {ethereal:false,
                                 movable:true,
                                 visible:true,
                                 creature:true,
                                 life:life,
                                 attack:attack,
                                 enemyVelocity:1.5,
                                 objectives:{onDie:onDie},
                                 sprite: {
                                    left: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 91, 92],
                                        go:[4, 143, 151],
                                        attack:[4, 196, 200],
                                        jump:[4, 0, 6],
                                        hurt:[4, 235, 236]
                                      },
                                    right: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 65, 66],
                                        go:[4, 120, 125],
                                        attack:[4, 170, 174],
                                        jump:[4, 0, 6],
                                        hurt:[4, 233, 238]
                                    }
                               }
                           }));
};

function addEnemyDialog(x,y, img, life, attack){
     game.addCreature(new creature(null,
                                  true,
                                  new game.canvas.vector(x,y),
                                  30,40,
                                {ethereal:false,
                                 movable:true,
                                 visible:true,
                                 creature:true,
                                 life:life,
                                 attack:attack,
                                 enemyVelocity:1.5,
                                 objectives:{onDie:function(){
                                    //  cinematics1();
                                    loadCoin(this.self.position.x);
                                 }},
                                 sprite: {
                                    left: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 91, 92],
                                        go:[4, 143, 151],
                                        attack:[4, 196, 200],
                                        jump:[4, 0, 6],
                                        hurt:[4, 235, 236]
                                      },
                                    right: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 65, 66],
                                        go:[4, 120, 125],
                                        attack:[4, 170, 174],
                                        jump:[4, 0, 6],
                                        hurt:[4, 233, 238]
                                    }
                               }
                           }));
};


function addBoss(x,y, life, attack, onDie){
     game.addCreature(new creature(null,
                                  true,
                                  new game.canvas.vector(x,y),
                                  70,70,
                                {ethereal:false,
                                 movable:true,
                                 visible:true,
                                 creature:true,
                                 life:life,
                                 attack:attack,
                                 enemyVelocity:1.5,
                                 name:'boss',
                                 offset:{x:0,y:0},
                                 objectives:{onDie:onDie},
                                 sprite: {
                                    left: {
                                        img: library.loadImages.boss,
                                        spritesheet: [80, 80],
                                        idle:[14, 2, 3],
                                        go:[10, 1, 5],
                                        attack:[10, 5, 7],
                                        jump:[4, 27, 28],
                                        hurt:[4, 23, 25]
                                      },
                                    right: {
                                        img: library.loadImages.boss,
                                        spritesheet: [80, 80],
                                        idle:[14, 27, 28],
                                        go:[10, 24, 27],
                                        attack:[10, 28, 30],
                                        jump:[40, 48, 49],
                                        hurt:[10, 41, 43]
                                    }
                               }
                           }));
};


function addSkeleton(x,y, img, life, attack){
     game.addCreature(new creature(null,
                                  true,
                                  new game.canvas.vector(x,y),
                                  30,40,
                                {ethereal:false,
                                 movable:true,
                                 visible:true,
                                 creature:true,
                                 life:life,
                                 attack:attack,
                                 enemyVelocity:1.5,
                                 sprite: {
                                    left: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 91, 92],
                                        go:[4, 143, 151],
                                        attack:[4, 91, 98],
                                        jump:[4, 0, 6],
                                        hurt:[4, 235, 236]
                                      },
                                    right: {
                                        img: img,
                                        spritesheet: [64, 64],
                                        idle:[14, 65, 66],
                                        go:[4, 120, 125],
                                        attack:[4, 65, 72],
                                        jump:[4, 0, 6],
                                        hurt:[4, 233, 238]
                                    }
                               }
                           }));
};

configuration = {frameSpeed:4, visible:false};

function loadLimits(){
    game.addObject(new object(null,true, new game.canvas.vector(0,game.canvas.container.height-40),game.canvas.container.width*3,30,{ethereal:false, movable:false, floor:true}));
    game.addObject(new object(null,true, new game.canvas.vector(0,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
    game.addObject(new object(null,true, new game.canvas.vector(game.canvas.container.width,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
}

function loadControllers(){
    game.addController(new controllerBox(null,false, new game.canvas.vector(0,game.canvas.container.height-100),135,90,
    {ethereal:true, movable:false,
                     sprite: {
                                static: true,
                                img: library.loadImages.keysControl2,
                                left: {
                                    img: library.loadImages.keysControl2,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                  },
                                right: {
                                    img: library.loadImages.keysControl2,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                }
                               }
                    }));
    game.addController(new controllerBox(null,false, new game.canvas.vector(game.canvas.container.width-70,game.canvas.container.height-70),70,70,
    {ethereal:true, movable:false,
                     sprite: {
                                static: true,
                                img: library.loadImages.attackButton,
                                left: {
                                    img: library.loadImages.attackButton,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                  },
                                right: {
                                    img: library.loadImages.attackButton,
                                    spritesheet: [131, 154],
                                    idle:[14, 1, 1],
                                    destroy:[4, 1, 1],
                                }
                               }
                    }));
                    
//    game.addController(new controllerBox(null,true, new game.canvas.vector(0,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
//    game.addController(new controllerBox(null,true, new game.canvas.vector(game.canvas.container.width,0),1,game.canvas.container.height,{ethereal:false, movable:false, floor:true, limitWall:true}));
}
function instantCinematicObjective(cinematicsData){
    if(validCinematicsData(cinematicsData)){
        game.addObjective(new objective(null,true, new game.canvas.vector(0,0),
                                  0,0,{
                                  instant:true,
                                  isCinematic:true,
                                  name:'',
                                  cinematicData:cinematicsData.data,
                                  objectives: cinematicsData.callback,
                                  cinematicAction: cinematicsData.action,
                                  frameSpeed:configuration.frameSpeed,
                                  }));        
    }else{
        console.log('wrong format', cinematicsData);
    }
}
function instantDialogObjective(dialog, callback){
        game.addObjective(new objective(null,true, new game.canvas.vector(0,0),
                            0,0,{
                                instant:true,
                                isCinematic:false,
                                name:'',
                                objectives: callback,
                                dialog: dialog,
                                frameSpeed:configuration.frameSpeed,
                            }));    
}

function setanswer(dialog, callback, selected){
    return {dialog:dialog, callback:callback, selected:selected};
}
function validCinematicsData(cinematicsData){
    if(typeof(cinematicsData.data) ==="undefined" ) return false;
    if(typeof(cinematicsData.action) !=="function" ) return false;
    if(typeof(cinematicsData.callback) !=="function" ) return false;
    return true;
}
function instantAnswersObjective(dialog, answers, callback){
    answTemp = [];
    for( answer in answers ){
        answTemp.push({dialog:answers[answer].dialog, 
                       goto:answers[answer].callback, 
                       selected:answers[answer].selected});
    }
    game.addObjective(new objective(null,true, new game.canvas.vector(0,0),
                            0,0,{
                                instant:true,
                                isCinematic:false,
                                name:'',
                                objectives: callback,
                                dialog: dialog,
                                answers:answTemp,
                                frameSpeed:configuration.frameSpeed,
                            }));    
    }

function cinematicObjective(x,cinematicsData){
    if(validCinematicsData(cinematicsData)){
        game.addObjective(new objective(null,true, new game.canvas.vector(x,0),
                                  60,game.canvas.container.height,{
                                  instant:false,
                                  isCinematic:true,
                                  name:'',
                                  cinematicData:cinematicsData.data,
                                  objectives: cinematicsData.callback,
                                  cinematicAction: cinematicsData.action,
                                  frameSpeed:configuration.frameSpeed,
                                  }));        
    }else{   
        console.log('hubo algun error con el objetivo', cinematicsData);
    }
}
function dialogObjective(x,dialog, callback){
       game.addObjective(new objective(null,true, new game.canvas.vector(x,0),
                            60,game.canvas.container.height,{
                                instant:false,
                                isCinematic:false,
                                name:'',
                                objectives: callback,
                                dialog: dialog,
                                frameSpeed:configuration.frameSpeed,
                            }));    
}
function answersObjective(x,dialog, answers, callback){
    answTemp = [];
    for( answer in answers ){
        answTemp.push({dialog:answer.dialog, goto:answer.callback, selected:answer.selected});
    }
    game.addObjective(new objective(null,true, new game.canvas.vector(x,0),
                            60,game.canvas.container.height,{
                                instant:false,
                                isCinematic:false,
                                name:'',
                                objectives: callback,
                                dialog: dialog,
                                answers:answTemp,
                                frameSpeed:configuration.frameSpeed,
                            }));      
}

var translations = {
        en:{
            titlePage:"",
            btnStart:"",
            Description:"",
            keyTutorial1:"Move with arrows Keys or awsd, and punch with ´c´ ",
            keyTutorial2:'Select with arrows key and press enter',
            keyMTutorial1:"Move with arrows Keys, and punch with the sword icon ",
            keyMTutorial2:'Select with arrows key and press sword icon',
            
            scene1:{
                dialog1:'HAHAHAHA You think you can Beat me?',
                answers:{
                    answer1:'Off course I can, Hey Yeah!',
                    answer2:'No, you are too big. PLEASE HELP',
                    answer3:'MOVE INSECT',
                },
                dialog2:'Come for me then!',
                dialog3:'JAJAJAA!',
                dialog4:'You Imprudent!!',
                dialog5:"I\'ll be Back",
                dialog6:'aarrrghhhh',
                success:'Level succeed, well done!'
            }
        },
        es:{
            titlePage:"",
            btnStart:"",
            Description:"",
            keyTutorial1:"Moverse con las flechas o awsd, y golpe con ´c´ ",
            keyTutorial2:'usa las flechas y seleccciona con enter',
            scene1:{
                dialog1:'JAJAJAJ Piensas que puedes vencerme?',
                answers:{
                    answer1:'Claro que si, date por muerto!',
                    answer2:'No, sos un monstruo, AYUDA!!',
                    answer3:'MUEVETE INSECTO',
                }
            }            
        }
}
var languageTranslation = translations.en;

function scene1Intro(){
    game.players[0].velX=3;  
    if(game.players[0].position.x>200){
        game.players[0].velX=0;
      if(this.self.cinematicData.bossAdded===false){ 
         addBoss(game.canvas.container.width-100,1, 700, 20, function(){});
         this.self.cinematicData.bossAdded=true;
      }else{
          bossCreature = game.getCreatureByName('boss');
          if(bossCreature.grounded){
              var audio = new sound('sounds/grunting.mp3');
              audio.play();
              this.self.finish=true;
              answers = [
                    setanswer(languageTranslation.scene1.answers.answer1,scene1answer1, true),
                    setanswer(languageTranslation.scene1.answers.answer2,scene1answer2, false),
                    setanswer(languageTranslation.scene1.answers.answer3,scene1answer3, false),
                        ]
              instantAnswersObjective(languageTranslation.scene1.dialog1, answers, function(){});
          }
      }
    }
}

function scene1answer1(){
    game.sceneActions= function(){};
    Level0.statusScene1=1;
    cinematicsData = {data:{state:0,bossAdded:true}, 
                      action:function(){
                                bossCreature = game.getCreatureByName('boss');
                                bossCreature.orientation = constants.RIGHT;
                                bossCreature.velX+=bossCreature.enemyVelocity;
                                if(bossCreature.position.x>game.canvas.container.height+90){
                                    game.removeCreature(bossCreature.id);
                                    this.self.finish=true;
                                }
                                return true;
                            }, 
                      callback:function(){}
                    };
    instantDialogObjective(languageTranslation.scene1.dialog2, 
            function(){
                this.finish = true;
                instantCinematicObjective(cinematicsData);}
                    );                    
}

function scene1answer2(){
    game.sceneActions= function(){};    
    Level0.statusScene1=2;
    instantDialogObjective(languageTranslation.scene1.dialog3, 
            function(){
                bossCreature = game.getCreatureByName('boss');   
                bossCreature.life*=2;
                bossCreature.fullLife=bossCreature.life;
                bossCreature.objectives.onDie = function(){
                    loadCoin(bossCreature.position.x);
                    loadCoin(bossCreature.position.x);
                    loadCoin(bossCreature.position.x);
                    instantDialogObjective(languageTranslation.scene1.dialog5, function(){});    
                 }                
                this.finish = true;
                }
             );     
}
function scene1answer3(){
    game.sceneActions= function(){};    
    Level0.statusScene1=3;
    instantDialogObjective(languageTranslation.scene1.dialog4, 
            function(){
                this.finish = true;
                }
             );     
}
function removeAll(){
    game.players= new Array();
    game.objects= new Array();
    game.background= new Array();
    game.objectives= new Array();
    game.creatures= new Array();
    game.collectables= new Array();
}
var Test = function(){
    this.statusScene1=0;
    this.finish = false;
    this.init=function(){
        loadBackground();
        loadLimits();
        loadObjects();
        loadPlayer();
        input.setTouchEvents();
        game.sceneActions = function(){
               // console.log(input.touches);
        };
    }
    this.init();

}

Level0 = function(){
    this.statusScene1=0;
    this.finish = false;
    this.init=function(){
        loadBackground();
        loadLimits();
        loadObjects();
        loadPlayer();
        this.scene1();
        this.scene2();
        this.scene3();
    }
    tutorial1 ="";
    tutorial2 ="";
    if(game.isMobile()){
        tutorial1 = languageTranslation.keyMTutorial1;
        tutorial2 = languageTranslation.keyMTutorial2;
    }else{
        tutorial1 = languageTranslation.keyTutorial1;
        tutorial2 = languageTranslation.keyTutorial2;
    }
    this.scene1 = function(){
        game.sceneActions = function(){
            game.canvas.drawText(tutorial1,
                        {color:'#000', x:game.players[0].position.x, y:game.players[0].position.y-20, font:'20px Arial'});
          };
        cinematicObjective(200,
        {callback:function(){ game.sceneActions=function(){
            game.canvas.drawText(tutorial2,
                        {color:'#000', x:game.players[0].position.x, y:game.players[0].position.y-20, font:'20px Arial'});
        };},
         action: scene1Intro,
          data:{state:0,bossAdded:false}
        }
        );        
    }
    this.scene2 = function(){
    cinematicsData = {data:{}, 
                      action:function(){
                          this.finish = true;
                          var positionPlayerX = game.players[0].position.x;
                            switch(Level0.statusScene1) 
                            {
                                case 1:
                                   addEnemy(20,1, library.loadImages.enemy1, 20, 20, function(){ loadCoin(positionPlayerX)});
                                   addEnemy(game.canvas.container.width+10,1, library.loadImages.skeleton, 400, 20, function(){ loadCoin(positionPlayerX)});
                                   addEnemy(game.canvas.container.width+100,1, library.loadImages.enemy2, 300, 20, function(){ loadCoin(positionPlayerX)});
                                   break;
                                case 2:
                                   addEnemy(200,1, library.loadImages.enemy1, 20, 20, function(){ loadCoin(positionPlayerX); loadLife200(positionPlayerX) });
                                   addEnemy(game.canvas.container.width+10,1, library.loadImages.skeleton, 900, 20, function(){
                                       loadCoin(600);
                                        addEnemy(20,1, library.loadImages.enemy2, 800, 20, function(){
                                            loadCoin(600);
                                            addEnemy(900,1, library.loadImages.skeleton, 900, 20, function(){ loadCoin(positionPlayerX)});
                                        });
                                   });
                                  break;
                                case 3:
                                   addEnemy(8,1, library.loadImages.enemy1, 20, 20, function(){ loadCoin(20)});
                                   addEnemy(game.canvas.container.width+10,1, library.loadImages.skeleton, 900, 20, function(){
                                        addEnemy(game.canvas.container.width+70,1, library.loadImages.skeleton, 900, 20, function(){ loadCoin(positionPlayerX)});
                                        addEnemy(-10,1, library.loadImages.enemy2, 800, 20, function(){
                                            loadCoin(20);
                                            addEnemy(game.canvas.container.width+10,1, library.loadImages.skeleton, 900, 50, function(){ loadCoin(positionPlayerX)});
                                        });
                                   });
                                   break;
                            }    
                                return true;
                            }, 
                      callback:function(){}
                    };        
       cinematicObjective(game.canvas.container.width+100, cinematicsData);
    }    
   this.scene3 = function(){
   cinematicsData = {data:{time:0}, 
                      action:function(){
                        this.finish = true;
                        instantDialogObjective(languageTranslation.scene1.success, 
                                function(){
                                        Level0.finish= true;
                                        this.finish = true;
                                        Level1();
                                }
                                 );                           
                        return true;
                            }, 
                      callback:function(){}
                    };        
       cinematicObjective(game.canvas.container.width*2, cinematicsData);
    }    
    this.init();
}
//NIvel 1 

    /*
     * Cinmetica: Aparece el Jefe dle nivel y nos pregunta:
     *         No creo que puedas vencerme 
     *         - Claro que Puedo!
     *         - Tenes razon, tengo miedo
     *         - Correte de mi camino
     * 
     * Si eliges 1 dice: pues ven a buscarme y se aleja
     * Si eliges 2 dice: jajaja y ataca
     *      cuando muere, volvere!
     * Si eliges 3 dice: insolente! y es mas rapido y mas fuerte
     *      cuando muere: aaarrrggghhh
     * 
     * obj2: si elegiste el 1 anteriormente, aparecen 3 enemigos
     *       si elegiste 2 aparecen 2, 2, 1
     *       si elegiste 3 aparecen 1, 3, 2
     *       
     *objetivo2 a 1000, objetivo 3 a 1300, objetivo4 a 1500
     *si elegiste 1 o 2 objetivo 4 cuando muere el ultimo aparece boss
     *                                                 
     *          
     */
function addFinalBoss(){
        dialogObjective(1000, 'Now you are Dead!!!', 
                        function(){
                            addBoss(200,1, 700, 20, function(){
                                                game.score+=1000;
                                                instantDialogObjective(languageTranslation.scene1.success, 
                                                    function(){
                                                            Level0.finish= true;
                                                            game.statusGame = "terminated";
                                                            this.finish = true;
                                                            finishGame(true);
                                                    }
                                
                                                 );                         
                                              }); 
                        });
    }    
    
Level1 = function(){
    this.statusScene1=0;
    this.finish = false;
    this.init=function(){
        removeAll();
        loadBackground("#FFA500");
        loadLimits();
        loadObjects();
        loadPlayer();
        this.scene2();
    }
    this.scene2 = function(){
        addEnemy(game.canvas.container.width+30,1, library.loadImages.skeleton, 100, 50, function(){ for(var c=0; c < 10; c++){ loadCoin(600); } addFinalBoss(); });
    }    
    this.init();
}
// NIvel 2

    /*
     *  Aparece un skeleton lo atacamos
     *  
     *  entonces aparece un boss y nos dice que lo sigamos
     *  
     *  cuando llegamos a 1000 aparece de nuevo y nos dice ahora voy a vencerte!
     *  
     *    Cuando le ganamos fin.  
     *  
     */
    
    
    /** Agregar 
     *  - tracking: guardar en una base ip y hora de conexion
     *  - facebook: poder postear en facebook twitter y google+ el puntaje
     *  - agregar google analitics
     *  - agregar botones de mobile
     *  - estudiar forma de encriptado apra no poder hacer trucos
     *  
     */

