# Typescript로 블록체인 만들기

## 왜 타입스크립트를 쓸까?

- 타입 안정성때문에 JS말고 타입스크립트를 쓴다!
- 마이크로소프트에서 만들어서 VSCODE와 궁합이 아주그냥 찰떡임

## 자바스크립트의 단점

1. 개발자가 상당히 ㅂㅅ같은 코드를 작성해도 그냥 이해하려고 노력함
2. 타입에 맞지 않게 작성해도 코드 실행을 Reject하지 않는다.

## 타입스크립트는 Strongly Typed 언어다!

- Java나 C# 같이 Type에 민감하다.
- 개발자가 실수하지 않도록 보호해준다.

## Implicit Types vs Explicit Types

- 타입스크립트에서 변수를 선언할때 타입을 명시해줘도 되고
- 안해줘도 된다
- 만약 안할경우엔 Typescript에서 알아서 타입을 추론해준다!

**직접 명시하는 경우**

```jsx
let b : boolean = true
```

→ 하지만 이런식으로 선언하는걸 추천 X

왜냐면 가독성이 안좋다. 그래서 타입스크립트가 알아서 추론하게끔 냅두는 것이 더 좋다

## Types of TS

```jsx
const player : {
	name : string,
	age? : number
} = {
	name :"nico"
}
```

?뜻 : 있어도 되고 없어도 된다.

**만약 age로 if문을 쓰고 싶다면**

```jsx
if(player.age && player.age < 10){}
```

이런식으로 작성하면 된다!

---

만약 여러 개의 Player를 만들고 싶다면

**Alias(별칭) 타입을 생성할 수 있다!**

```tsx
type Player = {
	name : string,
	age? : number
}

const playerNico : Player = {
	name :"nico"
}
```

이런식으로 생성 가능!!

조금 과하게 해본다면

```tsx
type Age = number;
type Name = string;

type Player = {
	name : Name,
	age? : Age
}
```

---

**함수의 리턴타입, 인수의 타입 지정하기**

```tsx
function playerMaker(name:string) : Player {
	return{
		name // object를 리턴한다.
	}
}

const nico = playerMaker("nico")
nico.age = 12
```

- 이 함수가 Player를 return한다고 알려주고싶으면 Argument뒤에 저렇게 써주면 된다.

---

**화살표 함수에서는??**

```tsx
const playerMaker = (name:string) : Player => ({name})
```

- 이 역시 괄호(Argument)뒤에 리턴타입을 지정해준다!

---

**readonly 타입!**

- 요소들을 ‘읽기 전용’으로 만들 수 있다.
- 만약 Player의 name을 수정하려고 시도하면 오류 발생!

```tsx
type Player = {
	readyonly name : Name,
	age? : Age
}

const numbers = readonly number[] = [1, 2, 3, 4]
numbers.push(1) // 오류 발생!!
```

- readyonly 타입을 써도 map, filter같은 함수들은 쓸 수 있다!
- Array를 직접적으로 건드리는 함수가 아니라면 모두 사용 가능!

---

**Tuple**

- Array를 생성하는데 최소한의 길이를 가져야하고 특정 위치에 특정 타입이 있어야한다.

```tsx
const player : readonly[string, number, boolean] = ["nico", 12, false]
player[0] = 1 // 오류!! string이 와야함.
```

- 첫번째 argument는 string
- 두번째 argument는 number
- 세번째 argument는 boolean을 가져야 한다
- **Tuple**을 사용하면 항상 정해진 갯수의 요소를 가져야하는 Array를 지정할 수 있다!!
- readonly도 붙일 수 있다!!

---

**?의 의미**

```tsx
age ?: number
```

- age는 number OR undefined이다!

---

**any**

```tsx
let a = [];

const a : any[] = [1, 2, 3, 4]
```

→ 타입스크립트는 기본적으로 a를 any의 array라고 판단한다!

- 만약 타입스크립트의 보호장치들로부터 빠져나가고 싶으면 any를 붙여주면 타입스크립트로부터 벗어날 수 있다!
- any를 쓰면 자바스크립트의 바보같은 일도 다 할 수 있다.

---

**어떤 타입인지 모르는 변수는 타입스크립트에서 어떻게 말해줘야할까?**

