const { plot } = require("nodeplotlib");

async function iterativeMethod(A, b, tolerance = 1e-5, maxIterations = 100) {
  const n = b.length;
  let x = new Array(n).fill(0);
  let xNew = new Array(n).fill(0);
  let errors = [];
  let iteration = 0;
  let error;

  console.log("🔹 Начальное приближение x =", x);

  do {
    error = 0;
    console.log(`\n🔄 Итерация ${iteration + 1}:`);
    for (let i = 0; i < n; i++) {
      let sum = b[i];
      for (let j = 0; j < n; j++) {
        if (i !== j) sum -= A[i][j] * x[j];
      }
      xNew[i] = sum / A[i][i];
      console.log(
        `  - x[${i}] = (${b[i]} - Σ(${A[i]
          .filter((_, j) => j !== i)
          .map((v, j) => `${v} * x[${j}]`)
          .join(" + ")})) / ${A[i][i]} = ${xNew[i].toFixed(5)}`
      );
      error += Math.abs(xNew[i] - x[i]);
    }

    console.log(
      `  ➤ Новый x: [${xNew
        .map((v) => v.toFixed(5))
        .join(", ")}], Ошибка = ${error.toFixed(5)}`
    );

    x = [...xNew];
    errors.push(error);
    iteration++;
  } while (error > tolerance && iteration < maxIterations);

  console.log(
    "\n✅ Итоговое решение x =",
    x.map((v) => v.toFixed(5))
  );
  if (errors.length > 1) plotErrorGraph(errors);
  return x;
}

function plotErrorGraph(errors) {
  // График сходимости ошибки
  const data = [
    {
      x: Array.from({ length: errors.length }, (_, i) => i + 1), // номера итераций
      y: errors,
      type: "line",
      name: "Ошибка на каждой итерации",
    },
  ];

  const layout = {
    title: "Сходимость ошибки метода итераций",
    xaxis: { title: "Итерация" },
    yaxis: { title: "Ошибка" },
  };

  plot(data, layout);
}

// Пример матрицы A и вектора b
const A = [
  [4, -1, 0],
  [2, 6, 1],
  [0, 1, 5],
];

const b = [3, 9, 7];

// Вызов метода
iterativeMethod(A, b, 1e-5, 100);
