# Métodos Numéricos Interactivos

Una aplicación web interactiva para aprender y practicar métodos numéricos de diferenciación e integración, desarrollada con HTML, CSS (Tailwind), JavaScript y Chart.js.

## 📋 Características Principales

### 🔢 Diferenciación Numérica
- **Métodos implementados:**
  - Diferencia hacia adelante (Forward)
  - Diferencia hacia atrás (Backward)
  - Diferencia centrada (Central) - más precisa
- **Funcionalidades:**
  - Cálculo interactivo con entrada de funciones
  - Visualización gráfica de la función y tangente aproximada
  - Teclado matemático virtual
  - Explicación paso a paso con LaTeX
  - Ejercicio de ejemplo con comparación de errores

### 📐 Integración Numérica
- **Métodos implementados:**
  - Regla del Trapecio
  - Regla de Simpson 1/3
- **Funcionalidades:**
  - Cálculo de integrales definidas
  - Visualización gráfica del área bajo la curva
  - Tabla de puntos calculados
  - Explicación detallada paso a paso

### 🎯 Características Generales
- **Interfaz responsiva:** Funciona en desktop y móvil
- **Navegación SPA:** Sin recargas de página
- **Tutorial integrado:** Guías interactivas para principiantes
- **Teclado matemático:** Soporte para funciones trigonométricas, logaritmos, etc.
- **Procesamiento de expresiones:** Conversión automática de notación natural a JavaScript
- **Visualizaciones:** Gráficos interactivos con Chart.js
- **LaTeX rendering:** Fórmulas matemáticas renderizadas con MathJax

## 🚀 Cómo Usar

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet para cargar librerías externas

### Instalación y Ejecución
1. **Descarga los archivos:**
   - Clona o descarga el repositorio
   - Asegúrate de tener todos los archivos en la misma carpeta

2. **Archivos necesarios:**
   ```
   ├── index.html          # Archivo principal
   ├── tutorial.js         # Lógica de tutoriales
   ├── infografia-diferenciacion.jpeg  # Imagen informativa
   ├── image.png           # Imagen adicional
   ├── README.md           # Este archivo
   ```

3. **Ejecutar la aplicación:**
   - Abre `index.html` en tu navegador web
   - La aplicación se carga automáticamente

### Navegación
- Usa los botones del menú superior para cambiar entre secciones
- En móvil, toca el ícono de menú (☰) para ver las opciones

## 📚 Secciones de la Aplicación

### 1. Diferenciación Numérica
- **Teoría:** Conceptos básicos, fórmulas y aplicaciones
- **Caso de estudio:** Ejemplo práctico con producción de botellas
- **Calculadora:** Entrada de función, punto x₀ y paso h
- **Visualización:** Gráfico de la función y tangente aproximada

### 2. Integración Numérica
- **Teoría:** Métodos del trapecio y Simpson con comparaciones
- **Ejemplo práctico:** Caso de estudio con tabla de resultados
- **Calculadora:** Límites de integración a, b y número de subintervalos n
- **Visualización:** Gráfico de la función integrada

## 🔧 Funcionalidades Técnicas

### Entrada de Funciones
- **Sintaxis natural:** `sin(x)`, `cos(x)`, `tan(x)`, `ln(x)`, `sqrt(x)`
- **Operadores:** `+`, `-`, `*`, `/`, `^` (potencia)
- **Constantes:** `pi` o `π`, `e`
- **Ejemplos válidos:**
  - `sin(x) + x^2`
  - `e^(-x/2) + 0.4*x^2`
  - `((3*x-1)/(x^2+3))^2`

### Teclado Virtual
- Funciones trigonométricas: sin, cos, tan
- Funciones especiales: ln, √
- Constantes: π, e
- Operadores: ^, (, )

### Tutoriales
- **Tutorial introductorio:** Aparece al iniciar (opcional)
- **Tutoriales por sección:** Explicaciones paso a paso
- **Modal sin overlay:** No oscurece la pantalla

## 🎨 Tecnologías Utilizadas

- **HTML5:** Estructura semántica
- **CSS3 + Tailwind CSS:** Estilos responsivos y modernos
- **JavaScript (ES6+):** Lógica de aplicación
- **Chart.js:** Visualizaciones interactivas
- **MathJax:** Renderizado de fórmulas LaTeX
- **Bootstrap Icons:** Iconografía

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Dispositivos
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet
- ✅ Móvil (iOS, Android)

## 🐛 Solución de Problemas

### Problemas Comunes

1. **La aplicación no carga:**
   - Verifica que todos los archivos estén en la misma carpeta
   - Asegúrate de abrir `index.html` directamente en el navegador
   - Comprueba tu conexión a internet para las librerías externas

2. **Las fórmulas no se renderizan:**
   - Espera a que MathJax termine de cargar (puede tomar unos segundos)
   - Refresca la página si es necesario

3. **Los cálculos dan error:**
   - Verifica la sintaxis de la función
   - Asegúrate de que los valores numéricos sean válidos
   - Usa punto (.) como separador decimal

4. **Los gráficos no aparecen:**
   - Verifica que Chart.js se haya cargado correctamente
   - Intenta refrescar la página

### Soporte
Si encuentras problemas, verifica:
- Que uses un navegador moderno
- Que tengas JavaScript habilitado
- Que no haya bloqueadores de contenido activos

## 📖 Aprendizaje

### Conceptos Cubiertos
- **Diferenciación numérica:** Aproximación de derivadas con diferencias finitas
- **Integración numérica:** Cálculo aproximado de integrales definidas
- **Análisis de error:** Comparación de precisión entre métodos
- **Aplicaciones prácticas:** Casos reales en ingeniería y ciencias

### Recursos Adicionales
- **Algoritmos en línea:**
  - Diferenciación: [OnlineGDB - SsSY13vTC](https://onlinegdb.com/SsSY13vTC)
  - Integración: [OnlineGDB - iqQ__bnp1J](https://onlinegdb.com/iqQ__bnp1J)

## 🤝 Contribución

Para contribuir al proyecto:
1. Reporta bugs o solicita características
2. Sugiere mejoras en la interfaz
3. Comparte casos de uso adicionales

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- Desarrollado con tecnologías web modernas
- Inspirado en métodos numéricos clásicos
- Diseñado para facilitar el aprendizaje interactivo

---

**¡Disfruta aprendiendo métodos numéricos de forma interactiva!** 🎓
