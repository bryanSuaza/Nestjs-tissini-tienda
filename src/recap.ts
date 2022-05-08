const myName: string = 'Bryan';
const age: number = 12;

const suma = (a: number, b: number) => {
  return a + b;
};

suma(12, 13);

class Persona {
  private age;
  private name;

  constructor(age: number, name: string) {
    this.age = age;
    this.name = name;
  }

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const persona = new Persona(age, myName);
