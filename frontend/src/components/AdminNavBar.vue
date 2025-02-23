<template>
    <!-- Page Navbar -->
    <nav class="admin-navbar" data-spy="affix" data-offset-top="20">
          <div class="container">
              <RouterLink :to="{name: 'Home'}" class="title-color" >Alejandro</RouterLink>
              <a href="javascript:void(0)" id="nav-toggle" class="hamburger hamburger--elastic">
                  <div class="hamburger-box">
                    <ul>
                        <li>
                            <RouterLink :to="{name: 'Skills'}" class="link text-white ml-2 uppercase">skills</RouterLink>
                            <RouterLink :to="{name: 'projects'}" class="link text-white ml-2 uppercase">Projects</RouterLink>
                            <a @click="logout" class="link text-white ml-2 uppercase ">Logout</a>
                        </li>
                    </ul>
                  </div>
              </a>
          </div>
      </nav>
  </template>
  
<script >
  import $ from 'jquery'
  import { useAppStore } from '../store/appStore';
    import { RouterLink, useRouter } from 'vue-router';
  
  export default {
    name: 'Navbar',
    methods: {
      async logout() {
        const router = useRouter
        const store = useAppStore();
        const result = await store.logout();
        if ( result ) {
            console.log('logout', this.user)
        }
      }
    },
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
  background: #695aa6;
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
    color: #fff;
}
.title-color {
   font-size: calc(20px + (30 - 20) * ((100vw - 300px) / (1300 - 300)));
  text-decoration: none;
  color: #fff;
}


</style>