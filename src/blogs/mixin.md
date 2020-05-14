# Minxin and React Mixin

It's a common scene that a kind of functions are used in different React Component.
Here let's talk about the source, meaning and usage of mixin.

- [Minxin and React Mixin](#minxin-and-react-mixin)
  - [Why use mixin?](#why-use-mixin)
  - [Encapsulate a mixin](#encapsulate-a-mixin)
  - [React `createClass`](#react-createclass)
  - [Class and Decorator](#class-and-decorator)
    - [`Object.defineProperty`](#objectdefineproperty)
    - [Decorator Mode](#decorator-mode)
    - [Decorator](#decorator)
    - [Decorator Usage](#decorator-usage)
  - [React Mixins](#react-mixins)
  - [HOC: Replacement of React Mixins](#hoc-replacement-of-react-mixins)

## Why use mixin?

1.  In some old OO languages like C++, there is a powerful but dangerous feature: **multiple inherihance**.
2.  Most newer languages cancel the multiple inherihance and allow only single inherihance.
3.  For the lack of this feature, Java imports interface, and others use the mixin trick.

## Encapsulate a mixin

```ts
function encapsulateAMixin() {
  const mixin = function (obj: any, mixins: { [key: string]: any }) {
    const newObj = obj;
    newObj.prototype = Object.create(obj.prototype);
    for (let prop in mixins) {
      if (mixins.hasOwnProperty(prop)) {
        newObj.prototype[prop] = mixins[prop];
      }
    }
    return newObj;
  };

  const BixMixin = {
    fly: () => {
      console.log('I can fly');
    }
  };
  const Big = function () {
    console.log('new big');
  };
  const FlyBig = mixin(Big, BixMixin);

  const flyBig = new FlyBig(); // new big
  flyBig.fly(); // I can fly
}
```

By mounting the methods in mixins object to the original object with asignment, we implement mixin of the object.
This is similar with `Object.assign()` in ES6.

## React `createClass`

React Component can be created with `createClass`.
The mixin feature is offered officially by adding a mixins array in `createClass` object parameters，

```js
import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

React.createClass({
  mixins: [PureRenderMixin],

  render() {
    return <div>foo</div>;
  }
});
```

mixin implemented by `createClass` does two things for Component:

1. share utils in different components
2. Lifecircle inheritance, props and state combination.
   - If `componentDidMount` is defined by many mixins, React will combine them and run together.
   - Minxins can also work on `getInitialState`'s result for the combination of state and props.

## Class and Decorator

### `Object.defineProperty`

This method can precisely append and edit object's properties.

> `Object.defineProperty(obj, propName, descriptor)`

```js
Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});
```

### Decorator Mode

Decorator mode wraps a object inside anther object to become a wrap chain.

```ts
const MonkeyA = function () {};
MonkeyA.prototype.say = function () {
  console.log('I am a wild monkey.');
};
const TensionMonkeyA = function (this: any, monkey: any) {
  this.monkey = monkey;
};
TensionMonkeyA.prototype.say = function () {
  this.monkey.say();
  console.log('I can free fly.');
};
const monkeyA = new (TensionMonkeyA as any)(new (MonkeyA as any)());
monkeyA.say();
```

### Decorator

```js
class Monkey {
  say() {
    console.log('I am a wild monkey.');
  }
}
```

The code above is in the gross equal to the following:

```js
Object.defineProperty(Monkey.prototype, 'say', {
  value: function () {
    console.log('I am a wild monkey');
  },
  enumerable: false,
  configurable: true,
  writable: true
});
```

Then if it's decorated:

```ts
class Monkey {
  @readonly
  say() {
    console.log('I am a wild monkey.');
  }
}
```

The above code is equal to this code:

```js
let descriptor = {
  value: specifiedFunction,
  enumerable: false,
  configurable: true,
  writeable: true
};

descriptor = readonly(Monkey.prototype, 'say', descriptor) || descriptor;
Object.defineProperty(Monkey.prototype, 'say', descriptor);
```

### Decorator Usage

```js
@name
class Person {
  sayHello() {
    console.log(`hello ,my name is ${this.name}`);
  }
}

function name(constructor) {
  return class extends constructor {
    name = 'Tom';
  };
}

new Person().sayHello();
//hello ,my name is Tom
```

As a mixin:

```js
@name
@readonly
class Person {
  sayHello() {
    console.log(`hello ,my name is ${this.name}`);
  }
}
new Person().sayHello();

function name(constructor) {
  Object.defineProperty(constructor.prototype, 'name', {
    value: '1'
  });
}
function readonly(constructor) {
  let descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, 'sayHello');
  Object.defineProperty(constructor.prototype, 'sayHello', {
    ...descriptor,
    writable: false
  });
}

new Person().sayHello = 1; // Cannot assign to read only property 'sayHello' of object '#<Person>'
```

Typescript example...

```ts
function readOnlyFunc() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
  };
}
class Monkey {
  @readOnlyFunc()
  say() {
    console.log('I am a wild monkey.');
  }
}
const monkey = new Monkey();
monkey.say();
// monkey.say = ... // TypeError: cannot asign

// override the constructor
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = 'new property';
    hello = 'override';
  };
}

@classDecorator
class Greeter {
  property = 'property';
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter('world'));
```

## React Mixins

```js
import React, { Component } from 'React';
import { mixin } from 'core-decorators';

const PureRender = {
  shouldComponentUpdate() {}
};

const Theme = {
  setTheme() {}
};

@mixin(PureRender, Theme)
class MyComponent extends Component {
  render() {}
}
```

## HOC: Replacement of React Mixins

```js
import React, { Component } from 'React';

const PopupContainer = (Wrapper) =>
  class WrapperComponent extends Component {
    componentDidMount() {
      console.log('HOC did mount');
    }

    componentWillUnmount() {
      console.log('HOC will unmount');
    }

    render() {
      return <Wrapper {...this.props} />;
    }
  };
```

Usage:

```js
class MyComponent extends Component {
  render() {}
}

export default PopupContainer(MyStatelessComponent);
// or
@PopupContainer
class MyComponent extends Component {
  render() {}
}

export default MyComponent;
```

Or more FP ...

```js
import React, { Component } from 'React';

// From https://gist.github.com/jmurzy/f5b339d6d4b694dc36dd
let as = (T) => (...traits) => traits.reverse().reduce((T, M) => M(T), T);

class MyComponent extends as(Component)(Mixin1, Mixin2, Mixin3(param)) {}
```

Or use react hooks........
