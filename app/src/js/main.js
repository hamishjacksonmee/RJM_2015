

// ----------------- Global Variables

var categoriesNoEffect = true;


// ----------------- Navigation

function toggleMenu() {

    var isLateralNavAnimating = false;

    //stop if nav animation is running
    if( !isLateralNavAnimating ) {
        if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

        $('body').toggleClass('nav--open');
        $('.nav--wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            //animation is over
            isLateralNavAnimating = false;
        });
    }
}




// ----------------- Categories

function showCategories() {

    var $body = $('body'),
        $categories = $('.categories--single'),
        $enterBtn = $('.intro--enter'),
        $exitBtn = $('.intro--exit'),
        $bgLines = $('.bg--line-wrap'),
        $categoriesWrap = $('.categories--wrap'),
        $cellInner = $('.cell-inner'),
        windowWidth = $(window).innerWidth();

    TweenLite.set($categoriesWrap, {
        display: 'block'
    });

    if (windowWidth > 767) {
        TweenLite.to($cellInner, 0.5, {
            width: '100%',
            onComplete: function(){
                TweenLite.set($categoriesWrap, {
                    backgroundColor: 'black'
                });
                TweenLite.to( $exitBtn, 0.5, {
                    opacity: 1,
                    display: 'block'
                });
                categoriesNoEffect = false;
                if( $('html').hasClass('no-touch') ){
                    categoriesEffect(categoriesNoEffect);
                }
            }
        });
    } else {
        TweenLite.fromTo($cellInner, 0.5, {
            opacity: 0
        }, {
            opacity: 1,
            onComplete: function(){
                TweenLite.set($categoriesWrap, {
                    backgroundColor: 'black'
                });
                TweenLite.to( $exitBtn, 0.5, {
                    opacity: 1,
                    display: 'block'
                });
            }
        });
    }


    TweenLite.to( $enterBtn, 0.5, {
        opacity: 0,
        display: 'none'
    });
    TweenLite.to( $bgLines, 0.3, {
        opacity: 0,
        display: 'none'
    });
}

function hideCategories() {

    var $body = $('body'),
        $categories = $('.categories--single'),
        $enterBtn = $('.intro--enter'),
        $exitBtn = $('.intro--exit'),
        $bgLines = $('.bg--line-wrap'),
        $categoriesWrap = $('.categories--wrap'),
        $cellInner = $('.cell-inner'),
        windowWidth = $(window).innerWidth();

    TweenLite.set($categoriesWrap, {
        backgroundColor: 'rgba(255,255,255,0)'
    });
    TweenLite.to( $exitBtn, 0.5, {
        opacity: 0,
        display: 'none'
    });

    categoriesNoEffect = true;

    if (windowWidth > 767) {
        TweenLite.to($cellInner, 0.5, {
            width: '0',
            onComplete: function(){
                TweenLite.set($categoriesWrap, {
                    display: 'none'
                });
                TweenLite.to( $enterBtn, 0.5, {
                    opacity: 1,
                    display: 'block'
                });
                TweenLite.to( $bgLines, 0.3, {
                    opacity: 1,
                    display: 'block'
                });
            }
        });
    } else {
        TweenLite.to($cellInner, 0.5, {
        opacity: 0,
        onComplete: function(){
            TweenLite.set($categoriesWrap, {
                display: 'none'
            });
            TweenLite.to( $enterBtn, 0.5, {
                opacity: 1,
                display: 'block'
            });
            TweenLite.to( $bgLines, 0.3, {
                opacity: 1,
                display: 'block'
            });
        }
    });
    }


}

function categoriesEffect(doEffect) {

    var $categoriesWrap = $('.categories--wrap'),
        $categories = $('.categories--track'),
        $row = $('.row'),
        $cell = $('.cell'),
        $cellInner = $('.cell-inner'),
        $cellHover = $('.cell-hover'),

        winW = $(window).width(),
        winW_half = winW/2,
        winW_third = winW/3,
        winW_fourth = winW/4,
        difference = -((winW/3)-(winW/4))/2;

    $(window).on('resize', function(){
        winW = $(window).width();
        winW_half = winW/2;
        winW_third = winW/3;
        winW_fourth = winW/4;
        difference = -((winW/3)-(winW/4))/2;
    });

    $cell.mouseover(function() {
        var $currentCell = $(this),
            $currentCellHover = $currentCell.find('.cell-hover');

        if(doEffect){
            return;
        } else {
            TweenLite.to($currentCell, 0.5, {
                width: winW_third,
                z: 0
            });
            TweenLite.to($categories, 0.5, {
                x: difference,
                z: 0
            });
            TweenLite.to($currentCellHover, 0.5, {
                opacity: 1
            });
        }
    }).mouseout(function() {
        TweenLite.to($cell, 0.5, {
            width: winW_fourth,
            z: 0
        });
        TweenLite.to($categories, 0.5, {
            x: 0,
            z: 0
        });
        TweenLite.to($cellHover, 0.5, {
            opacity: 0
        });
    });

    $categories.on('mousemove', function(event) {
        if(doEffect) {
            return;
        } else {
            window.requestAnimationFrame(function() {
                moveBackground(event);
            });
        }
    });

    $categoriesWrap.mouseout(function(){
        TweenLite.to($row, 0.8, {
            x: 0,
            z: 0,
            ease: Power2.easeOut
        });
    });


    function moveBackground(event) {

        var moveAmount = 6, //  higher = smaller effect
            mouseX = event.pageX,
            moveX = (-mouseX + winW_half) / moveAmount;

        TweenLite.to($row, 0.8, {
            x: moveX,
            z: 0,
            ease: Power2.easeOut
        });
    }

}




