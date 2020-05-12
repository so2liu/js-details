function theReusedObjectPrototypeA() {
  function AnimalA(this: any, name: string) {
    this.name = name;
    this.getName = function () {
      return this.name;
    };
  }

  function CatA(this: any, name: string, age: number) {
    AnimalA.call(this, name);
    this.age = age || 1;
    this.meow = function () {
      return `${this.getName()} eowww ~~~~~~, I'm ${this.age} year(s) old`;
    };
  }

  const catA1 = new (CatA as any)('Lily', 2);
  const catA2 = new (CatA as any)('Lily', 2);
  console.log(catA1.meow());
  console.log(catA1.meow === catA2.meow);
}

function theReusedObjectPrototypeC() {
  function AnimalC(this: any, name: string) {
    this.name = name;
  }
  AnimalC.prototype.getName = function () {
    return this.name;
  };

  function CatC(this: any, name: string, age: number) {
    AnimalC.call(this, name);
    this.age = age || 1;
  }
  CatC.prototype = Object.create(AnimalC.prototype as any, { constructor: CatC as any });
  CatC.prototype.meow = function () {
    return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`;
  };
  const catA1 = new (CatC as any)('Lily', 2);
  const catA2 = new (CatC as any)('Lisa', 3);
  console.log(catA1.meow === catA2.meow);
}

function beautifulAPI() {
  class AnimalD {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
  }

  class CatD extends AnimalD {
    age: number;
    constructor(name: string, age: number) {
      super(name);
      this.age = age;
    }
    meow() {
      return `${this.getName()}eowww~~~~~, I'm ${this.age} year(s) old`;
    }
  }
  const cat1 = new CatD('Lily', 2);
  const cat2 = new CatD('Lisa', 3);
  console.log(cat1.meow === cat2.meow);
}

function searchUpwards() {
  function AnimalA(this: any, name: string) {
    this.name = name;
  }
  AnimalA.prototype.say = function () {
    return this.name;
  };
  const cat1 = new (AnimalA as any)('Kitty');
  console.log(cat1.hasOwnProperty('say'));
  console.log(cat1.say());
}

searchUpwards();
