$(function() {
	setTimeout(function(){
		$('.start p').fadeIn(1600);
	},300); //0.5秒後にロゴをフェードイン!
	setTimeout(function(){
		$('.start').fadeOut(500);
	},2700); //2.5秒後にロゴ含め真っ白背景をフェードアウト！
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