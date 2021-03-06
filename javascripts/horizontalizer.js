var inTransit = false;
var currentPage;

function initialize() {
    $('html,body').css({width: '100%', height: '100%', overflow: 'hidden'});
    $('.page').each(function(index) {
        $(this).css({position: 'absolute', left: (100 * index)+"%", width: '100%', height: '100%'});
        }
    );
    currentPage = 1;
   // $('.loading').hide();

} 

function next(multiply, animate) {
    animate = typeof animate !== 'undefined' ? animate : true
    multiply = typeof multiply !== 'undefined' ? multiply : 1;
    $('.page').each(function(index) {
        var current = Number($(this).css('left').replace('px', ''));
        if(animate === true) {
            $(this).animate({left: current - Math.floor(($(window).width() * multiply))}, 500);
        }
        else {
            $(this).css({left: current - Math.floor(($(window).width() * multiply))}, 500);
        }
    }
    );
    currentPage += (1 * multiply);
}    


//function  to select our page
function previous(multiply, animate) {
    animate = typeof animate !== 'undefined' ? animate : true
    multiply = typeof multiply !== 'undefined' ? multiply : 1;
    $('.page').each(function(index) {
        var current = Number($(this).css('left').replace('px', ''));
        if(animate === true) {
            $(this).animate({left: current + Math.floor(($(window).width() * multiply))}, 500);
        }
        else {
            $(this).css({left: current + Math.floor(($(window).width() * multiply))}, 500);
        }
    }
    );
    currentPage -= (1 * multiply);
}

//the famous documentLoad

$(function () {

    initialize();

    $(window).resize(function() {
        var oldPage = currentPage;
        initialize();
        pageSelector(oldPage, false);
        $('button').removeClass('selected');
    });

    $('body, html').on('touchmove', function(e) {
        e.preventDefault();

    });

    $(document).on('vertical.next', function() {
        console.log($('.page:last').css('left'));
        if($('.page:last').css('left') != '0px') {
            inTransit = true;
            next();
            setTimeout(function() { inTransit = false;}, 500);
        } 
    }

    );

    $(document).on('vertical.previous', function() {
        if($('.page:first').css('left') != '0px') {
            inTransit = true;
            previous();
            setTimeout(function() { inTransit = false;}, 500);
        }    
    }

    );

    
    function pageSelector(pageNum, animate) {
        animate = typeof animate !== 'undefined' ? animate : true
        var multiplier = pageNum - currentPage;
        if(multiplier > 0) {
            inTransit = true;
            next(multiplier, animate);
            setTimeout(function() { inTransit = false;}, 500);
        }
        else if(multiplier < 0) {
            inTransit = true;
            previous(Math.abs(multiplier), animate);
            setTimeout(function() { inTransit = false;}, 500);
        }

    }

    $('[data-page-id]').on('click', function(e) {
        e.preventDefault();
        if(!inTransit) {
            console.log($(this).data('page-id'));
            pageSelector(Number($(this).data('page-id')));
            $('button').removeClass('selected');
            $(this).addClass('selected');
        }
    }
    );

    $(document).on('keyup', function(e) {
        e.preventDefault();
        var keyCode = e.keyCode;
        if(!inTransit) {
            if(keyCode == 37) {
                $(this).trigger('vertical.previous');
            }
            else if(keyCode == 39) {
                $(this).trigger('vertical.next');
            }
        }
    });


    $(document).on('keydown', function(e) {
        e.preventDefault();
    });

    /** mobile specification those will only load if jquery-mobile is loaded **/
    
    if($.mobile) {    

        $(document).on('tap', function(e) {
        //  e.preventDefault();
        });

        $('.page').on('swipeleft', function() {
            if(!inTransit) {
                $(document).trigger('vertical.next');
            }
        }).on('swiperight', function() {
            if(!inTransit) {
                $(document).trigger('vertical.previous')
            }
        });
    }

});


