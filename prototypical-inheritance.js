
// 1- Creating Your Own Prototypical Inheritance (CWM PRT2)

//So here we have a circle object with a radius property, and two methods that are 
//defined on it's prototype. You have the draw method, and the duplicate method. 
//Now let's imagine tomorrow we're going to add a square object here, and that 
//square object should also have a duplicate method with the exact same 
//implimentation, we don't want to repeat this implimentation.

// function Shape() {
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };

// function Circle(radius) {
//     this.radius = radius;
// }

// Circle.prototype = Object.create(Shape.prototype);

// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// const s = new Shape();

// const c = new Circle(1);

//So now with all this, the circle object has a draw method, it also has the 
//duplicate method that it inherits from the shape object.
//So this is prototypical inheritance in action.


// 2- Resetting the Constructor

//Now there is a tiny problem with this implimentation. Let me comment out this 
//line, and go back to the console. Earlier I told you that every object in 
//JavaScript has a constructor property, that returns the function that was used 
//to construct or create the object.

//When Circle.prototype is pointing at Object.prototype
// c
// Circle {radius: 1}
// radius: 1
// __proto__:
// draw: ƒ ()
// constructor: ƒ Circle(radius)
// __proto__: Object

//We can create a new circle object in this condition from the expression below
// new Circle.prototype.constructor(1) === new Circle(1)
// Circle {radius: 1}
// radius: 1
// __proto__:
// draw: ƒ ()
// constructor: ƒ Circle(radius)
// __proto__: Object

//When Circle.prototype is pointing at Shape.prototype
// c
// Circle {radius: 1}
// radius: 1
// __proto__: Shape
// draw: ƒ ()
// __proto__:
// duplicate: ƒ ()
// constructor: ƒ Shape()
// __proto__: Object

//So with what we have now, we no longer can create circle objects based on it's
//constructor in the dynamic fashion. See below, the circle constructor is missing.
// new Circle.prototype.constructor(1)
// Shape {}
// __proto__:
// duplicate: ƒ ()
// constructor: ƒ Shape()
// __proto__: Object

//So as a best practice, whenever you reset the prototype of an object, you should 
//also reset the  as well. 
//Circle.prototype.constructor = Circle;
// So, after re-setting the constructor of the circle object, we got the constructor 
//function back as seen below.
// c
// Circle {radius: 1}
// radius: 1
// __proto__: Shape
// constructor: ƒ Circle(radius)***
// draw: ƒ ()
// __proto__:
// duplicate: ƒ ()
// constructor: ƒ Shape()
// __proto__: Object

// function Shape() {
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };

// function Circle(radius) {
//     this.radius = radius;
// }

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// const s = new Shape();

// const c = new Circle(1);


// 3- Calling the Super Constructor
//Now let's take this exampl to the next level. I'm going to modify the shape 
//constructor, and introduce the color parameter. We want every shape to have a 
//color.
//From an inheritance point of view the circle object should have a color property,
//and should be initialized at the top of creating a circle.
//Earlier I told you that when you use the new operator, three things happened,
//this new operator creates a new empty object, and then set THIS of the 
//Circle constructor function to point to that object. So here we set the radius 
//property to that new object. And finally that new object would be returned from 
//the Circle constructor.
//Also if you don't use the new operator, THIS of the circle constructor function 
//by default would point to the global object which is window in the browser and 
//global in node.
//So the reason this didn't work, is because we're calling the Shape function 
//inside the Circle constructor function, and by default THIS inside the Shape 
//constructor function is pointing to the global object, so we didn't set the color
//property in the Shape constructor function to point to the new instance of the 
//circle object, we set it on the window object. Let's verify that on the console: 
//window.color => "red"
//So how do we fix this problem. We don't want to use the new operator inside the
//Circle constructor function, because that will create another new object and set
//the color property on that object. We want to use the object that is referenced by
//THIS in the Circle constructor function. To fix this problem, we need to call 
//the Shape function, and set THIS in the Shape constructor function to point to 
//the new instance of the circle object. Earlier I told you, that every function 
//in JavaScript is an object. Shape function as an object has properties and methods.
//You also learned about the CALL method. So we can call this shape function and
//look at the first argument of the CALL method: 
//call(thisArg: any, ...argArray: any[]): any 'The object to be used as the current
//object. Calls a method of an object, substituting another object for the current
//object.'
//Now we can pass THIS which is the instance of the circle object into the CALL
//method. We're going to use the same instance inside the Shape constructor function.
//So now, we pass our arguments. In this case we pass the color argument and this
//solve the problem. Save changes, back in the console:
//c, => Circle {color: "red", radius: 1}
//So this is how you call the super constructor.

