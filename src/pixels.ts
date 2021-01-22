import { INail } from './nails';

export const isDark = (context: CanvasRenderingContext2D, point: INail) => {
  const { data } = context.getImageData(point.x, point.y, 1, 1);
  return data[0] === data[1] && data[1] === data[2] && data[2] === 0;
};

export const countBlackPixelsBetween = (
  context: CanvasRenderingContext2D,
  from: INail, to: INail,
) => {
  let x0 = from.x;
  let y0 = from.y;
  const x1 = to.x;
  const y1 = to.y;
  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = (x0 < x1) ? 1 : -1;
  const sy = (y0 < y1) ? 1 : -1;
  let err = dx - dy;

  let count = isDark(context, { x: x0, y: y0 }) ? 1 : 0;

  while (!((x0 === x1) && (y0 === y1))) {
    // eslint-disable-next-line no-bitwise
    const e2 = err << 1;

    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }

    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }

    if (isDark(context, { x: x0, y: y0 })) {
      count++;
    }
  }

  return count;
};
