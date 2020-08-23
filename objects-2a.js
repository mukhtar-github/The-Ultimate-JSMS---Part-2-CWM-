
// 2- Object Literals (JS-PRT2)

// const circle = {
//     radius: 1,
//     location: {
//         x: 1,
//         y: 1
//     },
//     draw: function() {
//         console.log('draw');
//     }
// };

// circle.draw();


// 3- Factory function

// function createCircle(radius) {
//    return {
//     radius,
//     draw: function() {
//         console.log('draw');
//     }
// };
// }

// const circle = createCircle(1);

// circle.draw();


// 4- Constructor function

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function() {
//         console.log('draw');
//     };
// }

// const another = new Circle(1);


// 5- Constructor property

// new String(); // '', "", ``
// new Boolean(); // true, false
// new Number(); // 1, 2, 3, ...

// Every object has a constructor property.


// 6- Functions are Objects

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function() {
//         console.log('draw');
//     };
// }
// Circle.call({}, 1);
// Circle.apply({}, [1, 2, 3, 4]);
//The take away is that in javascript Functions are Objects
//const another = new Circle(1);


// 7- Value vs Reference Types

// let number = 10;

// function increase(number) {
//     number++;
// }

// increase(number);
// console.log(number);// Returns 10 (value type)

// let obj = { value: 10 };

// function increase(obj) {
//     obj.value++;
// }

// increase(obj);
// console.log(obj);// Returns 11 (reference type)

// // Primitives or value types are copied by their value.
// // Objects or reference types are copied by their reference.


// 8- Adding or Removing Properties

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function() {
//         console.log('draw');
//     };
// }

// const circle = new Circle(10);

// circle.location = { x: 1};

// const propertyName = 'center location';
// circle[propertyName] = { x: 1};

// delete circle['center location'];


// 9- Enumerating Properties

// function Circle(radius) {
//     this.radius = radius;
//     this.draw = function() {
//         console.log('draw');
//     };
// }
    
// const circle = new Circle(10);

// for (let key in circle) {
//     if (typeof circle[key] !== 'function')
//     console.log(key, circle[key]);
// }

// const keys = Object.keys(circle);

// console.log(keys);

// if ('radius' in circle)
//     console.log('Circle has a radius.');

//Remember: to enumerate all the members in an object you can 
//use a for-in loop. To get all the keys in an object, use object.keys.
//And to check for the existence of a property or a method in an object,
//use the in-operator.


// 10- Abstraction
// Abstraction means, we should hide the 
//details and complexity (implimentation details) of an object,
//and show or expose only the essential properties and methods of an object.


// 11- Private Properties and Methods

// function Circle(radius) {
//     this.radius = radius;

//     let defaultLocation = { x: 0, y: 0 };

//     let computeOptimumLocation = function(factor) {
//         // ...
//     };
//     this.draw = function() {
//         computeOptimumLocation(0.1);
//         //defaultLocation
//         //to access members of the new circle we need to use 'this'
//         // e.g. this.radius
//         console.log('draw');
//     };
// }
        
// const circle = new Circle(10);
// //circle.
// circle.draw();

//When we have a function (child) inside of another function (parent),
//the variables belonging to the child function are only visible to
//the child function, that is they are withing 
//the Scope of the child function alone.
//In contrast to Scope we have Closure: A closure determines what variables
//will be accessible to an inner function (child), so the child function will
//be able to access all the local variables defines within it's scope,
//as well as the variables defined in it's parent function that is closure.
// Don't confuse closure with a scope, because, the scope is temporary
//and it dies, and will be recreated and re-initialized,
//but closure stays there.


// 12- Getters and Setters
//If we want to display the private member some where in our application
//not to modify it, only to read it.
//One solution is to define a method inside the main 
//object constructor function. And we simply return 
//the private member inside that method.
//But however, instead of calling the private member as a method,
//it could be called as a property.
//So Object has a method called defineProperty: the first argument to this
//method is the object we want to add a new property to, 
//that object is the one that is referenced by THIS,
//i.e. the new circle object. The second argument is the name of our property,
//and the third argument is an object: in this object we add a key value pairs.
//The key is GET and the value is a function.
//So when we access circle.defaultLocation the function where 
//defaultLocation is being returned will be called.
//A getter is a function that is used to read a property.
// The property 'defaultLocation' is a read only property.
//If we want to set the value of this property from the outside,
//we define a SETTER as our second key value pair in the object argument.
//So to recap, use Object.defineProperty to define getters and or setters.

// function Circle(radius) {
//     this.radius = radius;

//     let defaultLocation = { x: 0, y: 0 };
    
//     this.getDefaultLocation = function() {
//         return defaultLocation;
//     };

//     this.draw = function() {
//         console.log('draw');
//     };

//     Object.defineProperty(this, 'defaultLocation', {
//        get: function() {
//         return defaultLocation;
//        },
//        set: function(value) {
//            if (!value.x || !value.y)
//            throw new Error('Invalid location');
//         defaultLocation = value;
//        }
//     });
// }
        
// const circle = new Circle(10);
// circle.defaultLocation = 1;
// circle.draw();


// 15- Solution- Stopwatch

// function Stopwatch() {
//     let startTime, endTime, running, duration = 0;

//     this.start = function() {
//         if (running)
//         throw new Error('Stopwatch has already started.');

//         running = true;

//         startTime = new Date();
//     };

//     this.stop = function() {
//         if (!running)
//         throw new Error('Stopwatch is not started.');

//         running = false;

//         endTime = new Date();

//         const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
//         duration += seconds;
//     };

//     this.reset = function() {
//         startTime = null;
//         endTime = null;
//         running = false;
//         duration = 0;
//     };

//     Object.defineProperty(this, 'duration', {
//         get: function() {
//             return duration;
//         }
//     });
// }

// const sw = new Stopwatch();




