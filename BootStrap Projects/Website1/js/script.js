$('.carousel').carousel({
          interval: 3000
      })
$('.imageContent').hover(
 //      function(){
 //      $(this).parent().css({'transform': "scale(1.1)"})
 // },
 //  function(){
 //      $(this).parent().css({'transform': "scale(1.0)"})
 //  }
  function(){
      $('.img-responsive').css({'transition':'transform 0.5s linear',
      	'transform': "scale(1.1)"})
    },
  function(){
      $('.img-responsive').css({'transform': "scale(1.0)"})
  }
);
