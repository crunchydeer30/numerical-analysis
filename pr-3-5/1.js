function gaussMethod(a, b) {
  const n = b.length;
  let steps = [];
  a = a.map((row) => row.slice());
  b = b.slice();

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let r = i + 1; r < n; r++) {
      if (Math.abs(a[r][i]) > Math.abs(a[maxRow][i])) {
        maxRow = r;
      }
    }
    if (Math.abs(a[maxRow][i]) < 1e-12) {
      throw new Error("Матрица вырождена или почти вырождена");
    }
    if (i !== maxRow) {
      [a[i], a[maxRow]] = [a[maxRow], a[i]];
      [b[i], b[maxRow]] = [b[maxRow], b[i]];
    }
    for (let j = i + 1; j < n; j++) {
      if (a[j][i] !== 0) {
        const ratio = a[j][i] / a[i][i];
        b[j] -= ratio * b[i];
        for (let k = i; k < n; k++) {
          a[j][k] -= ratio * a[i][k];
        }
      }
    }
    steps.push(a.map((row) => row.slice()));
  }

  let x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    if (Math.abs(a[i][i]) < 1e-12) {
      throw new Error("Деление на ноль при обратном ходе");
    }
    x[i] = b[i] / a[i][i];
    for (let j = 0; j < i; j++) {
      b[j] -= a[j][i] * x[i];
    }
  }
  return { solution: x, steps: steps };
}

function visualizeGaussSteps(steps) {
  console.log("Промежуточные шаги преобразования матрицы:");
  steps.forEach((step, idx) => {
    console.log(`\nШаг ${idx + 1}:`);
    step.forEach((row) => {
      console.log(row.map((num) => num.toFixed(3)).join("\t"));
    });
  });
}

function main() {
  const A = [
    [2, 3, -1],
    [4, 1, 2],
    [-2, 5, 3],
  ];
  const b = [1, 2, 3];

  console.log("Метод Гаусса:");
  try {
    const { solution, steps } = gaussMethod(A, b);
    console.log(
      "Конечное решение:",
      solution.map((val) => val.toFixed(5))
    );
    visualizeGaussSteps(steps);
  } catch (error) {
    console.error(error.message);
  }
}

main();
