<template>
  <!-- Page Navbar -->
  <nav class="custom-navbar" data-spy="affix" data-offset-top="20">
        <div class="container">
            <a class="logo" href="#">Alejandro</a>
            <ul class="nav">
                <li class="item">
                    <a class="link" href="#home">Home</a>
                </li>
                <li class="item">
                    <a class="link" href="#about">About</a>
                </li>
                <li class="item">
                    <a class="link" href="#portfolio">Portfolio</a>
                </li>
            </ul>
            <a href="javascript:void(0)" id="nav-toggle" class="hamburger hamburger--elastic">
                <div class="hamburger-box">
                  <div class="hamburger-inner"></div>
                </div>
            </a>
        </div>
    </nav>
</template>

<script >
import $ from 'jquery'
import { useAppStore } from '../store/appStore';


export default {
  name: 'Navbar',
  data() {
    return {
      user: null
    }
  },
  methods: {
    async logout() {
      const store = useAppStore();
      console.log('logout', this.user)
      await store.logout();
    }
  },
  computed: {
    userComputed() {
      const store = useAppStore();
      return store.user;
    }
  },
  mounted() {
    $(document).ready(function() {
      $(".custom-navbar .link").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          var hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 700, function() {
            window.location.hash = hash;
          });
        }
      });

      // navbar toggle
      $('#nav-toggle').click(function() {
        $(this).toggleClass('is-active');
        $('ul.nav').toggleClass('show');
      });
    });
    //esta esla parte para el cambio de color del navbar
    $(window).on('scroll', function() {
      if ($(window).scrollTop() > 50) { // Ajusta el umbral de 50px según tus necesidades
        $('.custom-navbar').addClass('affix');
      } else {
        $('.custom-navbar').removeClass('affix');
      }
    });
  }
}
</script>
