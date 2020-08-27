
// 1- ES6 Classes

// Constructor Function
// function Circle(radius) {
//     this.radius = radius;

//     this.draw = function() {
//         console.log('draw');
//     };
// }

// ES6 Classes
//We start with the class keyword, add the name of the class, and then curly braces.
//This is what we call the body of the class. In this body we can define properties
//and methods. One special method that we have is called Constructor, and we use that
//to initialize objects just like the construction function above. So in this method
//we pass the radius parameter, and set the radius property on the new object instance
//that is created. Now if we want to define a method, we define methods in the class.
//Now we can create circle objects just like before. so let's inspect c:
// Circle {radius: 1}
// radius: 1
// __proto__:
// constructor: class Circle
// draw: ƒ draw()
// __proto__: Object
//So we a Circle object with the radius property, in it's prototype we have the draw
//method, so all the methods that we add in the body of the class, will end up in the
//prototype of the circle object. If you don't want a method to end up on the prototype,
//then you need to define it the constructor just like before. So let's define the move
//method in the constructor, save the changes, let's inspect c:
// Circle {radius: 1, move: ƒ}
// move: ƒ ()
// radius: 1
// __proto__:
// constructor: class Circle
// draw: ƒ draw()
// __proto__: Object
//So here we have the move method on the object instance, and the draw method on the
//prototype. Now let's look at the typeOf Circle class. That's a function, so that's
//why I said these classes are essentially functions.

// class Circle {
//     constructor(radius) {
//         this.radius = radius;
//         this.move = function() {};
//     }

//     draw() {
//         console.log('draw');
//     }
// }

// const c = new Circle(1);


// 2- Hoisting

//Function Declaration
//function sayHello() {}

//Function Expression
//const sayGoodbye = function() {};

//By convention, with function expressions, we should add the semi-colon at the end,
//but with function declarations we don't add the semi-colon at the end.
//Semi-colon aside, there is a critical difference between function declaration and a
//function expression in JavaScript. Function declarations are hoisted, which means they
//raise to the top of the code. We can declare a function and then call it before it's
//declaration, and we don't get any errors in the console, because the function is
//hoisted, which means raise to the top. In contrast, function expressions are not
//hoisted.
//Unlike functions, Class declarations or Class expressions are not hoisted.


// 3- Static Methods

//In classical object-oriented languages, we have two types of methods. Instance methods
//and Static methods.
//So, let's see what's the diffrence. In the class example below, the draw method is what
//we call an Instance method, because this method is available on an instance of a class,
//which is an object. In contrast, we have the Static methods. Static methods are available
//on the class itself, not the object instance. We often use them to create utility functions
//that are not specific to a gievn object. For example, in the circle class, the draw
//method is specific to a circle object. It's a particular circle object that we want to
//draw. So that's why it's an instance method. We can define a partiular Static method
//that is not tied to a particular circle object inside the Circle class. Let's call that
//parse. So parse takes a string, which is supposed to be a json string, it will parse
//it and return a new circle object. Now to make this static, we use the static key word
//in the front of parse, and with this, the method will no longer be available on a circle
//object. So we won't have circle.parse, because it doesn't exist. But it's accessible on
//the class reference, so Circle.parse exists. So, with this method, we're not working
//with a particular circle object, we're working with a Circle class itself. So, to call
//static methods, we don't have to create an instance of a class.
//Now, with the static method, we don't have to create a circle object first, because we
//don't have a circle object to start with, but we have a json string. By calling the
//static method on the class, it returns a circle object. So, one more time, we use static
//methods to create utility functions that are not tied to a particular object.
//Another example. In JavaScript we have Math, and it gives of alot of utility methods.
//We directly access these methods on the Math object itself. So, we would define a class
//called Math2 and define a bunch of static methods like abs1 or absolute which takes a
//value. We could thereafter, access this method direcly on the Math2 class itself. Again
//in this example, we're not working with a particular object in the class. The absolute
//abs1 is a utility function that takes an input and returns something.

// class Math2 {
//     static abs1(value) {
//         //...
//     }
// }

// Math2.abs1();

// class Circle {
//     constructor(radius) {
//         this.radius = radius;
//     }

//     //Instance Method
//     draw() {
//     }

//     //Static Method
//     static parse(str) {
//         const radius = JSON.parse(str).radius;
//         return new Circle(radius);
//     }
// }

// const circle = Circle.parse('{"radius": 1}');


// 4- The THIS Keyword

