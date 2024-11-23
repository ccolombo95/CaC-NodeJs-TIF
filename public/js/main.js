/* FUNCION PARA EL MENU DE FIA*/
(function(){
  const openButton = document.querySelector('.nav__menu');
  const menu = document.querySelector('.nav__link');
  const closeMenu = document.querySelector('.nav__close');

  openButton.addEventListener('click', ()=>{
      menu.classList.add('nav__link--show');
  });

  closeMenu.addEventListener('click', ()=>{
      menu.classList.remove('nav__link--show');
  });
})()


(function(){
  
  const sliders = [...document.querySelectorAll('.testimony__body')];
  const buttonNext = document.querySelector('#next');
  const buttonBefore = document.querySelector('#before');
  let value;   

  buttonNext.addEventListener('click', ()=>{
      changePosition(1);
  });

  buttonBefore.addEventListener('click', ()=>{
      changePosition(-1);
  });

  const changePosition = (add)=>{
      const currentTestimony = document.querySelector('.testimony__body--show').dataset.id;
      value = Number(currentTestimony);
      value+= add;


      sliders[Number(currentTestimony)-1].classList.remove('testimony__body--show');
      if(value === sliders.length+1 || value === 0){
          value = value === 0 ? sliders.length  : 1;
      }

      sliders[value-1].classList.add('testimony__body--show');

  }

})()


// Función para alternar el menú
function toggleMenu() {
  const navBarList = document.querySelector(".navbar-list");
  const lines = document.querySelectorAll(".navbar-icon span");

  // Alternar la clase 'show' en la lista del menú
  navBarList.classList.toggle("show");

  // Alternar clases activas en las líneas del menú
  lines[0].classList.toggle("active");
  lines[1].classList.toggle("active");
  lines[2].classList.toggle("active");
}

// Asignar el evento de clic al botón de menú
document.querySelector(".navbar-icon").addEventListener("click", toggleMenu);


//DESPLAZAMIENTO TOP PARA EL BOTON
function scrollToTop() {
  console.log("Botón de desplazamiento clickeado!"); // Mensaje para verificar el clic
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
}

// DESPLAZAR A CIERTA SECCION
function desplazar(sectionId) {
  const targetElement = document.getElementById(sectionId); // Selecciona el elemento destino usando el ID proporcionado

// Realiza el desplazamiento suave
  targetElement.scrollIntoView({
      behavior: 'smooth' // Comportamiento de desplazamiento suave
  });
}