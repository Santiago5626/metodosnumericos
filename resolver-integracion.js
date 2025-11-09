// Tutorial para el caso de estudio de integracion

document.addEventListener("DOMContentLoaded", () => {

    const steps = [
        { // 1
            element: "#sec-caso-int h3.text-xl.font-semibold.mb-2",
            text: "En este estudio analizamos el consumo energético de una línea de producción durante una jornada de 6 horas.",
            position: "bottom",
            avatar: "saludando.png"
        },
        {
            element: "#sec-caso-int img[alt*='Infografía del caso de estudio de Integración Numérica']", // 2
            text: "Observa la línea de producción. El consumo eléctrico cambia según la actividad de las máquinas.",
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int h4.font-semibold.mt-3",
            text: "Como el consumo varía con el tiempo, no podemos usar un valor constante: necesitamos una integral para obtener el consumo total.", // 3
            position: "bottom",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int p.math.mt-2",
            text: "Esta función representa cómo cambia el consumo en el tiempo.",
            position: "bottom",
            avatar: "arriba.png" // 4
        },
        {
            element: "#sec-caso-int ul.list-disc.ml-6",
            text: "El tiempo es la variable independiente, la potencia instantánea es la función, y la integral nos da el consumo total en kWh.",
            position: "bottom",
            avatar: "arriba.png"
        },
        { // 6
            element: "#sec-caso-int h4.font-semibold.mt-3:nth-of-type(3)",
            text: "Usaremos la regla del trapecio: divide la curva en pequeñas áreas trapezoidales y las suma.",
            position: "top",
            avatar: "arriba.png"
        },

        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type p.math.mt-2:nth-of-type(2)",
            text: "Tomamos a = 0 y b = 6 horas.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type p.math.mt-2:nth-of-type(3)",
            text: "Las mediciones son cada hora, así que h = 1.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int table.table-auto.border.w-full.text-center.mt-3",
            text: "Calculamos la función en cada valor de t: de 0 a 6 horas.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type > p.mt-3",
            text: "Para cada t, reemplazamos en la función y obtenemos el consumo instantáneo.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type p.math.mt-2:nth-of-type(5)",
            text: "Aplicamos la fórmula del trapecio agrupando términos.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type p.math.mt-2:nth-of-type(6)",
            text: "Sustituimos valores f(0), f(1), ..., f(6) en la fórmula.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type p.math.mt-2:nth-of-type(7)",
            text: "El consumo total estimado con trapecio es aproximadamente 33.08 kWh.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:first-of-type h4.font-semibold.mt-3:nth-of-type(4) + ul",
            text: "Observa cómo el consumo crece: inicia bajo y aumenta conforme avanza la jornada.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) h3", // 15
            text: "Ahora validamos la estimación con Simpson 3/8, que es más preciso.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) p.math.mt-2:nth-of-type(2)", // 16
            text: "Para n = 6, la fórmula se simplifica así.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) h4.font-semibold.mt-3",
            text: "Sumamos los valores correspondientes según los coeficientes de Simpson.", // 17
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) p.math.mt-2:nth-of-type(6)", // 18
            text: "El resultado con Simpson es 32.60 kWh — muy cercano al método del trapecio.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) h4.font-semibold.mt-3:nth-of-type(4) + ul", // 19
            text: "Ambos resultados son similares, pero Simpson es más preciso matemáticamente.",
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: "#sec-caso-int .bg-white.p-4.rounded.shadow.mb-6:nth-of-type(2) h4.font-semibold.mt-3:nth-of-type(5) + ul",
            text: "Para el sector industrial, esta precisión permite planificar mejor el consumo eléctrico.", // 20
            position: "top",
            avatar: "arriba.png"
        },
        {
            element: null,
            text: "Has completado el tutorial. ¡Excelente trabajo!",
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
            display: flex;
            align-items: flex-start;
            gap: 10px;
        `;

        avatar = document.createElement("img");
        avatar.style.cssText = `
            width: 55px; height: 55px;
            flex-shrink: 0;
        `;

        const contentContainer = document.createElement("div");

        const text = document.createElement("div");
        text.className = "tutorial-text";
        text.style.fontSize = "15px";
        text.style.lineHeight = "1.45";

        const controls = document.createElement("div");
        controls.style = "text-align:right;margin-top:10px;";

        nextBtn = document.createElement("button");
        nextBtn.textContent = "Siguiente";
        nextBtn.style.cssText = `
            padding:6px 14px; border:none; border-radius:6px;
            background:#2563eb;color:white;cursor:pointer;font-weight:600;
        `;
        nextBtn.onclick = () => {
            current++;
            current < steps.length ? showStep() : closeTutorial();
        };

        controls.append(nextBtn);
        contentContainer.append(text, controls);
        box.append(avatar, contentContainer);
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
            function waitScrollEnd() {
                tries++;
                if (tries > 20) { // Fallback after 20 attempts
                    highlight(el);
                    return placeUI(el.getBoundingClientRect(), step.position);
                }

                requestAnimationFrame(() => {
                    const rect = el.getBoundingClientRect();
                    const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

                    if (fullyVisible) {
                        highlight(el);
                        placeUI(rect, step.position);
                    } else {
                        waitScrollEnd();
                    }
                });
            }
            waitScrollEnd();
        } else {
            centerUI();
        }
    }


    function placeUI(rect, pos) {
        const bw = box.offsetWidth, bh = box.offsetHeight;

        let top, left;

        // Posicionar siempre a la derecha del elemento
        top = rect.top + rect.height / 2 - bh / 2 + window.scrollY;
        left = rect.right + 12 + window.scrollX;

        // Si se sale de la pantalla por la derecha, lo colocamos a la izquierda
        if (left + bw > window.innerWidth - 10) {
            left = rect.left - bw - 12 + window.scrollX;
        }

        box.style.top = `${top}px`;
        box.style.left = `${left}px`;

    }

    function highlight(el) {
        el.classList.add("integration-tutorial-highlight");
        el.style.outline = "3px solid #facc15";
        el.style.borderRadius = "6px";
    }

    function centerUI() {
        const top = window.innerHeight/2 - box.offsetHeight/2 + window.scrollY;
        const left = window.innerWidth/2 - box.offsetWidth/2 + window.scrollX;
        box.style.top = `${top}px`;
        box.style.left = `${left}px`;
    }

    function closeTutorial() {
        if (box && box.parentNode) {
            box.remove();
        }
        document.querySelectorAll(".integration-tutorial-highlight").forEach(e => {
            e.style.outline = "";
            e.style.borderRadius = "";
        });
    }
});
