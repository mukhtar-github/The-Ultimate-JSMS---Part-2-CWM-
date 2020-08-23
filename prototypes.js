
// 1- Inheritance (CWM PRT2)
// Inheritance is one of the core concepts of Object Oriented Programming
//that enables an object to take on the properties and methods 
//of another object. And this makes it easy to re-use code in defferent parts
//on an application.
// Essentially we have two types of Inheritance: Classical and prototypical.
//It's one of the topics for interview questions.


//2- Prototypes and Prototypical Inheritance
//In Javascript we don't have Classes, we only have Objects.
//So how can we impliment inheritance only use in objects?
//Every object that we create in javascript directly or indirectly
//inherits from Object-base. Object-base is the root
//of all objects in javascript and it doen't have a prototype or parent.
//When we create two different objects, e.g. x and y, both these objects
//referenced object-base.
//So we have a single instance of object-base in memory.
//To prove that both x and y have a single instance of object-base in memory:
//Object.getPrototypeOf(x) === Object.getPrototypeOf(y); returns true.
//This shows that both x and y have exact same prototype.
//When we access a property or a method on an object, javascript engine
//first looks for that property or method on the object it self.
//If it can find it, then it looks at the prototype for that object.
//Again, if it can find that member, it look at the prototype of that
//object all the way up to the root object which we call object-base.
//So, this is prototypical inheritance in action.
//When accessing a property or a method on an object, javascript engine
//walks up the prototype chain to find the target member.
//A prototype is just a regular object in memory! Every object has prototype
//or a parent except the root object.


// 3- Multilevel Inheritance
//The objects that we create using a custom constructors,
//from a previous example we have:

// function Circle(radius) {
//         this.radius = radius;
        
//         this.draw = function() {
//             console.log('draw');
//         };
//     }
    
//     const circle = new Circle(10);

//So, here we have this constructor Circle and we have created the circle
//object using this constructor. So all circle objects created
//by the Circle constructor will have the same prototype. And similarly all
//Arrays created by the Array constructor will have same prototype.
//So this is what we have in memory: we have the circle object that inherits
//from Circle-base, and Circle-base inherits from Object-base.


// 4- Property Descriptors

// let person = { name: 'Mukhtar'};

// console.log(person);

// for (let key in person)
//     console.log(key);// Returns name;

// console.log(Object.keys(person));// Returns ['name'];

//How can't we iterate over all the properties and methods defined
//in object-base?
//The reason is because in Javascript our properties have attributes
//attached to them. Sometimes these attributes prevent a property from being
//enumerated.
//Example: lets get a prototype of person.
//And to show the attributes attached to the toString() method

// let objectBase = Object.getPrototypeOf(person);

// console.log(objectBase);

// let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');

// console.log(descriptor);
// Returns {writeable: true, enumerable: false, configurable: true, value: toString()};
//So configurable is true, that means we can delete this member if we want to.
//Enumerable is false, and that's why when we iterated over a person object
//we couldn't see the toString method. Also writeable set to true,
//which means we can overwrite this method, we can change it's implimentation,
//we can set it's value. The value property which is set to a method, and
//this is where we have the default implimentation of the toString method.

//When you create your own objects, you can set these attributes
//for your properties.
//For example, we use Object.defineProperty() to define a getter and a setter
//for a property. As a first argument we pass person, the second argument is
//the name of the target property which is name, and the third argument is
//an object, which is our property descriptor object. This is where we add 
//the attributes to this property. In the last session we use GET & SET to 
//define a getter and a setter. Now we are going to use different set of 
//properties. We can set this to writable: false and this will become read only.
//So if we set the name to another name, the original name will not change.
//By default all these attributes are set to true.

// let person = { name: 'Mukhtar' };

// Object.defineProperty(person, 'name', {
//     writable: false,
//     enumerable: true,
//     configurable: false
// });

//For writable:
// person.name = 'john';
//console.log(person);//Returns {name: "Mukhtar"};

//For enumerable:
// console.log(Object.keys(person));//Returns [], set to false;
// console.log(Object.keys(person));//Returns ["name"], set to true;

