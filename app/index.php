<!--
/****************************************
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


A wee gift to the old dog.


www.jacksonmee.com was built and Designed for Robert Jackson-Mee by:

Hamsish Jackson-Mee
itshamish.com


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*****************************************/
-->

<?php

include('config.php');

/* Request */
$q = isset($_GET['q']) ? explode('/', $_GET['q']) : array();
$controller = isset($q[0]) ? $q[0] : 'home';
$view = isset($q[1]) && $q[1] != '' ? $q[1] : null;

?><!DOCTYPE html>
<html class="no-js" lang="en" style="background-color: rgb(0,0,0);">
<head>
  <title>Robert Jackson-Mee | International Photographer</title>
  <meta charset="utf-8">

  <meta name="description" content="Portfolio Site for Robert Jackson-Mee. International Photographer.">
  <meta name="keywords" content="Jacksonmee, Jackson-Mee, Robert Jackson-Mee, photography, international, photographer, portfolio, directing, rjm, rjm photography">

  <meta property="og:title" content="Robert Jackson-Mee" />
  <meta property="og:site_name" content="" />
  <meta property="og:url" content="www.jacksonmee.com" />
  <meta property="og:description" content="Portfolio Site for Robert Jackson-Mee. International Photographer." />
  <meta property="og:image" content="<?php echo IMAGES_PATH; ?>gallery/t04_oldlady.jpg" />

  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="language" content="en_EN" />
  <meta name="robots" content="NOODP" />
  <meta name="msnbot" content="NOODP" />
  <meta name="googlebot" content="NOODP" />

  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php if (!IS_DEVELOPMENT) : ?>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <?php endif ?>

  <link rel="icon" href="<?php echo IMAGES_PATH ?>icons/favicon.png" type="image/x-icon"/>

  <script src="<?php echo PATH ?>dist/javascripts/vendor/modernizr.custom.js" type="text/javascript"></script>
  <script type="text/javascript">document.cookie='resolution='+Math.max(screen.width,screen.height)+'; path=/';</script>

  <?php foreach ($assets['stylesheets'] as $file_path) : ?>
    <link rel="stylesheet" href="<?php echo $file_path ?>" type="text/css" />
  <?php endforeach ?>

</head>
<body class="<?php echo $controller; ?>" style="display: none; opacity: 0;">

  <div class="no-js-fallback">
    <h2 class="font-black-italic yellow">This website requires Javascript.<br>
    Please upgrade your browser or turn on Javascript, thanks.</h2>
    <p>Robert Jackson-Mee<br>
    robjacksonmee@xtra.co.nz</p>
  </div>

  <div id="container" class="container">

    <a href="#site-nav" class="nav--trigger">
      <span class="menu-btn"></span>
    </a>

    <nav id="site-nav" class="nav--wrapper">
      <?php include("views/includes/_navigation.php"); ?>
    </nav>

    <main class="page--wrapper">
      <?php if (is_file("views/$controller.php")) include("views/$controller.php"); ?>
    </main>

  </div>

  <?php foreach ($assets['javascripts'] as $file_path) : ?>
    <script type="text/javascript" src="<?php echo $file_path ?>"></script>
  <?php endforeach; ?>


  <script type="text/javascript">
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','http://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-51297480-2', 'auto');
    ga('require','displayfeatures');
    ga('send', 'pageview');
  </script>
</body>
</html>
