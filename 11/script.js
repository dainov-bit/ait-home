document.addEventListener("DOMContentLoaded",function(){
let type = "none"; // Хранит статус двежения. Horizontal, Vertical, diagonal
let t = 0; // Храним id от setInterval
let status = "none"; // Указывает, двежение идет вперед или назад.
let left = 0;
let top = 0;
// Массив для типов двежения.
let mt = ["horizontal","vertical","diagonal"];
// Квадрат и поле, в котором выполняется движение.
let container = document.getElementById("container");
let box = document.getElementById("box");

// Функция, которая выводит случайное число.
function random(min, max) {
return Math.round(Math.random() * (max - min) + min);
}

// Функция выводит информацию о движении
function info(obj) {
document.getElementById("info_direction").innerHTML=obj['type'];
document.getElementById("info_move").innerHTML=obj['status'];
document.getElementById("info_top").innerHTML=obj['top'];
document.getElementById("info_left").innerHTML=obj['left'];
}
// Старт движению
function startInterval() {
t = setInterval(function(){ move();},100);
}
// Стоп движению
function stopInterval() {
clearInterval(t);
}
// Движение по горизонтальной линии
function moveSquareHorizontal() {
// Выполняем движение
if (type=="horizontal" && status=="next") { // Движение будет с лево на право
left = left+1;
box.style.left = left+"px";
box.style.top = top+"px";
info({"type": "горизонтальное","status": "Вправо","top": top+"px","left": left+"px"});

// Проверка, дошли ли до конца или нет
if (left>=150) {
// Да, мы дошли до конца. Теперь нужно сбросить параметры
status = "none";
type = "none";
return true;
}
else { return true;}
}
else if (type=="horizontal" && status=="back") { // движение с право на лево
left = left-1;
box.style.left = left+"px";
box.style.top = top+"px";

info({"type": "горизонтальное","status": "Влево","top": top+"px","left": left+"px"});

// Проверка, дошли мы до конца
if (left<=0) {
type = "none";
status = "none";
return true;
}
else { return true;}
}
// Следующая часть кода будет выполняться, если код выше не выполняется.
// Нужно указать, какое должно быть направление.
if (left==0) {
status = "next"; // Указываем двежение вправо 
return true;
}
else if (left==150) {
status = "back"; // Указали, что движение идет влево
return true;
}
}
// Вертекальное движение
function moveSquareVertical() {
// Выполняем движение
if (type=="vertical" && status=="next") { // двигаемся вниз
top = top+1;
box.style.top = top+"px";
box.style.left = left+"px";
info({"type": "вертикальное","status": "Вниз","top": top+"px","left": left+"px"});

// Проверка, дошли ли до конца или нет
if (top>=150) {
// Да, мы дошли до конца. Теперь нужно сбросить параметры
status = "none";
type = "none";
return true;
}
else { return true;}
}
else if (type=="vertical" && status=="back") { // двигаемся вверх
top = top-1;
box.style.top = top+"px";
box.style.left = left+"px";
info({"type": "Вертикальное","status": "на верх","top": top+"px","left": left+"px"});


// Проверка, дошли ли до конца
if (top<=0) {
type = "none";
status = "none";
return true;
}
else { return true;}
}
// Следующая часть кода будет выполняться, если код выше не выполняется.
// Нужно указать, какое должно быть направление.
if (top==0) {
status = "next"; // Указываем двежение вниз
return true;
}
else if (top==150) {
status = "back"; // Указали, что движение идет вверх
return true;
}
}
// Метод, который отправляет объект с левого верхнего угла в правый нижний
function moveSquareDiagonalHeadLeft() {
if (status=="next_head_left_right") {
// Просто плюсуем по высоте и горизонтале
top = top+1;
left = left+1;
box.style.left = left+"px";
box.style.top = top+"px";
info({"type": "диагональное","status": "с левого верхнего в правый нижний","top": top+"px","left": left+"px"});

if (left>=150 && top>=150) {
status = "none";
type = "none";
return true;
}
else { return true;}
}
}
// отправляем объект из нижнего правого угла в левый верхний
function moveSquareDiagonalFooterRight() {
if (status=="back_footer_right_left") {
// Нужно просто отнимать
top = top-1;
left = left-1;
box.style.top = top+"px";
box.style.left = left+"px";
info({"type": "диагональное","status": "С правого нижнего угла в левый верхний","top": top+"px","left": left+"px"});

if (left<=0 && top<=0) {
status = "none";
type = "none";
return true;
}
else {
return true;
}
}
}
// Отправляем объект из левого нижнего угла в верхний правый.
function moveSquareDiagonalFooterLeft() {
if (status=="next_footer_left_right") {
left = left+1;
top  = top-1;
box.style.top = top+"px";
box.style.left = left+"px";
info({"type": "диагональное","status": "с левого нижнего угла в правый верхний","top": top+"px","left": left+"px"});

if (left>=150 && top<=0) {
status = "none";
type = "none";
return true;
}
else {
return true;
}
}
}
// Отправляем объект из верхнего правого угла в нижний левый.
function moveSquareDiagonalHeadRight() {
if (status=="back_head_right_left") {
top = top+1;
left = left-1;
box.style.top = top+"px";
box.style.left = left+"px";
info({"type": "диагональное","status": "С правого верхнего угла, в левый нижний","top": top+"px","left": left+"px"});
if (left<=0 && top>=150) {
status = "none";
type = "none";
return true;
}
else {
return true;
}
}
}
// Функция принимает решение о диагональном движении.
function moveSquareDiagonal() {
moveSquareDiagonalHeadLeft();
moveSquareDiagonalFooterLeft();
moveSquareDiagonalHeadRight();
moveSquareDiagonalFooterRight();
// Движение с верхнего левого угла в низ в правый угол.
if (left==0 && top==0) {
status = "next_head_left_right";
}
// Движение с нижнего левого угла в правый верхний.
else if (left==0 && top==150) {
status = "next_footer_left_right";
}
// Движение из верхнего правого угла в нижний левый
else if (left==150 && top==0) {
status = "back_head_right_left";
}
// Движение из правого нижнего угла в левый верхний.
else if (left==150 && top==150) {
status = "back_footer_right_left";
}
}
// Функция направляет движение объекта
function moveSquare() {
if (type=="horizontal") {
moveSquareHorizontal();
}
else if (type=="vertical") {
moveSquareVertical();
}
else if (type=="diagonal") {
moveSquareDiagonal();
}
}
// Функция движения.
function move() {
// Нет типа двежения.
if (type=="none") {
let r  = random(0,2);
let res = mt[r];
type = res; // В случайном порядке выбрали направление движения
}
// Тип уже выбран, вызываем функцию движения
else {
moveSquare();
}
}
// Обработчик для кнопки
document.getElementById("start_pause").onclick = function(){
if (this.getAttribute("status")=="null") {
this.innerHTML = "Pause";
this.setAttribute("status","process");
startInterval();
}
else if (this.getAttribute("status")=="process") {
this.innerHTML = "Start";
this.setAttribute("status","pause");
stopInterval();
}
else if (this.getAttribute("status")=="pause") {
this.innerHTML = "Pause";
this.setAttribute("status","process");
startInterval();
}
}



});