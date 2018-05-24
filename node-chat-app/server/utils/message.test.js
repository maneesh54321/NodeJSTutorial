const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = "test";
        var text = "test-message";
        var res = generateMessage(from, text);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        var from = "test";
        var lat = 15;
        var lng = 19;
        var url = `https://www.google.com/maps?q=${lat},${lng}`;
        var res = generateLocationMessage(from, lat, lng);
        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({from,url});
    });
});