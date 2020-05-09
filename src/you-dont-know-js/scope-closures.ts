/* eslint-disable no-var */
/* eslint-disable no-lone-blocks */
function compileThenExecute(): void {
  function saySomething(): void {
    var greeting = 'Hello';
    {
      greeting = 'Howdy';
      // let greeting = "Hi";
      console.log(greeting);
    }
  }
  saySomething();
}

function shadowing(): void {
  var studentName = 'Suzy';
  function printStudent(studentName: string): void {
    // eslint-disable-next-line no-param-reassign
    studentName = studentName.toUpperCase();
    console.log(studentName);
  }
  printStudent('Frank');
  printStudent(studentName);
  console.log(studentName);
}

// var studentName = 'Suzy';
function globalUnshadowTricks(): void {
  function printStudent(studentName: string) {
    console.log(studentName);
    // console.log(window.studentName); // only work in browser
  }
  printStudent('Frank');
}

// var special = 42;
function copyIsNotAccssing(): void {
  function lookingFor(special: number): void {
    var another = {
      special: special
    };
    function keepLooking() {
      var special = 3.14;
      console.log(special);
      console.log(another.special);
      // console.log(window.special);
    }

    keepLooking();
  }
  lookingFor(112358);
}

function varAndLet(): void {
  // eslint-disable-next-line no-inner-declarations
  for (var i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 0);
  }
  console.log(i * 2);
}

function functionNameScope(): void {
  // eslint-disable-next-line func-name-matching
  var askQuestion = function ofTheTeacher() {
    console.log(ofTheTeacher);
    // ofTheTeacher = 42
  };
  askQuestion();
  // eslint-disable-next-line no-undef
  // console.log(ofTheTeacher)
}

function hoisting(): void {
  greeting();
  function greeting() {
    console.log('Hello!');
  }

  // greeting(); // TypeError
  // var greeting = function greeting() {
  //   console.log('Hello!');
  // };
}

function variableHoisting(): void {
  // eslint-disable-next-line no-use-before-define
  greeting = 'Hello';
  // eslint-disable-next-line no-use-before-define
  console.log(greeting);
  var greeting = 'Howdy';
  console.log(greeting);
}

function redeclaration(): void {
  var studentName = 'Frank';
  console.log(studentName);

  var studentName: string;
  console.log(studentName);
}

function loopsRedeclare(): void {
  var keepGoing = true;
  while (keepGoing) {
    // eslint-disable-next-line no-inner-declarations
    var value = Math.random();
    if (value > 0.5) {
      keepGoing = false;
    }
  }
  console.log('loop end');

  for (let i = 0; i < 3; i++) {
    let value = i * 10;
    console.log(`${i}: ${value}`);
  }
}

function uninitializedVariables() {
  var studentName = 'Kyle';
  {
    // eslint-disable-next-line no-use-before-define
    // console.log(studentName);
    let studentName = ' Suzy';
    console.log(studentName);
  }
}

function factorialScopeExample() {
  var factorial = (function () {
    var cache: {
      [x: string]: number;
    } = {};
    function factorial(x: number) {
      console.log(cache);
      if (x < 2) return 1;
      if (!(x in cache)) {
        cache[x] = x * factorial(x - 1);
      }
      return cache[x];
    }
    return factorial;
  })();

  function factorial2(x: number): number {
    if (x < 2) return 1;
    return x * factorial2(x - 1);
  }
  console.log(factorial(6));
  console.log(factorial(7));
  console.log(factorial2(6));
  console.log(factorial2(7));
}

function exampleWithExplicitBlockScope() {
  function getnextMonthStart(date: string) {
    var nextMonth: number;
    var year: number;

    {
      let curMonth: string;
      let yearStr: string;
      [, yearStr, curMonth] = date.match(/(\d{4})-(\d{2})-(\d{2})/) || [];
      nextMonth = (Number(curMonth) + 1) % 12;
      year = Number(yearStr);
    }

    if (nextMonth === 1) {
      year++;
    }
    return `${year}-${String(nextMonth).padStart(2, '0')}-01`;
  }
  console.log(getnextMonthStart('2019-12-25'));
}