//For configurable:
// delete person.name;
// console.log(person);//Returns {name: "Mukhtar"}, set to false;


// 5- Constructor Prototypes

//let myObj = {};
//myObj.__proto__ Returns {constructor: ƒ, __defineGetter__: ƒ,
//__defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …};
//Object.prototype Returns {constructor: ƒ, __defineGetter__: ƒ,
//__defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

//let array = [];
//array.__proto__ Returns [constructor: ƒ, concat: ƒ, copyWithin: ƒ,
//fill: ƒ, find: ƒ, …];
//Array.prototype Returns [constructor: ƒ, concat: ƒ, copyWithin: ƒ,
//fill: ƒ, find: ƒ, …];

//const circle = new Circle(10);
//circle Returns Circle {radius: 10, draw: ƒ}
// draw: ƒ ()
// radius: 10
// __proto__:
// constructor: ƒ Circle(radius)
// __proto__: Object
//Circle.prototype Returns {constructor: ƒ}
// constructor: ƒ Circle(radius)
// __proto__: Object


// 6- Prototype vs Instance Members
//Now we have a circle constructor with two members, the radius property
//and the draw method, just like before and we have two circle objects.
//Let's log theseobjects on the console.
//c1: here is our object -- Circle {radius: 1, draw: ƒ}
// draw: ƒ ()***
// radius: 1
// __proto__: Object
//we have this draw method. 
//Let's log c2: Circle {radius: 1, draw: ƒ}
// draw: ƒ ()***
// radius: 1
// __proto__: Object
//and you can see we have this draw method here as well.
//So, with the current implimentation, if we have lets say a thousand
//circle objects in the memory, we're going to have a thousand copies
//of the draw method. This is a very simplified example. In a real world 
//application, your objects might have several methods. 
//So, if you want to have a large number of these objects in the memory,
//you're going to waste alot of memories by keeping copies 
//of all these methods. So, what's the solution? 
//Well, you know how prototypical inheritance works. When we access
//a property or a method on an object, javascript engine first looks at
//the object itself, if it can't find that property or method, it will look
//at the prototype of that object. So, now we can take this draw method
//out of this circle object and put it in it's prototype. We're going to have
//a single instance of this prototype in the memory which we call circle-base.
//So, we're going to have a single instance of the draw method.
//So, how do we do that: In the last lecture we learnt that every constructor
//has a prototype property. So, Circle.prototype, and this is exactly the same
//as the prototype of the cirle object. For c1, lets say if we 
//access the proto property, essentialy, these two properties are referencing
//the same object in memory, that's the circle-base.
//So, using Circle.prototype, we can quickly and safely access this object.
//So, you know that javascript objects are dynamic, so we can always 
//add something to them later, so we can add the draw method here and simply
//move the implimentation right inside the method. And with that we no longer
//need the draw method on the object instance itself.
//Now lets log our circles one more time, c1: this object only has a 
//radius property, the draw method is on the prototype, the circle base object.
// Circle {radius: 1}
// radius: 1***
// __proto__:
// draw: ƒ ()***
// constructor: ƒ Circle(radius)
// __proto__: Object
//And the same is true for c2: again we don't have the draw method, it's on 
//the prototype. Because of the protypical inheritance, we can still access it.
//So, we can call c1.draw and every thing works. So, essentially we have two
//kinds of properties and methods in javascript: we have intance properties 
//and methods, let's call them members and prototype members.
// Circle {radius: 1}
// radius: 1
// __proto__:
// draw: ƒ ()
// constructor: ƒ Circle(radius)
// __proto__: Object
//Now let's take this to the next level. So, you know that every object
//has this toString method. So c1.toString(), by default returns 
//this string: "[object Object]". We can over write the implimentation of
//of this method in the prototype of our circle objects. So, here I'm going
//to add Circle.prototype.toString, set it to a new function, and here 
//we're going to return ('Circle with radius ' + this.radius.)
//we need to access the radius property, so, we can use this.radius and save.
//Now c1.toString, returns "Circle with radius 1". And this is the new 
//implimentation. So, back to our prototypical inheritance, when we call
//this method, JavaScript engine looks at our circle object obviously we don't
//have this method there, then it looks at it's prototype, so Circle.prototype,
//we have implimented this method here, so this implimentation will be used. So
//here's the interesting part. Even though we have another implimentation of the
//toString method on objectBase, but this implimentation will be used because this
//is more accessible. So this is all about instance vs prototype members. And by
//the way remember that in both these kind of members, you can reference other 
//members.
//For example, in the draw method, which is a prototype method, we can easily call
//an instance method on Circle class. So let's add a method here and call it 
//this.move, we set it to a function, console.log of move.
//Now we can reference this function or this method more accurately, in our 
//prototype method. So this.move and then console.log of draw. So let's test 
//this.c1 plus draw and here are our two messages, move and draw. By the same token,
//in an instance method we can reference a prototype member. So, let's reverse this.
//Here before moving the circle, we want to draw it. So, we call this.draw, now
//essentially what is happening here is we're calling the draw method, obviously it's
//not an intance method. So the JavaScript engine will find this method on the 
//prototype, so everything will continue to work. To demonstrate this let's go back
//to the draw method, we shouldn't call move, because otherwise we'll have the
//circle dependency. So, delete it, save the changes, now c1.move, so we have 
//draw and move.


