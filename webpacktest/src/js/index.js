// import "../css/index.css";
alert("hello qjz去去去");

//多js文件时的引入
require("../css/index.css");

var demo1 = require("../js/demo1.js");
var demo2 = require("../js/demo2.js");
var oImg = new Image();
oImg.src = "dist/" + require("../img/01.jpg"); //当成模块引入图片
document.body.appendChild(oImg);
// demo1.init();
// demo2.init();