**unknown**

```tsx
let a:unknown;
```

- a의 타입을 미리 알지 못할 때 unknown을 쓴다.
- unknown을 쓰면 타입스크립트로부터 보호를 받을 수 있다.

```tsx
let a: unknown;

if(typeof a === 'number'){
	let b = a + 1
}

if(typeof a === "string"){
	let b = a.toUpperCase();
}
```

---

**void**

- 아무것도 return하지 않는 함수를 대상으로 사용.

```tsx
function hello(){
	console.log('x')
}
```

→ 함수 hello는 아무것도 return하지 않기 때문에 `void` 타입이다!

---

**never**

- 함수가 절대 return 하지 않을 때 발생.
- 함수에서 exception이 발생할 때

```tsx
function hello():never{ //return하지 않고 오류를 발생시키는 함수.
	throw new Error("xxx")
}
```

- never는 타입이 두가지 일 수 도 있는 상황에 발생할 수 있다.

```tsx
function hello(name:string|number){
	if(typeof name === "string"){

	} else if (typeof name === "number"){
	
	} else{ // 여기서 name은 never다!!
			name // name은 never다!
	}
}
```

---

**function - Call Signatures : 함수의 반환 타입을 알려주는거임.**

```tsx
function add(a:number, b:number){
		return a + b
}

const add = (a:number, b:number) => a + b

```

- 일단 먼저 일반적인 function 선언!

**< Call Signatures >**

```tsx
**type Add = (a:number, b:number) => number;**
// Call Signatures

type Add = {
	**(a:number, b:number) : number;**
}
const add:Add = (a, b) => a + b
```

- Call Signature를 쓰면 변수에 type을 명시 안해줘도 된다!
- 함수를 작성할 때 parameter 타입을 써주는 과정을 분리해서 구현 할 수 있다.
- React에서 props로 함수를 보내게 되면, 타입스크립트한테 설명해줘야한다
    - 어떻게 함수가 작동하는지
    - 함수의 리턴값이 뭔지..등등

---

**Overloading(오버로딩)**

- 내가 JS든 TS든 쓰게되면 패키지나 라이브러리 같은 것들을 많이 사용할텐데
- 이런 패키지나 라이브러리는 오버로딩을 엄청 많이 사용한다.
- 오버로딩은 함수가 **여러개의 Call Signature**를 가지고 있을때 오버로딩이라고 한다!

```tsx
type Add = {
	**(a:number, b:number) : number;
	(a:number, b:string) : number;**
}

const add: Add = (a, b) => {
	if(typeof b === "string") return a
	return a + b
}
```

Next.js 는 리액트의 완전 좋은 프레임워크다!

Next에서 페이지를 바꾸고 싶다면 

```tsx
Router.push("/home");

Router.push({
		path: "/home",
		state : 1
})
```

→ 완벽한 오버로딩의 예시!

**< push의 Call Signature >**

```tsx
type Config = {
		path: string,
		state: object
}

type Push = {
		(path:string):void
		(config:Config):void
}

const push:Push = (config) => {
		if(typeof config === "string"){
			...
		}
		else{
			...
		}

}
```

**< Call Signature들이 파라미터의 개수가 다른 경우! >**

```tsx
type Add = {
		(a: number, b: number) : number
		(a: number, b: number, c:number) : number
}

const add: Add = (a, b, c?:number) => {
		if(c) return a + b + c // c가 있다면 a+b+c를 리턴.
		return a + b
}
```

---

**Polymorphism**

정의 : 여러가지 다른 구조를 갖는 것!

: 인자들과 리턴값에 대하여 형태(타입)에 따라 그에 상응하는 형태(타입)을 갖을 수 있다.

**Concrete Type**

number, boolean, string, void, …

**Generic Type**

: 타입의 Placeholder같은 것. any와 비슷한 개념.

: Call Signature를 작성할 때 여기에 들어올 확실한 타입을 모를때 Generic을 사용한다.

: any와 다른점 ⇒ any를 써버리면 TS가 더이상 Type을 유추하지 않지만
: <>를 쓰면 TS가 Type을 유추한다!

: 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시하여 하나의 타입만이 아닌 다양한 타입을 사용할 수 있도록하는 기법이다!

