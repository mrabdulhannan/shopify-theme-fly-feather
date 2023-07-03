;(function (Wishlist, $) {
    var $wbwishlistBtn = $('.wbwishremove');
    var $wishlistCart = $('.cart');
    var $wbwishcount = $('.wbwishcount');
    var numProductTiles = $wishlistCart.length;
    var wishlist = localStorage.getItem('wbwishtems') || [];
    var wishcountall = localStorage.getItem('wbwishtemscount');

    

    $wbwishcount.html(wishcountall == null ? 0 : wishcountall);

    if (wishlist.length > 0) {
        wishlist = JSON.parse(localStorage.getItem('wbwishtems'));
    }
    var animateWishlist = function (e) {
        $(e).toggleClass('wishactive');
    };
    var updateWishlist = function (self) {
        var productHandle = $(self).attr('data-product-handle');
        var isRemove = $(self).hasClass('wishactive');
        //var wbwishcountvalue = localStorage.getItem('wbwishtemscount');
        if (isRemove) {
            var removeIndex = wishlist.indexOf(productHandle);
                wishlist.splice(removeIndex, 1);
            var wbwishcountp = localStorage.getItem('wbwishtemscount');
            if(wbwishcountp != null){
                var minus_val = -1;
                var wish_ct = Math.max(parseInt(wbwishcountp) + minus_val, 0);
                localStorage.setItem('wbwishtemscount', wish_ct);
            }
            localStorage.setItem('wbwishtems', JSON.stringify(wishlist));
            //var icon_length = $(self).find("span").length;
            if($(self).find("span").length != 0){
                $wbwishlistBtn.html('<span class="wbaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="wbloadtowish wishanimated"><i class="fa fa-refresh"></i></span><span class="wbwishirmv"><i class="fa fa-remove"></i></span>');
            }
            //var wbwishcountp_value = localStorage.getItem('wbwishtemscount');
            $wbwishcount.html(localStorage.getItem('wbwishtemscount'));
        }
        else {
            wishlist.push(productHandle);
            var wbwishcountp = localStorage.getItem('wbwishtemscount');
            if(wbwishcountp == null){
                var plus_val = 1;
                var wish_ct = plus_val;
            }else{
            var plus_val = 1;
            var wish_ct = Math.max(parseInt(wbwishcountp) + plus_val, 0);
        }
            localStorage.setItem('wbwishtemscount',wish_ct);
            localStorage.setItem('wbwishtems', JSON.stringify(wishlist));
            var icon_length = $(self).find("span").length;
            if(icon_length != 0){
                $wbwishlistBtn.html('<span class="wbaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="wbloadtowish wishanimated"><i class="fa fa-refresh"></i></span><span class="wbwishirmv"><i class="fa fa-remove"></i></span>');
            }
            var wbwishcountp_value = localStorage.getItem('wbwishtemscount');
            $wbwishcount.html(wbwishcountp_value);
        }
    };
    var activateWishItems = function () {
        $wbwishlistBtn.each(function () {
        var productHandle = $(this).attr('data-product-handle');
            if (wishlist.indexOf(productHandle) > -1) {
                $(this).addClass('wishactive');
                var icon_length = $(this).find("span").length;
                if($(this).hasClass('wishactive')){
                    if(icon_length != 0){
                        $(this).html('<span class="wbaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="wbloadtowish wishanimated"><i class="fa fa-refresh"></i></span><span class="wbwishirmv"><i class="fa fa-remove"></i></span>');
                    }
                }else{
                    if(icon_length != 0){
                        $(this).html('<span class="wbaddtowish"><svg><use xlink:href="#wish"></use></svg></span><span class="wbloadtowish wishanimated"><i class="fa fa-refresh"></i></span><span class="wbwishirmv"><i class="fa fa-remove"></i></span>');
                    }
                }
            }
        });
    };
    var displayWishItems = function () {
        $wishlistCart.each(function () {
        var productHandle = $(this).attr('data-product-handle');
            if (wishlist.indexOf(productHandle) === -1) {
                $(this).remove();
                numProductTiles--;
            }
        });
    };
    var loadWishlist = function () {
        if (window.location.href.indexOf('pages/wishlist') > -1) {
        displayWishItems();
            $('.wbwishloader').fadeOut(2000, function () {
                $('.wbmainwish .wishlist-hero').addClass('wishvisible');
                //$('.wishlist-hero').addClass('wishvisible');
                if (numProductTiles == 0) {
                    $('.wbwishempty').addClass('wishvisible');
                    $('.wbmainwish').hide();
                } else {
                    $('.wbwishempty').hide();
                }
            });
        }
    };
    var bindUIActions = function () {
        $wbwishlistBtn.click(function (e) {
            e.preventDefault();
            updateWishlist(this);
            animateWishlist(this);
        });
    };
    Wishlist.init = function () {
        bindUIActions();
        activateWishItems();
        loadWishlist();
    };
    $("#wbwishcall").click(function(){
        //var raw = localStorage.getItem('wbwishtems');
        //var length = raw.length;
        var length = localStorage.getItem('wbwishtems').length;
        //var i;
        var productHandle = $(self).attr('data-product-handle');
        var isRemove = $(self).hasClass('wishactive');
        for ( var i=length-1; i>= 0; i--){
        var removeIndex = wishlist.indexOf(productHandle);
        wishlist.splice(removeIndex, 1);
        var wbwishcountp = localStorage.getItem('wbwishtemscount');
            if(wbwishcountp != null){
                var wish_ct = Math.max(parseInt(0), 0);
                localStorage.setItem('wbwishtemscount', wish_ct);
            }
            localStorage.setItem('wbwishtems', JSON.stringify(wishlist));
        }
        location.reload(true);
    });
}(window.Wishlist = window.Wishlist || {}, jQuery, undefined));
function reloadPage(){
    location.reload(true);
}