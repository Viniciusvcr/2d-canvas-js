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

function matrixMultiply(a, b) {
  const bCols = transpose(b);

  return a.map(aRow => bCols.map(bCol => dotProduct(aRow, bCol)));
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
