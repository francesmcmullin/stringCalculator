describe('add',function(){
  it('returns 0 for empty string',function(){
    expect(add('')).toBe(0);
  });
  
  it('returns the number for a number string', function(){
    expect(add('8')).toBe(8);
  })
  
  it('returns the sum for two number strings', function(){
    expect(add('17,42')).toBe(59);
  })
  
  it('returns the sum for  three number strings', function(){
    expect(add('4,6,8')).toBe(18);
  })
  
  it('works with line breaks between numbers instead of commas', function(){
    expect(add('1\n4,4')).toBe(9);
  })
  
  it('allows a custom delimiter', function(){
    expect(add('//;\n1;2')).toBe(3)
  })
  
  it('throws an error on a single negative number', function(){
    var errored = false;
    try {
      add('3,-4')
    } catch (e){
      errored = true;
      expect(e).toEqual('negatives not allowed -4');
    }
    expect(errored).toBe(true);
  })
  
  it('throws an error on multiple negative number', function(){
    var errored = false;
    try {
      add('3,-4,-5')
    } catch (e){
      errored = true;
      expect(e).toEqual('negatives not allowed -4,-5');
    }
    expect(errored).toBe(true);
  })
  
  it('ignores large numbers', function(){
    expect(add('2,3,1001')).toEqual(5);
  })
  
  it('handles large delimiters', function(){
    expect(add('//[***]\n1***2***3')).toEqual(6);
  })
  
  it('handles large delimiters without their individual chars', function(){
    expect(add('//[*7*]\n1*7*2*7*7')).toEqual(10);
  })
  
  it('handles multiple delimiters', function(){
    expect(add('//[*][%]\n1*2%3')).toEqual(6);
  })
  
  it('handles multiple large delimiters', function(){
    expect(add('//[**][%;]\n1**2%;3')).toEqual(6);
  })
});

describe('validate', function(){
  it('does not throw an error when there are no negaitves', function(){
    validate([1,2,3,4,5,6,7]);
  })

  it('throws an error with a single negative', function(){
    var errored = false;
    try {
      validate([3,-4])
    } catch (e){
      errored = true;
      expect(e).toEqual('negatives not allowed -4');
    }
    expect(errored).toBe(true);
  })

  it('throws an error with multiple negatives', function(){
    var errored = false;
    try {
      validate([3,-4,-5])
    } catch (e){
      errored = true;
      expect(e).toEqual('negatives not allowed -4,-5');
    }
    expect(errored).toBe(true);
  })
});

describe('stringToNumbers', function(){
  it('returns 0 for empty string', function(){
    expect(stringToNumbers('')).toEqual([0]);
  })
  it('returns [2,3] for "2,3"', function(){
    expect(stringToNumbers('2,3', ',')).toEqual([2,3]);
  })
})

describe('findDelimiter', function(){
  it('should return default from string without delimiter', function(){
    expect(findDelimiter('7,43,23\n53')).toEqual(/[,\n]/);
  })
  
  it('should return delimiter from string with delimiter', function(){
    expect(findDelimiter('//;\n777')).toEqual(/;/);
  })
})

describe('removeDelimiter', function(){
  it('should return the string unchanged when it has no delimiter', function(){
    expect(removeDelimiter('7,3,4\n5')).toEqual('7,3,4\n5');
  })
  
  it('should return the string without delimiter when it has a delimiter', function(){
    expect(removeDelimiter('//;\n4;5;7')).toEqual('4;5;7')
  })
})
