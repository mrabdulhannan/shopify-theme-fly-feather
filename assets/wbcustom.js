$(document).ready(function() {

    // Tab Append
    // $('.appendtabfea').appendTo('#tab-fea-0');
    // $('.appendtablatest').appendTo('#tab-latest-0');
    // $('.appendtabbest').appendTo('#tab-best-0');

    if ($(window).width() >= 992) {
        $('.service-section').appendTo('.service-append');
    };


      // Home web collection list 
    $('.owl-catt').slick({
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1201,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2
            }
        }
        ]
    });
    $(".owl-catt").show();

  
    // Home Tab Product   
    $('.wbfea,.wbtopr,.nprods').slick({
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1201,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2
            }
        }
        ]
    });
  	$(".wbfea").show();
    $(".wbtopr").show();
    $(".ourprods").show();
    $(".nprods").show();

    // special product 
    $('.wbspeprod').slick({ 
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 1201,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2  
            }
        },
        {
            breakpoint: 449,
            settings: {
                slidesToShow: 1  
            }
        }
        ]
    });
  	$(".wbspeprod").show();

     // special product 
    $('.bestprods').slick({ 
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1201,
            settings: {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1 
            }
        },
        {
            breakpoint: 449,
            settings: {
                slidesToShow: 1  
            }
        }
        ]
    });
    $(".bestprods").show();


    // Product With Banner
    $('.wbprobnrtop').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        infinite: false,
        autoplay: true,
        dots: false,
        fade: true,
        autoplaySpeed: 6000,
        asNavFor: '.wbprobnrbtm'
    });
    $('.wbprobnrbtm').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        infinite: false,
        asNavFor: '.wbprobnrtop',
        dots: true,
        autoplaySpeed: 6000,
        arrows: false
    });
    $(".wbprobnrtop").show();
    $(".wbprobnrbtm").show();


    // Testimonial
    $('.testi').slick({
        slidesToShow: 1,
        dots: false,
        arrows:true,
        focusOnSelect: true,
        autoplay:false,
        slidesToShow: 3,
        autoplaySpeed:1500,
        responsive: [
        {
            breakpoint: 1400,
            settings:
                {
                slidesToShow: 3
            }
        },
        {
            breakpoint: 1201,
            settings:
             {
                slidesToShow: 3
            }
        },
            {
                breakpoint: 992,
                settings: {
                slidesToShow: 2
            }
        },
            {
                breakpoint: 767,
                settings: {
                slidesToShow: 2
            }
        },
            {
                breakpoint: 576,
                settings: {
                slidesToShow: 1
            }
        },
            {
                breakpoint: 361,
                settings: {
                slidesToShow: 1
            }
        }
]
});
    $(".testi").show();

    // Lookbook Active
    $(document).on('click', '.wblookbtn', function(e) {
        $('.wblookbtn').removeClass('active');
        $(this).toggleClass('active');
        $('.wblookbleft').removeClass('active');
        $('#wblook'+$(this).attr('target')).toggleClass('active');
    });

    // Blog
    $('.wbblog').slick({
        dots: false,
        arrows: true,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1
            }
        }
        ]
    });
  	$(".wbblog").show();

     


    // Logo Slider
    $('.wblogobar').slick({
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 7,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1410,
            settings: {
                slidesToShow: 7
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 3
            }
        }
        ]
    });
  	$(".wblogobar").show();

    // Scroll To top
    $("#scroll").addClass("scrollhide");
        $(window).scroll(function () {
        if ($(this).scrollTop() === 0) {
            $("#scroll").addClass("scrollhide")
        } else {
            $("#scroll").removeClass("scrollhide")
        }
    });
    $('#scroll').click(function () {
        $("html, body").animate({scrollTop: 0}, 600);
        return false;
    });

     //Menu Overlay
     if ($(window).width() >= 992) {
        $('#megamenu li.wbmenul_1.wbmenusub').hover(function() {
            $('body').addClass('menuoverlay');
            $('.header-wrapper').addClass('menuhdoverlay');
        }, function() {
            $('body').removeClass('menuoverlay');
            $('.header-wrapper').removeClass('menuhdoverlay');
        });
    };

    // Mobile Menu Toggle
    if ($(window).width() <= 991) {
        $('.wbmegamainhd').on('click', function() {
            var targetMenu = '#' + $(this).data('submenu');
            $(targetMenu).slideToggle(300);
            $(this).toggleClass('active');
            return false;
        });
        // $('#megamenu').prependTo('.headlogo');
        $('.wbheadwish').appendTo('.slidedown_section .dropdown-menu'); 
        $('localization-form').appendTo('.slidedown_section .dropdown-menu');
    };


    // Collection Grid/List View
    $(document).on('click', '.wblistgridbtn', function(e) {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('listv')) {
            $('#product-grid').addClass('product-list').removeClass('product-grid').removeClass('product-galleryv');
        } else if ($(this).hasClass('gridv')) {
            $('#product-grid').addClass('product-grid').removeClass('product-list').removeClass('product-galleryv');
        } else if ($(this).hasClass('galleryv')) {
            $('#product-grid').addClass('product-galleryv').removeClass('product-list').removeClass('product-grid');
        }
    });


        // Popup Product
        $('.wbpopup-popducts .popinner').hide();
        var i = 0;
        setIntervalFun();
        var totalTimer = parseInt(3000) + parseInt(2000);
        setInterval( setIntervalFun, totalTimer);
        function setIntervalFun()
        {
            $('.wbpopup-popducts .popinner').eq(i).fadeIn(400);
            setTimeout(function(){
                $('.wbpopup-popducts .popinner').eq(i).fadeOut(400);
                i++;
                if ($('.wbpopup-popducts .popinner').length <= i) {
                    i = 0;
                }
            },parseInt(7000));
        }
        $(document).on('click', '.wbclosepopup', function(){
            $('.wbpopup-popducts').fadeOut(400).remove();
        });
    
    
        // Box Layout
        $(".wbboxdemo").click(function(){
            $(".wbboxlt").attr("id","wbboxlayout");
        });
        $(".wbwidedemo").click(function(){
            $(".wbboxlt").removeAttr("id");
        }); 

        // Color Customizer
        $("body").on("click", ".wbinnerclr a", function(e){
        e.preventDefault();
        $('.wbinnerclr').find(".active").removeClass("active");
        $(this).parent().addClass("active");
        $('[wbcolorname=""]').remove();
        if(!$(this).hasClass($('html').attr(''))) $("body").append('<link rel="stylesheet" type="text/css" wbcolorname href="' + $(this).attr('href') + '">');
        });

        // Rtl Mode
        $("body").on("click", ".wbrtlmode a", function(e){ 
        e.preventDefault();
        $('.wbrtlmode').find(".active").removeClass("active");
        $(this).parent().addClass("active");
        $('[wbrtl=""]').remove();
        if(!$(this).hasClass($('html').attr(''))) $("body").append('<link rel="stylesheet" type="text/css" wbrtl href="' + $(this).attr('href') + '">');
        });

        // Color Open/Close 
        $('.wbopen-closeclr').click(function() {
            if ($(this).hasClass('wbclrdisable')) {
                $(this).removeClass('wbclrdisable');
                $(this).addClass('wbclrenable');
                $('.wbcolor_box').animate({right: '30px'}, 450);
                $('.wbcolor_box').css({'box-shadow': '0 10px 35px 10px rgba(0,0,0,.06)', 'background': '#fff', 'border-radius': '4px 0 4px 4px'});
                $('.wbcolor_option,.wbcolor_title').animate({'opacity': '1'}, 450);
            } else {
                $(this).removeClass('wbclrenable');
                $(this).addClass('wbclrdisable');
                $('.wbcolor_box').animate({right: '-250px'}, 450);
                $('.wbcolor_box').css({'box-shadow': 'none', 'background': 'transparent'});
                $('.wbcolor_option,.wbcolor_title').animate({'opacity': '0'}, 450);
            }
        });
    

}); // Document Ready Div End

// Menu For Mobile
function w3_open() {
    document.getElementById("myOverlay").style.display = "block";
    document.getElementById("megamenu").className = "active";
    $('body').addClass("wbbodyscroll");
}
function w3_close() {
    document.getElementById("myOverlay").style.display = "none";
    document.getElementById("megamenu").className = "";
    $('body').removeClass("wbbodyscroll");
}

