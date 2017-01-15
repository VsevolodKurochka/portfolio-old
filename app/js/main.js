$(document).ready(function(){

	// VARIABLES
	var header            			= $(".header"),
			headerInner 						= $('.header-inner'),
			headerInnerHeight 			= headerInner.outerHeight(),
			headerInnerOffset 			= headerInner.offset().top,
			headerRange 						= 340,
			header_menu 						= $('.vnav-menu'),
			menuActive        			= 'vnav-open',
			menuBtn           			= $('.js-toggle-menu'),
			body 										= $("body"),
			visibility        			= "in visible",
			active            			= "active",
	 		backdrop 							= $("<div />", {
				class: "vmodal-backdrop fade"
			});
	// Smooth page scrolling
		
	function toggler(){
		body.toggleClass(menuActive);
	}
	// Клик на кнопку меню
	menuBtn.click(function(){
		var menu_href = $(this).attr("data-menu");
		menuBtn.not($(this)).removeClass(active);
		$(this).toggleClass(active);
		toggler();
	});

	// Клики на пункты меню
	$('.anchor-menu, a[href*="#"]').click(function(){
		var href = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(href).offset().top - 50
		},2000);
		$("[data-menu]").removeClass(active);
		toggler();
		return false;
	});

	// SCROLL TO BLOCK
	$('.anchor').click(function(){
		var href = $(this).attr('href');
		$('body,html').animate({
			scrollTop: $(href).offset().top
		},2000);
		return false;
	});

	// Подсвечивание пунктов меню
	function highlightPoints(){
		$(".target").each(function(){
			if( $(window).scrollTop() >= $(this).offset().top - $('.vnav-menu a').outerHeight() ){
				var id = $(this).attr('id');
				$('.vnav-menu a').removeClass(active);
				$('.vnav-menu a[href="#'+ id +'"]').addClass(active);
			}
		});
	}

	// Добавление активности для масок
	function maskVisible(){
		$(".vloading-mask").each(function(){
			if ( $(this).visible() ) {
				$(this).addClass(active);
			}				
		});
	}
	function scrollingFunctions(){
		maskVisible();
		highlightPoints();
	}

	// Вызов 2 функций: highlightPoints(), maskVisible()
		scrollingFunctions();

	$(window).scroll(function(){

		scrollingFunctions();

		var scrollTop = $(this).scrollTop(), // Скролл сверху
				offset = headerInnerOffset + (headerInnerHeight / 3), // Отступ сверху у контейнера внутри .header + высота этого же контейнера / 2
				calc = 1 - (scrollTop/2 - offset + headerRange / 2) / headerRange; 

		headerInner.css({ 'opacity': calc });
		if ( calc >= '1' ) {
      headerInner.css({ 'opacity': 1 });
    } else if ( calc <= '0' ) {
      headerInner.css({ 'opacity': 0 });
    }
		// Toggling classes for menu button
		if(scrollTop >= 200){
			menuBtn.addClass('scrolled');
		}else{
			menuBtn.removeClass('scrolled');
		}
		if(scrollTop <= header.outerHeight()){
			$('.header-logo').css({
				'transform': 'translate(0px, -'+scrollTop/2+'%)'
			});
			$('.header-text').css({
				'transform': 'translate(0px, '+scrollTop/8+'%)'
			});
			// $('.header-name').css({
			// 	'transform': 'translate(0px, '+scrollTop/8+'%)'
			// });
			// $('.header-tagline').css({
			// 	'transform': 'translate(0px, '+scrollTop/2+'%)'
			// });
		}
	});
	
	// Modal 
		$('[data-modal="vmodal"]').click(function(){
			var thisTarget = $(this).attr("data-modal-target");
			if ( thisTarget ) {
				$(thisTarget).addClass(visibility);
				body.append(backdrop).addClass("vmodal-open");
				backdrop.addClass(visibility);
			}else{
				console.log("Need attribtue [data-modal-target].");
			}
		});
		// Закрытие модального окна, при нажатии на крестик
		$('[data-close="vmodal"]').click(function(){
			$(this).closest(".vmodal").removeClass(visibility);
			backdrop.removeClass(visibility);
			body.removeClass("vmodal-open");
		});
		// Нажатие на пустое место, при открытом модальном окне
		$(window).click(function(e){
			if ( backdrop.length > 0 ) {
				if ( $(e.target).is(".vmodal") ) {
					$(".vmodal.in").removeClass(visibility);
					backdrop.removeClass(visibility);
					body.removeClass("vmodal-open");
				}
			}
		});

	//COLLAPSE
		$(".vcollapse-inner.active").children(".vcollapse-body").slideDown();
		$(".vcollapse-header").click(function(){
			$(this).parent().toggleClass(active);
			$(this).next().slideToggle("slow");
			$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").not($(this).parent()).removeClass("active");
			$(this).closest(".vcollapse-wrap").children(".vcollapse-inner").children(".vcollapse-body").not($(this).next()).slideUp("slow");
		});

	//TABS
		$('[data-tab="tab"]').click(function(){
			//TABS LINK TOGGLE ACTIVE CLASS
				$(this).closest(".vtabs-list").children("li").removeClass(active);
				$(this).parent().addClass(active);
			//TABS CONTENT SHOW
				var tabTarget = $(this).attr('data-tab-target');
				$(tabTarget).addClass(active);
				$(".vtabs-content > div").not($(tabTarget)).removeClass(active);
				$('body,html').animate({
					scrollTop: $(tabTarget).offset().top
				},2000);
		});

});	