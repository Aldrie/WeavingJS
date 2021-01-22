import readline from 'readline';
import path from 'path';
import fs from 'fs';
import colors from 'colors';
import { printProgress } from './utils';

import init from './processing';

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const initImageFolder = () => {
  const imagesPath = path.resolve(process.cwd(), 'images');
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
  }
};

const start = () => {
  let imagePath: string;
  let nailsCount: number;
  let iterations: number;

  initImageFolder();

  console.log(colors.cyan('_______________________\n:------ Weaving ------:\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'));

  const getImagePath = () => {
    read.question(`image name ${colors.gray('(example.png)')}: `, (answer) => {
      const testPath = path.resolve(process.cwd(), 'images', answer);
      if (fs.existsSync(testPath)) {
        imagePath = testPath;
        getNailsCount();
      } else {
        console.log(colors.red('Image not found'));
        getImagePath();
      }
    });
  };

  const getNailsCount = () => {
    read.question('nails: ', (answer) => {
      if (!Number.isNaN(Number(answer))) {
        nailsCount = Number(answer);
        getIterationsCount();
      } else {
        console.log(colors.red('Please, enter a valid number!'));
        getNailsCount();
      }
    });
  };

  const getIterationsCount = () => {
    read.question('iterations: ', (answer) => {
      if (!Number.isNaN(Number(answer))) {
        iterations = Number(answer);
        console.log(colors.gray('--- processing ---\n'));
        init(imagePath, nailsCount, iterations,
          (index) => printProgress(iterations, index + 1),
          () => {
            console.log(colors.cyan('\n_______________________\n:------ Finished ------:\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾'));
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('data', process.exit.bind(process, 0));
          });
      } else {
        console.log(colors.red('Please, enter a valid number!'));
        getIterationsCount();
      }
    });
  };

  getImagePath();
};

export default start;
