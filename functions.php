<?php
include_once 'lib/theme-helpers.php';
include_once 'lib/theme-enqueue.php';
include_once 'lib/theme-endpoints.php';
include_once 'lib/theme-support.php';

$Theme_Support = new Theme_Support();
$Theme_Support->init();

$Theme_Enqueue = new Theme_Enqueue();
$Theme_Enqueue->init();

$Theme_Endpoints = new Theme_Endpoints();
$Theme_Endpoints->init();
if( ! function_exists( 'post_meta_request_params' ) ) :
	function post_meta_request_params( $args, $request )
	{
		$args += array(
			'meta_key'   => $request['meta_key'],
			'meta_value' => $request['meta_value'],
			'meta_query' => $request['meta_query'],
		);
	    return $args;
	}
	add_filter( 'rest_post_query', 'post_meta_request_params', 99, 2 );
	// add_filter( 'rest_page_query', 'post_meta_request_params', 99, 2 ); // Add support for `page`
	// add_filter( 'rest_my-custom-post_query', 'post_meta_request_params', 99, 2 ); // Add support for `my-custom-post`
endif;



add_filter('show_admin_bar', '__return_false');
register_sidebar( array(
			'name' => __( 'archive', 'patradoot' ),
			'id' => 'archive',
			'before_widget' => '<div class="dynamic_calender">',
	        'after_widget' => '</div>',
	        'before_title' => '',
	        'after_title' => '',
	    ) );

add_theme_support( 'post-thumbnails', array( 'post', 'feature-slider') );
 add_image_size( 'homepage_slider', 555, 360, true ); // home slider
 add_image_size( 'homepage_excl', 255, 160, true ); // home exclusive
 add_image_size( 'homepage_cat_thumb', 179, 100, true ); // home exclusive
 add_image_size( 'homepage_cat_diff', 159, 100, true ); // home category long
 add_image_size( 'homepage_cat_small', 50, 50, true ); // home category small
 

function string_limit_words($string, $word_limit)
{
  $words = explode(' ', $string, ($word_limit + 1));
  if(count($words) > $word_limit)
  array_pop($words);
  return implode(' ', $words);
}

function getSidebarList($catid){

                        $args = array(
                            'numberposts' => 4,
                            'offset' => 0,
                            'orderby' => 'post_date',
                            'order' => 'DESC',
                            'cat' => $catid,
                            'post_type' => 'post',
                            'post_status' => 'publish');

                        $myposts = get_posts($args);
                        $count = 0;
                        global $post;
                        foreach ($myposts as $post) : setup_postdata($post);
                            $count++;

                            $thePostID = $post->ID;





                            $post_thumbnail_id = get_post_thumbnail_id($post->ID);
                            //$post_thumbnail_url = wp_get_attachment_url( $post_thumbnail_id ); //get full image url
                            $post_thumbnail_src = wp_get_attachment_image_src($post_thumbnail_id, 'full'); //get thumbnail image url            
                            $image_src = $post_thumbnail_src[0];


                            $rnd_num = rand(1, 4);
                            //$slider_hover=get_option('itbiz_restaurant_slider_image_hover');
                            if($count==1){
                            ?>

                        <div class="general-thumb"><img class="img-responsive" src="<?php echo $image_src; ?>" alt="<?php the_title();?>"></div>
                        <article class="item-featured-atricle">
                            <h1 class="title-h4"><a href="<?php the_permalink();?>"><?php the_title();?></a></h1>

                        </article>
                        </div>
                    <div class="item-featured item-none-featured normal_story_scrool">
                        <ul>
                        <?php }else{?> 
                    
                           
                            <li><a href="<?php the_permalink(); ?>"><?php the_title();?></a></li>
                            <?php } endforeach; ?><?php wp_reset_query(); ?> 
                        </ul>
<?php
}

