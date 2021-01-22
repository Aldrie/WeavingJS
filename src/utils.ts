import { Canvas, Image } from 'canvas';
import colors from 'colors';
import { INail } from './nails';

export const setupCanvas = (
  image: Image,
  canvas: Canvas,
  context: CanvasRenderingContext2D,
) => {
  const imageWidth = image.width;
  const imageHeight = image.height;

  canvas.width = imageWidth;
  canvas.height = imageHeight;

  context.fillStyle = '#fff';
  context.fillRect(0, 0, imageWidth, imageHeight);
};

export const drawLine = (
  context: CanvasRenderingContext2D,
  point0: INail,
  point1: INail,
  color: string,
) => {
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(point0.x, point0.y);
  context.lineTo(point1.x, point1.y);
  context.stroke();
};

export const printProgress = (total: number, progress: number) => {
  const percentage = Math.floor((100 * progress) / total);
  const barDelta = 2;
  const barString = ' ';
  const filledBar = barString.repeat(Math.floor(percentage / barDelta));
  const emptyBar = barString.repeat(Math.floor((100 - percentage) / barDelta));

  process.stdout.moveCursor(0, -1);
  process.stdout.cursorTo(0);
  process.stdout.clearScreenDown();
  process.stdout.write(`${colors.yellow((progress + 1).toString())} of ${colors.yellow(total.toString())} done!\n`);
  process.stdout.write(`${colors.bgGreen(filledBar)}${colors.bgWhite(emptyBar)} ${percentage}%`);
};
