const plot = require("nodeplotlib");

function integrateSinLeft(n) {
  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    sum += Math.sin(x) * h;
  }
  return sum;
}

const nValues = [10, 50, 100];
nValues.forEach((n) => {
  const result = integrateSinLeft(n);
  console.log(
    `n=${n}: Интеграл ≈ ${result.toFixed(4)}, Ошибка = ${(2 - result).toFixed(
      4
    )}`
  );
});

function plotIntegration(n) {
  const a = 0;
  const b = Math.PI;
  const h = (b - a) / n;
  const xFunc = [];
  const yFunc = [];
  for (let x = a; x <= b; x += 0.01) {
    xFunc.push(x);
    yFunc.push(Math.sin(x));
  }

  const traces = [];
  traces.push({
    x: xFunc,
    y: yFunc,
    type: "scatter",
    name: "sin(x)",
  });

  for (let i = 0; i < n; i++) {
    const xStart = a + i * h;
    const xEnd = xStart + h;
    const y = Math.sin(xStart);
    traces.push({
      x: [xStart, xStart, xEnd, xEnd, xStart],
      y: [0, y, y, 0, 0],
      type: "scatter",
      mode: "lines",
      line: { color: "red" },
      fill: "toself",
      fillcolor: "rgba(255,0,0,0.2)",
      name: `Rect ${i + 1}`,
    });
  }

  const layout = {
    title: `Метод прямоугольников (n=${n})`,
    showlegend: false,
  };
  plot.plot(traces, layout);
}

plotIntegration(10);