// function Circle(radius) {
//     //Instance members
//     this.radius = radius;

//     this.move = function() {
//         this.draw();
//         console.log('move');
//     };
// }

// //Prototype members
// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// const c1 = new Circle(1);
// const c2 = new Circle(1);

// Circle.prototype.toString = function() {
//     return 'Circle with radius ' + this.radius;
// };


// 7- Iterating Instance and Prototype Members
//So, I've simplified the example from the last lecture, we have the circle object
//with two instance members, radius and move, and one prototype member, which is
//called draw. Now one thing I want to emphasize here is that it doen't matter when
//you change the prototype. So in this case we're modifying the prototype before
//creating an object. You can create an object first, and then modify the prototype.
//The draw method will still be available on the circle object, because here we are 
//dealing with object references. So you have a single objectn in 
//memory as soon as we modify that, all the changes are immediately visible.
//So save the changes, look, we've got the draw message here.
//Now in this lecture, I'm going to show you how to  iterate over instance vs 
//prototype properties. So earlier you learnt about Object.keys method. I'm going
//to pass the c1 here, let's see what we get on the console. So save, so object.keys
//only returns instance members. Radius and move. Draw is not there because draw
//is a prototype member. So that's something I want you to remember. So object.keys
//only returns instance members. What about the for in loop? Let me show you. So for
//let key in c1, let's just do a console.log of key. Alright look, here we have all
//the instance and prototype members. So we get the draw method as well. So remembe,
//the for in loop returns all members, instance and prototype. Now in JavaSript
//language we often use the word own instead of instance. So in some documents, in
//some tutorials, you may here own property vs prototype. Let me show you a useful
//method. So here, let's call c1.hasOwnProperty. We pass the name of the property
//let's say radius, this is an instance or own property so we get true, but if 
//we call hasOwnProperty and pass draw, we should get false because this is a 
//prototype member or prototype property.

// function Circle(radius) {
//     //Instance members
//     this.radius = radius;

//     this.move = function() {
//         console.log('move');
//     };
// }

// const c1 = new Circle(1);

// //Prototype members
// Circle.prototype.draw = function() {
//     console.log('draw');
// };

// //Returns Instance members
// console.log(Object.keys(c1));

// //Returns all members (Instance & Prototype)
// for (let key in c1) console.log(key);


// 8- Avoid Extending the Built-in Objects
//Don't modify objects you don't own.
//Yes JavaScript is a dynamic language, it makes it really easy to add properties
//and methods to that existing object, but that doesn't mean that you should modify
//the build in objects. So, don't overwrite methods, don't add new methods or
//properties, and don't remove existing properties and methods, because somewhere
//else in a library you might be using, there might be code that is dependent on
//those methods in the build in objects. So if you modify the build in objects, you
//will create all sort of issues.


