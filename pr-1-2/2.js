const { plot } = require("nodeplotlib");

const TRUE_ROOT = 2.414;

function g(x) {
  return Math.sqrt(2 * x + 1);
}

function iterationChain(x0, tol = 1e-5, max_iter = 100) {
  let chain = [];
  chain.push({ x: x0, y: x0 });
  let x = x0;
  for (let i = 0; i < max_iter; i++) {
    const y = g(x);
    chain.push({ x: x, y: y });
    chain.push({ x: y, y: y });
    console.log(`Iteration ${i}: x = ${x.toFixed(5)}, g(x) = ${y.toFixed(5)}`);
    if (Math.abs(y - x) < tol) break;
    x = y;
  }
  return chain;
}

function plotIteration(x0, tol = 1e-5, max_iter = 100) {
  const chain = iterationChain(x0, tol, max_iter);

  const xsChain = chain.map((p) => p.x);
  const minX = Math.min(...xsChain) - 1;
  const maxX = Math.max(...xsChain) + 1;

  let xValues = [];
  const steps = 400;
  const dx = (maxX - minX) / steps;
  for (let x = minX; x <= maxX; x += dx) {
    xValues.push(x);
  }
  const gValues = xValues.map(g);
  const lineValues = xValues;

  const traceFunc = {
    x: xValues,
    y: gValues,
    type: "scatter",
    mode: "lines",
    name: "y = g(x)",
  };

  const traceLine = {
    x: xValues,
    y: lineValues,
    type: "scatter",
    mode: "lines",
    name: "y = x",
  };

  const chainTrace = {
    x: chain.map((p) => p.x),
    y: chain.map((p) => p.y),
    type: "scatter",
    mode: "lines+markers",
    marker: { color: "red", size: 8 },
    line: { dash: "dashdot", width: 2 },
    name: "Путь итераций",
  };

  const data = [traceFunc, traceLine, chainTrace];

  const layout = {
    title: "Метод итераций: график функции и путь итераций",
    xaxis: { title: "x" },
    yaxis: { title: "y" },
  };

  plot(data, layout);
}

// Запуск построения графика с начальным приближением x0 = 1
plotIteration(1, 1e-5, 100);
