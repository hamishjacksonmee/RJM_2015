$(function() {

    // Init Functions
    setHeight();
    introEffect();

    $(window).on('resize', function(){
        setHeight();
    });
    
    // open/close lateral navigation
    $('.nav--trigger').on('click', function(event){
        toggleMenu(event);
    });

});


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

    $('.intro--text-wrap').height(windowHeight);

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
            $('.intro--wrap').attr('style', '');
            $('.intro--text-wrap').attr('style', '').removeClass('is-absolute');
        }
    });

    function moveBackground(event) {
        var rotateY = ((-event.pageX+halfWindowW)/halfWindowW)*maxRotationY,
            rotateX = ((event.pageY-halfWindowH)/halfWindowH)*maxRotationX;

        if( rotateY > maxRotationY) rotateY = maxRotationY;
        if( rotateY < -maxRotationY ) rotateY = -maxRotationY;
        if( rotateX > maxRotationX) rotateX = maxRotationX;
        if( rotateX < -maxRotationX ) rotateX = -maxRotationX;

        // $('.intro--text-wrap').velocity({
        //     translateZ: 0,
        //     rotateX: rotateX + 'deg',
        //     rotateY: rotateY + 'deg'
        // }, 0);

        $('.intro--text-wrap').css({
            '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
            'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        });
    }
}


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