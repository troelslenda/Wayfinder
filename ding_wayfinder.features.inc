<?php

/**
 * Implementation of hook_ctools_plugin_api().
 */
function ding_wayfinder_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => 1);
  }
}

/**
 * Implementation of hook_node_info().
 */
function ding_wayfinder_node_info() {
  $items = array(
    'wf_floor' => array(
      'name' => t('Floor'),
      'module' => 'features',
      'description' => t('Defines Floors used in Wayfinder'),
      'has_title' => '1',
      'title_label' => t('Floor title'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
    'wf_keyword' => array(
      'name' => t('Keyword'),
      'module' => 'features',
      'description' => t('Defines Keywords used in Wayfinder

'),
      'has_title' => '1',
      'title_label' => t('Keyword'),
      'has_body' => '0',
      'body_label' => '',
      'min_word_count' => '0',
      'help' => '',
    ),
  );
  return $items;
}

/**
 * Implementation of hook_views_api().
 */
function ding_wayfinder_views_api() {
  return array(
    'api' => '2',
  );
}
