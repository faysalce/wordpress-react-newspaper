            <footer>
                <?php wp_nav_menu( [
                    'theme_location' => 'footer_menu',
                    'container'      => 'ul',
                    'menu_class'     => 'nav justify-content-center'
                ] ); ?>
                <div class="clearfix copy">&copy; <?php echo date( 'Y' ); ?>
                    <?php bloginfo( 'name' ); ?>
                </div>
            </footer>

        </section>
    </div>
    </div>
    </div>
    <?php wp_footer(); ?>
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

</body>
</html>
