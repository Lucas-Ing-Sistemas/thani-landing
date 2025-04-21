document.addEventListener('DOMContentLoaded', () => {
  // Código para ocultar/mostrar el botón de WhatsApp en el slider de imágenes
  const whatsappBtn = document.querySelector('#whatsapp-btn'); // Usamos el ID correcto
  const carouselSection = document.querySelector('.expand-image-carousel');

  if (whatsappBtn && carouselSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            whatsappBtn.style.display = 'none'; // Oculta el botón
          } else {
            whatsappBtn.style.display = 'flex'; // Muestra de nuevo
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(carouselSection);
  }

  // Código para el carrusel de imágenes con scroll infinito
  const carousel = document.querySelector('.carousel');
  const items = Array.from(carousel.children);
  let isPaused = false;

  // Duplicar las imágenes una vez para scroll infinito
  items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });

  // Función para pausar el scroll
  const pauseScroll = () => {
    carousel.style.animationPlayState = 'paused';
    isPaused = true;
  };

  // Función para reanudar el scroll
  const resumeScroll = () => {
    carousel.style.animationPlayState = 'running';
    isPaused = false;
  };

  // Agrega eventos a cada imagen
  carousel.querySelectorAll('.image-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      pauseScroll();

      const itemRect = item.getBoundingClientRect();
      const containerRect = carousel.getBoundingClientRect();
      const itemLeft = itemRect.left;
      const itemRight = itemRect.right;

      const visibleThreshold = containerRect.width * 0.1;

      // Si está muy a la izquierda o derecha, lo centramos
      if (itemLeft < containerRect.left + visibleThreshold || itemRight > containerRect.right - visibleThreshold) {
        const scrollAmount = item.offsetLeft - containerRect.width / 2 + item.offsetWidth / 2;
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
      }
    });

    item.addEventListener('mouseleave', () => {
      resumeScroll();
    });
  });

  // Efecto de zoom y sonido del video al entrar en pantalla
  const section = document.getElementById('videoInfo');
  const video = document.getElementById('luckyVideo');
  const zoomElements = section.querySelectorAll('.zoom-text');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.muted = false;
          video.play();

          // Mostrar texto con efecto zoom
          zoomElements.forEach(el => {
            el.style.opacity = 1;
            el.style.transform = 'scale(1)';
          });
        } else {
          video.muted = true;
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);

  // Código para mostrar el formulario cuando se hace clic en el botón
  const showFormBtn = document.querySelector('.show-form-btn');
  const formularioContainer = document.getElementById('formulario-container');

  if (showFormBtn) {
    showFormBtn.addEventListener('click', () => {
      // Mostrar el formulario
      formularioContainer.style.display = formularioContainer.style.display === 'none' || formularioContainer.style.display === '' ? 'block' : 'none';
    });
  }

  // Validación del formulario
  const form = document.getElementById("formulario-thani");
  const celularInput = document.getElementById("celular");
  const errorCelular = document.getElementById("error-celular");
  const mensajeExito = document.getElementById("mensaje-enviado");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const celularValue = celularInput.value;

    // Validación del número: debe tener 8 dígitos y comenzar con un 9 visible + 8 dígitos escritos
    if (!/^\d{8}$/.test(celularValue)) {
      errorCelular.textContent = "Debe ingresar 9 dígitos (el primer dígito '9' ya está añadido)";
      return;
    }

    // Si es válido, ocultamos el error
    errorCelular.textContent = "";

    // Mostrar mensaje de éxito
    mensajeExito.style.display = "block";

    // Ocultar el mensaje y limpiar el formulario luego de 5 segundos
    setTimeout(() => {
      mensajeExito.style.display = "none";
      form.reset();
    }, 5000);
  });
});



document.addEventListener('DOMContentLoaded', () => {
  const mostrarBtn = document.getElementById('mostrarFormularioBtn');
  const formularioContainer = document.getElementById('formularioContainer');
  const formulario = document.getElementById('formulario-thani');
  const mensaje = document.getElementById('mensaje-enviado');
  const errorCelular = document.getElementById('error-celular');
  const celularInput = document.getElementById('celular');

  mostrarBtn.addEventListener('click', () => {
    formularioContainer.classList.add('show');
    mostrarBtn.style.display = 'none';
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const celularValue = celularInput.value.trim();
    if (!/^\d{8}$/.test(celularValue)) {
      errorCelular.textContent = "Debe ingresar 8 dígitos (el '9' ya está puesto)";
      return;
    } else {
      errorCelular.textContent = "";
    }

    const inicial = document.getElementById("inicial").value;
    const interes = document.getElementById("interes").value;

    if (!inicial || !interes) {
      alert("Por favor completa todas las preguntas.");
      return;
    }

    mensaje.style.display = 'block';
    formularioContainer.classList.remove('show');

    setTimeout(() => {
      mensaje.style.display = 'none';
      formulario.reset();
      mostrarBtn.style.display = 'block';
    }, 5000);
  });
});



  const formBox = document.querySelector('.form-box');
  const inputs = document.querySelectorAll('.formulario-thani input, .formulario-thani select');

  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      formBox.classList.add('zoomed');
    });
    input.addEventListener('blur', () => {
      // Solo quitar si ningún otro campo está enfocado
      if (![...inputs].some(el => el === document.activeElement)) {
        formBox.classList.remove('zoomed');
      }
    });
  });


  document.addEventListener('DOMContentLoaded', () => {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const formSection = document.getElementById('formulario-mapa');
    const footer = document.getElementById('footer');
  
    const observer = new IntersectionObserver((entries) => {
      let isVisible = entries.some(entry => entry.isIntersecting);
      whatsappBtn.style.display = isVisible ? 'none' : 'flex';
    }, {
      threshold: 0.2,
    });
  
    if (formSection) observer.observe(formSection);
    if (footer) observer.observe(footer);
  });

  


  document.getElementById("formulario-thani").addEventListener("submit", function(e) {
    e.preventDefault();

    const nombres = document.getElementById("nombres").value.trim();
    const celular = document.getElementById("celular").value.trim();
    const inicial = document.getElementById("inicial").value;
    const interes = document.getElementById("interes").value;

    // Validación de campos vacíos
    if (!nombres || !celular || !inicial || !interes) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Construir el objeto con los datos a enviar
    const data = {
        nombres,
        celular: "9" + celular, // Concatenar el 9 al número de celular
        inicial,
        interes
    };

    // URL de la Aplicación Web de Google Apps Script
    const url = "https://script.google.com/macros/s/AKfycbyuwtOvUsx0glpJAnlKog6RnZB3fWyZbZT_fPR7-3fdhjMaXlxtZXsu-4FTkoGr7Kmv/exec";

    // Enviar los datos al servidor (Google Apps Script)
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(response => {
        if (response.result === "success") {
            document.getElementById("mensaje-enviado").style.display = "block";
            document.getElementById("formulario-thani").reset(); // Limpiar el formulario
        }
    })
    .catch(err => {
        console.error("Error al enviar:", err);
        alert("Error al conectar con el servidor.");
    });
});