function substantialExampleForExclosure() {
  function sortNamesByLength(names: string[]) {
    var buckets: string[][] = [];
    for (let firstName of names) {
      // eslint-disable-next-line no-eq-null,eqeqeq
      if (buckets[firstName.length] == null) {
        buckets[firstName.length] = [];
      }
      buckets[firstName.length].push(firstName);
    }
    {
      let sortedNames = [];
      for (let bucket of buckets) {
        if (bucket) {
          bucket.sort();
          sortedNames.push(...bucket);
        }
      }
      return sortedNames;
    }
  }
  console.log(sortNamesByLength(['Sally', 'Suzy', 'Frank', 'John', 'Jennifer', 'Scott']));
}

function substantialExampleForExclosure2() {
  function sortNamesByLength(names: string[]) {
    var buckets: { [x: string]: string[] } = {};
    for (let firstName of names) {
      if (!buckets[firstName.length]) {
        buckets[firstName.length] = [];
      }
      buckets[firstName.length].push(firstName);
    }
    console.log(buckets);
    {
      let sortedNames: string[] = [];
      for (let [, bucket] of Object.entries(buckets)) {
        if (bucket) {
          bucket.sort();
          sortedNames = [...sortedNames, ...bucket];
        }
      }
      return sortedNames;
    }
  }
  console.log(sortNamesByLength(['Sally', 'Suzy', 'Frank', 'John', 'Jennifer', 'Scott']));
}

function catchBlockScope() {
  try {
    // eslint-disable-next-line no-undef
    (function doesnotExist() {
      throw Error('This func does not exist');
    })();
  } catch (err) {
    console.log(err);

    let onlyHere = true;
    // eslint-disable-next-line no-inner-declarations
    var outerVariable = true;
  }
  console.log(outerVariable);
  // eslint-disable-next-line no-undef
  // console.log(err); // ReferenceError
}

function catch2019BlockScope() {
  try {
    (function doesnotExist() {
      throw Error('This func does not exist.');
    })();
  } catch {
    console.log('Do something else if no existence.');
    // eslint-disable-next-line no-inner-declarations
    var x = true;
  }
  console.log(x);
}

function functionDeclarationInBlock() {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    // eslint-disable-next-line no-inner-declarations
    function ask() {
      console.log('Does this run?');
    }
  }
  // ask();

  if (typeof Array.isArray !== 'undefined') {
    // for old browser
    // eslint-disable-next-line no-inner-declarations
    function isArray(a: any) {
      return Array.isArray(a);
    }
  } else {
    // eslint-disable-next-line no-inner-declarations
    function isArray(a: any) {
      return Object.prototype.toString.call(a) === '[object Array]';
    }
  }
  // eslint-disable-next-line no-undef
  // console.log(isArray([1, 2, 3]));
}

function overrideDefinition() {
  function isArray(a: any) {
    return Array.isArray(a);
  }
  if (typeof Array.isArray === 'undefined') {
    // eslint-disable-next-line no-inner-declarations
    function isArray(a: any) {
      // for old browser
      return Object.prototype.toString.call(a) === '[object Array]';
    }
  }
  console.log(isArray([1, 2, 3]));
}

function closureExample() {
  function lookupStudent(studentID: number) {
    var students = [
      { id: 14, name: 'Kyle' },
      { id: 73, name: 'Suzy' },
      { id: 112, name: 'Frank' },
      { id: 6, name: 'Sarah' }
    ];
    return function greetStudent(greeting: string) {
      var student = students.find((student) => student.id === studentID);
      if (student) return `${greeting}, ${student.name}`;
      throw Error('Not found');
    };
  }
  var chosenStudents = [lookupStudent(6), lookupStudent(112)];
  console.log(chosenStudents[0].name);
  console.log(chosenStudents[1]('Hello'));
}

function addingUpClosure() {
  function adder(num1: number) {
    return function (num2: number) {
      return num1 + num2;
    };
  }
  console.log(adder(5)(6));
  var addTo10 = adder(10);
  console.log(addTo10(5));
}

