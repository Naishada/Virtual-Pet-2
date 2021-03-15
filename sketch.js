var dog,sadDog,happyDog;
var feed;
var addFood1;
var foodObj;
var database;
var fedTime,lastFed;
var Name,submit;
var name1;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database = firebase.database();
  foodObj = new Food();
  foodObj.getFoodStock();
  
  dog=createSprite(800,200,150,150);
  dog.addImage("sad",sadDog);
  dog.addImage("happy",happyDog);
  dog.scale=0.2;

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood1 = createButton("Add food");
  addFood1.position(800,95);
  addFood1.mousePressed(addFood);

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  //make a input box and set position
  Name =  createInput("Name");
  Name.position(500,300);
  //make a submit button and set position
  submit = createButton("Enter");
  submit.position(500,325);

  //addtnl goal 2
  //hour() - 20 .. if(hour() >= lastFed + 1){bring dog back to original position}
  if(hour() >= lastFed + 1){
    dog.x =800;
   dog.y =200;
}
}

function draw() {
  background(46,139,87);
  foodObj.display();
  console.log(foodObj.foodStock)
  fill(255,255,254);
  textSize(30);

  drawSprites();
  //button.mousePressed(function(){....})
  submit.mousePressed(function(){
    Name.hide();
    submit.hide();
    name1 = Name.value();
  })
  if(name1 !== undefined){
  text("Feed : "+ name1 ,200,200);
  }
  textSize(15);
  if(lastFed >=12){
  text(" Last Feed  :  " + lastFed%12 + "PM",350,30 );
  }
  else if(lastFed===0){
    text("Last Feed  :  12AM",350,30);
  }
  else{
    text(" Last Feed  :  " + lastFed%12 + "AM",350,30 )
  }

}
//addtnl goal 2
//hour() - 20 .. if(hour() >= lastFed + 1){bring dog back to original position}
  if(hour() >= lastFed + 1){
    dog.x =800;
    dog.y =200;
  }


//function to update food stock and last fed time
function feedDog(){
  dog.changeImage("happy",happyDog);
  foodObj.foodStock = foodObj.foodStock - 1;
  foodObj.updateFoodStock(foodObj.foodStock);
  dog.x = 725;
  dog.y = 125;
  database.ref('/').update({
    food : foodObj.foodStock,
    FeedTime : hour()
  })
}

function addFood(){
  foodObj.foodStock = foodObj.foodStock + 1;
  foodObj.updateFoodStock(foodObj.foodStock);
}