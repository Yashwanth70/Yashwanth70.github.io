var canvas = document.getElementById('myCanvas');
var bg = document.getElementById('bg');
var ctx = canvas.getContext('2d');
var ctx1=bg.getContext('2d');        

var back= new Image();
 back.src="img/background.jpg";
 ctx1.drawImage(back,0,0,bg.width,bg.height);
// Trigger the imageLoader function when a file has been selected
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', imageLoader, false);
function imageLoader() {
    var reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0, img.width,img.height,0,0,canvas.width , canvas.height);
            ctx1.drawImage(img,126,185,bg.width,bg.height);
        }
        img.src = reader.result;

    }
    reader.readAsDataURL(fileInput.files[0]);
}

window.dl = function() {
    // var back= new Image();
    // var imgu=new Image();
    // back.src="img/background.jpg";
    // imgu.src="img/imgx2.jpg";
    // ctx1.clearRect(0, 0, canvas.width, canvas.height);
    // ctx1.drawImage(back,0,0,bg.width,bg.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx1.drawImage(img,83,61.5,130,55);
    var data1 = bg.toDataURL('image/png',1.0);
   var imgDLHelper = document.getElementById('imgdlhelper');
   imgDLHelper.setAttribute('href',data1);
   imgDLHelper.click();
}