import { Image } from 'canvas';

export interface INail {
  x: number;
  y: number;
}

export const draw = (
  image: Image,
  context: CanvasRenderingContext2D,
  nailsCount: number,
  pointSize: number = 4,
): INail[] => {
  const center = {
    x: image.width / 2,
    y: image.height / 2,
  };
  const degreesDelta = 360 / nailsCount;
  const nails = new Array(nailsCount).fill(null);

  return nails.map((_, index) => {
    const angle = ((degreesDelta * index) * Math.PI) / 180;
    const x = Math.floor(center.x + center.x * Math.cos(angle));
    const y = Math.floor(center.y + center.y * Math.sin(angle));

    const pointCenter = pointSize / 2;
    context.fillRect(x - pointCenter, y - pointCenter, 4, 4);

    return { x, y };
  });
};
