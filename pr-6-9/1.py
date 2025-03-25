import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import lagrange, CubicSpline

# Определяем функцию f(x) = sin(x)
def f(x):
    return np.sin(x)

# Узловые точки
x_nodes = np.array([0, np.pi/4, np.pi/2, 3*np.pi/4, np.pi])
y_nodes = f(x_nodes)  # значения функции в узловых точках

# Создаем интерполяционные функции
lagrange_poly = lagrange(x_nodes, y_nodes)  # Полином Лагранжа
cubic_spline = CubicSpline(x_nodes, y_nodes)  # Кубический сплайн

# Создаем значения для графика
x_values = np.linspace(0, np.pi, 500)  # точки для построения графиков
y_exact = f(x_values)  # истинные значения функции

# Интерполированные значения
y_lagrange = lagrange_poly(x_values)
y_spline = cubic_spline(x_values)

# Построение графиков
plt.figure(figsize=(8, 6))

# График истинной функции
plt.plot(x_values, y_exact, label=r'$f(x) = \sin(x)$', color='black', linestyle='-', linewidth=1)

# График полинома Лагранжа
plt.plot(x_values, y_lagrange, label='Полином Лагранжа', color='blue', linestyle='--')

# График кубического сплайна
plt.plot(x_values, y_spline, label='Кубический сплайн', color='red', linestyle=':')

# Узловые точки
plt.scatter(x_nodes, y_nodes, color='green', zorder=5, label='Узловые точки')

# Настройка приближения
plt.xlim(np.pi/4, 3*np.pi/4)  # Приближаем центральную часть интервала
plt.ylim(0.5, 1.1)  # Увеличиваем масштаб по оси Y

# Настройка графика
plt.title("Приближение интерполяции около π/2")
plt.xlabel("x")
plt.ylabel("y")
plt.legend()
plt.grid(True)
plt.show()
