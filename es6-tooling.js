
// 1- Modules

//In all our examples so far, we've written all the codes inside of one file, index.js. But,
//that's not how we build real world applications. Because we don't want to have one gigantic
//file with hundreds or thousands of lines of code,that's really hard to maintain. So, we
//should split our code into multiple files, and we call each of these files a module. This
//gives us a number of benefits. First is that, we can maintain increase the maintainability
//of our application, because our code is better organized. Second is that, we get the chance
//to re-use one or more of these modules in different parts of an application or in different
//applications. And third is that, we can abstract code, so we can apply abstraction principle,
//which means we can hide some of the complexity in a module, and only expose the essentials.
//Here is a real example, so earlier, we wrote this code to impliment a private property in
//our Circle class.

// const _radius = new WeakMap();

// class Circle {
//     constructor(radius) {
//         _radius.set(this, radius);
//     }

//     draw() {
//         console.log(' Circle with radius ' + _radius.get(this));
//     }
// }

// const c = new Circle(10);
// console.log(_radius.get(c));
// c.draw();

//So, we have the radius which is a weakmap and we are using that inside our circle class to
//impliment a private property. So, when we create a circle object, we don't have access to
//the radius property inside the Circle class. However, we have access to the radius weakmap,
//we can read the radius private property of the circle object. So, we can call _radius.get()
// and pass the circle object as the key, and what is returned will be value of the radius 
//property. So, if we log it on the console, we get 10. Now, what we should do is to take
//the Circle class and the radius weakmap out of the file and put it in a separate file which
//is called a Module, and then only expose the Circle class to the outside. So, we can import
//the Circle class and create a circle object with it, but we will not have access to the
//underlined radius object, which is our weakmap. So this is abstraction in practice. So, now
//we know what modules are, and what are their benefits. you might be asking, how can I use
//modules in JavaScript? Well, before I tell you the answer, I want to quickly give you a
//brief history of modules in Javascript. In ES5, we didn't have the concept of modules. So
//different solutions emerged to solve this problem. Smart developers in the community introduced
//new syntaxes to define modules. We refer to these syntax's as module formats. So, the popular
//module formats we have are AMD which stands for Asynchronous Module Definition, and this
//is primarily used in Browser applications. We also have CommonJS which is used in Node. We
//have UMD which stands for Universal Module Definition, and this can be used in both Browser
//and Node. So we used this module formats in ES5, but as of ES6, JavaScript natively supportss
//a module format. Now, out of these list, we are going to focus only on two formats. CommonJS,
//becouse that's used in Node, and ES6 Modules, becouse that's used in browsers. So technically
//you don't need to learn about AMD or UMD, unless you're maintaining a lagacy application
//That's built around these module formats.


// 2- CommonJS Modules

//In this lecture, I'm going to talk about CommonJS Module Format that is used in Node. So,
//as part of this, I'm assuming you have some basic farmiliarity with Node, atleast you installed
//it in your machine and built a simple Hello World example. If you haven't, that basically
//means you're a Frontend developer, so you have only used JavaScript inside of browsers.
//So, this code I'm using, in the terminal, we can run this application with node es6-tooling.js,
//and we get this message: Circle with radius 10. Now, we want to modularize this simple program.
//So, here is the basic rule of thumb about modularity, things that are highly related should go
//together, this is what we call Cohesion in software engineering. The same principle applies to
//code. So in this piece of code, we going to find things that are highly related, and then move
//them outside of this es6-tooling.js. Can you pin-point what parts are highly related? Well, we have
//this weakmap radius that is used inside of the Circle class. So, these two pieces are highly related.
//So, I'm going to create a new file, cut the code in es6-tooling.js, paste in the new file and save
//it as circle.js. So here is our circle module. By default, everything that we define in a module is
//considered to be private. So,it won't be accessible to the outside, unless we explicitly export it.
//The way we export objects in Node or in CommonJS is that, we have a key word called module, which
//refers to the current module. This module has a property called exports, and it an object. We can
//add one or more properties to this object. So, when we import the circle module, we'll get the
//circle class. Now, let's go back to our es6-tooling.js or es6-tooling module, on the top we want to
//import the circle module. We use the require function for that. The require function is part of the 
//commonJS format. So, commonJS format defines the require function and the module.exports. We pass
//a relative target to this target module. When we require circle.js module from es6-tooling module, 
//we get what is returned from circle.js module into es6-tooling module. So module.exports represents
//the object that is exported from circle.js module. In this case, that object is the Circle class.
//So, in the es6-tooling module, we store the result in a const called Circle, and then we can use it 
//to create a new circle object c. The interseting part is that, in the circle.js module, we are only 
//exporting the Circle class. So, the radius weakmap is not accessible in our other modules, because
//it's part of the implimentation detail of the circle module. What we are exporting which is the Circle
//class is we call the public interface. So this is abstraction in practice, and this is how we use 
//commonJS modules in Node.


const Circle = require('./circle');

const c = new Circle(10);
c.draw();