//We're going to have a closer look at the THIS keyword in Javascript. When we call c.draw
//and save the changes, we are going to see a circle object, because THIS will point to
//that circle object.
// Circle {draw: ƒ}
// draw: ƒ ()
// __proto__:
// constructor: ƒ ()
// __proto__: Object
//So, let me show you something interesting. Instead of calling the draw method this way.
//Let's get a reference to the method and store it in the constant called draw. Note that
//I'm not calling the method, I'm simply getting a reference to the method. So, if we do
//console.log of draw, we're going to see the draw function.
// ƒ () {
//     console.log(this);
// }
//I'm going to call the draw function directly, instead of seeing the circle object, we're
//going to see the window object.
//Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}.
//Let me tell you why. The syntax c.draw() is called the Method Call. Because we're calling
//a method on an object. In this case, THIS in the function will point to the circle object.
//Now the syntax draw() is called the Function Call. Because, we're calling it like a stand
//alone function that is not part of an object. So, when we call the method as a function,
//THIS by default will point to the window object in browser and global in node. Earlier
//I told you that, when you use the NEW operator, the NEW operator will create a new empty
//object and set THIS in the constructor function to point to that object. And also, that
//if you forget to use the NEW operator, THIS by default will point to the window object.
//We have exactly the same principle here. When we call draw as a method on an object,
//THIS will point to that object, and if we call the method as a stand alone function,
//THIS will point to the global object. Now, Javascript you have this mode called Strict
//Mode. When we enable this mode, Javascript engine will be more sensitive, so it do more
//error checking, if there are errors that silently fail, it's going to turn them into
//exceptions, and also it will change the behavior of the THIS keyword in functions.So 
//we can enable the strict mode by adding it in a string at the top our code. When we save
//the changes, instead of getting the window object, we get undefined. So, when we enable
//strict mode and call a method as a function, by default will no longer point to the
//global object, it will set to undefine. The reason for this is to prevent a us from
//accidentally modifying the global object, because that's a bad practice.

// THIS keyword behavior in Constructor Function
// 'use strict';
// const Circle = function() {
//     this.draw = function() {
//         console.log(this);
//     };
// };

// const c = new Circle();

// // Method Call
// c.draw();

// const draw = c.draw;

// // Function Call
// draw();

//Now let's see how the THIS keyword behaves in ES6 Classes.
//Because by default, the body of our classes are executed in the strict mode. So, whether
//explicitly enable strict mode on the top of the file or not, Javascript engine will execute
//the body of the class on the strict mode, and this will prevent us from accidentally
//modifying the global object.

// class Circle {
//     draw() {
//         console.log(this);
//     }
// }

// const c = new Circle();

// const draw = c.draw;

// draw();


// 5- Private Members Using Symbols
//Earlier, we talked about abstraction as one of the core principles of object-oriented
//programming. So abstraction means hidind the details and complexity and showing only
// the essentila parts. To achieve abstraction, we use private properties and methods.
//So, we hide certain members of an object, so they won't be accessible from outside.
//Here, we have the Circle class, and set the radius property in the constructor. This
//radius property is public by default. Which means it can be accessible from the outside.
//In the case, we want the radius to be public because it's an essential attribut about
//the circle. But in this lecture, let's imagine we want this radius to be private. So,
//I'm going to show you how to implement private properties and methods when using ES6
//classes. There are basically three different approaches. The first approach is using
//an underscore as a naming convention. But this convention doesn't prevent another developer
//from writing code against this property. So, better not use it.
//So, we have the new ES6 primitive type called Symbol that we use to implement private
//properties and methods. And also, we use maps to achieve the same result as well, which
//we'll discuss later in the course. So, I'm going to call constant called _radius and
//set it to symbol. Symbol is a function we call to generate a symbol. A symbol is essentially
//a unique identifier. Every time we call the function we get a unique identifier. So,
//we use this unique value as the property name of an object. With the introduction of
//symbols, we can use a symbol as a property name in the bracket notation instead of a
//string. Save the changes and let's look at the console.
// c ==>
// Circle {Symbol(): 1}
// Symbol(): 1
// __proto__: Object
//So, look at the property it's called symbol. This is how we it internally, the name of
//the property is a unique value. So, if we set multiple properties, using symbols, the\
//property names all show up as symbols, but internally they are unique.
//So, we can use symbol as a simple way to implement kind of private properties and methods.
//Now, how do we implement a private method? Earlier, we learnt that we can add a method
//into the body of the Circle class, like draw(). To make this private, similarly we can
//define another const _draw = Symbol(). In ES6, we have this new feature called Computer
//property names. So we can add brackets, and inside the of this brackets we add an expression.
//When that expression is evaluated, the resulting value will be used as the name of a
//property or method.

