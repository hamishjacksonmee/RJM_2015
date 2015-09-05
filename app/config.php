<?php

// Environment
if (strpos($_SERVER['SERVER_NAME'], 'localhost') !== FALSE || strpos($_SERVER['SERVER_NAME'], '.local') !== FALSE || strpos($_SERVER['SERVER_NAME'], '10.10') !== FALSE)
  define('IS_DEVELOPMENT', true);
else
  define('IS_DEVELOPMENT', false);

if (strpos($_SERVER['SERVER_NAME'], 'staging.') !== FALSE)
  define('IS_STAGING', true);
else
  define('IS_STAGING', false);

// Global variables, SMTP init, errors display
if (IS_DEVELOPMENT) {
  define('PATH', '/rjm_2015/app/');
  define('EMAIL', 'hamishjacksonmee@yahoo.co.nz');

  // Errors display
  error_reporting(E_ALL);
  ini_set('display_errors', 'on');

} elseif (IS_STAGING) {
  define('PATH', 'http://staging.itshamish.com/jacksonmee.com/');
  define('EMAIL', 'hamishjacksonmee@yahoo.co.nz');

} else {
  define('PATH', '');
  define('EMAIL', '');
}

define('IMAGES_PATH', PATH . 'dist/images/');

// Assets
$assets = array();
if (IS_DEVELOPMENT) {
  $js_path = PATH.'src/js/';
  $css_path = PATH.'src/css/';
  $assets['javascripts'] = array(
    $js_path.'vendor/1.jquery-1.11.1.min.js',
    $js_path.'vendor/2.CSSPlugin.min.js',
    $js_path.'vendor/3.EasePack.min.js',
    $js_path.'vendor/4.TweenLite.min.js',
    $js_path.'vendor/5.slick.min.js',
    $js_path.'main.js'
  );
  $assets['stylesheets'] = array(
    $css_path.'vendor/normalize.css',
    $css_path.'main.css'
  );
} else {
  $asset_version = time();
  $js_path = PATH.'dist/javascripts/';
  $css_path = PATH.'dist/stylesheets/';
  $assets['javascripts'] = array(
    $js_path.'application.min.js?v='.$asset_version
  );
  $assets['stylesheets'] = array(
    $css_path.'application.min.css?v='.$asset_version
  );
}