// function Shape(color) {
//     this.color = color;
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };

// function Circle(radius, color) {
//     Shape.call(this, color);

//     this.radius = radius;
// }

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// const s = new Shape();

// const c = new Circle(1, 'red');


// 4- Intermediate Function Inheritance
//The extend function is what we call Intermediate Function Inheritance

// function Shape(color) {
//     this.color = color;
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };


// function extend(Child, Parent) {
//     Child.prototype = Object.create(Parent.prototype);
//     Child.prototype.constructor = Child;
// }

// function Circle(radius, color) {
//     Shape.call(this, color);
//     this.radius = radius;
// }

// extend(Circle, Shape);

// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// function Square(size) {
//     this.size = size;
// }

// extend(Square, Shape);

// const s = new Shape();

// const c = new Circle(1, 'red');


// 5- Method Overriding
//Method Overriding basically means reimplimenting a method in a child object
//Sometimes as you work with inheritance, you may face a situation where this 
//implimentation that you've defined in a parent object may not work or may not be 
//ideal in a child object. So let's imaging this parent algorithm for duplicating
//a shape, works for most of the shape object, but maybe it should behave 
//differently for circle objects. What should we do? That's when we use 
//Method Override. So we override a method that is defined in the base object. And
//it's simple, all we have to do is redefine this method in the circle object. So,
//I'm going to copy the parent algorithm for duplicating a shape, and place it after
//the Circle constructor function and the extend function, after that we redefine
//the parent algorithm for duplicating a shape to a child algorithm for duplicating
//a circle.It's very important to put the child algorithm for duplicating a circle
//after extending the circle, because we are resetting the prototype. If we define
//the child algorithm for duplicating a circle before resetting the prototype, the
//i.e. before the extend function call, then the child algorithm for duplicating a
//circle implimentation is going to disappear. So the reason this worked goes back
//to how prototypical inheritance works in JavaScript. When we access a property or
//a method on an object, JavaScript engine walks up the prototype chain and picks
//the first implimentation.
//Sometime you may want to call the implimentation on parent or the shape object.
//If you are not using the parent algorithm for duplicating a shape in this 
//implimentation, we can simply call that like a regular function. 
//So Shape.prototype.duplicate, we call it like this. Then we need to use the CALL
//method to set the context for THIS. So we call the CALL method and pass THIS as 
//the context of the current object. So in the console we have:
// c.duplicate() =>
// duplicate  index.js:257
// duplicate circle  index.js:273

// function Shape() {
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };


// function extend(Child, Parent) {
//     Child.prototype = Object.create(Parent.prototype);
//     Child.prototype.constructor = Child;
// }

// function Circle() {
// }

// extend(Circle, Shape);

// Circle.prototype.duplicate = function() {
//     Shape.prototype.duplicate.call(this);
//     console.log('duplicate circle');
// };

// const c = new Circle();


// 6- Polymorphism
//Polymorphism means many forms. It's an extremely powerful technic in object-oriented
//progamming. Let's define a constructor, square. Just like the circle, we want to have
//this square inherit from shape. So we extend square with shape, and then we are going
//to redefine the duplicate method on the Square object. So basically, what we have now
//is a simple hierarchy, on the top we have the Shape. And we have two derivatives or
//child objects Circle and Square. Each object will provide a different implimentation
//of the dupicate method. So we have many implimentations, or many forms of the
//duplicate method. That's what we call Polymorphism. So why is this so powerful? Let
//me show you. Let's imagine we have an array of shapes of objects. So let's define an
//an array. In this array I'm going to add two objects. A Circle and a Square. Now we
//can iterate over this array using a for of loop. Depending on the type of shape object,
//a different implimentation or a different form of the duplicate method will be called. 
//When we encapsulate variables and functions into objects, and use inheritance, we can
//execute many forms of a method, using a single line of code. So that's Polymorphism in
//action.