function getCategoryList($catid){

                       
                        $args = array(
                            'numberposts' => 7,
                            'offset' => 0,
                            'orderby' => 'post_date',
                            'order' => 'DESC',
                            'cat' => $catid,
                            'post_type' => 'post',
                            'post_status' => 'publish');

                        $myposts = get_posts($args);
                        $count = 0;
                        $countr = 0;
                        global $post;
                        foreach ($myposts as $post) : setup_postdata($post);
                            $count++;
$countr++;
                            $thePostID = $post->ID;





                            $post_thumbnail_id = get_post_thumbnail_id($post->ID);
                            //$post_thumbnail_url = wp_get_attachment_url( $post_thumbnail_id ); //get full image url
                            $post_thumbnail_src = wp_get_attachment_image_src($post_thumbnail_id, 'full'); //get thumbnail image url            
                            $image_src = $post_thumbnail_src[0];


                            $rnd_num = rand(1, 4);
                            //$slider_hover=get_option('itbiz_restaurant_slider_image_hover');
                            if($count<=3){
                            ?>

                            <div class="col-lg-4 col-sm-4 col-xs-6">
                                <div class="item-featured">
                                    <div class="general-thumb"><img class="img-responsive" src="<?php echo $image_src; ?>" alt="<?php the_title(); ?>"></div>
                                    <article class="item-featured-atricle">
                                        <h1 class="title-h4"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>

                                    </article>
                                </div>
                            </div>
                        <?php  if($countr==3){
                            ?>
                            <div class="clearfix"></div>
                        <div id="title_container">
                        <?php }}else{  ?> 


                        
                                <h1 class="just_title_cat"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>

<?php } endforeach; wp_reset_query();

}



add_action("admin_init", "add_fields_for_post");
    
	function add_fields_for_post(){
	
	      add_meta_box("wrighter_name-meta","Youtube Link", "wrighter_name", "post", "normal", "high");
              add_meta_box("main_slider-meta", " Main Slider?", "main_slider", "post", "side", "high");
              add_meta_box("exclusive_news-meta", " Exclusive_News?", "exclusive_news", "post", "side", "high");
        
        
          
	  
	}
	 
	function wrighter_name(){
	  global $post;
	  $custom = get_post_custom($post->ID);
	  $youtube_link= $custom["youtube_link"][0];
	  ?>
	  <label>Youtube Link :</label>
	  <input name="youtube_link" value="<?php echo $youtube_link; ?>" />
	  <?php
	}
function main_slider(){
	  global $post;
	  $custom = get_post_custom($post->ID);
	  $main_slider = $custom["main_slider"][0];
	  $main_slider_checked_str = $main_slider ? 'checked="checked"' : '';
	  ?>
	  <label>Add To Main Slider?:</label>
	  <input type="checkbox" value="1" name="main_slider" <?php echo $main_slider_checked_str; ?>/>
	  <?php
	}
        function exclusive_news(){
	  global $post;
	  $custom = get_post_custom($post->ID);
	  $exclusive_news = $custom["exclusive_news"][0];
	  $exclusive_news_checked_str = $exclusive_news ? 'checked="checked"' : '';
	  ?>
	  <label>Exclusive News?:</label>
	  <input type="checkbox" value="1" name="exclusive_news" <?php echo $exclusive_news_checked_str; ?>/>
	  <?php
	}
    

	/***** End Add Custom Data Fields for Restaurant Menu ****/
	
	/***** Start Save Custom Data Fields for Restaurant Menu ****/
	add_action('save_post', 'save_fields_values_for_post');
    
	function save_fields_values_for_post(){
	  global $post;
	 
	  update_post_meta($post->ID, "youtube_link", $_POST["youtube_link"]);
            update_post_meta($post->ID, "main_slider", $_POST["main_slider"]);
            update_post_meta($post->ID, "exclusive_news", $_POST["exclusive_news"]);

	}
	
	/***** End Save Custom Data Fields for Restaurant Menu ****/
	
	
        
function getPostViews($postID){
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
        return "0";
    }
    return $count;
}
function setPostViews($postID) {
    $count_key = 'post_views_count';
    $count = get_post_meta($postID, $count_key, true);
    if($count==''){
        $count = 0;
        delete_post_meta($postID, $count_key);
        add_post_meta($postID, $count_key, '0');
    }else{
        $count++;
        update_post_meta($postID, $count_key, $count);
    }
}




