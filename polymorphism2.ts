interface SStorage<T> {
  [key: string]: T;
}
class LocalStorage<T> {
  // 클래스를 초기화 할때 T라는 제네릭을 받을 계획이라고 알려주는거임.
  // 제네릭을 클래스로 보내고, 클래스는 제네릭을 인터페이스로 보낸 뒤에
  // 인터페이스는 제네릭을 사용한다.
  private storage: SStorage<T> = {};
  set(key: string, value: T) {
    this.storage[key] = value;
  }
  remove(key: string) {
    delete this.storage[key];
  }
  get(key: string): T {
    return this.storage[key];
  }
  clear() {
    this.storage = {};
  }
}

const stringStorage = new LocalStorage<string>();
stringStorage.get("xxx");
stringStorage.set("hello", "xx");

const booleanStorage = new LocalStorage<boolean>();
booleanStorage.get("xxxx");
booleanStorage.set("hello", true);
