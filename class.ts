abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickname: string
  ) {}
  abstract getNickName(): void;

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Plyaer extends User {
  getNickName(): void {
    console.log(this.nickname);
  }
}

const hoon = new Plyaer("hoon", "jang", "NN");

const fullName = hoon.getFullName();