add_action('wp_head', 'add_fb_open_graph_tags');
function add_fb_open_graph_tags() {
    if (is_single()) {
        global $post;
        if(get_the_post_thumbnail($post->ID, 'thumbnail')) {
           // $thumbnail_id = get_post_thumbnail_id($post->ID);
           // $thumbnail_object = get_post($thumbnail_id);
           // $image = $thumbnail_object->guid;
 $post_thumbnail_id = get_post_thumbnail_id(get_the_ID());
                    $post_thumbnail_src = wp_get_attachment_image_src($post_thumbnail_id, 'full'); //get thumbnail image url			
                    $image_src = $post_thumbnail_src[0];

        } else {
           $image_src = get_template_directory_uri()."/logo.png";

        }
        //$description = get_bloginfo('description');
     
$description = string_limit_words($post->post_content, 50);
       // $description = str_replace("\"", "'", $description);
?>
<meta property="og:title" content="<?php the_title(); ?> - Patradoot.net" />
<meta property="og:type" content="article" />
<meta property="og:image" content="<?php echo $image_src; ?>" />
<meta property="og:image:width" content="400" />
<meta property="og:image:height" content="300" />
<meta property="og:url" content="<?php the_permalink(); ?>" />
<meta property="og:description" content="<?php echo strip_tags($description); ?>" />
<meta property="og:site_name" content="Daily Patradoot" />
<?php   }elseif(is_home()){?>

<meta property="og:title" content=" Daily Patradoot || Frist Online Newspaper Of Satkhira" />
<meta property="og:type" content="website" />
<meta property="og:image" content="http://patradoot.net/wp-content/themes/faysal/images/logo.png" />
<meta property="og:url" content="http://patradoot.net" />
<meta property="og:description" content="Daily Patradoot Is a Frist online Newspaper Of Satkhira, Khulna , Bangladesh. Which is only trusted and reliable News Portal of satkhira. Its have also Printed daily Paper Version" />

<meta property="og:site_name" content="Daily Patradoot" />


<?php

}



}



add_action( 'amp_post_template_css', 'xyz_amp_additional_css_styles' );

function xyz_amp_additional_css_styles( $amp_template ) {
    // only CSS here please...
    ?>
    nav.amp-wp-title-bar {
        padding: 12px 0;
        background: #f3f3f3;
    }
    nav.amp-wp-title-bar a {
        background-image: url( 'https://patradoot.net/wp-content/themes/faysal/images/amp-logo.png' );
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
        height: 30px;
        width: 120px;
        margin: 0 auto;
        text-indent: -9999px;
    }
    <?php
}

add_action( 'pre_amp_render_post', 'xyz_amp_add_custom_actions' );
function xyz_amp_add_custom_actions() {
    add_filter( 'the_content', 'xyz_amp_add_featured_image' );
}

function xyz_amp_add_featured_image( $content ) {
    if ( has_post_thumbnail() ) {
		 $post_thumbnail_id = get_post_thumbnail_id();

                        $post_thumbnail_src = wp_get_attachment_image_src($post_thumbnail_id, 'full'); //get thumbnail image url			
                        $image_src = $post_thumbnail_src[0];
        // Just add the raw <img /> tag; our sanitizer will take care of it later.
        $image = sprintf( '<p class="xyz-featured-image"><img src="%s" /></p>',  $image_src );
        $content = $image . $content;
    }
    return $content;
}
add_filter( 'amp_post_template_analytics', 'xyz_amp_add_custom_analytics' );
function xyz_amp_add_custom_analytics( $analytics ) {
    if ( ! is_array( $analytics ) ) {
        $analytics = array();
    }

    // https://developers.google.com/analytics/devguides/collection/amp-analytics/
    $analytics['xyz-googleanalytics'] = array(
        'type' => 'googleanalytics',
        'attributes' => array(
            // 'data-credentials' => 'include',
        ),
        'config_data' => array(
            'vars' => array(
                'account' => "UA-63386475-1"
            ),
            'triggers' => array(
                'trackPageview' => array(
                    'on' => 'visible',
                    'request' => 'pageview',
                ),
            ),
        ),
    );



    return $analytics;
}