// function Shape() {
// }

// Shape.prototype.duplicate = function() {
//     console.log('duplicate');
// };

// function extend(Child, Parent) {
//     Child.prototype = Object.create(Parent.prototype);
//     Child.prototype.constructor = Child;
// }

// function Circle() {
// }

// extend(Circle, Shape);

// Circle.prototype.duplicate = function() {
//     console.log('duplicate circle');
// };

// function Square() {
// }

// extend(Square, Shape);

// Square.prototype.duplicate = function() {
//     console.log('duplicate square');
// };

// const shapes = [
//     new Circle(),
//     new Square()
// ];

// for (let shape of shapes)
//     shape.duplicate();


// 7- When to Use Inheritance

//While inheritance is a great tool for solving the problem of code reuse, you have to
//be really careful about using it, because it can make your source code complex and 
//fragile. So don't use inheritance just for the sake of using it, especially in small
//projects. Start with simple objects, and then if you see a number of these objects
//share similar features, then perhaps you can encapsulate those features inside of a
//generic object, and use inheritance. But remember, inheritance is not the only
//solution to enable code reuse. There is another technique called Composition.
//If you want to use inheritance, keep it to one level, do not go more than one level
//above inheritance. There is a famous saying that says: favor Composition over
//Inheritance. With composition, instead of having the complex hierarchy, we can compose
//a few objects together to create a new object. And this technique gives us great 
//flexibility. In JavaScript, we can use Mixing to achieve Composition.


// 8- Mixins

//We can Compose these objects together to create a person that can eat and walk. So in
//ES6 we have a method, that is object.assign. We can use this to copy the properties
//and methods from one object to another. So, we pass some arguments, first, we pass an
//empty object as the target, and then pass one or more source objects. So, if we pass
//canEat as the second argument, Object.assign will copy all the properties and methods
//that we have defined in canEat into the blank object. So, we can add canWalk as well,
//and with this, our empty object will end up being the combination of two different 
//objects. Let's store that in person variable and log it on the console:
// ==> {eat: ƒ, walk: ƒ}.
//If we're using a constructor function, we can still use this technique as well. So, 
//let's define a constructor called Person. We can add any properties and methods
//specific to person objects. Then instead of passing an empty object as the first 
//argument, we can pass Person.prototype as the target object. So, we don't need the
//return value anymore. We've basically modified the prototype of Person, and added the
//capability to eat and walk. So, next time we create a person object, that person will
//have these capabilities: 
// Person {}
// __proto__:
// eat: ƒ ()
// walk: ƒ ()
// constructor: ƒ Person()
// __proto__: Object
//So, let's say tomorrow we want to add two new objects in this application, Goldfish
//and Duck. Both goldfish and duck should have the capability to swim. So, we can define
//a new feature (object), canSwim and add the swim method to it. And then, we can define
//a new constructor, Goldfish and use Object.assign tomodify the prototype for the 
//Goldfish. So, you can see that, Composition and Mixin gives us a great flexibilty to
//modify our application. So, let's create a new goldfish object and log it on the 
//console:
// Goldfish {}
// __proto__:
// eat: ƒ ()
// swim: ƒ ()
// constructor: ƒ Goldfish()
// __proto__: Object
//Now to make the code a bit more readable, we can extract the Object.assign logic into
//a function called Mixin. So, on the top let's define the function called mixin. We 
//add the target object as our first parameter, and we want to have two or more sources.
//Now, we don't want to add multiple parameters, because we don't know, every time we
//want to use the function how many arguments we're going to pass in. So, to solve this
//problem, we can use the REST operator in ES6. So, we add only one parameter, let say,
//sources and then use the rest operator which is three dots, and this will collect all 
//the arguments and turn them into an array. Now, we add the Object.assign logic into the
//function and pass target object as the first argument. Now sources is an array, but
//Object.assign needs sources explicitly, we can not pass an array into it. So, this time
//we can use the SPREAD operator to spread an array into multiple arguments. The syntax
//is exactly the same, but this time we call this operator spread operator, because we
//are spreading an array into multiple objects. Now, with the new mixin function, we can
//simplify our code by replacing Object.assign with mixin for each constructor function.

