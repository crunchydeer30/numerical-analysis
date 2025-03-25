function determinant(matrix) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let j = 0; j < n; j++) {
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, col) => col !== j));
    det += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * determinant(subMatrix);
  }
  return det;
}

function cofactorMatrix(matrix) {
  const n = matrix.length;
  let cofactors = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const subMatrix = matrix
        .filter((_, row) => row !== i)
        .map((row) => row.filter((_, col) => col !== j));

      const minorDet = determinant(subMatrix);
      // Вычисляем кофактор по формуле: (-1)^(i+j) * det(минор)
      cofactors[i][j] = (i + j) % 2 === 0 ? minorDet : -minorDet;
    }
  }
  return cofactors;
}

function transpose(matrix) {
  const n = matrix.length;
  let transposed = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      transposed[j][i] = matrix[i][j];
    }
  }
  return transposed;
}

function adjugateMatrix(matrix) {
  // Сначала вычисляем матрицу кофакторов
  const cofactors = cofactorMatrix(matrix);
  // Затем транспонируем её, чтобы получить присоединённую матрицу
  return transpose(cofactors);
}

function inverseMatrix(matrix) {
  const det = determinant(matrix);
  if (det === 0) {
    console.log("Определитель = 0. Матрица вырождена, обратной не существует.");
    return null;
  }

  console.log(`Определитель: ${det}\n`);

  console.log("Вычисляем матрицу алгебраических дополнений...");
  const cofactors = cofactorMatrix(matrix);
  printMatrix(cofactors, "Матрица кофакторов");

  console.log("Транспонируем матрицу кофакторов...");
  const adj = transpose(cofactors);
  printMatrix(adj, "Присоединённая матрица");

  console.log("Находим обратную матрицу...");
  const inverse = adj.map((row) => row.map((value) => value / det));
  printMatrix(inverse, "Обратная матрица");

  return inverse;
}

function printMatrix(matrix, title) {
  console.log(`\n${title}:`);
  matrix.forEach((row) =>
    console.log(row.map((value) => value.toFixed(5)).join("\t"))
  );
}

// 🔹 Исходная матрица
const matrix = [
  [1, 2, 3],
  [0, 1, 4],
  [5, 6, 0],
];

console.log("Исходная матрица:");
printMatrix(matrix, "Matrix");

// 🔹 Запуск алгоритма
const inverse = inverseMatrix(matrix);
