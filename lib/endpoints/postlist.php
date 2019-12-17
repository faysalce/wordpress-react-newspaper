<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_action('rest_api_init', function () {
	$namespace = 'react-theme/v1';

	register_rest_route( $namespace, '/home-cat-post/', array(
		'methods'  => 'GET',
				  'callback' => 'get_post_for_meta',
				  'permission_callback' => function (WP_REST_Request $request) {
					return true;
				}
		));
  });

  function get_post_for_meta(  $request ) {
	$parameters = $request->get_query_params();

	$number=$_GET['number'];
	$offset=$_GET['offset'];
	$catID=$_GET['cat'];
	global $post;
    $controller = new WP_REST_Posts_Controller('post');

	$myposts = get_posts( array(
		'posts_per_page' => $number,
		'offset'         => 0,
		'post_type'         => 'post',
		'category'       => $catID
	) );
	foreach ( $myposts as $post ) {
		$data    = $controller->prepare_item_for_response( $post, $request );
		$posts[] = $controller->prepare_response_for_collection( $data );
	 }
	
	$response=array($catID=>$posts);
    return new WP_REST_Response($response, 200);
}





add_action('rest_api_init', function () {
	$namespace = 'react-theme/v1';

	register_rest_route( $namespace, '/related-post/', array(
		'methods'  => 'GET',
				  'callback' => 'get_related_post',
				  'permission_callback' => function (WP_REST_Request $request) {
					return true;
				}
		));
  });

  function get_related_post(  $request ) {
	$parameters = $request->get_query_params();

	$number=$_GET['number'];
	$offset=$_GET['offset'];
	$post_id=$_GET['post_id'];
	global $post;
    $controller = new WP_REST_Posts_Controller('post');

$mainpost=wp_get_post_categories($post_id,array('ids'));



	$myposts = get_posts( array(
		'posts_per_page' => $number,
		'offset'         => 0,
		'order'=>'rand',
		'post__not_in'=>array($post_id),
		'post_type'         => 'post',
		'cat'       => $mainpost
	) );
	foreach ( $myposts as $post ) {
		$data    = $controller->prepare_item_for_response( $post, $request );
		$posts[] = $controller->prepare_response_for_collection( $data );
	 }
	
	$response=$posts;
    return new WP_REST_Response($response, 200);
}






function prepareImageData( $attachment_id ){
	$uploads_baseurl = wp_upload_dir()['baseurl'];
  
	$prepared = [];
	$data = wp_get_attachment_metadata($attachment_id);
	$prepared = [
	  'mime_type' => get_post_mime_type($attachment_id),
	  'sizes' => [],
	];
	
  if(!empty($data) && count($data)>0){
	foreach( $data['sizes'] as $size => $sizeInfo ){
	  $prepared['sizes'][$size] = wp_get_attachment_image_src( $attachment_id, $size )[0];
	}
}
	return $prepared['sizes'];
  }


  add_action( 'rest_api_init', 'add_thumbnail_to_JSON' );
function add_thumbnail_to_JSON() {
//Add featured image
register_rest_field( 
    'post', // Where to add the field (Here, blog posts. Could be an array)
    'featured_image_src', // Name of new field (You can call this anything)
    array(
        'get_callback'    => 'get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}

function get_image_src( $object, $field_name, $request ) {
//   $feat_img_array = wp_get_attachment_image_src(
//     $object['featured_media'], // Image attachment ID
//     'thumbnail',  // Size.  Ex. "thumbnail", "large", "full", etc..
//     true // Whether the image should be treated as an icon.
//   );
  return prepareImageData($object['featured_media']);
}