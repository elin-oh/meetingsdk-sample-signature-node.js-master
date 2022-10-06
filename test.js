function Stack(){
  this.data={};
  this.topIndex=0;
  this.push = ( el )=>{
    this.data[this.topIndex] = el;
    this.topIndex += 1;
  };
  this.pop= ()=>{
    delete this.data[this.topIndex];
    this.topIndex -= 1;
  };
  this.length = () => {
    return this.topIndex + 1;
  };
  //스택을초기화하는함수
  this.clear = ()=>{
    for(let i = this.topIndex; i >=0; i--){
      delete this.data[i];
    }
  };
  this.empty = () => {
    return this.data["0"] ? false: true;
  }
};

// 구현한 코드를 다음과 같이 확인합니다.
let stack = new Stack();

console.log(stack.data)
stack.push(1)
stack.push(2)
stack.pop()
stack.push(3)
console.log(stack.data)
console.log(stack.empty())
console.log(stack.length())
stack.clear()
console.log(stack.empty())
console.log(stack.data)