// const _radius = Symbol();
// const _draw = Symbol();

// class Circle {
//     constructor(radius) {
//         this[_radius] = radius;
//     }

//     [_draw]() {
//     }
// }

// const c = new Circle(1);


// 6- Private Members Using WeakMaps

//I'm going to show you how to use WeakMaps which is a new type in ES6 to implement private
//properties and methods in an object.
//Continuing with our Circle example, we want to turn the radius property into a private
//property into a private property. We're going to define a constant and call it _radius,
//that's just for our own convetion to indicte this private property, we set this to new
//WeakMap. A WeakMap is essentially a dictionary where keys are objects and values can be
//eliminated. And the reason we call them WeakMaps is because the keys are weak. So if there
//are no references to thes keys, they will be garbage collected. We're not going to set
//the radius property anymore, instead we're going to work with the radius key map. We call
//the SET method and the first argument is the key, and you can see that the key is an object,
//it can not be a symbol: set(key: object, value: any). We pass THIS as the first argument
//which represents the instance of Circle object, that's our key. And for the value, I'm
//going to use the radius argument. Now technically, we can access this radius private property
//if we can get access to the WeakMap. But later I'm going to talk about modules, and you
//will see that we can hide this radius in a module, and only export the Circle class, so
//imagine somewhere else in the code, we get the Circle class, we won't have access to the
//WeakMap. And the circle object doesn't have a radius property. Let's inspect on the console.
// Circle {}
// __proto__:
// constructor: class Circle
// __proto__: Object
//If we want to access the radius property inside of this class, let's imagine we want to read
//it somewhere. So I'm going to add the draw method. In order to read the radius property,
//we use our WeakMap radius. Instead of calling the SET method, we call the GET method and
//we need to reference a key, in this case the key is the instace of the circle object, THIS.
//And this will return the value of the radius property. So let's log that on the console.
//c.draw() ==> 1.
//Now how about defining a private method, we'll also use another key map. I'm going to define
//another constant, let's call this MOVE and set it to a new WeakMap. Once again, we should
//initialize it in the constructor. We pass THIS as the key and a function as the value. So,
//here is our move function, which is going to be a private function. I'm going to do a
//console.log('move') inside the move method, so we know we're in the move method, and also,
//I want to add THIS, so we'll see what THIS means in this context. Now let's imagine in 
//our draw which is a public method, we want to call move method which is a private method.
//I know this is not a good example, because when drawing something we don't want to move
//it. But let's just imagine this was part of the implimentation detail. So, in order to
//access the move function i.e the second argument in the SET, we use the same technique
//we use in the draw method. So we'll delete the first technique and impliment this; 
//_move.get(this)(). We use _move key map, call the GET method and pass THIS, the expression
//returns a function so we can call that function, and then we do a console.log of draw.
//c.draw() ==>
//move undefined
//draw
//We got the message from the move method, but THIS is undefined. Because I told you that
//the body of this class is executed n strict mode, and THIS by default will be set to undefine
//as oppossed to the global object. Now, in this particular implimentation, maybe in the
//move method, we want to access the instance of the circle object. So how can we do this?
//Well instead of using a regular function, we can use an arrow function, and then the problem
//will go away. Because arrow functions use the THIS value of thier containing function.
//So, in this case, THIS is not going to rebound, it's going to be inherited from what from
//what we have in the constructor. So inside the constructor, THIS references a circle object,
//and when we use an arrow function inside the function, THIS will not be rebound, it's not
//going to be reset, it's going to be inherited from the constructor function. Save changes,
//c.draw() ==>
//move Circle {}
//draw
//Now, we have the message from the move method, and here's our circle instance. So we can
//access all the public and private properties of the circle object in the move method.
//Now, one part you might be confused with is why are we Using the separate weakmap for each
//property or method. Why  we don't create just one weakmap for all the members? I don't
//like that approach. My approach is to use separate weakmap for each private member.

// const _radius = new WeakMap();
// const _move = new WeakMap();


// class Circle {
//     constructor(radius) {
//         _radius.set(this, radius);

//         _move.set(this, () => {
//             console.log('move', this);
//        });
//     }

//     draw() {
//         //console.log(_radius.get(this));
//         _move.get(this)();

//         console.log('draw');
//     }
// }

// const c = new Circle(1);


