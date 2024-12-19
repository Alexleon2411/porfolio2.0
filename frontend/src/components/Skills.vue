<template>

  <div ref="galleryRef" class="gallery">
    <ul class="cards">
      <li>
        <div class="body">
            <img src="../imgs/css3.png" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" class="icon" >
            <h6 class="title">CSS</h6>
            <p class="subtitle">used to give the best cascading style to our projects.</p>
        </div>
      </li>
      <li>
        <div class="body ">
            <img src="../imgs/html5.png" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" class="icon">
            <h6 class="title">HTML5</h6>
            <p class="subtitle">building web applications from scratch.</p>
        </div>
      </li>
      <li>
        <div class="body">
            <img src="../imgs/javascript (1).png" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" class="icon">
            <h6 class="title">Javascript</h6>
            <p class="subtitle">Used for the best user interaction and a beautiful animation of our project.</p>
        </div>
      </li>
      <li>
        <div class="body">
            <img src="../imgs/bootstrap.png" alt="Download free bootstrap 4 landing page, free boootstrap 4 templates, Download free bootstrap 4.1 landing page, free boootstrap 4.1.1 templates, meyawo Landing page" class="icon">
            <h6 class="title">Bootstrap</h6>
            <p class="subtitle">to make easier the code that is usually repeated and have a very responsive application.</p>
        </div>
      </li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
      <li>11</li>
      <li>12</li>
      <li>13</li>
      <li>14</li>
      <li>15</li>
      <li>16</li>
      <li>17</li>
      <li>18</li>
      <li>19</li>
      <li>20</li>
      <li>21</li>
      <li>22</li>
      <li>23</li>
      <li>24</li>
      <li>25</li>
      <li>26</li>
      <li>27</li>
      <li>28</li>
      <li>29</li>
      <li>30</li>
    </ul>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';
import { onMounted } from 'vue';

onMounted(() => {
  const spacing = 0.1,
        snap = gsap.utils.snap(spacing),
        cards = gsap.utils.toArray('.cards li'),
        seamlessLoop = buildSeamlessLoop(cards, spacing);

  // Configuración de la animación automática
  const animation = gsap.to(seamlessLoop, {
    totalTime: seamlessLoop.duration(), // Duración del ciclo completo
    duration: 40,                      // Controla la velocidad de desplazamiento
    ease: "linear",
    repeat: -1,                        // Hace que la animación sea infinita
  });

  // Detener la animación al hacer hover
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => animation.pause()); // Pausa la animación
    card.addEventListener("mouseleave", () => animation.resume()); // Reanuda la animación
  });

  // Función para construir el loop de las cartas
  function buildSeamlessLoop(items, spacing) {
    let overlap = Math.ceil(1 / spacing),
        startTime = items.length * spacing + 0.5,
        loopTime = (items.length + overlap) * spacing + 1,
        rawSequence = gsap.timeline({ paused: true }),
        seamlessLoop = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            this._time === this._dur && (this._tTime += this._dur - 0.01);
          }
        }),
        l = items.length + overlap * 2,
        time = 0,
        i, index, item;

    gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

    for (i = 0; i < l; i++) {
      index = i % items.length;
      item = items[index];
      time = i * spacing;

      rawSequence.fromTo(item,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in", immediateRender: false },
        time
      ).fromTo(item,
        { xPercent: 400 },
        { xPercent: -400, duration: 1, ease: "none", immediateRender: false },
        time
      );
    }

    rawSequence.time(startTime);
    seamlessLoop.to(rawSequence, {
      time: loopTime,
      duration: loopTime - startTime,
      ease: "none"
    }).fromTo(rawSequence,
      { time: overlap * spacing + 1 },
      { time: startTime, duration: startTime - (overlap * spacing + 1), immediateRender: false, ease: "none" }
    );

    return seamlessLoop;
  }
});
</script>
<style  >
* {
	box-sizing: border-box;
}

.gallery {
	position: relative;
	width: 100%;
	height: 500px;
	overflow: hidden;
  margin-bottom: 10px;
}

.cards {
	position: absolute;
	width: 14rem;
	height: 18rem;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.cards li {
	list-style: none;
	padding: 0;
	margin: 0;
	width: 14rem;
	height: 18rem;
	text-align: center;
	line-height: 18rem;
	font-size: 2rem;
	background-color: #9d7cce;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 10px;
  .subtitle {
    display: none;
  }

  :hover {
    line-height: 10px;
    .title {
      width: 10% ;
      margin: auto;
    }
    .icon {
      width: 50%;
      height: 50%;
      margin: auto;
      margin-bottom: 0;
    }
    .subtitle {
      display: contents;
      transition: 2s;

    }
  }
}



</style>
