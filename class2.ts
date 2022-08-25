type Words = {
  [key: string]: string;
  // Words 타입이 string만을 property로 가지는 오브젝트임을 알려준것이다.
};

class Dict {
  private words: Words; // property가 constructor로부터 바로 초기화되지 X
  constructor() {
    this.words = {}; //여기서 수동으로 초기화 시킨거다!
  }
  allPrint() {
    console.log(this.words);
  }
  add(word: Word) {
    // 파라미터 부분에 Word 클래스를 타입처럼 사용가능하다!
    // 파라미터가 Word 클래스의 인스턴스이기를 원하면 이렇게 쓴다!
    if (this.words[word.term] === undefined) {
      // dict에 없다면!
      this.words[word.term] = word.def;
      console.log(word.term + "이 추가 되었습니다.");
    } else {
      console.log(word.term + "은 이미 사전에 존재합니다.");
    }
  }
  def(term: string) {
    return this.words[term];
  }

  // Todo: 단어를 삭제하고 단어를 업데이트하는 메소드 만들기
  del(word: Word) {
    if (this.words[word.term] !== undefined) {
      console.log(word.term + "이 삭제되었습니다");
      delete this.words[word.term];
    } else {
      console.log("존재하지 않는 단어입니다.");
    }
  }
  update(word: Word, updateDef: string) {
    if (this.words[word.term] !== undefined) {
      this.words[word.term] = updateDef;
    } else {
      console.log("존재하지 않는 단어입니다.");
    }
  }
  addDef(word: Word, addDef: string) {
    if (this.words[word.term] !== undefined) {
      this.words[word.term] += addDef;
    } else {
      console.log("존재하지 않는 단어입니다.");
    }
  }
  printWord(word: Word) {
    console.log(word);
  }
}

class Word {
  constructor(public readonly term: string, public readonly def: string) {}
}

const kimchi = new Word("kimchi", "한국의 음식");
const coffee = new Word("coffee", "잠이 안와요");
const dict = new Dict();

dict.add(kimchi);
dict.add(coffee);
dict.allPrint();
dict.def("kimchi");
dict.addDef(kimchi, ", 한국인에게 없어선 안될 음식");
dict.allPrint();
dict.printWord(kimchi);
dict.del(kimchi);

dict.allPrint();
