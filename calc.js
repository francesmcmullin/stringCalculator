function add(numString){
  var delimiter = findDelimiter(numString);
  numString = removeDelimiter(numString);
  var numArr = stringToNumbers(numString, delimiter);
  
  validate(numArr);
  numArr = removeLargeNumbers(numArr);
  return numArr.reduce(function(result, num){
    return result + num;
  });
}

function validate(numArr) {
  var negatives = numArr.filter(function(num){
    return num < 0;
  });
  if(negatives.length){
    throw "negatives not allowed " + negatives;
  }
}

function removeLargeNumbers(numArr){
  return numArr.filter(function(num){
    return num < 1000;
  })
}

// returns array of numbers
function stringToNumbers(numString, delimiter){
  return numString.split(delimiter).map(function(num){
    return +num;
  });
}

function findDelimiter(numString){
  var delimiter = /[\n,]/;
  if(numString.indexOf('//')===0) {
    delimiter = numString.slice(2, numString.indexOf('\n'));
    
    if(delimiter.indexOf('[')===0) {
      delimiter = convertMultipleDelimiters(delimiter);
    }
    delimiter = new RegExp(delimiter);
  }
  return delimiter;
}

function convertMultipleDelimiters(delimiterString){
  delimiterString = delimiterString.slice(1, delimiterString.length-1);
  var delimiters = delimiterString.split('][').map(
    function(delimiter){
      delimiter = delimiter.split('').join('][');
      return '[' + delimiter + ']';
  });
  delimiters = '(' + delimiters.join(')|(') + ')';
  return delimiters;
}

function removeDelimiter(numString){
  if(numString.indexOf('//')===0) {
    numString = numString.slice(numString.indexOf('\n') + 1);
  }
  return numString;
}
