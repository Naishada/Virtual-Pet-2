class Food{
    constructor(){
        this.image = loadImage("Images/Milk.png")
        this.foodStock = null;
        this.lastFeed = null;
    }

    getFoodStock(){
        var foodStockRef  = database.ref("food");
        foodStockRef.on("value",(data)=>{
            this.foodStock = data.val();
        })
    }
    updateFoodStock(x){
          database.ref("/").update({
            food :x 
          })
    }

    display(){
        var x = 80,y=100;

        imageMode(CENTER);

        if(this.foodStock !=0){
            for(var i = 0 ; i<this.foodStock;i++){
                // if(i%10==0){
                //     x= 80;
                //     y = y+50;
                // }
                image(this.image,x,y,60,60);
                x = x+30;
            }
        }
    }
    
}
