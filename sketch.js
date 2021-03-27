var dog, sadDog, happyDog;
var foodObj;
var feedButton, addFoodButton, inputBox, nameButton;
var foodStock;
var hourSet, minuteSet, gameState;
var dogName;
function preload() {
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000, 400);
  //initialize the database
  database = firebase.database();

  feedButton = createButton("Feed the dog");
  feedButton.position(700, 95);

  addFoodButton = createButton("Add food");
  addFoodButton.position(800, 95);

  foodObj = new Food();

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;


  database.ref('pet/name').on("value", function (data) {
    dogName = data.val();
    console.log(dogName);
  });
  inputBox = createInput("Give your pet a new name!");
  inputBox.position(250, 120);

  nameButton = createButton('Name');
  nameButton.position(440, 120);
  nameButton.mousePressed(() => {
    gameState = "named";
    dogName = inputBox.value();
    inputBox.hide();
    nameButton.hide();
    database.ref('pet').update({
      name: dogName
    })
  })
}

function draw() {
  background(46, 139, 87);
  strokeWeight(5);
  fill("black");
  textSize(20);
  text("Take care of " + dogName + "!", 800, 95);
  foodObj.display();
  foodObj.addFoodStock();
  foodObj.getFoodStock();
  foodObj.updateTimeAndFood();
  readTime();
  if (hourSet >= 12) {
    text("Last Fed: " + hourSet % 12 + ":" + minuteSet + " PM", 350, 30);
  } else if (hourSet == 0) {
    text("Last Fed: 12 AM", 350, 30);
  } else {
    text("Last Fed: " + hourSet + minuteSet + "AM", 350, 30);
  }

  drawSprites();
}
function readTime() {
  var time;
  var timeRef = database.ref('pet/lastFed');
  timeRef.on("value", function (data) {
    time = data.val();
    hourSet = time.hours;
    minuteSet = time.minutes;
  })
}
