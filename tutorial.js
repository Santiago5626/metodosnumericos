// tutorial.js - Interactive Tutorial for Métodos Numéricos App

let currentStep = 0;
let tutorialSteps = [];
let tutorialSection = '';
let overlay = null;
let highlight = null;
let textBox = null;
let avatar = null;
let nextBtn = null;
let prevBtn = null;
let closeBtn = null;

// Define steps for derivatives section
const derivSteps = [
  {
    element: null,
    text: '¡Hola! Soy Nick, tu asistente virtual. Te ayudaré paso a paso a usar la sección de derivadas. ¡Empecemos!',
    position: 'center',
    avatar: 'saludando.png'
  },
  {
    element: '#exprD',
    element: '#sec-caso-deriv #exprD',
    text: 'Aquí escribe la función f(x), por ejemplo sin(x) + x^2.',
    position: 'right'
  },
  {
    element: '.grid.grid-cols-6',
    element: '#deriv-keyboard',
    text: 'Usa este teclado virtual para insertar símbolos como sin, cos, π, ^ para potencias, etc.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#x0',
    element: '#sec-caso-deriv #x0',
    text: 'Ingresa el punto x₀ donde quieres calcular la derivada.',
    position: 'right'
  },
  {
    element: '#h',
    element: '#sec-caso-deriv #h',
    text: 'Ingresa el paso h, un valor pequeño como 0.1 para buena precisión.',
    position: 'right'
  },
  {
    element: '#calcDeriv',
    element: '#sec-caso-deriv #calcDeriv',
    text: 'Pulsa "Calcular" para obtener los valores numéricos de las derivadas forward, backward y central.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#explainDeriv',
    element: '#sec-caso-deriv #explainDeriv',
    text: 'Luego, pulsa "Paso a paso" para ver la explicación detallada con fórmulas.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#loadTeacherExercise',
    element: '#sec-caso-deriv #loadTeacherExercise',
    text: 'Carga el ejercicio de ejemplo para que te sirva como guía.',
    position: 'bottom',
    avatar: 'arriba.png'
  },
  {
    element: '#chartD',
    element: '#sec-caso-deriv #chartD',
    text: 'Aquí ves la gráfica de la función y la tangente aproximada.',
    position: 'right'
  }
];

// Define steps for integration section
const intSteps = [
  {
    element: null,
    text: '¡Hola! Soy Nick, tu asistente virtual. Te guiaré paso a paso por la sección de integrales. ¡Vamos allá!',
    position: 'center',
    avatar: 'saludando.png'
  },
  {
    element: '#exprI',
    element: '#sec-caso-int #exprI',
    text: 'Escribe la función f(x) aquí.',
    position: 'right'
  },
  {
    element: '#int-keyboard',
    element: '#sec-caso-int #int-keyboard',
    text: 'Usa el teclado para símbolos.',
    position: 'bottom',
    avatar: 'arriba.png'
  },
  {
    element: '.flex.gap-2.mb-3',
    element: '#sec-caso-int .flex.gap-2.mb-3',
    text: 'Ingresa el intervalo [a, b].',
    position: 'right'
  },
  {
    element: '#n',
    element: '#sec-caso-int #n',
    text: 'Ingresa n, el número de subintervalos.',
    position: 'right'
  },
  {
    element: '#calcInt',
    element: '#sec-caso-int #calcInt',
    text: 'Pulsa "Calcular" para obtener trapecio y Simpson.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#explainInt',
    element: '#sec-caso-int #explainInt',
    text: 'Pulsa "Paso a paso" para la explicación.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#chartI',
    element: '#sec-caso-int #chartI',
    text: 'Gráfica de la función.',
    position: 'right'
  }
];

