# Weaving JS
Algorithm based on work by Petros Vrellis, but in Javascript!

<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/cmd.gif?raw=true" width="600" alt="Example">

**Result And Generated HTML File**
<p>
<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/spider.png?raw=true" width="196" alt="Result">
<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/result.gif?raw=true" width="304" alt="Html">
</p>

## Motivation
I first saw this algorithm in this [video](https://www.youtube.com/watch?v=YZtx4jNNbx8), then decide to make my version as a javascript lover!

## How to Run?
You can download a [release](https://github.com/Aldrie/WeavingJS/releases) or clone this repository and run it in the [development environment](#Development-Environment-Instructions)

## Instructions
Extract the zip folder and place your images inside the **images** folder, then double-click in executable and enter the values!

**Note**: Only fully black pixels (#000) will be considered in the algorithm to trace the lines!

### Nails Orientation
The orientation of the nails is clockwise, and the number **1** is the right center nail:

<p>
  <img alt="Nails" src="https://github.com/Aldrie/WeavingJS/blob/master/assets/dots.png?raw=true" width="200"/>
</p>

## Technologies
<p>
  <img alt="Typescript" src="https://github.com/Aldrie/WeavingJS/blob/master/assets/ts.png?raw=true" width="80"/>
  <img alt="NodeJS" src="https://github.com/Aldrie/WeavingJS/blob/master/assets/node.png?raw=true" width="80"/>
</p>

## Development Environment Instructions
Clone this repository and run

<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/npm.png?raw=true" width="25" />

```console
hello@world:~$ npm install
```
or

<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/yarn.png?raw=true" width="20" />

```console
hello@world:~$ yarn
```
And then you can run the [development commands](#Development-Commands).

## Development Commands
To execute a command, use the following template:

<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/npm.png?raw=true" width="25" />

```console
hello@world:~$ npm run <command>
```
or

<img src="https://github.com/Aldrie/WeavingJS/blob/master/assets/yarn.png?raw=true" width="20" />

```console
hello@world:~$ yarn <command>
```
**Commands List**
* **start:** Starts transpiled Javascript inside build folder;
* **dev:** Transpiles Typescript in real time and observes the changed files;
* **build:** Transpiles Typescript and Builds the Package;
* **build:ts:** Transpiles Typescript;
* **build:<zero-width space>package:** Builds the Package;
* **lint:** Checks for lint errors (eslint);

# Roadmap
- [x] Windows Release
- [ ] Linux Release
- [ ] Mac Release

# Credits
https://github.com/JVictorDias/AlgoritmoTecelao<br>
https://github.com/alyyousuf7/Weaver