// function mixin(target, ...sources) {
//     Object.assign(target, ...sources);
// }

// const canEat = {
//     eat: function() {
//         this.hunger--; // To reduce hunger.
//         console.log('eating');
//     }
// };

// const canWalk = {
//     walk: function() {
//         console.log('walking');
//     }
// };

// const canSwim = {
//     swim: function() {
//         console.log('swim');
//     }
// };

// function Person() {
// }

// mixin(Person.prototype, canEat, canWalk);

// const person = new Person();

// console.log(person);

// function Goldfish() {
// }

// mixin(Goldfish.prototype, canEat, canSwim);

// const goldfish = new Goldfish();

// console.log(goldfish);


// 10- Exercise- Prototypical Inheritance

// 11- Solution- Prototypical Inheritance

//We set the prototype of HtmlSelectElement to an instance of HtmlElement object. Earlier
//we use a different approach. We used object.create and pass let's say HtmlElement.prototype,
//but this will not work in the current implimentation. This is because, object.create
//will create a new object and set the prototype of that object to the prototype of
//HtmlElement. For discussion sake, let's call the prototype of HtmlElement as baseHtmlElement.
//So, this an object that has only one method. The prototype of HtmlElement, it's an
//object with only one method, focus. So, click is not there, because, when we object.create,
//we create a new object, and the prototype of that object would be baseHtmlElement
//which has the focus method.
//baseHtmlSelectElement.prototype = Object.create(baseHtmlElement.prototype).
//We can call the returned object baseHtmlSelectElement. So, when we create an instance
//of HtmlSelectElement, it's prototype will be baseHtmlSelectElement which is an empty
//object that is linked to baseHtmlElement as it's prototype. Let's look at this on the
//console.
//const s = new HtmlSelectElement(),
//s ==> 
//HtmlSelectElement {items: Array(0), addItem: ƒ, removeItem: ƒ}
// addItem: ƒ ()
// items: []
// removeItem: ƒ ()
// __proto__: HtmlElement***
// __proto__:
// focus: ƒ ()
// constructor: ƒ HtmlElement()
// __proto__: Object
//Let's inspect the new object of HtmlSelectElement. It's prototype is an empty object
//that is returned from Object.create, in this case the prototype is HtmlElement.prototype,
//which is an object with a single method, focus. So, the prototype of HtmlSelectElement
//is an empty object, but it's prototype is the prototype of HtmlElement where we have
//the focus method. So with this implimentation, we didn't inherit the click method in
//HtmlSelectElement. Now to fix this, instead of using Object.create to create an empty
//object that has HtmlElement.prototype as it's prototype, we need to new up an HtmlElement
//object, because in this object we have the click method. And this object has it's own
//prototype where we have defined the focus method. Let's go back in the console and
// create another HtmlSelectElement object and inspect it.
//const s = new HtmlSelectElement(),
//s ==>
// HtmlSelectElement {items: Array(0), addItem: ƒ, removeItem: ƒ}
// addItem: ƒ ()
// items: []
// removeItem: ƒ ()
// __proto__: HtmlElement***
// click: ƒ ()
// __proto__:
// focus: ƒ ()
// constructor: ƒ HtmlElement()
// __proto__: Object
//Now in it's prototype, which is an instance of HtmlElement object, we have the click
//method and in the prototype of HtmlElement, we have the focus method. So with this,
//can click the select element and we also focus it.
//s.click() ==> clicked
//s.focus() ==> focused
//Now technically, we should also set:
//HtmlSelectElement.prototype.constructor = HtmlSelectElement;

