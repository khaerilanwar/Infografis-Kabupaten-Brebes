$('.autoplay-infografis').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: '<button type="button" class="next-button rounded-circle d-none d-md-block btn btn-primary p-0" style="height: 30px; width: 30px;">' +
    '<i class="fa-solid fa-chevron-right"></i>' +
  '</button>',
  prevArrow: '<button type="button" class="prev-button rounded-circle d-none d-md-block btn btn-primary p-0" style="height: 30px; width: 30px;">' +
  '<i class="fa-solid fa-chevron-left"></i>' +
'</button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });