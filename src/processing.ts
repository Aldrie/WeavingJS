/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-loop-func */
import {
  createCanvas, loadImage, Image,
} from 'canvas';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import openFile from 'open-file-explorer';

import * as nails from './nails';
import * as pixels from './pixels';
import * as utils from './utils';

const fromCanvas = createCanvas(100, 100);
const toCanvas = createCanvas(100, 100);

const fromContext = fromCanvas.getContext('2d');
const toContext = toCanvas.getContext('2d');
let image: Image;

const instructions: number[] = [];

interface IDarkPixels {
  index: number;
  value: number;
}

const generateInstructionsAndResult = (src: string) => {
  const templatePath = path.resolve(__dirname, 'templates', 'instructions.ejs');

  const filenameArr = src.split(path.sep);
  const filename = filenameArr[filenameArr.length - 1];
  const resultsPath = path.resolve(process.cwd(), 'images', 'results');
  const finalResultPath = path.join(resultsPath, filename.substr(0, filename.lastIndexOf('.')));

  const save = () => {
    fs.writeFileSync(path.join(finalResultPath, filename), toCanvas.toBuffer());

    ejs.renderFile(templatePath, {
      instructions,
      filename,
    }).then((result) => {
      fs.writeFileSync(path.join(finalResultPath, `${filename.replace(/\./g, '-')}.html`), result);
      openFile(finalResultPath, (err) => err && console.log(err));
    }).catch(console.log);
  };

  if (!fs.existsSync(resultsPath)) {
    fs.mkdirSync(resultsPath);
  }

  if (!fs.existsSync(finalResultPath)) {
    fs.mkdir(finalResultPath, () => save());
  } else {
    save();
  }
};

const processImage = async (
  nailsCount: number, iterations: number,
  callback: (index: number) => any,
  onFinish: () => any,
) => {
  const anchors = nails.draw(image, toContext, nailsCount);

  let currentAnchor = 0;

  const promises = new Array(iterations).fill(null).map((_, count) => new Promise((resolve) => {
    const anchor = anchors[currentAnchor];
    const darkPixelsCount: IDarkPixels[] = anchors.map((otherAnchor, index) => {
      if (index === currentAnchor) {
        return { index, value: -1 };
      }
      const darkPixels = pixels.countBlackPixelsBetween(fromContext, otherAnchor, anchor);

      return { index, value: darkPixels };
    });

    const higher = darkPixelsCount.reduce((p, c) => (p.value > c.value ? p : c)).index;

    utils.drawLine(toContext, anchor, anchors[higher], '#000');
    utils.drawLine(fromContext, anchor, anchors[higher], '#fff');

    instructions.push(currentAnchor + 1);

    currentAnchor = higher;

    callback(count);
    return resolve(null);
  }));

  await Promise.all(promises);
  generateInstructionsAndResult(image.src.toString());
  onFinish();
};

const start = (
  src: string, nailsCount: number, iterations: number,
  callback: (index: number) => any, onFinish: () => any,
) => {
  loadImage(src).then((loadedImage) => {
    image = loadedImage;
    utils.setupCanvas(image, fromCanvas, fromContext);
    utils.setupCanvas(image, toCanvas, toContext);

    fromContext.drawImage(loadedImage, 0, 0);
    processImage(nailsCount, iterations, callback, onFinish);
  }).catch(console.log);
};

export default start;
