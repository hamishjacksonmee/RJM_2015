
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
        if( mediaQuery == 'web' && $('html').hasClass('preserve-3d') ) {
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

        // $('.intro--text-wrap').velocity({
        //     rotateX: rotateX + 'deg',
        //     rotateY: rotateY + 'deg'
        // }, {
        //     easing: 'easeOut'
        // }, 0.1);

        // $('.intro--text-wrap').css({
        //     '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        //     '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        //     '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        //     '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        //     'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        // });
    }
}



$(function() {

    // Init Functions

    setHeight();

    if( $('body').hasClass('home') ){
        introEffect();
    }

    // Events

    $(window).on('resize', function(){
        setHeight();
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

