$(document).ready(function(){
    $('.slider__wrapper').slick({
        adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icons/leftArrow.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icons/rightArrow.png"></button>',
        responsive: [
            {
                breakpoint: 825,
                settings:{
                    dots: true,
                    arrows: false
                }
            }
        ]
    });

$('.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
    $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('.catalog__wrapper').find('.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    }); 

$('.catalog__link_more').each(function(index) {
    $(this).on('click', function(event) {
        event.preventDefault();
        $('.catalog__good').eq(index).children().not('.catalog__list').css('display', 'none');
        $('.catalog__list').eq(index).animate({right: '0%'}, 500);
    });
});

$('.catalog__link_back').each(function(index) {
    $(this).on('click', function(event) {
        event.preventDefault();
        $('.catalog__list').eq(index).animate({right: '-100%'}, 500);
        setTimeout(function() {
            $('.catalog__good').eq(index).children().not('.catalog__list').css('display', 'flex');
        }, 550);
    });
});

    //Modal windows

function callModal(dataAtr, id) {

    $(dataAtr).on('click', function() {
        $('.overlay').fadeIn();
        $(id).fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay').fadeOut();
        $(id).fadeOut();
    });

}

callModal('[data-modal=consult]', '#consult');

callModal('[data-modal=order]', '#order');
callModal('[data-modal=m-order]', '#order');

$('[data-modal=order]').each(function(index) {
    $(this).on('click', function() {
        $('#order .modal__description').text($('.catalog__title').eq(index).text());
    });
});

$('[data-modal=m-order]').each(function(index) {
    $(this).on('click', function() {
        $('#order .modal__description').text($('.catalog__title').eq(index).text());
    });
});


    //Validation of form 

function validateForm(form) {
    $(form).validate({
        rules:{
            name: {
                required: true,
                minlength: 2
              },
            phone: 'required',
            email:{
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Минимальное количество символов {0}")
              },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
                required: "Пожалуйста, введите свой почтовый адрес",
                email: "Нам необходим Ваш действительный почтовый адрес"
            }
        }
    });
}

validateForm('#feed-form');
validateForm('#consult form');
validateForm('#order form');

    //Masked

$('input[name=phone]').mask("+7 (999) 999-99-99");

    //Submit

$('form').submit(function(event) {
    event.preventDefault();
    $.ajax({
        type: 'POST',
        url: 'mailer/smart.php',
        data: $(this).serialize()
    }).done(function() {
        $(this).find('input').val('');
        $('#consult, #order').fadeOut();
        $('.overlay, #thanks').fadeIn();
        $('form').trigger('reset');
    });
    return false;
    
});

});