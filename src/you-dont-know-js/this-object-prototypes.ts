/* eslint-disable no-var */
function whyThis() {
  function identify(this: any) {
    return this.name.toUpperCase();
  }
  function speak(this: any) {
    var greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
  }
  var me = {
    name: 'Kyle'
  };
  var you = {
    name: 'Reader'
  };
  identify.call(me);
  identify.call(you);
  speak.call(me);
  speak.call(you);

  console.log('----if without `this`----');
  var me = {
    name: 'Kyle'
  };
  var you = {
    name: 'Reader'
  };
  function identifyNoThis(context: { name: string }) {
    return context.name.toUpperCase();
  }
  function speakNoThis(context: { name: string }) {
    var greeting = "Hello, I'm " + identifyNoThis(context);
    console.log(greeting);
  }
  identifyNoThis(you);
  speakNoThis(me);
}

function whatThisRefer() {
  console.log('---- itself ? ----');
  function foo(this: any, num: number) {
    console.log('foo: ' + num);
    // this.count++;  // cannot read 'count' of undefind
  }
  foo.count = 0;
  var i;
  for (i = 0; i < 10; i++) {
    if (i > 5) {
      foo(i);
    }
  }
  console.log(foo.count);

  console.log('This is a closure approach');
  function foo2(num: number) {
    console.log('foo: ' + num);
    data.count++;
  }
  var data = { count: 0 };
  var i;
  for (i = 0; i < 10; i++) {
    if (i > 5) foo2(i);
  }
  console.log(data.count);

  console.log('This is an approach to force this refers foo funciton object');
  function foo3(this: any, num: number) {
    console.log('foo: ' + num);
    this.count++;
  }
  foo3.count = 0;
  for (let i = 1; i < 10; i++) {
    if (i > 5) foo3.call(foo3, i);
  }
  console.log(foo3.count);

  console.log('---- its scope ? ----');
  function bar() {
    var a = 2;
    // this.bar();  // undefined
  }
  function baz() {
    // console.log(this.a);  // undefined
  }
}

function callSiteOfFunc() {
  console.log('--- call stack ---');

  function baz() {
    console.log('baz');
    bar();
  }
  function bar() {
    console.log('bar');
    foo();
  }
  function foo() {
    console.log('foo');
  }
  baz();
}

function thisReferRules() {
  console.log('--- default binding ---');
  function foo0(this: any) {
    // console.log(this.a); // only works in not 'use strict' mode
  }
  var a = 2;
  foo0();

  console.log('--- implicit bindung ---');
  function foo(this: any) {
    console.log(this.a);
  }
  var obj = { a: 2, foo: foo };
  obj.foo();

  console.log('--- implicitly lost... ---');
  function foo2(this: { b: number; foo2: () => void }) {
    console.log(this.b);
  }
  const obj2 = { a: 2, foo2: foo2 };
  var bar = obj.foo;
  var b = 'oops, global';
  // bar();  // this.b is undefined
}

console.log(`
code run start
===============`);
thisReferRules();
console.log(`===============
code run end`);
