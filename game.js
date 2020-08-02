class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      });  
    }  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('/playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      background(bg);
      player1 = createSprite(100,200, 20, 20);
      player1.addAnimation("one",'1.png');
      player1.scale = 0.5;
      player2 = createSprite(300,200, 20, 20);
      player2.addAnimation("two",'2.png');
      player2.scale = 0.5;
      player3 = createSprite(100,200, 20, 20);
      player3.addAnimation("three",'3.png');
      player3.scale = 0.5;
      player4 = createSprite(300,200, 20, 20);
      player4.addAnimation("four",'4.png');
      player4.scale = 0.5;
      players = [player1, player2, player3, player4];
    }
  
    play(){
      form.hide();
      Player.getPlayerInfo();  
      player.getPlayersAtEnd();
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        var index = 0;  
        var x = 0;
        var y = 175;  
        for(var plr in allPlayers){
          index = index + 1 ;  
          y = y + 100;
          x = displayHeight - allPlayers[plr].distance;
          players[index-1].x = x;
          players[index-1].y = y; 
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            players[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2 + 600;
            camera.position.x = players[index-1].y;
          }
        }  
      }  
      if(keyIsDown(32) && player.index !== null){
        player.distance -= 10
        player.update();
      }  
      if(player.distance > 3860){
        gameState = 2;
      }     
      drawSprites();
    }  
    end()
    {
      console.log("Game Ended");  
    }
  }