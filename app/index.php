<?php

include('config.php');

/* Request */
$q = isset($_GET['q']) ? explode('/', $_GET['q']) : array();
$controller = isset($q[0]) ? $q[0] : 'home';
$view = isset($q[1]) && $q[1] != '' ? $q[1] : null;

?><!DOCTYPE html>
<html class="no-js" lang="en">
<head>
  <title>Website Title</title>
  <meta charset="utf-8">

  <meta name="description" content="">
  <meta name="keywords" content="">

  <meta property="og:title" content="" />
  <meta property="og:site_name" content="" />
  <meta property="og:url" content="" />
  <meta property="og:description" content="" />
  <meta property="og:image" content="" />

  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="language" content="en_EN" />
  <meta name="robots" content="NOODP" />
  <meta name="msnbot" content="NOODP" />
  <meta name="googlebot" content="NOODP" />

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <link rel="apple-touch-icon" href="apple-touch-icon.png">

  <!-- <link rel="icon" type="image/gif" href="http://cdn-s.hellomonday.com/assets/images/icons/favicon.png" /> -->

  <!-- <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon57.png" sizes="57x57">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon72.png" sizes="72x72">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon76.png" sizes="76x76">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon114.png" sizes="114x114">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon120.png" sizes="120x120">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon144.png" sizes="144x144">
  <link rel="apple-touch-icon" href="http://cdn-s.hellomonday.com/assets/images/icons/apple-touch-icon-icon152.png" sizes="152x152"> -->

  <?php if (!IS_DEVELOPMENT) : ?>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <?php endif ?>

  <link rel="icon" href="<?php echo IMAGES_PATH ?>layout/favicon.ico" type="image/x-icon"/>

  <?php foreach ($assets['stylesheets'] as $file_path) : ?>
    <link rel="stylesheet" href="<?php echo $file_path ?>" type="text/css" />
  <?php endforeach ?>

  <!--[if lt IE 9]>
    <script src="<?php echo PATH ?>dist/javascripts/html5shiv.js" type="text/javascript"></script>
  <![endif]-->

</head>
<body class="<?php echo $controller; ?>">

  <div id="container" class="container hidden">

    <div class="wrapper">
      <?php if (is_file("views/$controller.php")) include("views/$controller.php"); ?>
    </div>

  </div>

  <?php foreach ($assets['javascripts'] as $file_path) : ?>
    <script type="text/javascript" src="<?php echo $file_path ?>"></script>
  <?php endforeach; ?>

  <script>
    function showContent() {
      var container = document.getElementById('container');
      container.className = 'container';
    }
    showContent();

    // (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    // function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    // e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    // e.src='https://www.google-analytics.com/analytics.js';
    // r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    // ga('create','UA-XXXXX-X','auto');ga('send','pageview');
  </script>
</body>
</html>