// function HtmlElement() {
//     this.click = function() {
//         console.log('clicked');
//     };
// }

// HtmlElement.prototype.focus = function() {
//     console.log('focused');
// };

// function HtmlSelectElement(items = []) {
//     this.items = items;

//     this.addItem = function() {
//         this.items.push(item);
//     };

//     this.removeItem = function() {
//         this.items.splice(this.items.inexOf(item), 1);
//     };
// }

// HtmlSelectElement.prototype = new HtmlElement();
// HtmlSelectElement.prototype.constructor = HtmlSelectElement;


// 12- Exercise- Polymorphism

//Continuing from the last exercise, I want you to extend HtmlSelectElement, and impliment
//a render method. So, I'm going to define an HtmlSelectElement, and initialize it with an
//array of 3 items. 
//const s = new HtmlSelectElement([1, 2, 3])
//s.render() ==>
//"<select>
// <option>1</option>
// <option>2</option>
// <option>3</option>
// </select>"
// Now s.render, this is what we get, the select element with 3 options.
//Similarly, I want you to create am HtmlImageElement that inherits from HtmlElement,
//so it can be clicked, it can be focused, and it also has it's own render method. So
//let's create an img from HtmlImageElement.
//const img = new HtmlImageElement();
//img ==>
// HtmlImageElement {src: undefined, render: ƒ}
// render: ƒ ()
// src: undefined
// __proto__: HtmlElement
// click: ƒ ()
// constructor: ƒ HtmlImageElement(src)
// __proto__:
// focus: ƒ ()
// constructor: ƒ HtmlElement()
// __proto__: Object
//We can optionally pass source or the image address in the HtmlImageElement constructor.
//So, let's inspect the img object. We have src property which is undefined, and the
//render method. You can see it's prototype. So it inherits from an instance of HtmlElement,
//it has the clicked method, as well as the focus method.
//So now, let's set img.src = 'http://', and call img.render() ==> "<img src="http://" />",
//so once you do this, I want you to create an array of elements and render them each.
//Note that the render method is returning a string, it's not doing a console.log, it's
//not the responsibility of this object. We don't want to couple this render method with
//console.log, we just want the html representation of an element, and somewhere else we
//decide what to do with that html representation. Maybe we add it to document object
//model, or maybe you want to log it on the console. That's why we shouldn't use 
//console.log inside of the render method. So this is your Polymorphism exercise. We
//have different objects that all have the same parent, they all have a render method,
//but the render method behaves differently, we have different forms or multiple forms
//of the render method. That's what we call Polymorphism.


// 13- Solution- Polymorphism

// function HtmlElement() {
//     this.click = function() {
//         console.log('clicked');
//     };
// }

// HtmlElement.prototype.focus = function() {
//     console.log('focused');
// };

// function HtmlSelectElement(items = []) {
//     this.items = items;

//     this.addItem = function() {
//         this.items.push(item);
//     };

//     this.removeItem = function() {
//         this.items.splice(this.items.inexOf(item), 1);
//     };

//     this.render = function() {
//         return `
//     <select>${this.items.map(item => `
//       <option>${item}</option>`).join('')}
//     </select>`;
//     };
// }

// HtmlSelectElement.prototype = new HtmlElement();
// HtmlSelectElement.prototype.constructor = HtmlSelectElement;

// function HtmlImageElement(src) {
//     this.src = src;

//     this.render = function() {
//         return `<img src="${this.src}" />`;
//     };
// }

// HtmlImageElement.prototype = new HtmlElement();
// HtmlImageElement.prototype.constructor = HtmlImageElement;

// const elements = [
//     new HtmlSelectElement([1, 2, 3]),
//     new HtmlImageElement('http://')
// ];

// for (let element of elements)
//     console.log(element.render());

//Returns
// <select>
//       <option>1</option>
//       <option>2</option>
//       <option>3</option>
//     </select>
// <img src="http://" />