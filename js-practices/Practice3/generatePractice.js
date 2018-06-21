'use strict'


function generate(testLengthArray){
  let test = [] ;
  
  for (let i = 0; i < testLengthArray.length; i++){
  
    let input = []; //generate input
    for (let m = 0; m < testLengthArray[i]; m++){
      input[m] = Math.floor(Math.random() * 2000) - 1000;
    }
    
    let target; //generate target
    if(testLengthArray.length > 3){
      if(i == 0){
        target = 9999;
      }
      else if(i == 1){
        target = input[0];
      }
      else if(i == 2){
        target = input[testLengthArray[2]-1];
      }
      else{
        target = Math.floor(Math.random() * 20000) - 10000;
      }
    }
    else{
      target = Math.floor(Math.random() * 2000) - 1000;
    }

    let output;
    output = input.indexOf(target); //result
    test[i] = {"input" : input, "target": target, "output": output};
  }
  
  return test;
}



module.exports = generate
