<template>

  <h3 class="items-center flex justify-center mt-10">My Skills</h3>
  <div ref="galleryRef" class="gallery">
    
     <ul class="cards">
    </ul>
  </div>
</template>

<script setup>
import { gsap } from 'gsap';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useSkillStore } from '../store/skillsStore';

const store  = useSkillStore();
const skills = ref([]);
const galleryRef = ref(null);

onBeforeMount(async () => {
  try {
    
    console.log('Skills loaded before mount:', skills.value);
  } catch (err) {
    console.error('Error loading skills:', err);
  }
});

onMounted(async () => {
  skills.value = await store.fetchSkills();
  const gallery = galleryRef.value;
  const cards = gallery?.querySelector('.cards');
  skills.value.forEach((skill) => {
    const listItem = document.createElement('li');

    listItem.innerHTML = `
      <div class="body">
        <img src="${skill['image-url']}" alt="Skill image" class="icon" />
        <h6 class="title">${skill.name}</h6>
        <p class="subtitle">${skill.description}</p>
      </div>
    `;

    cards.appendChild(listItem);
  });
  const listItems = gsap.utils.toArray('.cards li');

  const spacing = 0.1,
        snap = gsap.utils.snap(spacing),
        seamlessLoop = buildSeamlessLoop(listItems, spacing);


  // Configuración de la animación automática
  const animation = gsap.to(seamlessLoop, {
    totalTime: seamlessLoop.duration(), // Duración del ciclo completo
    duration: 40,                      // Controla la velocidad de desplazamiento
    ease: "linear",
    repeat: -1,                        // Hace que la animación sea infinita
  });

  // Detener la animación al hacer hover
  listItems.forEach(card => {
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
}

.cards {
	position: absolute;
	width: 14rem;
	height: 18rem;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.icon {
  border-radius: 20px;
}

.title, .subtitle { 
  color: #fff;
}
.subtitle{
  padding: 0 5px;
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
      width: 100% ;
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
