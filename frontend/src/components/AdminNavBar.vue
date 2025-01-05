<template>
    <!-- Page Navbar -->
    <nav class="admin-navbar" data-spy="affix" data-offset-top="20">
          <div class="container">
              <RouterLink :to="{name: 'Home'}" class="logo" >Alejandro</RouterLink>
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
    import { RouterLink } from 'vue-router';
  
  export default {
    name: 'Navbar',
    mounted() {
      $(document).ready(function() {
        $(".admin-navbar .link").on('click', function(event) {
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
          $('.admin-navbar').addClass('affix');
        } else {
          $('.admin-navbar').removeClass('affix');
        }
      });
    }
  }
  </script>
<style scoped>

.admin-navbar {
  position: relative;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  margin-bottom: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-transition: all, 0.3s;
  transition: all, 0.3s;
  font-family: 'Baloo Paaji', cursive;
  background: #5996a4;
  padding: 10px 0;
}
.admin-navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.admin-navbar .nav {
  display: flex;
  list-style: none;
  padding: 0 10px;
}


</style>