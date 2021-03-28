import {add} from '../src/Client/js/apptest.js'
test('add 5 to 10 with the answer 15', () => {
    expect(add(5,10)).toBe(15);
    
  });