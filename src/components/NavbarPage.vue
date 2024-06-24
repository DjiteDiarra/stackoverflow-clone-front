<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link to="/" class="navbar-brand">StackOverflow Clone</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/ask" class="nav-link">Poser une question</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Connexion</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Inscription</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    mounted() {
      // Fermer le menu de navigation lorsqu'un lien est cliqué
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          const navbarToggler = document.querySelector('.navbar-toggler');
          navbarToggler.click();
        });
      });
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques à la barre de navigation */
  .navbar {
    border-radius: 0;
  }
  
  .navbar-brand {
    font-size: 1.5rem;
  }
  
  .nav-link {
    font-size: 1.1rem;
  }
  </style>
  