```tsx
type SuperPrint = {
  <TypePlaceholder>(arr: TypePlaceholder[]): void;
};
```

- 이런식으로 <> 꺽쇠 안에 name을 선언하면 Generic을 사용한다는 뜻이다.
- 어떤 타입이 나중에 와도 다 OK!!
- 꺽쇠 안에는 어떤 이름을 써도 상관 없음.

**만약 Generic Type을 여러개 사용하고 싶다면?**

- TS는 Generic을 처음 인식했을 때와 Generic의 순서를 기반으로 Generic의 타입을 알게 된다.

```tsx
type SuperPrint = {
  <T, M>(a: T[], b: M): T;
};
```

**function으로 Generic 사용법.**

```tsx
function superPrint<V>(a: V[]) {
  return a[0];
}
```

**Generic 을 언제 쓸까?**

1. 타입을 생성
2. 타입을 확장

```tsx
type Player<E> = {
  name: string;
  extraInfo: E;
};

const nico: Player<{ favFood: string }> = {
  name: "nico",
  extraInfo: {
    favFood: "kimchi",
  },
};
```

- Player의 Call Signature를 선언해주고
- nico라는 Player를 만든다.
- Generic E에는 Object가 들어가고 그 Object안에는 favFood가 들어간다는 뜻이다.

```tsx
type Player<E> = {
  name: string;
  extraInfo: E;
};
type NicoExtra = {
  favFood: string;
};
type NicoPlayer = Player<NicoExtra>;

const nico: NicoPlayer = {
  name: "nico",
  extraInfo: {
    favFood: "kimchi",
  },
};

const lynn: Player<null> = {
  name: "lynn",
  extraInfo: null,
};
```

**number[] == Array<number>  → 이렇게도 쓸수있다!**

**useState에 Generic 적용방법!**

```tsx
useState<number>()
```

- 이런식으로 쓰면 number 타입의 useState가 되는거다!

---

## TypeScript를 이용한 객체지향.

### Class

1. **constructor**

```tsx
class Plyaer {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

const nico = new Plyaer("nico", "next", "NN");
```

→ 이런식으로 쓰면 

this.firstName = firstName;

this.lastName = lastName;

을 알아서 써준다.

- TS에서 쓴 Private는 JS에서는 적용 X

1. **Abstract Class**
- Abstract Class는 다른 클래스가 상속받을 수 있는 클래스
- 하지만 Abstract Class는 직접 새로운 인스턴스를 만들 수 없다.
- 오직 다른곳에서 상속받을수만 있는 클래스
- 추상 클래스를 상속받을수만 있고 직접적으로 인스턴스를 만들 수 없다.

```tsx
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
}

class Plyaer extends User {}

const hoon = new Plyaer("hoon", "jang", "NN");
```

1. **Method**
- Method : 클래스 안에 존재하는 함수.

```tsx
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickname: string
  ) {}
  getFullName() {
		//이 부분이 메소드의 implementation 부분!
    return `${this.firstName} ${this.lastName}`;
  }
}

class Plyaer extends User {}

const hoon = new Plyaer("hoon", "jang", "NN");

const fullName = hoon.getFullName();
```

- Player는 User를 상속받았기 때문에 Abstract Class 안의 Method를 사용할 수 있다!
- 물론 Abstract Class에서 private이면 Player에서는 사용 불가!

1. **Abstract Method**
- 메소드의 Call Signature만 있음.
- 추상 메소드는 추상 클래스를 상속받는 모든 Class들이 구현을 해야하는 메소드.

```tsx
abstract class User {
  constructor(
    protected firstName: string,
    protected lastName: string,
    protected nickname: string
  ) {}
  abstract getNickName(): void; // Abstract Method
}

class Plyaer extends User {
  getNickName(): void {
    console.log(this.nickname); 
		// protected라 자식 클래스에서 접근 가능!
  }
}
```

**< Private Public Protected >**

`private` : 속해있는 클래스(인스턴스)가 아니면 접근 불가, 자식클래스도 접근 불가.

`public` : 속해있지 않아도 밖에서 접근 가능

`protected` : 외부에서는 보호 되지만 자식 클래스에서는 사용될 수 있음! 자식 클래스더라도 클래스 밖에서는 사용 불가!!