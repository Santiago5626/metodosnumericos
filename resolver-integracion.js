// Tutorial para el caso de estudio de Integración Numérica (versión corregida)

document.addEventListener("DOMContentLoaded", () => {

    const steps = [
        {
            element: "#int-case-title",
            text: "Analizaremos el consumo energético en una línea de producción mediante integración numérica.",
            position: "bottom",
            avatar: "saludando.png"
        },
        {
            element: "#int-infography",
            text: "Este es el proceso industrial que analizaremos. El consumo eléctrico cambia según la actividad.",
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#int-description-p",
            text: "Como el consumo varía con el tiempo, usamos una integral para calcular la energía total.",
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#int-main-formula",
            text: "Esta función modela el comportamiento del consumo eléctrico a lo largo del tiempo.",
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#int-variables-list",
            text: "Aquí ves las variables del problema: tiempo, consumo instantáneo y energía total acumulada.",
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#int-trapezoid-solution",
            text: "Usaremos la regla del trapecio para aproximar la integral.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-ab-values",
            text: "El intervalo va de a = 0 a b = 6 horas.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-h-value",
            text: "El paso h = 1 porque tenemos mediciones cada hora.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-values-table",
            text: "Completamos la tabla evaluando la función a cada hora.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-substitution-p",
            text: "Reemplazamos cada valor de t en la función para obtener los valores instantáneos.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-trapezoid-formula",
            text: "Aplicamos la fórmula del método del trapecio.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-trapezoid-substitution",
            text: "Sustituimos los valores obtenidos dentro de la fórmula.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-trapezoid-result",
            text: "Resultado final: consumo aproximado de 33.08 kWh usando trapecio.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-trapezoid-analysis",
            text: "El consumo aumenta progresivamente a lo largo de la jornada.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-simpson-title",
            text: "Ahora validamos el resultado usando Simpson 3/8.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-simpson-formula",
            text: "Esta es la fórmula de Simpson 3/8 aplicada a este caso.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-simpson-substitution",
            text: "Sustituimos los valores en la fórmula de Simpson, agrupándolos según los coeficientes.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-simpson-result",
            text: "Resultado con Simpson: 32.60 kWh.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#int-simpson-analysis",
            text: "Simpson proporciona mayor precisión que trapecio en funciones suaves.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: null,
            text: "Tutorial completado ✅ Ahora entiendes cómo aplicar integración numérica en un contexto industrial.",
            position: "center",
            avatar: "saludando.png"
        }
    ];

    let current = 0;
    let box, avatar, nextBtn;

    window.startIntegrationCaseTutorial = () => {
        current = 0;
        buildUI();
        setTimeout(showStep, 200);
    };

    function buildUI() {
        box = document.createElement("div");
        box.style.cssText = `
            position: absolute;
            background: #1e293b; color: white;
            padding: 12px; border-radius: 10px;
            max-width: 340px; z-index: 9999;
            box-shadow: 0 4px 14px rgba(0,0,0,.5);
            display: flex; align-items: flex-start; gap: 10px;
        `;

        avatar = document.createElement("img");
        avatar.style.cssText = `width: 55px; height: 55px; flex-shrink: 0;`;

        const content = document.createElement("div");
        const text = document.createElement("div");
        text.className = "tutorial-text";
        text.style = "font-size:15px; line-height:1.45";

        const controls = document.createElement("div");
        controls.style = "text-align:right;margin-top:10px;";

        nextBtn = document.createElement("button");
        nextBtn.textContent = "Siguiente";
        nextBtn.style.cssText = `
            padding:6px 14px; border:none; border-radius:6px;
            background:#2563eb; color:white; cursor:pointer; font-weight:600;
        `;
        nextBtn.onclick = () => {
            current++;
            current < steps.length ? showStep() : closeTutorial();
        };

        controls.append(nextBtn);
        content.append(text, controls);
        box.append(avatar, content);
        document.body.append(box);
    }

    function showStep() {
        const step = steps[current];
        const el = step.element ? document.querySelector(step.element) : null;
        const text = box.querySelector(".tutorial-text");
        text.innerHTML = step.text;
        avatar.src = step.avatar;
        nextBtn.textContent = (current === steps.length - 1) ? "Finalizar" : "Siguiente";

        document.querySelectorAll(".integration-tutorial-highlight").forEach(e => {
            e.style.outline = ""; 
            e.style.borderRadius = "";
            e.classList.remove("integration-tutorial-highlight");
        });

        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            let tries = 0;
            function wait() {
                tries++;
                if (tries > 20) return position(el);
                requestAnimationFrame(() => {
                    const r = el.getBoundingClientRect();
                    if (r.top >= 0 && r.bottom <= window.innerHeight) {
                        highlight(el); 
                        position(el);
                    } else wait();
                });
            }
            wait();
        } else centerUI();
    }

    function highlight(el) {
        el.classList.add("integration-tutorial-highlight");
        el.style.outline = "3px solid #facc15";
        el.style.borderRadius = "6px";
    }

    function position(el) {
        const r = el.getBoundingClientRect();
        const bw = box.offsetWidth, bh = box.offsetHeight;
        let top = r.top + r.height/2 - bh/2 + window.scrollY;
        let left = r.right + 12 + window.scrollX;
        if (left + bw > window.innerWidth - 10) left = r.left - bw - 12 + window.scrollX;
        box.style.top = `${top}px`;
        box.style.left = `${left}px`;
    }

    function centerUI() {
        box.style.top = `${window.innerHeight/2 - box.offsetHeight/2 + window.scrollY}px`;
        box.style.left = `${window.innerWidth/2 - box.offsetWidth/2 + window.scrollX}px`;
    }

    function closeTutorial() {
        box.remove();
        document.querySelectorAll(".integration-tutorial-highlight").forEach(e => {
            e.style.outline = ""; e.style.borderRadius = "";
            e.classList.remove("integration-tutorial-highlight");
        });
    }
});
