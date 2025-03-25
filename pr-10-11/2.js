const plot = require("nodeplotlib");

function integrateCosTrapezoid(n) {
  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;
  let sum = (Math.cos(a) + Math.cos(b)) / 2;

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += Math.cos(x);
  }

  return sum * h;
}

const nValues = [10, 50, 100];
nValues.forEach((n) => {
  const result = integrateCosTrapezoid(n);
  console.log(
    `n=${n}: Интеграл ≈ ${result.toFixed(10)}, Ошибка = ${Math.abs(
      0 - result
    ).toFixed(10)}`
  );
});

function plotTrapezoidIntegration(n) {
  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;

  // Гладкий график cos(x)
  const xFunc = [];
  const yFunc = [];
  for (let x = a; x <= b; x += 0.01) {
    xFunc.push(x);
    yFunc.push(Math.cos(x));
  }

  const traces = [];
  traces.push({
    x: xFunc,
    y: yFunc,
    type: "scatter",
    mode: "lines",
    line: { color: "blue", width: 2 },
    name: "cos(x)",
  });

  // Трапеции
  for (let i = 0; i < n; i++) {
    const xStart = a + i * h;
    const xEnd = xStart + h;
    const yStart = Math.cos(xStart);
    const yEnd = Math.cos(xEnd);

    traces.push({
      x: [xStart, xStart, xEnd, xEnd, xStart],
      y: [0, yStart, yEnd, 0, 0],
      type: "scatter",
      mode: "lines",
      line: { color: "green", width: 1 },
      fill: "toself",
      fillcolor: "rgba(0,255,0,0.2)",
      showlegend: false,
    });
  }

  // Настройки графика
  const layout = {
    title: `Метод трапеций (n=${n}) | Интеграл ≈ ${integrateCosTrapezoid(
      n
    ).toFixed(2)}`,
    width: 1200,
    height: 700,
    xaxis: { title: "x", range: [a - 0.2, b + 0.2] },
    yaxis: { title: "f(x)", range: [-1.2, 1.2] },
    plot_bgcolor: "rgba(240,240,240,0.9)",
  };

  plot.plot(traces, layout);
}

// Запуск визуализации
plotTrapezoidIntegration(5);
