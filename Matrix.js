function generateMatrix(objects) {
  const matrix = [[], [], []];

  for (const obj of objects) {
    const points = obj.shape.points;

    for (const point of points) {
      matrix[0].push(point.x);
      matrix[1].push(point.y);
      matrix[2].push(1);
    }
  }

  return matrix;
}

function getCoordinates(matrix) {
  const newCoordinates = [];

  for (const i in matrix[0]) {
    newCoordinates.push(
      new Point(Number.parseInt(matrix[0][i]), Number.parseInt(matrix[1][i]))
    );
  }

  return newCoordinates;
}

function matrixMultiply(a, b) {
  const bCols = transpose(b);

  return a.map(aRow => bCols.map(bCol => dotProduct(aRow, bCol)));
}

function getCoordinatesForObject(matrix, start, type) {
  let qntd = 0;

  if (type === "Círculo") {
    qntd = 5;
  } else if (type === "Linha") {
    qntd = 2;
  } else if (type === "Retângulo") {
    qntd = 4;
  } else if (type === "Triângulo") {
    qntd = 3;
  }

  const coordinates = [];
  for (let i = 0; i < qntd; i++) {
    coordinates.push(matrix[start + i]);
  }

  return [qntd + start, coordinates];
}

// dotProduct :: Num a => [[a]] -> [[a]] -> [[a]]
const dotProduct = (xs, ys) => sum(zipWith(product, xs, ys));

// GENERIC

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith = (f, xs, ys) =>
  xs.length === ys.length ? xs.map((x, i) => f(x, ys[i])) : undefined;

// transpose :: [[a]] -> [[a]]
const transpose = xs => xs[0].map((_, iCol) => xs.map(row => row[iCol]));

// sum :: (Num a) => [a] -> a
const sum = xs => xs.reduce((a, x) => a + x, 0);

// product :: Num a => a -> a -> a
const product = (a, b) => a * b;
