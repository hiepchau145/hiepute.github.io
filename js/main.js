/*============================
   js index
==============================

==========================================*/

(function($) {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        speed: 4000,
        autoplay:true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    /*================================
    Window Load
    ==================================*/
    $(window).on('load', function() {
        smoothScrolling($(".main-menu nav ul li a[href^='#']"), headerHeight);
        smoothScrolling($(".scrollup a[href^='#']"), 0);
        smoothScrolling($(".welcome-content .btn a[href^='#']"), 0);
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
        sliderLoadedAddClass();
        preloader()
    })



    /*================================
    Preloader
    ==================================*/
      /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {
            });
        }
    }

    /*================================
     sticky-header
     ==================================*/
    $(window).scroll(function() {

        if ($(window).scrollTop() > 10) {
            $('.sticky-header').addClass('sticky'),
            $('.scrollup').addClass('show_hide');
        } else {
            $('.sticky-header').removeClass('sticky'),
             $('.scrollup').removeClass('show_hide');
        }

    });

    /*================================
     Gift-carousel
     ==================================*/
    function gift_carousel() {
        var owl = $(".Gift-carousel");
        owl.owlCarousel({
            loop: true,
            margin: 0,
            navText: false,
            nav: false,
            items: 5,
            smartSpeed: 1000,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 3
                },
                480: {
                    items: 2
                },
                760: {
                    items: 4
                },
                1080: {
                    items: 4
                }
            }
        });
    }
    gift_carousel();


/*================================
    slicknav
    ==================================*/

    $('#nav_mobile_menu').slicknav({
    label: '',
    duration: 1000,
    easingOpen: "easeOutBounce", //available with jQuery UI
    prependTo:'#mobile_menu'
});
    /*------------------------------------------
        = RSVP FORM SUBMISSION
    -------------------------------------------*/
    if ($("#rsvp-form").length) {
        $("#rsvp-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true
                },
                group: {
                    required: true
                },
                guest: {
                    required: true
                },
                movingHCM: {
                    required: true
                },
                movingBRVT: {
                    required: true
                },
                moving13: {
					required: true
                }
            },

            messages: {
                name: "Bạn chưa điền tên nè",
                phone: "Bạn thiếu SĐT rồi",
                group: "Bạn ở team nào nhỉ",
                guest: "Bạn đi với ai",
                movingHCM: "Bạn đi xe chung hay tự túc",
                movingBRVT: "Bạn đi xe chung hay tự túc",
                moving13: "Tiệc tối 13/5 thì sao nè",
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                var formData = {};
                $(form).serializeArray().forEach(function(input) {
                    formData[input.name] = input.value;
                });
                $.ajax({
                    type: "POST",
                    url: "https://docs.google.com/forms/d/e/1FAIpQLSfqjwhboba_0xaLKObQF9uH6QmchfENz3WFWPZJzqxMb8JPIg/formResponse",
                    data: {
                        "entry.1417042552": formData.name,
                        "entry.155917589": formData.phone,
                        "entry.1352751088": formData.group,
                        "entry.561792803": formData.guest,
                        "entry.2091246614": formData.moving13,
                        "entry.525860606": formData.movingHCM,
                        "entry.319173807": formData.movingBRVT,
                        "entry.757392572": formData.notes
                    },
                    dataType: "xml",
                    statusCode: {
                        0: function () {
                            $( "#loader").hide();
                            $( "#success").slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 3000);
                            form.reset();
                        },
                        200: function() {
                            $( "#loader").hide();
                            $( "#success").slideDown( "slow" );
                            setTimeout(function() {
                            $( "#success").slideUp( "slow" );
                            }, 3000);
                            form.reset();
                        },
                        403: function() {
                            $( "#loader").hide();
                            $( "#error").slideDown( "slow" );
                            setTimeout(function() {
                            $( "#error").slideUp( "slow" );
                            }, 3000);
                        }
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }

    /*================================
    slider-area content effect
    ==================================*/
    function sliderLoadedAddClass() {
        $('.slider-two').addClass('scontent_loaded');
        $('.slider-parallax').addClass('scontent_loaded');
    }


    /*================================
      Isotope Portfolio
     ==================================*/
    $('.grid').imagesLoaded(function() {

        // filter items on button click
        $('.gallery-menu').on('click', 'button', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({
                filter: filterValue
            });
        });

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            masonry: {
                // use outer width of grid-sizer for columnWidth
                columnWidth: '.grid-item',
            }
        });



    });

    $('.gallery-menu button').on('click', function() {
        $('.gallery-menu button').removeClass('active');
        $(this).addClass('active');
    });


    /*------------------------------------------
        = COUNTDOWN CLOCK
    -------------------------------------------*/
    if ($("#clock").length) {
        $('#clock').countdown('2020/11/29', function(event) {
            var $this = $(this).html(event.strftime('' +
                '<div class="box"><div class="date">%D</div> <span>month</span> </div>' +
                '<div class="box"><div class="date">%D</div> <span>Days</span> </div>' +
                '<div class="box"><div class="date">%H</div> <span>Hours</span> </div>' +
                '<div class="box"><div class="date">%M</div> <span>Mins</span> </div>' +
                '<div class="box"><div class="date">%S</div> <span>Secs</span> </div>'));
        });
    }

    /*================================
     Variable Initialize
    ==================================*/
    var headerHeight = $('.header-area').innerHeight();


    //. smooth scrolling
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

/*------------------------------------------
    = BACK TO TOP
-------------------------------------------*/
    if($(".scrollup").length) {
        $(".scrollup").on("click", function() {
            $("html,body").animate({
                scrollTop: 0
            }, 1000, "easeInOutExpo");
            return false;
        })
    }


    /*================================
    Magnific Popup
    ==================================*/
    if ($(".expand-img").length) {
        $('.expand-img').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });

        $('.expand-video').magnificPopup({
            type: 'iframe',
            gallery: {
                enabled: true
            }
        });
    }
/*------------------------------------------
    = WATER RIPPLE
-------------------------------------------*/
    if ($(".ripple").length) {
        $('.ripple').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04,
        });

        // Automatic drops
        setInterval(function() {
            var $el = $('.ripple');
            var x = Math.random() * $el.outerWidth();
            var y = Math.random() * $el.outerHeight();
            var dropRadius = 20;
            var strength = 0.04 + Math.random() * 0.04;

            $el.ripples('drop', x, y, dropRadius, strength);
        }, 400);
    }

   if ($(".particleground").length) {
    $('.particleground').particleground({
        dotColor: '#999999',
        lineColor: '#999999',
        particleRadius:5,
        lineWidth:2,
        curvedLines:true,
        proximity:20,
        parallaxMultiplier:10,
    });

    }


    /*------------------------------------------
        = VIDEO BACKGROUND
    -------------------------------------------*/
    if ($("#video-background").length) {
        $('#video-background').YTPlayer({
            showControls: false,
            playerVars: {
                modestbranding: 0,
                autoplay: 1,
                controls: 1,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin
            }
        });
    }

    /*------------------------------------------
        = POPUP YOUTUBE, VIMEO, GMAPS
    -------------------------------------------*/
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });



}(jQuery));