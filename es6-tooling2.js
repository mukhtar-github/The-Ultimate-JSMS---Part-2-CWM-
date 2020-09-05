
// 4- ES6 Tooling

//Let's talk about ES6 tooling. These tools I'm going to introduce you to are only important if you're 
//building browser applications, but if you're using JavaScript in Node, you don't have to worry about
//these tools. When using modern JavaScript, we need two kinds of tools, a Transpiler and a Bundler.
//Transpiler is the combination of two words, Translator and Compiler. Babel is an example of a very 
//popular transpiler for modern JavaScript. A module bundler is responsible for combining all of our 
//JavaScript files into a single file, which we call a bundle. The most popular bundler is Webpack.


// 5- Babel

//**NPM is the tool that we use to install third party libraries and tools.
//To initialize a Node project, we run npm init --yes in our terminal. What this command does is
//it creates a file in this folder called package.json, which is an identification for our application.
//Now we are ready to install Babel.


// 6- Webpack

import {Circle} from './circle.js';

const c = new Circle(10);
c.draw();