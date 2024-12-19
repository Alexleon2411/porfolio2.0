<template>
    <!-- page header -->
    <header id="home" class="header">
        <div class="overlay"></div>
        <div class="header-content container">
            <h1 class="header-title">
              <span class="up green" id="hi">
                HI!
              </span>
              <span class="down purple">I am </span>
                <span class="down blue">Alejandro</span>
            </h1>
            <p class="header-subtitle" >
                Full Stack Web Developer
            </p>
            <a href="https://github.com/Alexleon2411" target="_blank">
              <button class="btn btn-primary">Visit My Works</button>
            </a>
        </div>
    </header><!-- end of page header -->

</template>

<script setup>
import anime from 'animejs';
import { onMounted } from 'vue';
import { gsap } from "gsap";


onMounted(async () => {
 
  gsap.timeline()
    .fromTo(".green", {x: -1500},{rotation: 360, x: 10, duration: 1})
    .fromTo(".purple", {x: -1500},{rotation: 360, x: 10, duration: 0.3})
    .fromTo(".blue", {x: -1500},{rotation: 360, x: 70, duration: 0.3})
    .from(".btn, .header-subtitle", {y:360, stagger: 0.1, duration: 0.8, ease: "back"})

})

</script>
<style>
/* .svg-container {
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
}
#svg-wrapper {
  display: block;
  width: 80%;
}
#svg-wrapper2 {
  display: flex;
  width: 50%;
}
path {
  stroke-width: 1;
  stroke: #fff;
} */
</style>
