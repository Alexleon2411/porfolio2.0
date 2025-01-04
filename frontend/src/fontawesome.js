// src/fontawesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faHome, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importa los íconos necesarios
import { faFacebook, faTwitter,  faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'; // Si usas íconos de marcas
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agrega los íconos a la librería
library.add(faUser, faHome, faFacebook, faTwitter, faInstagram, faLinkedin, faGithub, faEdit, faTrash);

export default FontAwesomeIcon;
