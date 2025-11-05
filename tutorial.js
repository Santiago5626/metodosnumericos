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
    text: 'Aquí escribe la función f(x), por ejemplo sin(x) + x^2.',
    position: 'right'
  },
  {
    element: '.grid.grid-cols-6',
    text: 'Usa este teclado virtual para insertar símbolos como sin, cos, π, ^ para potencias, etc.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#x0',
    text: 'Ingresa el punto x₀ donde quieres calcular la derivada.',
    position: 'right'
  },
  {
    element: '#h',
    text: 'Ingresa el paso h, un valor pequeño como 0.1 para buena precisión.',
    position: 'right'
  },
  {
    element: '#calcDeriv',
    text: 'Pulsa "Calcular" para obtener los valores numéricos de las derivadas forward, backward y central.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#explainDeriv',
    text: 'Luego, pulsa "Paso a paso" para ver la explicación detallada con fórmulas.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#loadTeacherExercise',
    text: 'Carga el ejercicio de ejemplo para que te sirva como guía.',
    position: 'bottom',
    avatar: 'arriba.png'
  },
  {
    element: '#chartD',
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
    text: 'Escribe la función f(x) aquí.',
    position: 'right'
  },
  {
    element: '#int-keyboard',
    text: 'Usa el teclado para símbolos.',
    position: 'bottom',
    avatar: 'arriba.png'
  },
  {
    element: '.flex.gap-2.mb-3',
    text: 'Ingresa el intervalo [a, b].',
    position: 'right'
  },
  {
    element: '#n',
    text: 'Ingresa n, el número de subintervalos.',
    position: 'right'
  },
  {
    element: '#calcInt',
    text: 'Pulsa "Calcular" para obtener trapecio y Simpson.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#explainInt',
    text: 'Pulsa "Paso a paso" para la explicación.',
    position: 'bottom',
    avatar: 'arriba.png'

  },
  {
    element: '#chartI',
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
    backgroundColor: 'rgba(0, 0, 0, 0.72)', // oscuridad general
    zIndex: '10000',
    pointerEvents: 'auto',
    transition: 'clip-path 0.25s ease'
  });

  // Prevent clicks on shaded area
  overlay.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  // Prevent scrolling
  const preventScroll = (e) => e.preventDefault();
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
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    maxWidth: '300px',
    fontSize: '14px',
    pointerEvents: 'auto'
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
  prevBtn.style.marginRight = '10px';
  prevBtn.onclick = prevStep;
  btnContainer.appendChild(prevBtn);

  nextBtn = document.createElement('button');
  nextBtn.textContent = 'Siguiente';
  nextBtn.onclick = nextStep;
  btnContainer.appendChild(nextBtn);

  closeBtn = document.createElement('button');
  closeBtn.textContent = 'Cerrar';
  closeBtn.style.marginLeft = '10px';
  closeBtn.onclick = closeTutorial;
  btnContainer.appendChild(closeBtn);

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

// Add event listeners to tutorial buttons after DOM loads
document.addEventListener('DOMContentLoaded', function() {
  // Find and update derivatives tutorial button
  const derivBtn = document.querySelector('button[onclick*="startTutorial(\'deriv\'"]');
  if (derivBtn) {
    derivBtn.addEventListener('click', function() { startTutorial('deriv'); });
    derivBtn.removeAttribute('onclick');
  }
  // Find and update integration tutorial button
  const intBtn = document.querySelector('button[onclick*="startTutorial(\'int\'"]');
  if (intBtn) {
    intBtn.addEventListener('click', function() { startTutorial('int'); });
    intBtn.removeAttribute('onclick');
  }
});