// ----------------- Intro effects

function introEffect() {

    var mediaQuery = window.getComputedStyle(document.querySelector('.intro--wrap'), '::before').getPropertyValue('content').replace(/['"]+/g, ''),
        //define store some initial variables
        halfWindowH = $(window).height()*0.5,
        halfWindowW = $(window).width()*0.5,
        //define a max rotation value (X and Y axises)
        maxRotationY = 8,
        maxRotationX = 5,
        // DOM Elements
        $introWrap = $('.intro--wrap'),
        $introRotating = $('.intro--rotating-wrap'),

        aspectRatio;

    $('.intro--wrap').on('mousemove', function(event){
        if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') && $('body').hasClass('home') ) {
            window.requestAnimationFrame(function(){
                moveBackground(event);
            });
        }
    });

    //on resize - adjust .cd-background-wrapper and .cd-floating-background dimentions and position
    $(window).on('resize', function(){
        mediaQuery = window.getComputedStyle(document.querySelector('.intro--wrap'), '::before').getPropertyValue('content').replace(/['"]+/g, '');
        if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
            window.requestAnimationFrame(function(){
                halfWindowH = $(window).height()*0.5;
                halfWindowW = $(window).width()*0.5;
            });
        } else {
            $introWrap.attr('style', '');
            $introRotating.attr('style', '').removeClass('is-absolute');
        }
    });

    function moveBackground(event) {
        var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
            rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

        if( rotateY > maxRotationY) rotateY = maxRotationY;
        if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
        if( rotateX > maxRotationX) rotateX = maxRotationX;
        if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

        TweenLite.to( $introRotating, 0.8, {
            rotationX: rotateX,
            rotationY: rotateY,
            ease: Power2.easeOut
        });

    }
}



// ----------------- Gallery Arrows

function animateLeftArrow() {
    var $topLine = $('.arrow-left .top-line'),
        $middleLine = $('.arrow-left .middle-line'),
        $bottomLine = $('.arrow-left .bottom-line');

    TweenLite.to( $topLine, 0.4, {
        y: -8,
        rotation: -135,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.to( $topLine, 0.2, {
                y: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                    TweenLite.set( $topLine, {
                        rotation: 45
                    });
                }
            });
        }
    });
    TweenLite.to( $bottomLine, 0.4, {
        y: 8,
        rotation: 135,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.to( $bottomLine, 0.2, {
                y: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                    TweenLite.set( $bottomLine, {
                        rotation: -45
                    });
                }
            });
        }
    });
    TweenLite.to( $middleLine, 0.4, {
        x: 100,
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.fromTo( $middleLine, 0.2, {
                x: -50,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                ease: Power2.easeOut
            });
        }
    });
}

function animateRightArrow() {
    var $topLine = $('.arrow-right .top-line'),
        $middleLine = $('.arrow-right .middle-line'),
        $bottomLine = $('.arrow-right .bottom-line');

    TweenLite.to( $topLine, 0.4, {
        y: -8,
        rotation: 135,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.to( $topLine, 0.2, {
                y: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                    TweenLite.set( $topLine, {
                        rotation: -45
                    });
                }
            });
        }
    });
    TweenLite.to( $bottomLine, 0.4, {
        y: 8,
        rotation: -135,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.to( $bottomLine, 0.2, {
                y: 0,
                ease: Power2.easeInOut,
                onComplete: function() {
                    TweenLite.set( $bottomLine, {
                        rotation: 45
                    });
                }
            });
        }
    });
    TweenLite.to( $middleLine, 0.4, {
        x: -100,
        opacity: 0,
        ease: Power2.easeInOut,
        onComplete: function() {
            TweenLite.fromTo( $middleLine, 0.2, {
                x: 50,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                ease: Power2.easeOut
            });
        }
    });
}


// ----------------- Slider