// 7- Getters and Setters

//Earlierin this course, I talked about getters and setters.So here we have a defined
//private property, but maybe we want to read it's value from the outside. Perhaps, we
//don't want to set it, we only want to read it.
//One way is to define a method say getRadius(), and then in console, we call c.getRadius
//to read the value. But it would be nicer if we could read that as a property. In ES6 
//we can create a getter and a setter much easier. To impliment a getter, we change the
//name of the method to radius so it looks like a property, and then simply add the GET
//key word on the front. It looks a method, but you can access it like a property. We can
//as well define setter easily. So we add a setter and do some validation. In the console,
//our circle initially has the radius of 1, and we set to 10. But if we change the radius\
//to -1, we get an error

// const _radius = new WeakMap();

// class Circle {
//     constructor(radius) {
//         _radius.set(this, radius);
//     }

//     get radius() {
//         return _radius.get(this);
//     }

//     set radius(value) {
//         if (value <= 0) throw new Error('invalid radius');
//         _radius.set(this, value);
//     }
// }

// const c = new Circle(1);


// 8- Inheritance

//Now let's see how we can impliment inheritance in ES6. So I'm g to start by declaring
//a class called Shape. Also let's define a class called Circle. To have the Circle inherit
//from the class, all we have to do is to add extends Shape. So we don't have to reset the 
//prototype, we don't have to set the constructor, it's far easier and cleaner. In the
//circle you can add a draw method. So let's create a circle object and inspect it.
//c ==>
// Circle {}
// __proto__: Shape
// constructor: class Circle
// draw: ƒ draw()
// __proto__:
// constructor: class Shape
// move: ƒ move()
// __proto__: Object
//So, our circle object can be moved and drawn.
//c.draw() ==> draw
//c.move() ==> move
//Now let's take this to the next level, let's imagine all our shapes need a color. So,
//I'm going to add a constructor to the Shape class and pass color as it's argument, and
//set the color property. Save the changes and no errors. However, if we add a constructor
//in the circle class, we'll get an exception (error). IF you have a constructor in the 
//parent class and then you add a constructor in the direct class, you have to call the
//constructor of the parent class inside the constructor of the direct class to initialize
//the base object. So, in the direct constructor, we can use then SUPER keyword to reference
//the parent object. So we call SUPER like a function and pass the color argument as we
//passed it to the circle constructor. Save the changes and inspect c. 
//c ==>
// Circle {color: "red", radius: 1}
// color: "red"
// radius: 1
// __proto__: Shape
// constructor: class Circle
// draw: ƒ draw()
// __proto__:
// constructor: class Shape
// move: ƒ move()
// __proto__: Object

// class Shape {
//     constructor(color) {
//         this.color = color;
//     }

//     move() {
//         console.log('move');
//     }
// }

// class Circle extends Shape {
//     constructor(color, radius) {
//         super(color);
//         this.radius = radius;
//     }
//     draw() {
//         console.log('draw');
//     }
// }

// const c = new Circle('red', 1);


// 9- Method Overriding

//Earlier in the section about prototypical inheritance, I talked about method overridding.
//So, method ovrridding is when we have methodin a base class, or a base object, but we want
//to change it's implimentation in a direct class or a direct object. So, maybe the algorithm
//for moving a shape is common amongst most of the shape, but perharps our circles need a 
//differnt algorithm for them to be moved. So, we can override the move method in the Shape
//class by re-implimenting the move method in the Circle class. If we call c.move() ==> move circle
//we can see that the implimentation in the child object is used. And the reason for that goes
//back to our prototypical inheritance.
//c ==>
// Circle {}
// __proto__: Shape
// constructor: class Circle
// move: ƒ move()
// __proto__:
// constructor: class Shape
// move: ƒ move()
// __proto__: Object
//So, when we access c.move, JavaScript engine first looks for the method on the circle object.
//When accessing a property or a method, because JavaScript engine walks up the tree, from the
//child all the way to the parent, the move method in the circle object will be accessible first.
//Now, let's imagine we want to reuse some of the code in the parent move method. In that case
//we can call that by using the Super keyword. So When we call c.move() ==> move & move circle.
//We get two messages, move from Shape class, and circle move from Circle class. So this is all
//about method overriding.

// class Shape {

//     move() {
//         console.log('move');
//     }
// }

// class Circle extends Shape {
//     move() {
//         super.move();
//         console.log('move circle');
//     } 
// }

// const c = new Circle('red', 1);


// 11- Exercise