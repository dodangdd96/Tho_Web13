'use strict'

function sort(input) {
  for (let a = 0; a < input.length - 1; a++){
    for (let m = a+1; m < input.length; m++){
      if(input[a] > input[m]){
        let temp = input[m];
        input[m] = input[a];
        input[a] = temp;
      }
    }
  }
  return input;
}

module.exports = sort
