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

function decoratorMode() {
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
}

function decorator() {
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
}

decorator();
