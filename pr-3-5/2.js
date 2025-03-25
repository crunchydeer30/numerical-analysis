function determinant(matrix, depth = 0) {
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  let det = 0;
  for (let i = 0; i < n; i++) {
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, j) => j !== i));
    const minorDet = determinant(subMatrix, depth + 1);
    const cofactor = (i % 2 === 0 ? 1 : -1) * matrix[0][i] * minorDet;

    console.log(`${"  ".repeat(depth)}Минор для элемента (${0},${i}):`);
    printMatrix(subMatrix, `Минор (глубина ${depth + 1})`);
    console.log(
      `${"  ".repeat(depth)}Определитель этого минора: ${minorDet.toFixed(5)}`
    );
    console.log(
      `${"  ".repeat(depth)}Алгебраическое дополнение: ${cofactor.toFixed(5)}\n`
    );

    det += cofactor;
  }
  return det;
}

function inverseMatrix(matrix) {
  const n = matrix.length;
  const det = determinant(matrix);
  if (det === 0)
    throw new Error("Матрица вырождена, обратной матрицы не существует");

  console.log(
    "\nВычисление обратной матрицы (алгебраические дополнения и транспонирование):"
  );

  let adjugate = Array(n)
    .fill(null)
    .map(() => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const subMatrix = matrix
        .filter((_, row) => row !== i)
        .map((row) => row.filter((_, col) => col !== j));
      const minorDet = determinant(subMatrix);
      const cofactor = (i + j) % 2 === 0 ? minorDet : -minorDet;
      adjugate[j][i] = cofactor / det;

      console.log(`Минор для (${i},${j}):`);
      printMatrix(subMatrix, `Минор (${i},${j})`);
      console.log(`Определитель минора: ${minorDet.toFixed(5)}`);
      console.log(`Алгебраическое дополнение: ${cofactor.toFixed(5)}\n`);
    }
  }
  return adjugate;
}

function printMatrix(matrix, title) {
  console.log(`\n${title}:`);
  matrix.forEach((row) =>
    console.log(row.map((num) => num.toFixed(5)).join("\t"))
  );
}

function main() {
  const matrix = [
    [4, 2, 1],
    [3, 5, 2],
    [1, 1, 3],
  ];

  console.log("Исходная матрица:");
  printMatrix(matrix, "Матрица");

  try {
    console.log("\n=== ВЫЧИСЛЕНИЕ ОПРЕДЕЛИТЕЛЯ ===");
    const det = determinant(matrix);
    console.log(`\nОпределитель матрицы: ${det.toFixed(5)}`);

    if (det !== 0) {
      console.log("\n=== ВЫЧИСЛЕНИЕ ОБРАТНОЙ МАТРИЦЫ ===");
      const inverse = inverseMatrix(matrix);
      printMatrix(inverse, "Обратная матрица");
    }
  } catch (error) {
    console.error(error.message);
  }
}

main();
