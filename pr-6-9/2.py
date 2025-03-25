import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import lagrange, CubicSpline

# Функция Рунге
def runge_function(x):
    return 1 / (1 + 25 * x**2)

# Узловые точки (чем их больше, тем сильнее осцилляции у Лагранжа)
x_nodes = np.linspace(-1, 1, 11)  # 11 узлов (увеличение числа узлов ухудшает Лагранжа)
y_nodes = runge_function(x_nodes)

# Интерполяция
lagrange_poly = lagrange(x_nodes, y_nodes)
cubic_spline = CubicSpline(x_nodes, y_nodes)

# Точки для построения графика
x_values = np.linspace(-1, 1, 500)
y_exact = runge_function(x_values)
y_lagrange = lagrange_poly(x_values)
y_spline = cubic_spline(x_values)

# Построение графиков
plt.figure(figsize=(10, 6))
plt.plot(x_values, y_exact, label="Оригинальная функция", color="black", linewidth=2)
plt.plot(x_values, y_lagrange, label="Полином Лагранжа", linestyle="--", color="blue")
plt.plot(x_values, y_spline, label="Кубический сплайн", linestyle=":", color="red")
plt.scatter(x_nodes, y_nodes, color="green", zorder=5, label="Узловые точки")

plt.xlim(-1, 1)
plt.ylim(-0.2, 1.2)

# Настройки
plt.title("Интерполяция функции Рунге")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid()
plt.show()
