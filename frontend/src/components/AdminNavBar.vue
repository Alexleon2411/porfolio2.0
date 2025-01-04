<template>
    <!-- Page Navbar -->
    <nav class="admin-navbar" data-spy="affix" data-offset-top="20">
          <div class="container">
              <RouterLink :to="{name: 'Home'}" class="logo" >Alejandro</RouterLink>
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
                  <!-- <li class="item">
                      <a class="link" href="#contact">Contact</a>
                  </li> -->
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
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
  background: tra;
}

@media (prefers-reduced-motion: reduce) {
  .admin-navbar {
    -webkit-transition: none;
    transition: none;
  }
}

.admin-navbar .logo {
  font-size: calc(20px + (30 - 20) * ((100vw - 300px) / (1300 - 300)));
  text-decoration: none;
  color: #fff;
}

.admin-navbar .container {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  min-height: 100px;
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
}

@media (prefers-reduced-motion: reduce) {
  .admin-navbar .container {
    -webkit-transition: none;
    transition: none;
  }
}

.admin-navbar .hamburger {
  margin-left: 20px;
  padding-top: 5px;
}

.admin-navbar .hamburger .hamburger-inner, .admin-navbar .hamburger .hamburger-inner::before, .admin-navbar .hamburger .hamburger-inner::after {
  background: #fff;
}

.admin-navbar .nav {
  list-style-type: none;
  padding-left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
      -ms-flex-align: center;
          align-items: center;
  margin: 0;
  margin-left: auto;
}

.admin-navbar .nav .item {
  margin: 0 10px;
}

.admin-navbar .nav .item .link {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
}

.admin-navbar .nav .item .link:hover, .admin-navbar .nav .item .link.active {
  color: #695aa6;
}
/* esta esla parte para el cambio de color del navbar  */
.admin-navbar.affix {
  background: #fff;
  border-bottom: 1px solid rgba(222, 226, 230, 0.34);
}

.admin-navbar.affix .logo {
  color: #695aa6;
}

.admin-navbar.affix .container {
  min-height: 65px;
}

.admin-navbar.affix .nav .item .link {
  color: #6c757d;
}

.admin-navbar.affix .hamburger-inner, .admin-navbar.affix .hamburger-inner::before, .admin-navbar.affix .hamburger-inner::after {
  background: #6c757d;
}

@media (min-width: 768px) {
  .admin-navbar .nav .item {
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(-50px);
        -ms-transform: translateY(-50px);
            transform: translateY(-50px);
    transform: translateY(-50px);
  }
  .admin-navbar .nav .item:nth-child(9) {
    -webkit-transition: all, 0.1s;
    transition: all, 0.1s;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(9) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(8) {
    -webkit-transition: all, 0.2s;
    transition: all, 0.2s;
    -webkit-transition-delay: .05s;
            transition-delay: .05s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(8) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(7) {
    -webkit-transition: all, 0.3s;
    transition: all, 0.3s;
    -webkit-transition-delay: .1s;
            transition-delay: .1s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(7) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(6) {
    -webkit-transition: all, 0.4s;
    transition: all, 0.4s;
    -webkit-transition-delay: .15s;
            transition-delay: .15s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(6) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(5) {
    -webkit-transition: all, 0.5s;
    transition: all, 0.5s;
    -webkit-transition-delay: .2s;
            transition-delay: .2s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(5) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(4) {
    -webkit-transition: all, 0.6s;
    transition: all, 0.6s;
    -webkit-transition-delay: .25s;
            transition-delay: .25s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(4) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(3) {
    -webkit-transition: all, 0.7s;
    transition: all, 0.7s;
    -webkit-transition-delay: .3s;
            transition-delay: .3s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(3) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(2) {
    -webkit-transition: all, 0.8s;
    transition: all, 0.8s;
    -webkit-transition-delay: .35s;
            transition-delay: .35s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(2) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav .item:nth-child(1) {
    -webkit-transition: all, 0.9s;
    transition: all, 0.9s;
    -webkit-transition-delay: .4s;
            transition-delay: .4s;
  }
}

@media (min-width: 768px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav .item:nth-child(1) {
    -webkit-transition: none;
    transition: none;
  }
}

@media (min-width: 768px) {
  .admin-navbar .nav.show .item {
    -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}

@media (max-width: 991.98px) {
  .admin-navbar .hamburger {
    margin-left: auto;
  }
  .admin-navbar .nav {
    position: absolute;
    top: calc(100% + 1px);
    left: 0;
    background: #fff;
    border-radius: 0 0 0 0;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
        -ms-flex-direction: column;
            flex-direction: column;
    width: 100%;
    margin: auto;
    display: block;
    border-bottom: 1px solid #dee2e6;
    padding: 13px;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translateY(6px);
        -ms-transform: translateY(6px);
            transform: translateY(6px);
    -webkit-transition: all, 0.3s;
    transition: all, 0.3s;
  }
}

@media (max-width: 991.98px) and (prefers-reduced-motion: reduce) {
  .admin-navbar .nav {
    -webkit-transition: none;
    transition: none;
  }
}

@media (max-width: 991.98px) {
  .admin-navbar .nav.show {
    opacity: 1;
    visibility: visible;
    -webkit-transform: translateY(0);
        -ms-transform: translateY(0);
            transform: translateY(0);
  }
  .admin-navbar .nav .item .link {
    padding: 7px 12px;
    display: block;
    color: #6c757d;
  }
}

</style>