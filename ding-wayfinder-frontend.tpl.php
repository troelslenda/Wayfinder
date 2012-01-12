<!doctype html>
<html disable_manifest="wayfinder/cache">
  <head>
    <meta charset="utf-8">
    <!-- Following meta tags are iOS specfic to make the website act more like an application -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <link rel="apple-touch-icon-precomposed" href="theme/icon.png"/>
    <?php echo $styles; ?>
    <?php echo $scripts; ?>

    <title>WayFinder</title>
  </head>
  <body>

  <div class="topbar red-gradient"><span class="aggregate button"><?php echo t('Alle nøgleord'); ?></span><div class="logo"><?php print theme('image', drupal_get_path('module', 'ding_wayfinder').'/images/kk.svg','','',NULL,FALSE);?><?php echo t('Københavns <strong>Hovedbibliotek</strong>'); ?></div></div>

  <img class="floorplan-image">
  <img class="element-image">


  <ul class="keywords"></ul>

  <ul class="floornav"></ul>

