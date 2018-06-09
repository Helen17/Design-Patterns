class User{
    constructor(lastVisitDate,ordersCount,ordersTotalPrice,globalDiscount,nightDiscount,weekendDiscount,bonus){
        this.lastVisitDate = lastVisitDate;
        this.globalDiscount = 4;
        this.nightDiscount = 10;
        this.weekendDiscount = 7;
        this.ordersCount = ordersCount;
        this.ordersTotalPrice = ordersTotalPrice;
        this.bonus = 0;
    }
    getDiscount(){
        return this.globalDiscount;
    }
    getBonus(){
        return this.bonus;
    }
}

var date = new Date();
var day = date.getDay();

function getCuttentTime(){
    var hours = date.getHours();
    var minutes = date.getMinutes();

    if(hours<10){
        hours='0'+hours;
    } 
    if(minutes<10){
        minutes='0'+minutes;
    }

    var format = hours  + ":" + minutes;
    return format;
}

const getDiscount = user => {
    const discount = user.getDiscount();

    if(date.getHours() < 5 || date.getHours() >= 23){
        user.getDiscount = () => discount + user.nightDiscount;
    }else if(day === 6 || day === 0) {
        user.getDiscount = () => discount + user.weekendDiscount;
    }else if((day == 6 || day == 0)&&(date.getHours() < 5 || date.getHours() >= 23)){
        user.getDiscount = () => discount + user.nightDiscount + user.weekendDiscount;
    }else{
        user.getDiscount = () => discount;
    }
}

const getBonus = user => {
    const bonus = user.getBonus();

    var currenTimeInSeconds = (date.getTime()/1000).toFixed();
    var noVisiTimeInSeconds = currenTimeInSeconds - user.lastVisitDate;
    var noVisitTimeInHours = (noVisiTimeInSeconds/3600).toFixed();

    if(noVisitTimeInHours < 240) {
        user.getBonus = () => bonus + (240 - (noVisitTimeInHours)); 
    }

    var noVisitTimeInDays = (noVisitTimeInHours/24).toFixed()

    return noVisitTimeInDays;
}

function convertor(strDate){
    var timestampDate = Date.parse(strDate);
    return (timestampDate/1000)+10800;
}

const user = new User(convertor('06-05-2018'), 2, 500);
getDiscount(user);
console.log("Current time " + getCuttentTime());
console.log("Your discount is: " + user.getDiscount() + "%");
console.log("You were absent for " + getBonus(user) + " days. " + "And your bonus is: " + user.getBonus());