function liveLinkNotASnapshot() {
  function makeCounter() {
    var count = 0;
    return function getCurrent() {
      count += 1;
      return count;
    };
  }
  var hits = makeCounter();
  console.log(`hit ${hits()} time(s)`);
  console.log(`hit ${hits()} time(s)`);
  console.log(`hit ${hits()} time(s)`);

  console.log('classical mistake');
  var keeps = [];
  // eslint-disable-next-line no-inner-declarations
  for (var i = 0; i < 3; i++) {
    keeps[i] = function keepI() {
      return i;
    };
  }
  console.log(keeps[0]());
  console.log(keeps[1]());
  console.log(keeps[2]());

  console.log('mistake correction');
  var keeps = [];
  for (let i = 0; i < 3; i++) {
    keeps[i] = function keepI() {
      return i;
    };
  }
  console.log(keeps[0]());
  console.log(keeps[1]());
  console.log(keeps[2]());

  console.log('mistake correction2');
  var keeps = [];
  // eslint-disable-next-line no-inner-declarations
  for (var i = 0; i < 3; i++) {
    keeps[i] = (function keepI() {
      var newI = i;
      return () => newI;
    })();
  }
  console.log(keeps[0]());
  console.log(keeps[1]());
  console.log(keeps[2]());
}

function closureInLoops() {
  // eslint-disable-next-line no-inner-declarations
  for (var i = 0; i < 5; i++) {
    (function () {
      var j = i;
      setTimeout(function () {
        console.log(j);
      }, 1000 * j);
    })();
  }
}

function perVariableOrPerScope() {
  function storeStudentInfo(id: number, name: string, grade: number) {
    return function getInfo(whichValue: string) {
      // eslint-disable-next-line no-eval
      var val = eval(whichValue);
      return val;
    };
  }
  var info = storeStudentInfo(73, 'Suzy', 87);
  console.log(info('name'));
  console.log(info('grade'));
}

function whatIsModule() {
  // namespace (Stateless Grouping), not module
  var Utils = {
    wait(ms: number) {
      return new Promise(function c(res: () => void) {
        setTimeout(res, ms);
      });
    },
    isValidEmail(email: string) {
      return /[^@]+@[^@.]+\.[^@.]+/.test(email);
    }
  };

  // data structure (Stateful Grouping), not module
  var Student = {
    records: [
      { id: 14, name: 'Kyle', grade: 86 },
      { id: 73, name: 'Suzy', grade: 87 },
      { id: 112, name: 'Frank', grade: 75 },
      { id: 6, name: 'Sarah', grade: 91 }
    ],
    getName(studentID: number) {
      var student = this.records.find((student) => student.id === studentID);
      return student;
    }
  };
  console.log(Student.getName(73));

  // this is module (Stateful Access Control)
  var StudentM = (function defineStudent() {
    var records = [
      { id: 14, name: 'Kyle', grade: 86 },
      { id: 73, name: 'Suzy', grade: 87 },
      { id: 112, name: 'Frank', grade: 75 },
      { id: 6, name: 'Sarah', grade: 91 }
    ];
    var publicAPI = {
      getName
    };
    return publicAPI;

    function getName(studentID: number) {
      var student = records.find((student) => student.id === studentID);
      if (student) return student.name;
    }
  })();
  console.log(StudentM.getName(73));

  function defineStudent() {
    // Module Factory (Multiple Instances)
    var records = [
      { id: 14, name: 'Kyle', grade: 86 },
      { id: 73, name: 'Suzy', grade: 87 },
      { id: 112, name: 'Frank', grade: 75 },
      { id: 6, name: 'Sarah', grade: 91 }
    ];

    var publicAPI = {
      getName
    };
    return publicAPI;

    function getName(studentID: number) {
      var student = records.find((student) => student.id === studentID);
      if (student) return student.name;
    }
  }
  var fullTime = defineStudent();
  console.log(fullTime.getName(73));
}

console.log(`
code run start
===============`);
whatIsModule();
console.log(`===============
code run end`);