function initSlider() {
    var $slider = $('.gallery--slider-wrap');

    $slider.slick({
        dots: true,
        autoplay: false,
        prevArrow: '.gallery--previous',
        nextArrow: '.gallery--next',
        speed: 600,
        lazyLoad: 'progressive',
        infinite: false,
        swipeToSlide: true,
        touchThreshold: 20,
        edgeFriction: 0.5,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    lazyLoad: 'ondemand'
                }
            }
        ],
        customPaging: function() {
            return '<span class="gallery--pager"></span>';
        }
    });
}

function initZoomGallery() {
    var $slider = $('.gallery--slider-wrap'),
        $gallery = $('.gallery--wrap'),
        $navBtn = $('.nav--trigger');

    if( !$gallery.hasClass('zoomed-out') ) {

        $gallery.addClass('zoomed-out');

        TweenLite.to( $navBtn, 0.3, {
            opacity: 0,
            onComplete: function(){
                TweenLite.set( $navBtn, {
                    display: 'none'
                });
            }
        });

    }

}

function closeZoomGallery() {
    var $slider = $('.gallery--slider-wrap'),
        $gallery = $('.gallery--wrap'),
        $navBtn = $('.nav--trigger');

    if( $gallery.hasClass('zoomed-out') ) {

        $gallery.removeClass('zoomed-out');

        TweenLite.to( $navBtn, 0.3, {
            opacity: 1,
            display: 'block'
        });

    }

}



// ----------------- Preloader

function startLoader(pageName) {

  // Images will not begin downloading until we tell the loader to start.
  var loader = new PxLoader(),
      $preloader = $('.preloader'),
      $preloaderLines = $preloader.find('.load-line'),
      $preloaderSections = $preloader.find('.preloader-q'),
      imgOne, imgTwo, imgThree, imgFour, imgFive;

  if( pageName === 'home' ) {
    imgOne = loader.addImage('dist/images/layout/megan2.jpg');
    imgTwo = loader.addImage('dist/images/categories/cat_all2.jpg');
    imgThree = loader.addImage('dist/images/categories/cat_landscape2.jpg');
    imgFour = loader.addImage('dist/images/categories/cat_studio2.jpg');
    imgFive = loader.addImage('dist/images/categories/cat_travel2.jpg');
  } else if( pageName === 'about' ) {
    imgOne = loader.addImage('dist/images/layout/world-map.svg');
  } else if( pageName === 'all' ) {
    imgOne = loader.addImage('dist/images/gallery/s01_man.jpg');
    imgTwo = loader.addImage('dist/images/gallery/l01_sheep.jpg');
    imgThree = loader.addImage('dist/images/gallery/t01_assasin.jpg');
  } else if( pageName === 'studio' ) {
    imgOne = loader.addImage('dist/images/gallery/s01_man.jpg');
    imgTwo = loader.addImage('dist/images/gallery/s02_woman.jpg');
    imgThree = loader.addImage('dist/images/gallery/s03_guiness.jpg');
  } else if( pageName === 'landscape' ) {
    imgOne = loader.addImage('dist/images/gallery/l01_sheep.jpg');
    imgTwo = loader.addImage('dist/images/gallery/l02_basin.jpg');
    imgThree = loader.addImage('dist/images/gallery/l03_shed.jpg');
  } else if( pageName === 'travel' ) {
    imgOne = loader.addImage('dist/images/gallery/t01_assasin.jpg');
    imgTwo = loader.addImage('dist/images/gallery/t02_train.jpg');
    imgThree = loader.addImage('dist/images/gallery/t03_sandune.jpg');
  } else if( pageName === 'categories' ) {
    imgOne = loader.addImage('dist/images/categories/cat_all2.jpg');
    imgTwo = loader.addImage('dist/images/categories/cat_landscape2.jpg');
    imgThree = loader.addImage('dist/images/categories/cat_studio2.jpg');
    imgFour = loader.addImage('dist/images/categories/cat_travel2.jpg');
  } else {
    imgOne = loader.addImage('dist/images/categories/nav_cat_all.jpg');
    imgTwo = loader.addImage('dist/images/categories/nav_cat_landscape.jpg');
    imgThree = loader.addImage('dist/images/categories/nav_cat_studio.jpg');
    imgFour = loader.addImage('dist/images/categories/nav_cat_travel.jpg');
  }

  // callback that will be run once images are ready
  loader.addCompletionListener(function() {

      setTimeout(function() {
          TweenLite.to( $preloaderLines, 0.8, {
              opacity: 0
          });
          TweenLite.to( $preloaderSections, 0.8, {
              width: 0,
              ease: Power2.easeOut,
              onComplete: function(){
                  $preloader.css('display', 'none');
              }
          });
      }, 1500);

  });

  loader.start();

}


// ----------------- Height Items

