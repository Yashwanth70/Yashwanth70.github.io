var bigCanvas = document.querySelector('#c');
  var ctx= bigCanvas.getContext('2d');
  var smallCanvas= document.querySelector('#cd');
  var ctxSml = smallCanvas.getContext('2d');
  var image=new Image();
  image.crossOrigin="Anonymous";   //CORS policy
  image.onload = function() {                        //Backgroung Image Load
    console.log("Loaded Image");
    ctx.drawImage(image,0,0,bigCanvas.width,bigCanvas.height);
  }
  image.src = "img/imgx2.jpg";

// Trigger the imageLoader function when a file has been selected
var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', imageLoader, false);
function imageLoader() {
    var reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function(){

          ctxSml.drawImage(img,0,0, img.width,img.height,0,0,smallCanvas.width,smallCanvas.height);
        }
        img.src = reader.result;

    }
    reader.readAsDataURL(fileInput.files[0]);
}

//Download File Function
window.dl = function() { 
    //ctxSml.clearRect(0, 0, smallCanvas.width,smallCanvas.height);  //Dont include in Github
    ctx.clearRect(0, 0, bigCanvas.width,bigCanvas.height);
    ctx.drawImage(image,0,0,bigCanvas.width,bigCanvas.height);
    ctx.drawImage(img,120,100,smallCanvas.width,smallCanvas.height);
    var data1 = bigCanvas.toDataURL('image/png',1.0);
   var imgDLHelper = document.getElementById('imgdlhelper');
   imgDLHelper.setAttribute('href',data1);
   imgDLHelper.click();
}
//ctxSml.rotate(50*Math.PI/180);
// ctxSml.fillRect(0,0,500,500);