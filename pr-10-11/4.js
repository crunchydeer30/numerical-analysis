const plot = require("nodeplotlib");

// Метод трапеций
function trapezoid(f, a, b, n) {
  const h = (b - a) / n;
  let sum = 0.5 * (f(a) + f(b));

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += f(x);
  }

  return sum * h;
}

// Автоматический подбор n для заданной точности
function integrateWithPrecision(f, a, b, eps) {
  let n = 2;
  let prevResult = 0;
  let result = trapezoid(f, a, b, n);
  const data = [{ n, error: Math.abs(2 - result) }]; // Точное значение интеграла = 2

  while (Math.abs(result - prevResult) > eps) {
    n *= 2;
    prevResult = result;
    result = trapezoid(f, a, b, n);
    data.push({ n, error: Math.abs(2 - result) });
  }

  return { result, n, data };
}

const { result, n, data } = integrateWithPrecision(
  (x) => Math.sin(x),
  0,
  Math.PI,
  1e-6
);
console.log(`Результат: ${result.toFixed(8)}`);
console.log(`Достигнутая точность: ${Math.abs(2 - result).toExponential()}`);
console.log(`Число разбиений: ${n}`);
