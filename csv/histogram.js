const fs = require("fs");
const csv = require("csv-parser");
const { plot } = require("nodeplotlib");
const { median, std, mean } = require("mathjs");

// 1. Загрузка данных из CSV
async function loadDataFromCSV(csvFile, columnName = "Value") {
  return new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on("data", (row) => data.push(parseFloat(row[columnName])))
      .on("end", () => resolve(data))
      .on("error", reject);
  });
}

// 2. Фильтрация выбросов
function filterOutliers(data, threshold = 2) {
  const m = median(data);
  const s = std(data);
  return data.filter((value) => Math.abs(value - m) <= threshold * s);
}

// 3. Нормализация
const normalizations = {
  z: (data) => {
    const mu = mean(data);
    const sigma = std(data);
    return data.map((x) => (x - mu) / sigma);
  },

  minmax: (data) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map((x) => (x - min) / (max - min));
  },

  median: (data) => {
    const m = median(data);
    return data.map((x) => x - m);
  },
};

// 4. Построение гистограммы
function plotHistogram(data, numBins = 100) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const binSize = (max - min) / numBins;

  // Считаем частоты
  const bins = Array(numBins).fill(0);
  data.forEach((value) => {
    const binIndex = Math.floor((value - min) / binSize);
    if (binIndex >= 0 && binIndex < numBins) bins[binIndex]++;
  });

  // Подготовка данных для графика
  const x = Array.from({ length: numBins }, (_, i) => min + i * binSize);
  const trace = {
    x,
    y: bins,
    type: "bar",
    name: "Гистограмма",
  };

  plot([trace], {
    title: "Распределение данных",
    xaxis: { title: "Значение" },
    yaxis: { title: "Частота" },
    width: 1200,
    height: 700,
  });
}

// 5. Основной скрипт
async function main() {
  const data = await loadDataFromCSV("dataset/data_for_normalization.csv");

  const filteredData = filterOutliers(data, 2);

  const zScope = normalizations.z(data); // z-score
  // const minMax = normalizations.minmax(data); // min-max
  // const median = normalizations.median(data); // медианная

  // Построение гистограммы
  plotHistogram(zScope, 100);
  plotHistogram(minMax, 100);
  plotHistogram(median, 100);
}

main().catch(console.error);
