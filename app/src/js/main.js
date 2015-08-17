
// ----------------- Navigation

function toggleMenu(event) {

    var isLateralNavAnimating = false;

    event.preventDefault();
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

function showCategories(event) {

    var $body = $('body'),
        $categories = $('.categories--single'),
        $enterBtn = $('.intro--enter'),
        $exitBtn = $('.intro--exit'),
        $bgLines = $('.bg--line-wrap'),
        $categoriesWrap = $('.categories--wrap'),
        $cellInner = $('.cell-inner');

    $body.removeClass('home').addClass('categories');

    // Un comment for OG

    // TweenLite.to( $categories, 0.7, {
    //     width: '25%',
    //     ease: Power2.easeInOut
    // });
    TweenLite.set($categoriesWrap, {
        display: 'block'
    });
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
    
    TweenLite.to( $enterBtn, 0.5, {
        opacity: 0,
        display: 'none'
    });
    TweenLite.to( $bgLines, 0.3, {
        opacity: 0,
        display: 'none'
    });

    event.preventDefault();
}

function hideCategories(event) {

    var $body = $('body'),
        $categories = $('.categories--single'),
        $enterBtn = $('.intro--enter'),
        $exitBtn = $('.intro--exit'),
        $bgLines = $('.bg--line-wrap'),
        $categoriesWrap = $('.categories--wrap'),
        $cellInner = $('.cell-inner');

    setTimeout(function(){
        $body.removeClass('categories').addClass('home');
    }, 700);

    TweenLite.set($categoriesWrap, {
        backgroundColor: 'rgba(255,255,255,0)'
    });
    TweenLite.to( $exitBtn, 0.5, {
        opacity: 0,
        display: 'none'
    });

    // TweenLite.to( $categories, 0.7, {
    //     width: 0,
    //     ease: Power2.easeInOut
    // });

    categoriesNoEffect = true;

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

    event.preventDefault();
}

function categoriesEffect(doEffect) {

    var $categoriesWrap = $('.categories--wrap'),
        $categories = $('.categories--track'),
        $row = $('.row'),
        $cell = $('.cell'),
        $cellInner = $('.cell-inner'),

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
        var $currentCell = $(this);
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
                // -((winW/3)-(winW/4))/2 -winW / 21
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


// ----------------- Height Items

function setHeight() {

    var windowHeight = $(window).innerHeight();

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


// ----------------- Events & initialize functions

$(function() {

    // Global variables

    var categoriesNoEffect = true,
        $body = $('body');


    // Page transitions

    $body.css('display', 'none');
 
    $body.fadeIn(500);
 
    $('a.do-fade').click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $body.fadeOut(500, redirectPage);      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }


    // Init Functions

    setHeight();

    if( $body.hasClass('home') && $('html').hasClass('preserve-3d') ){
        introEffect();
    }

    if( $body.hasClass('categories') && $('html').hasClass('no-touch') ){
        categoriesEffect(categoriesNoEffect);
    }


    // Events

    $(window).on('resize', function(){
        setHeight();
    });

    $('.intro--enter').on('click', function(event){
        showCategories(event);
    });

    $('.intro--exit').on('click', function(event){
        hideCategories(event);
    });
    
    $('.nav--trigger').on('click', function(event){
        toggleMenu(event);
    });

    

});


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

