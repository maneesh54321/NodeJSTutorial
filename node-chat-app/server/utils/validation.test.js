const expect=require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var input = 123;
        var res = isRealString(input);
        expect(res).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var input = '       ';
        var res = isRealString(input);
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var input = "   Test String   ";
        var res = isRealString(input);
        expect(res).toBe(true);
    });
});