// 11- Solution
//So, here's my solution, I'm going to select these three methods,
//start, stop, and reset, and move them outside of this function.
//Now, I'm going to replace this with stopWatch.prototype. 
//I used multi cursor editing here. The way you do this, is you
//select something, and you press control and D on windows.
//So, these methods are now on the prototype for the stopWatch.
//As you can see, running is not defined anywhere in these
//function. It's defined here, and we don't have access to that.
//That's why we need to define this as a read only property, just
//like how we exposed the duration variable as a read only 
//property here, we need to expose these other variables as read
//only properties. Now the problem with this is it's goin to 
//pollute the interface of the stopwatch. In our previous 
//implimentation, our stopwatch had only four public members,
//three methods, start, stop, and reset, and one public property,
//that's the duration. Now we're going to add three extra 
//properties and this is going to pollute the interface of 
//stopwatch. And this is against the idea of abstraction 
//in object-oriented programming. Because as I explained earlier,
//we want to keep the interface of our objects, clean and simple
//just like a DVD player, we don't want to expose all the details
//to the outside. So now, let's define 3 public properties, now we
//want to expose startTime and here we want to return startTime.
//Next we want to expose endTime. One more time, this time I'm 
//going to expose running. Now, back to our prototype methods,
//so here I'm going to replace running with this.running. And 
//startTime with this.statTime. I'm going to make the same changes
//to the other methods. So here in the stop method, there is a 
//tricky situation here, in the last line, you're adding the 
//seconds to the duration. Now duration is a public read only 
//property. So it cannot be modified from the outside. Because
//currently it doesn't have a setter. Now if we go back to our
//stopwatch constructor here, we can define a setter for this to
//solve this problem, but this is going to lead to another 
//problem, so let add this first and then we'll talk about that.
//So setter, a function that takes a value, and here we simply
//set duration to this value. Now back to the stop method, 
//so we can access the duration property, and update it's value.
//Similarly in the reset method, we can set this.duration. 
//But this was a terrible idea. Why? Because I can create 
//a stopwatch here, new stopwatch, and then simply modify this
//duration from the outside. Now this will completely mess up the 
//state of this object. Remember this principle, your objects should
//always be in a valid state. We don't want our objects to lie, we
//don't want them to be unreliable and untrustworthy. That's why
//we use abstraction, with abstrction you hide the unnecessary
//complexity, and expose very few members that would allow the 
//clients of an object to work with it without messing up this 
//state. So I designed this exercise for you so you can see 
//sometimes you make some changes for your code for optimization
//reasons, but you end up creating many other issues. 
//In this program, we didn't have any performance problems, 
//and we knew that we are not going have, let's say 1000 instances
//of the stopwatch in the memory. So putting all these methods 
//on the prototype was a very bad idea to start with. 
//It broke the abstraction principle, and now we're exposing this
//duration property so we can modify it from the outside, so
//essentially this stopwatch object is now useless.
//There is a famous saying, that says premature optimization is 
//the root of all evils. And here we have a real example of
//premature optimization.


// function Stopwatch() {
//     let startTime, endTime, running, duration = 0;
    
//     Object.defineProperty(this, 'duration', {
//         get: function() { return duration; },
//         set: function(value) { duration = value; }
//     });
//     Object.defineProperty(this, 'startTime', {
//         get: function() { return startTime; }
//     });
//     Object.defineProperty(this, 'endTime', {
//         get: function() { return endTime; }
//     });
//     Object.defineProperty(this, 'running', {
//         get: function() { return running; }
//     });
// }
  

// Stopwatch.prototype.start = function() {
//     if (this.running)
//     throw new Error('Stopwatch has already started.');

//     this.running = true;

//     this.startTime = new Date();
// };

// Stopwatch.prototype.stop = function() {
//     if (!this.running)
//     throw new Error('Stopwatch is not started.');

//     this.running = false;

//     this.endTime = new Date();
//     const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
//     duration += seconds;
// };

// Stopwatch.prototype.reset = function() {
//     this.startTime = null;
//     this.endTime = null;
//     this.running = false;
//     this.duration = 0;
// };

// const sw = new Stopwatch();
    
    