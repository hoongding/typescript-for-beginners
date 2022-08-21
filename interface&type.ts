type PlayerA = {
  name: string;
};
type PlayerAA = PlayerA & {
  lastName: string;
};
const PlayerA: PlayerAA = {
  name: "hoon",
  lastName: "seok",
};
///////
interface PlayerB {
  name: string;
}
interface PlayerBB extends PlayerB {
  lastName: string;
}
interface PlayerBB {
  // 똑같은 이름으로 가능!
  health: number;
}
const PlayerB: PlayerBB = {
  name: "hoon",
  lastName: "seok",
  health: 1,
};

class UserA implements PlayerA {
  constructor(public name: string) {}
}

class UserB implements PlayerB {
  constructor(public name: string) {}
}