function startTutorial(section) {
  tutorialSection = section;
  tutorialSteps = section === 'deriv' ? derivSteps : intSteps;
  currentStep = 0; // empieza en el saludo

  // Scroll to the first element that has an element
  const firstElement = tutorialSteps.find(step => step.element)?.element;
  if (firstElement) {
    const el = document.querySelector(firstElement);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  createOverlay();
  showStep();
}

function createOverlay() {
  if (overlay) overlay.remove();

  // === Capa oscura general ===
  overlay = document.createElement('div');
  overlay.id = 'tutorial-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: '10000',
    pointerEvents: 'none', // Permite hacer clic a través de la capa
    transition: 'clip-path 0.25s ease'
  });

  // Prevent scrolling
  const preventScroll = (e) => { if (e.target === overlay) e.preventDefault(); };
  overlay.addEventListener('wheel', preventScroll, { passive: false });
  overlay.addEventListener('touchmove', preventScroll, { passive: false });

  // highlight
  highlight = document.createElement('div');
  Object.assign(highlight.style, {
    position: 'absolute',
    border: '3px solid #FFD700',
    borderRadius: '8px',
    pointerEvents: 'none',
    
  });
  overlay.appendChild(highlight);

  // text box
  textBox = document.createElement('div');
  Object.assign(textBox.style, {
    position: 'absolute',
    backgroundColor: '#2d3748', // Fondo oscuro
    color: '#fff', // Texto blanco
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    maxWidth: '300px',
    fontSize: '14px',
    pointerEvents: 'auto',
  });
  overlay.appendChild(textBox);

  // avatar (sin volteo)
  avatar = document.createElement('img');
  avatar.alt = 'Nick';
  avatar.style.width = '60px';
  avatar.style.height = '60px';
  avatar.style.position = 'absolute';
  avatar.style.left = '5px';
  avatar.style.top = '5px';
  textBox.appendChild(avatar);

  const text = document.createElement('p');
  text.id = 'tutorial-text';
  text.style.margin = '0 0 0 70px';
  textBox.appendChild(text);

  const btnContainer = document.createElement('div');
  btnContainer.style.marginTop = '10px';
  btnContainer.style.textAlign = 'right';
  textBox.appendChild(btnContainer);

  prevBtn = document.createElement('button');
  prevBtn.textContent = 'Anterior';
  Object.assign(prevBtn.style, {
    marginRight: '10px',
    padding: '5px 10px',
    border: '1px solid #4a5568',
    borderRadius: '4px',
    cursor: 'pointer'
  });
  prevBtn.onclick = prevStep;
  btnContainer.appendChild(prevBtn);

  nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente';
  Object.assign(nextBtn.style, {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#3b82f6',
    color: 'white',
    cursor: 'pointer'
  });
  nextBtn.onclick = nextStep;
  btnContainer.appendChild(nextBtn);

  // Se elimina el botón "Cerrar" para simplificar la interfaz,
  // ya que el último paso es "Finalizar".

  document.body.appendChild(overlay);
}

function showStep() {
  const step = tutorialSteps[currentStep];
  const element = step.element ? document.querySelector(step.element) : null;

  // highlight visible solo si hay elemento
  if (element) {
    const rect = element.getBoundingClientRect();
    highlight.style.display = 'block';
    highlight.style.left = rect.left - 5 + 'px';
    highlight.style.top = rect.top - 5 + 'px';
    highlight.style.width = rect.width + 10 + 'px';
    highlight.style.height = rect.height + 10 + 'px';
  } else {
    highlight.style.display = 'none';
  }

  document.getElementById('tutorial-text').textContent = step.text;

  // avatar image (sin volteo)
  avatar.src = step.avatar || 'avatar.png';

  // position textBox
  let left, top;
  if (step.position === 'center' || !element) {
    left = window.innerWidth / 2 - textBox.offsetWidth / 2;
    top = window.innerHeight / 2 - textBox.offsetHeight / 2;
  } else {
    const rect = element.getBoundingClientRect();
    top = rect.top + rect.height / 2 - textBox.offsetHeight / 2;
    left = rect.left + rect.width + 20;
    if (step.position === 'left') left = rect.left - textBox.offsetWidth - 20;
    else if (step.position === 'top') {
      top = rect.top - textBox.offsetHeight - 20;
      left = rect.left + rect.width / 2 - textBox.offsetWidth / 2;
    } else if (step.position === 'bottom') {
      top = rect.bottom + 20;
      left = rect.left + rect.width / 2 - textBox.offsetWidth / 2;
    }
  }

  // límites pantalla
  if (left < 10) left = 10;
  if (top < 10) top = 10;
  if (left + textBox.offsetWidth > window.innerWidth)
    left = window.innerWidth - textBox.offsetWidth - 10;
  if (top + textBox.offsetHeight > window.innerHeight)
    top = window.innerHeight - textBox.offsetHeight - 10;

  textBox.style.left = left + 'px';
  textBox.style.top = top + 'px';

  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent =
    currentStep === tutorialSteps.length - 1 ? 'Finalizar' : 'Siguiente';
}

function nextStep() {
  if (currentStep < tutorialSteps.length - 1) {
    currentStep++;
    showStep();
  } else {
    closeTutorial();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep();
  }
}

function closeTutorial() {
  if (overlay) {
    overlay.remove();
    overlay = null;
  }
}

window.startTutorial = startTutorial;
