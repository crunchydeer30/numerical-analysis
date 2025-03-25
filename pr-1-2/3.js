const { plot } = require("nodeplotlib");

function f(x) {
  return Math.pow(x, 3) - x - 2;
}

function df(x) {
  return 3 * x * x - 1;
}

function newtonMethod(x0, tol = 1e-5, maxIter = 20) {
  let iterations = [];
  let x = x0;
  for (let i = 0; i < maxIter; i++) {
    let y = f(x);
    iterations.push({ x: x, y: y });
    console.log(`Iteration ${i}: x = ${x.toFixed(5)}, f(x) = ${y.toFixed(5)}`);

    let d = df(x);
    if (Math.abs(d) < 1e-10) {
      throw new Error("Производная близка к нулю, итерации остановлены.");
    }

    let x_new = x - y / d;
    if (Math.abs(x_new - x) < tol) {
      iterations.push({ x: x_new, y: f(x_new) });
      return { root: x_new, iterations };
    }
    x = x_new;
  }
  throw new Error(`Решение не найдено после ${maxIter} итераций.`);
}

function plotNewtonMethod(x0, tol = 1e-5, maxIter = 20) {
  const { root, iterations } = newtonMethod(x0, tol, maxIter);

  // Определяем диапазон для оси X по найденным точкам
  const xs = iterations.map((iter) => iter.x);
  const minX = Math.min(...xs) - 1;
  const maxX = Math.max(...xs) + 1;

  // Подготовка точек для графика функции f(x)
  let xValues = [];
  const steps = 400;
  const dx = (maxX - minX) / steps;
  for (let x = minX; x <= maxX; x += dx) {
    xValues.push(x);
  }
  const fValues = xValues.map((x) => f(x));

  const functionTrace = {
    x: xValues,
    y: fValues,
    type: "scatter",
    mode: "lines",
    name: "f(x) = x³ - x - 2",
  };

  // Построение касательных линий
  let tangentTraces = [];
  for (let i = 0; i < iterations.length; i++) {
    const x_n = iterations[i].x;
    const y_n = iterations[i].y;
    const slope = df(x_n);

    // Построим касательную в диапазоне [x_n - 0.5, x_n + 0.5]
    const tMin = x_n - 0.5;
    const tMax = x_n + 0.5;
    const tangentX = [tMin, tMax];
    const tangentY = tangentX.map((x) => y_n + slope * (x - x_n));

    tangentTraces.push({
      x: tangentX,
      y: tangentY,
      type: "scatter",
      mode: "lines",
      line: { dash: "dash", color: "orange" },
      name: `Касательная итерации ${i}`,
    });
  }

  // Отмечаем точки итераций (xₙ, f(xₙ))
  const iterationPoints = {
    x: iterations.map((p) => p.x),
    y: iterations.map((p) => p.y),
    type: "scatter",
    mode: "markers+text",
    marker: { color: "red", size: 8 },
    text: iterations.map((p) => p.x.toFixed(3)),
    textposition: "top center",
    name: "Итерационные точки",
  };

  const data = [functionTrace, iterationPoints, ...tangentTraces];
  const layout = {
    title: "Метод Ньютона",
    xaxis: { title: "x" },
    yaxis: { title: "f(x)" },
    width: 1000,
    height: 600,
  };

  plot(data, layout);
  console.log(`\nПриближённое значение корня: ${root.toFixed(5)}`);
}

plotNewtonMethod(1.5, 1e-5, 20);
