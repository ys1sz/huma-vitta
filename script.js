document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------------
     Menu mobile
  --------------------------------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Submenu "Especialidades" no mobile (abre/fecha ao tocar)
  const subItem = document.querySelector(".nav__item--has-sub");
  const subLink = subItem.querySelector(".nav__link");

  subLink.addEventListener("click", (event) => {
    if (window.innerWidth <= 860) {
      event.preventDefault();
      subItem.classList.toggle("is-open");
    }
  });

  // Fecha o menu mobile ao clicar em qualquer link de navegação
  document.querySelectorAll(".nav__link, .nav__sub a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 860 && link !== subLink) {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* ---------------------------------------------------------
     Destaque do link ativo conforme a rolagem
  --------------------------------------------------------- */
  const sections = document.querySelectorAll("main section[id], main section[id] .card[id]");
  const topLevelLinks = document.querySelectorAll(".nav__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        topLevelLinks.forEach((link) => link.classList.remove("is-active"));

        const matchingLink = document.querySelector(`.nav__link[href="#${id}"]`);
        if (matchingLink) {
          matchingLink.classList.add("is-active");
        } else {
          // Se o alvo for um card de especialidade, destaca o link "Especialidades"
          const especialidadesLink = document.querySelector('.nav__link[href="#especialidades"]');
          if (entry.target.closest("#especialidades") && especialidadesLink) {
            especialidadesLink.classList.add("is-active");
          }
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));

  /* ---------------------------------------------------------
     Formulário de contato (validação simples de front-end)
  --------------------------------------------------------- */
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = form.nome.value.trim();
    const telefone = form.telefone.value.trim();

    if (!nome || !telefone) {
      feedback.textContent = "Preencha nome e telefone para continuar.";
      return;
    }

    // Aqui entra a integração real (API, e-mail, WhatsApp etc.)
    feedback.textContent = `Obrigado, ${nome}! Em breve entraremos em contato.`;
    form.reset();
  });

  /* ---------------------------------------------------------
     Ano dinâmico no rodapé
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

reveals.forEach(section=>{
    observer.observe(section);
});
