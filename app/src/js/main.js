(function() {


    // Initial Calls

    setHeight();



}).call(this);


function setHeight() {

    var window_height = $(window).height();

    $('.intro-wrap').height(window_height);
}