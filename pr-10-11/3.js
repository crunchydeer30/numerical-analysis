const plot = require("nodeplotlib");

// Собственная реализация linspace
function linspace(start, end, count) {
  const step = (end - start) / (count - 1);
  return Array.from({ length: count }, (_, i) => start + i * step);
}

function integrateSinSquaredSimpson(n) {
  if (n % 2 !== 0) throw new Error("n должно быть чётным");

  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;
  let sum = Math.sin(a) ** 2 + Math.sin(b) ** 2;

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += i % 2 === 0 ? 2 * Math.sin(x) ** 2 : 4 * Math.sin(x) ** 2;
  }

  return (h / 3) * sum;
}

// Вычисление результатов
const nValues = [4, 10, 20];
nValues.forEach((n) => {
  const result = integrateSinSquaredSimpson(n);
  const exact = Math.PI / 2;
  console.log(
    `n=${n}: Интеграл ≈ ${result.toFixed(6)}, Ошибка = ${Math.abs(
      exact - result
    ).toFixed(6)}`
  );
});

function plotSimpsonIntegration(n) {
  if (n % 2 !== 0) throw new Error("n должно быть чётным");

  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;

  // Генерация точек с помощью собственной linspace
  const xFunc = linspace(a, b, 100);
  const yFunc = xFunc.map((x) => Math.sin(x) ** 2);

  const traces = [
    {
      x: xFunc,
      y: yFunc,
      type: "scatter",
      mode: "lines",
      line: { color: "blue", width: 2 },
      name: "sin²(x)",
    },
  ];

  for (let i = 0; i < n; i += 2) {
    const x0 = a + i * h;
    const x1 = x0 + h;
    const x2 = x0 + 2 * h;
    const y0 = Math.sin(x0) ** 2;
    const y1 = Math.sin(x1) ** 2;
    const y2 = Math.sin(x2) ** 2;

    const A = (y0 - 2 * y1 + y2) / (2 * h ** 2);
    const B = (y2 - y0) / (2 * h);
    const C = y1 - A * x1 ** 2 - B * x1;

    const xParabola = linspace(x0, x2, 20);
    const yParabola = xParabola.map((x) => A * x ** 2 + B * x + C);

    traces.push({
      x: [...xParabola, x2, x0, xParabola[0]],
      y: [...yParabola, 0, 0, yParabola[0]],
      type: "scatter",
      mode: "lines",
      fill: "toself",
      fillcolor: `rgba(255,${Math.floor(255 * (i / n))},0,0.2)`,
      line: { color: "transparent" },
      showlegend: false,
    });
  }

  const layout = {
    title: `Метод Симпсона (n=${n}) | Интеграл ≈ ${integrateSinSquaredSimpson(
      n
    ).toFixed(4)}`,
    width: 1200,
    height: 700,
    xaxis: { title: "x", range: [a - 0.2, b + 0.2] },
    yaxis: { title: "f(x)", range: [-0.1, 1.1] },
    plot_bgcolor: "rgba(240,240,240,0.9)",
  };

  plot.plot(traces, layout);
}

plotSimpsonIntegration(4);
