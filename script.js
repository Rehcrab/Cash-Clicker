const moneyHTML=document.getElementById("money");
const moneyImg=document.getElementById("moneyimage");
const upgradesHTML=document.getElementsByClassName("upgrade");
const sacUpgradesHTML=document.getElementsByClassName("sacupgrade");
const moneyClickHTML=document.getElementById("moneyperclick");
const moneySecondHTML=document.getElementById("moneypersecond");
const makersHTML=document.getElementsByClassName("maker");
const sacrificeButtonHTML=document.getElementById("sacrifice");
const sacrificePointsHTML=document.getElementById("sacrificepoints");
const sacrificeMultiHTML=document.getElementById("sacrificemultiplier");
const boostsHTML=document.getElementById("boost");
var money=0;
var lifetimemoney=0;
var moneyClickMulti=1;
var moneySecondMulti=1;
var sacrificeBoost=1;
var offlineMoney=0;
var sacrificePoints=0;
var moneyPacketSpawn=10000;
var packetSpawnBoost=1;
var packetOnScreen=false;
var packetTime=5000;
var packetClickBoost=1;
var packetSecondBoost=1;
var upgrades=[
    [100,"moneyClickMulti*=2",1],
    [500,"thingies[1][6]*=2",1],
    [1000,"moneyClickMulti*=1.5; moneySecondMulti*=1.5;",1],
    [10000,"moneyClickMulti*=1.5; moneySecondMulti*=1.5;",1],
    [50000,"thingies[2][6]*=2",1],
    [500000,"thingies[3][6]*=2",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [999999,"moneyClickMulti*=1.1; moneySecondMulti*=1.1;",1],
    [2000000,"moneySecondMulti*=2",1],
    [15000000, "thingies[4][6]*=2",1],
    [50000000,"moneyClickMulti*=2; moneySecondMulti*=2;",1],
    [200000000,"thingies[5][6]*=2",1],
    [3000000000,"thingies[6][6]*=2",1],
    [10000000000,"moneyClickMulti*=2; moneySecondMulti*=2;",1],
    [50000000000,"moneyClickMulti*=3; moneySecondMulti*=3;",1],
    [100000000000, "thingies[0][6]*=3",1],
    [100000000000, "thingies[1][6]*=5",1],
    [250000000000, "thingies[7][6]*=3; thingies[8][6]*=3;",1],
    [500000000000, "moneyPacketSpawn=300;",1],
    [1000000000000, "moneyClickMulti*=3; moneySecondMulti*=3;",1]
];
var sacUpgrades=[
    [2,"moneyClickMulti*=2; moneySecondMulti*=2;",1],
    [2,"offlineMoney+=0.05",1],
    [10,"moneyClickMulti*=2; moneySecondMulti*=2;",1],
    [10,"offlineMoney+=0.05",1],
    [200,"offlineMoney+=0.05",1],
    [200,"packetSpawnBoost/=2",1],
    [3000,"offlineMoney+=0.10",1],
]
var thingies=[
    [100,"click",1,"Cursor", "money per click +",0,1],
    [100,"second",1,"Lemonade Stand", "money per second +",0,1],
    [1000,"second",8,"Farm", "money per second +",0,1],
    [30000,"second",100,"Factory", "money per second +",0,1],
    [999999,"second",1000,"Diamond Mine", "money per second +",0,1],
    [15000000,"second",8000,"Company", "money per second +",0,1],
    [200000000,"second",75000,"Film Studio", "money per second +",0,1],
    [10000000000,"second",2000000,"Quantum Hacking Rig", "money per second +",0,1],
    [10000000000,'click',500000,"Quantum Spamming Rig", "money per click +",0,1],
    [1000000000000,'second',70000000,"World Bank", "money per second +",0,1],
];
var moneyEarnedThingy=0;
if (getCookie("money")!="") {
    const timeNow=new Date().getTime();
    money=Number(getCookie("money"));
    lifetimemoney=Number(getCookie("lifetimemoney"));
    moneyClickMulti=Number(getCookie("clickmulti"));
    moneySecondMulti=Number(getCookie("secondmulti"));
    sacrificePoints=Number(getCookie("sacpoints"));
    sacrificeBoost=Number(getCookie("sacboost"));
    offlineMoney=Number(getCookie("offlinemoney"));
    moneyPacketSpawn=Number(getCookie("packetspawn"));
    packetSpawnBoost=Number(getCookie("packetspawnboost"))
    var timeAgo=Number(getCookie("time"));
    var upgradesx=getCookie("upgrade");
    var splitted=upgradesx.split(",");
    for (i=0;i<upgrades.length;i++){
        upgrades[i][2]=Number(splitted[i]);
        if (splitted[i]==0){
            upgradesHTML[i].style.display="none";
        }
    }
    var sacupgradex=getCookie("sacupgrade").split(",");
    for (i=0;i<sacUpgrades.length;i++){
        sacUpgrades[i][2]=Number(sacupgradex[i]);
        if (sacupgradex[i]==0){
            sacUpgradesHTML[i].style.display="none";
        }
    }
    var nummakerx=getCookie("nummaker").split(",");
    for (i=0;i<thingies.length;i++){
        thingies[i][5]=Number(nummakerx[i]);
    }
    var boostmakerx=getCookie("boostmaker").split(",");
    for (i=0;i<thingies.length;i++){
        thingies[i][6]=Number(boostmakerx[i]);
    }
    var makerpricesx=getCookie("makerprices").split(",");
    for (i=0;i<thingies.length;i++){
        thingies[i][0]=Number(makerpricesx[i]);
    }
    if (offlineMoney!=0){
       money+=getMoneyEarned("second")*(timeNow-timeAgo)*offlineMoney/1000;
       money+=getMoneyEarned("second")*(timeNow-timeAgo)*offlineMoney/1000;
       alert("While offline, you earned $"+formatNumber(getMoneyEarned("second")*(timeNow-timeAgo)*offlineMoney/1000));
    }
    updateStuff();
}
function sacrifice() {
    if (lifetimemoney<1000000000000){
        alert("Not enough money to sacrifice!");
        return;
    }
    if (!confirm("Are you sure you want to sacrifice?")) {
        return;
    }
    sacrificePoints+=Math.floor(Math.cbrt(lifetimemoney/1000000000000,1/3));
    sacrificePoints=Math.floor(sacrificePoints);
    sacrificeBoost+=sacrificePoints/100;
    money=0;
lifetimemoney=0;
moneyClickMulti=1;
moneySecondMulti=1;
packetClickBoost=1;
packetSecondBoost=1;
offlineMoney=0;
moneyPacketSpawn=0;
packetSpawnBoost=1;
thingies=[
    [100,"click",1,"Cursor", "money per click +",0,1],
    [100,"second",1,"Lemonade Stand", "money per second +",0,1],
    [1000,"second",8,"Farm", "money per second +",0,1],
    [30000,"second",100,"Factory", "money per second +",0,1],
    [999999,"second",1000,"Diamond Mine", "money per second +",0,1],
    [15000000,"second",8000,"Company", "money per second +",0,1],
    [200000000,"second",75000,"Film Studio", "money per second +",0,1],
    [10000000000,"second",2000000,"Quantum Hacking Rig", "money per second +",0,1],
    [10000000000,'click',500000,"Quantum Spamming Rig", "money per click +",0,1],
];
moneyEarnedThingy=0;
for (i=0;i<upgradesHTML.length;i++) {
    upgradesHTML[i].style.display="block";
}
for (i=0;i<sacUpgradesHTML.length;i++) {
    sacUpgradesHTML[i].style.display="block";
}
boostsHTML.innerHTML="Current Boosts: ";
for (i=0;i<document.getElementsByClassName("packet").length;i++){
    document.getElementsByClassName("packet").style.display="none";
}
updateStuff();
}
function getMoneyEarned(whichOne) {
    moneyEarnedThingy=0;
    if (whichOne == "second"){
       for (i=0;i<thingies.length;i++) {
          if(thingies[i][1]=="second") {
             moneyEarnedThingy+=thingies[i][2]*thingies[i][5]*thingies[i][6];
          }
       }
       moneyEarnedThingy*=moneySecondMulti;
       moneyEarnedThingy*=packetSecondBoost;
    } else {
        for (i=0;i<thingies.length;i++) {
            if(thingies[i][1]=="click") {
               moneyEarnedThingy+=thingies[i][2]*thingies[i][5]*thingies[i][6];
            }
         }
         moneyEarnedThingy+=1;
         moneyEarnedThingy*=moneyClickMulti;
         moneyEarnedThingy*=packetClickBoost;
    }
    return moneyEarnedThingy*sacrificeBoost;
}
function buyMaker(whichMaker) {
    if (money>=thingies[whichMaker][0]){
        money-=thingies[whichMaker][0];
        thingies[whichMaker][0]=Math.floor(thingies[whichMaker][0]*1.15);
        thingies[whichMaker][5]+=1;
        }
        updateStuff();
}
function inString(what,string) {
    isIn=false;
    for (i=0;i<string.length;i++) {
       if (string[i]==what) {
        isIn=true;
        break;
       }
    }
    return isIn;
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
function saveGame() {
    let upgradecookie="";
    let sacupgradecookie="";
    let nummakercookie="";
    let boostmakercookie="";
    let makerpricescookie=""
    for (i=0;i<upgrades.length;i++) {
        upgradecookie+=upgrades[i][2];
        if (i!=upgrades.length-1) {
        upgradecookie+=","
        }
    }
    for (i=0;i<sacUpgrades.length;i++) {
        sacupgradecookie+=sacUpgrades[i][2];
        if (i!=sacUpgrades.length-1) {
        sacupgradecookie+=","
        }
    }
    for (i=0;i<thingies.length;i++) {
        nummakercookie+=thingies[i][5];
        if (i!=thingies.length-1) {
        nummakercookie+=","
        }
    }
    for (i=0;i<thingies.length;i++) {
        boostmakercookie+=thingies[i][6];
        if (i!=thingies.length-1) {
        boostmakercookie+=","
        }
    }
    for (i=0;i<thingies.length;i++) {
        makerpricescookie+=thingies[i][0];
        if (i!=thingies.length-1) {
        makerpricescookie+=","
        }
    }
    const hatime=new Date();
    setCookie("money",money,10000);
    setCookie("lifetimemoney",lifetimemoney,10000);
    setCookie("clickmulti",moneyClickMulti,10000);
    setCookie("secondmulti",moneySecondMulti,10000);
    setCookie("sacboost",sacrificeBoost,10000);
    setCookie("sacpoints",sacrificePoints,10000);
    setCookie("upgrade",upgradecookie,10000);
    setCookie("sacupgrade",sacupgradecookie,10000);
    setCookie("offlinemoney",offlineMoney,10000);
    setCookie("nummaker",nummakercookie,10000);
    setCookie("boostmaker",boostmakercookie,10000);
    setCookie("time",hatime.getTime(),10000);
    setCookie("packetspawn",moneyPacketSpawn,10000);
    setCookie("packetspawnboost",packetSpawnBoost,10000);
    setCookie("makerprices",makerpricescookie,10000);
}
function deleteGame() {
    if (!confirm("Are you sure you want to delete all your progress?")) {
        return;
    }
    setCookie("money",money,-1);
    setCookie("lifetimemoney",lifetimemoney,-1);
    setCookie("moneyclickmulti",moneyClickMulti,-1);
    setCookie("moneysecondmulti",moneySecondMulti,-1);
    setCookie("sacboost",sacrificeBoost,-1);
    setCookie("sacpoints",sacrificePoints,-1);
    setCookie("upgrade",12,-1);
    setCookie("offlinemoney",offlineMoney,-1);
    setCookie("nummaker",2,-1);
    setCookie("boostmaker",3,-1);
    setCookie("time",9,-1);
    setCookie("sacupgrade",9,-1);
    setCookie("packetspawn",1,-1);
    setCookie("makerprices",1,-1);
    alert("Deleted!");
    location.reload();
}
function updateStuff() {
    moneyHTML.innerText="$"+formatNumber(money);
    moneyClickHTML.innerText="Money per Click: "+formatNumber(getMoneyEarned("click"));
    moneySecondHTML.innerText="Money per Second: "+formatNumber(getMoneyEarned("second"));
    sacrificeButtonHTML.innerText="Sacrifice Everything for " + Math.floor(Math.cbrt(lifetimemoney/1000000000000)) + " Sacrifice Points";
    sacrificePointsHTML.innerText="Sacrifice Points: "+sacrificePoints;
    sacrificeMultiHTML.innerText="Sacrifice Bonus: "+(sacrificeBoost-1)*100+"%"
    for (i=0;i<thingies.length;i++){
        if (thingies[i][1]=="click") {
            makersHTML[i].innerText=thingies[i][3]+". Cost: $"+formatNumber(thingies[i][0])+", "+thingies[i][4]+formatNumber(thingies[i][2]*thingies[i][6]*moneyClickMulti*sacrificeBoost*packetClickBoost)+"! Owned: "+thingies[i][5];
        } else {
        makersHTML[i].innerText=thingies[i][3]+". Cost: $"+formatNumber(thingies[i][0])+", "+thingies[i][4]+formatNumber(thingies[i][2]*thingies[i][6]*moneySecondMulti*sacrificeBoost*packetSecondBoost)+"! Owned: "+thingies[i][5];
        }
    }
}
function formatNumber(number) {
    var bigNumber="";
    var firstDigits="";
    var digitBreak = [];
    if (number<1000000) {
        return Math.floor(number);
    } else if (number<1000000000) {
        bigNumber="million";
        firstDigits=(number/1000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000) {
        bigNumber="billion";
        firstDigits=(number/1000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000000) {
        bigNumber="trillion";
        firstDigits=(number/1000000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000000000) {
        bigNumber="quadrillion";
        firstDigits=(number/1000000000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000000000000) {
        bigNumber="quintillion";
        firstDigits=(number/1000000000000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000000000000000) {
        bigNumber="sextillion";
        firstDigits=(number/1000000000000000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    } else if (number<1000000000000000000000000000) {
        bigNumber="septillion";
        firstDigits=(number/1000000000000000000000000).toString();
        if (firstDigits.includes(".")) {
            digitBreak=firstDigits.split(".");
            digitBreak[1]=digitBreak[1].slice(0,3);
        } else {
            digitBreak[0]=firstDigits;
            digitBreak[1]="nothing";
        }
    }
    if (digitBreak[1]!="nothing") {
        return digitBreak[0]+"."+digitBreak[1]+" "+bigNumber;
    } else {
        return digitBreak[0]+" "+bigNumber;
    }
}
function buyUpgrade(whichUpgrade) {
  if (money>=upgrades[whichUpgrade][0]){
  upgradesHTML[whichUpgrade].style.display="none";
  eval(upgrades[whichUpgrade][1]);
  money-=upgrades[whichUpgrade][0];
  upgrades[whichUpgrade][2]=0;
  }
  updateStuff();
}
function clickedPacket(packetClicked) {
   packetClicked.style.display="none";
   var span=document.createElement("span");
   span.class="spanboost";
   boostsHTML.appendChild(span);
   var whichBoost=Math.floor(Math.random()*4);
   if (whichBoost==0) {
        packetSecondBoost*=4.44;
        packetClickBoost*=4.44;
        span.innerText="Money Fever! Cash production x4.44 for 44 seconds! ";
        setTimeout(function() {
            span.style.display="none";
            packetClickBoost/=4.44;
            packetSecondBoost/=4.44;
         },44000);
   } else if (whichBoost==1) {
        packetClickBoost*=333;
        span.innerText="Click Fever! Clicking gives x333 money for 3 seconds! ";
        setTimeout(function() {
            span.style.display="none";
            packetClickBoost/=333;
         },3000);
        } else if (whichBoost==2) {
        money+=getMoneyEarned("second")*300+1;
        span.innerText="Lucky! +$"+formatNumber(getMoneyEarned("second")*300+1)+"! ";
        setTimeout(function() {
            span.style.display="none";
         },2000);
        } else if (whichBoost==3) {
        money+=getMoneyEarned("click")*1000+1;
        span.innerText="Lucky! +$"+formatNumber(getMoneyEarned("click")*1000+1)+"! ";
        setTimeout(function() {
            span.style.display="none";
         },2000);
   }
   
}
function buySacUpgrade(whichUpgrade) {
    if (sacrificePoints>=sacUpgrades[whichUpgrade][0]){
        sacUpgradesHTML[whichUpgrade].style.display="none";
        eval(sacUpgrades[whichUpgrade][1]);
        sacrificePoints-=sacUpgrades[whichUpgrade][0];
        sacUpgrades[whichUpgrade][2]=0;
        }
        updateStuff();
}
function clickedMoney() {
    money+=getMoneyEarned("click");
    lifetimemoney+=getMoneyEarned("click");
    updateStuff();
    moneyImg.style.height="220px";
    moneyImg.style.width="330px";
    setTimeout(function() {
        moneyImg.style.height="200px";
        moneyImg.style.width="300px";
    },100);
}
setInterval(function(){
    money+=getMoneyEarned("second")/100;
    lifetimemoney+=getMoneyEarned("second")/100;
    updateStuff();
},10);
setInterval(function(){
   if (moneyPacketSpawn!=0&&!packetOnScreen){
    if (Math.floor(Math.random()*moneyPacketSpawn*packetSpawnBoost)+1==moneyPacketSpawn*packetSpawnBoost) {
        packetOnScreen=true;
       var packet=document.createElement("div");
       packet.innerText="Money Packet!";
       packet.style.position="absolute";
       packet.style.top=Math.floor(Math.random()*(window.innerHeight-100))+"px";
       packet.style.left=Math.floor(Math.random()*(window.innerWidth-100))+"px";
       packet.classList="packet";
       packet.onclick=function(){
        clickedPacket(packet);
       };
       document.getElementById("body").appendChild(packet);
    setTimeout(function(){
        packet.style.display="none";
        packetOnScreen=false;
    },packetTime);
   }
   }
},1000);

