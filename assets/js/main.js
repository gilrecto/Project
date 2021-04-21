$('a[href*="#"]').on('click', function (e) {
	e.preventDefault();
});

$('.nav-link').on('click', function () {
	$('.nav-link').removeClass('active');
	$(this).addClass('active');
});

//sidebar project menu
const sidebar = $('#proj-sidebar');

$('#projects').on('click', e => {
	e.preventDefault();
	sidebar.toggleClass('slide-in');
});

$(document).mouseup(e => {
	if (!sidebar.is(e.target) && sidebar.has(e.target).length === 0) sidebar.removeClass('slide-in');
});

$('#close_sidebar').on('click', () => {
	sidebar.removeClass('slide-in');
})

//vertical slick slider
const menu = $('a[data-slide]');
const scrollDown = $('.scroll')
const titleSlider = $('.section-titles');
const footer = $('#site-footer');
let slider = $('.section-slides');
let maxItems = $('.slide-item', slider).length,
	dragging = false,
	tracking,
	rightTracking;

slider.on('init', (event, slick) => {
	let dots = $('.slick-dots li');
	let items = slick.$slides;

	dots.each(function (i, obj) {
		$(this).find('button').addClass(`text-white text-uppercase slide-${i}`);
	});

	items.each(function (i, obj) {
		let text = obj.dataset.id;
		let btnText = $(`.slide-${i} `);
		btnText.text(text);
	});
});

sliderRight = $('.content-wrapper').clone().addClass('slideshow-right').appendTo($('.main-slider'));

let rightItems = $('.slide-item', sliderRight).toArray();
let reverseItems = rightItems.reverse();
$('.section-slides', sliderRight).html('');
for (i = 0; i < maxItems; i++) {
	$(reverseItems[i]).appendTo($('.section-slides', sliderRight));
}

slider.addClass('slideshow-left');
$('.slideshow-left').slick({
	vertical: true,
	verticalSwiping: true,
	arrows: false,
	infinite: false,
	dots: true,
	draggable: false,
	swipe: false,
	touchMove: false,
	speed: 1000,
	cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
	responsive: [{
		breakpoint: 1025,
		settings: {
			swipe: true,
			dots: false
		}
	}]
}).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
	let slides = slick.$slides;
	let nxtSlide = slides.get(nextSlide);
	let slideLenght = slides.length - 1;

	if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems) {
		$('.slideshow-right .section-slides').slick('slickGoTo', -1);
		$('.section-titles').slick('slickGoTo', maxItems);
	} else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems) {
		$('.slideshow-right .section-slides').slick('slickGoTo', maxItems);
		$('.section-titles').slick('slickGoTo', -1);
	} else {
		$('.slideshow-right .section-slides').slick('slickGoTo', maxItems - 1 - nextSlide);
		$('.section-titles').slick('slickGoTo', nextSlide);
	}

	$('#nav-menu').collapse('hide');
	$('.nav-link').removeClass('active');
	$('.navbar-nav').find(`[data-href="${nxtSlide.dataset.id}"]`).addClass('active');

	if (slideLenght != nextSlide) footer.removeClass('show-footer');
}).on('afterChange', (event, slick, currentSlide) => {
	let slides = slick.$slides;
	let slideLenght = slides.length - 1;

	if (slideLenght == currentSlide) footer.addClass('show-footer');
	currentSlide != 0 ? scrollDown.fadeOut('fast') : scrollDown.fadeIn('fast');
}).on('wheel', function (e) {
	e.preventDefault();
	let $this = $(this);
	sidebar.removeClass('slide-in');

	if (e.originalEvent.deltaY > 0 || e.originalEvent.deltaX < 0) {
		$this.slick('slickNext');
		scrollDown.fadeOut('fast');
	} else if (e.originalEvent.deltaY < 0 || e.originalEvent.deltaX > 0) {
		$this.slick('slickPrev');
	};
});

$('.slideshow-right .section-slides').slick({
	swipe: false,
	vertical: true,
	verticalSwiping: true,
	arrows: false,
	infinite: false,
	speed: 950,
	cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
	initialSlide: maxItems - 1,
	responsive: [{
		breakpoint: 1025,
		settings: {
			swipe: true,
		}
	}]
});

titleSlider.slick({
	vertical: true,
	infinite: false,
	dots: false,
	arrows: false,
	slideToShow: 1,
	swipe: false,
	speed: 900,
	cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
});

menu.on('click', function (e) {
	e.preventDefault();

	let slideNo = $(this).data('slide');
	slider.slick('slickGoTo', slideNo - 1);
	scrollDown.fadeOut(100);
});

scrollDown.on('click', () => {
	scrollDown.fadeOut(100);
	slider.slick('slickNext');
});

$(window).on('keydown', (e) => {
	let key = e.keyCode;
	let slideLenght = $('.slick-track').children().length;

	switch (key) {
		case 35:
			slider.slick('slickGoTo', slideLenght);
			break;
		case 36:
			slider.slick('slickGoTo', 0);
			break;
		case 37:
		case 39:
			e.preventDefault();
			break;
		case 38:
		case 33:
			slider.slick('slickPrev');
			break;
		case 40:
		case 34:
			slider.slick('slickNext');
			break;
	}
});

let hoverable = $('a, button, .scroll');
let circle = $('.circle');

$(document).on('load', (e) => {
	console.log(e, $(this));
});

$(document).on('mousemove click', (e) => {
	let x = e.pageX;
	let y = e.pageY;
	let newPosX = x - 30;
	let newPosY = y - 30;

	circle.css({
		left: newPosX,
		top: newPosY
	});
	circle.show();
});

hoverable.mouseenter((e) => {
	let target = e.target;
	let tag = target.localName;
	let text = target.textContent;

	if (target.classList[0] == 'nav-link' || tag == 'button') {
		circle.append(`<p>View ${text}</p>`);
		circle.css({
			backgroundColor: '#01a8f9',
			mixBlendMode: 'unset',
		});
	} else if (target.className == 'scroll' || target.className == 'mouse') {
		circle.append(`<p style="color: #000; font-size: 5px;" ><i class="bi bi-arrow-down d-block"></i> Scroll Down</p>`);
		circle.css({
			borderColor: '#fff',
			mixBlendMode: 'unset',
		});
	} else if (target.className == 'proj-link') {
		circle.append(`<p>View Project</p>`);
		circle.css({
			backgroundColor: '#01a8f9',
			mixBlendMode: 'unset',
		});
	} else {
		circle.css({
			backgroundColor: 'transparent',
			borderColor: '#fff',
		});
	}

	circle.css({
		transform: 'scale(2)',
		transition: 'all .3s linear',
	});

	console.log(e, tag)
});

hoverable.mouseleave((e) => {
	circle.empty();
	circle.css({
		transform: 'scale(1)',
		backgroundColor: '#fff',
		mixBlendMode: 'difference',
		borderColor: 'transparent',
	});

	setTimeout(() => {
		circle.css({
			transition: 'all 3s cubic-bezier(.02, 1.23, .79, 1.08)',
		});
	}, 500);
});