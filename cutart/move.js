$(function() {
	setTimeout(function(){
		$('.start img ').fadeIn(1200);
	},300); 
	setTimeout(function(){
		$('.start').fadeOut(500);
	},2700); 
});

$(function () {
	$(window).scroll(function () {
	  const windowHeight = $(window).height();
	  const scroll = $(window).scrollTop();
  
	  $('.element').each(function () {
		const targetPosition = $(this).offset().top;
		if (scroll > targetPosition - windowHeight + 100) {
		  $(this).addClass("is-fadein");
		}
	  });
	});
  });