function setDimensions() {

    var windowHeight = $(window).innerHeight(),
        windowWidth = $(window).innerWidth(),
        $body = $('body');

    $('.intro--rotating-wrap').height(windowHeight);

    $('.bg--line-wrap').css({
        'min-height': windowHeight
    });

    $('.page--wrapper').css({
        'min-height': windowHeight
    });

    $('.nav--wrapper').css({
        'min-height': windowHeight
    });

    if(windowWidth > 1080) {
        $('.categories--wrap').css({
            'height': windowHeight
        });
    }

    if( $body.hasClass('categories') && windowWidth > 767 ){
        showCategories();
    }

}



// ----------------- Events & initialize functions

(function() {

    $(function() {

        // Global variables

        var $body = $('body'),
            $main = $('.page--wrapper'),
            pageName = $body.attr('class');


        if( !$body.hasClass('all') && !$body.hasClass('studio') && !$body.hasClass('landscape') && !$body.hasClass('travel') && !$body.hasClass('categories') && !$body.hasClass('home') && !$body.hasClass('about') && !$body.hasClass() ){
            $main.append('<h2 class="font-black-italic yellow no-page">The page you are looking for does not exist.</h2>');
        }


        // Page transitions

        TweenLite.to( $body, 0.5, {
            opacity: 1,
            display: 'block',
            onComplete: function(){
                if( $body.hasClass('all') || $body.hasClass('studio') || $body.hasClass('landscape') || $body.hasClass('travel') ){
                    initSlider();
                } else if ( $body.hasClass('home') && $('html').hasClass('preserve-3d') ) {
                    introEffect();
                }
            }
        });

        $('a.do-fade').click(function(event){
            event.preventDefault();
            linkLocation = this.href;
            $body.fadeOut(500, redirectPage);
        });

        function redirectPage() {
            window.location = linkLocation;
        }


        // Init Functions

        setDimensions();
        startLoader(pageName);

        if( $body.hasClass('home') && $('html').hasClass('preserve-3d') ){
            introEffect();
        }

        if( $body.hasClass('categories') ){
            showCategories();
        }


        // Events

        $(window).on('resize', function(){
            setDimensions();

        });

        $('.intro--enter').on('click', function(event){
            event.preventDefault();
            showCategories();
        });

        $('.intro--exit').on('click', function(event){
            event.preventDefault();
            hideCategories();
        });

        $('.nav--trigger').on('click', function(event){
            event.preventDefault();
            toggleMenu();
        });

        $('.gallery--nav-btn').on('click', function(){
            initZoomGallery();
        });

        $('.zoom--exit').on('click', function(){
            closeZoomGallery();
        });

        $('.gallery--previous').on('click', function(){
            if(!$(this).hasClass('slick-disabled')) {
                animateLeftArrow();
            }
        });

        $('.gallery--next').on('click', function(){
            if(!$('.gallery--next').hasClass('slick-disabled')) {
                animateRightArrow();
            }
        });

        $('.gallery--slide').dblclick( function(){
            if( !$('.gallery--wrap').hasClass('zoomed-out') ) {
                initZoomGallery();
            }
        });

        $('.gallery--slide.slick-active').click( function(){
            if( $('.gallery--wrap').hasClass('zoomed-out') ) {
                closeZoomGallery();
            }
        });


        var isDragging = false;
        $('.gallery--slide')
        .mousedown(function() {
            $(window).mousemove(function() {
                isDragging = true;
                $(window).unbind('mousemove');
            });
        })
        .mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            $(window).unbind('mousemove');
            if (!wasDragging) {
                if( $('.gallery--wrap').hasClass('zoomed-out') ) {
                    closeZoomGallery();
                }
            }
        });


    });

}).call(this);



/*  Detect "transform-style: preserve-3d" support, or update csstransforms3d for IE10 ? #762
    https://github.com/Modernizr/Modernizr/issues/762 */
(function getPerspective(){
  var element = document.createElement('p'),
      html = document.getElementsByTagName('html')[0],
      body = document.getElementsByTagName('body')[0],
      propertys = {
        'webkitTransformStyle':'-webkit-transform-style',
        'MozTransformStyle':'-moz-transform-style',
        'msTransformStyle':'-ms-transform-style',
        'transformStyle':'transform-style'
      };

    body.insertBefore(element, null);

    for (var i in propertys) {
        if (element.style[i] !== undefined) {
            element.style[i] = "preserve-3d";
        }
    }

    var st = window.getComputedStyle(element, null),
        transform = st.getPropertyValue("-webkit-transform-style") ||
                    st.getPropertyValue("-moz-transform-style") ||
                    st.getPropertyValue("-ms-transform-style") ||
                    st.getPropertyValue("transform-style");

    if(transform!=='preserve-3d'){
      html.className += ' no-preserve-3d';
    } else {
        html.className += ' preserve-3d';
    }
    document.body.removeChild(element);

})();

