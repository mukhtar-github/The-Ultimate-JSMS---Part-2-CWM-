
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