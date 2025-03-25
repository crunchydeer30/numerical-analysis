const { plot } = require("nodeplotlib");

function f(x) {
  return Math.pow(x, 3) - x - 2;
}

function bisectionMethod(a, b, tol = 1e-5, maxIter = 1000) {
  const iterations = [];
  let iter = 0;
  while ((b - a) / 2 > tol && iter < maxIter) {
    const c = (a + b) / 2;
    iterations.push({ a, b, c });

    if (f(c) === 0) {
      break;
    } else if (f(a) * f(c) < 0) {
      b = c;
    } else {
      a = c;
    }
    iter++;
  }
  return { root: (a + b) / 2, iterations };
}

function plotBisectionMethod(a, b, tol = 1e-5) {
  const { root, iterations } = bisectionMethod(a, b, tol);

  // Подготовка точек для графика функции
  const xValues = [];
  const yValues = [];
  const steps = 400;
  const dx = (b - a) / steps;
  for (let i = 0; i <= steps; i++) {
    const xVal = a + i * dx;
    xValues.push(xVal);
    yValues.push(f(xVal));
  }

  // Трасса функции f(x)
  const functionTrace = {
    x: xValues,
    y: yValues,
    type: "scatter",
    mode: "lines",
    name: "f(x) = x³ - x - 2",
  };

  // Линия оси x (y = 0)
  const xAxisLine = {
    x: [a, b],
    y: [0, 0],
    type: "scatter",
    mode: "lines",
    line: { color: "black", width: 1 },
    name: "y = 0",
  };

  const traces = [functionTrace, xAxisLine];

  iterations.forEach((iter, index) => {
    // Вертикальная линия в точке a
    traces.push({
      x: [iter.a, iter.a],
      y: [f(iter.a), 0],
      type: "scatter",
      mode: "lines",
      line: { dash: "dash", color: "red" },
      name: `Iter ${index}: a = ${iter.a.toFixed(3)}`,
    });

    // Вертикальная линия в точке b
    traces.push({
      x: [iter.b, iter.b],
      y: [f(iter.b), 0],
      type: "scatter",
      mode: "lines",
      line: { dash: "dash", color: "red" },
      name: `Iter ${index}: b = ${iter.b.toFixed(3)}`,
    });

    // Соединительная линия между a и b на оси абсцисс
    traces.push({
      x: [iter.a, iter.b],
      y: [0, 0],
      type: "scatter",
      mode: "lines",
      line: { dash: "dot", color: "green" },
      name: `Iter ${index}: [a, b]`,
    });

    // Отметка найденной точки c
    traces.push({
      x: [iter.c],
      y: [f(iter.c)],
      type: "scatter",
      mode: "markers+text",
      marker: { color: "blue", size: 8 },
      text: [`${iter.c.toFixed(3)}`],
      textposition: "top center",
      name: `Iter ${index}: c = ${iter.c.toFixed(3)}`,
    });

    // Вывод логов итераций в консоль
    console.log(
      `Iteration ${index}: a = ${iter.a.toFixed(5)}, b = ${iter.b.toFixed(
        5
      )}, c = ${iter.c.toFixed(5)}`
    );
  });

  const layout = {
    title: "Метод половинного деления",
    xaxis: { title: "x" },
    yaxis: { title: "f(x)" },
  };

  plot(traces, layout);
  console.log(`\nПриближённое значение корня: ${root}`);
}

plotBisectionMethod(1, 2);
