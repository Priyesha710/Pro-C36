class Food {
    constructor() {
        //this.foodstock is a property of Food classs while foodStock is a variable
        foodStock = 0;
        this.lastFed = 0;
        this.image = loadImage("Images/Milk.png");
    }
    display() {
        // console.log(foodStock);
        var x = 80;
        var y = 100;
        if (foodStock != 0) {
            for (var i = 0; i < foodStock; i++) {
                if (i % 10 === 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    getFoodStock() {
        var foodRef = database.ref('pet/food');
        foodRef.on("value", function (data) {
            foodStock = data.val();
        });
    }
    addFoodStock() {
        addFoodButton.mousePressed(() => {
            if (foodStock < 40) {
                database.ref('pet').update({ food: foodStock + 1 });
            }
        });
    }
    updateTimeAndFood(){
        feedButton.mousePressed(()=>{
            var hourX = hour();
            var minuteX = minute();
            database.ref('pet/lastFed').update({
                hours: hourX,
                minutes: minuteX
            });
            if (foodStock > 0) {
                database.ref('pet').update({ food: foodStock - 1 });
              }
        });
    }
}