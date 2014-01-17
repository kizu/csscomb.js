var assert = require('assert');

describe('options/space-after-comma', function() {
    it('Number value should not change space after comma', function() {
        var input = 'a, b,c { color: red }';
        this.comb.configure({ 'space-after-comma': 2 });
        assert.equal(this.comb.processString(input), input);
    });

    it('Boolean value should not change space after comma', function() {
        var input = 'a, b,c { color: red }';
        this.comb.configure({ 'space-after-comma': true });
        assert.equal(this.comb.processString(input), input);
    });

    it('Non-whitespace string value should not change space after comma', function() {
        var input = 'a, b,c { color: red }';
        this.comb.configure({ 'space-after-comma': 'foobar' });
        assert.equal(this.comb.processString(input), input);
    });

    it('Whitespace string value should set proper space after comma', function() {
        this.comb.configure({ 'space-after-comma': ' ' });
        assert.equal(
            this.comb.processString(
                'a,b { color: red }' +
                'a, b { color: red }' +
                'a,  b,c, d { color: red }'
            ),
            'a, b { color: red }' +
            'a, b { color: red }' +
            'a, b, c, d { color: red }'
        );
    });

    it('Empty whitespace string value should remove spaces after comma', function() {
        this.comb.configure({ 'space-after-comma': '' });
        assert.equal(
            this.comb.processString(
                'a,b { color: red }' +
                'a, b { color: red }' +
                'a,  b,c, d { color: red }'
            ),
            'a,b { color: red }' +
            'a,b { color: red }' +
            'a,b,c,d { color: red }'
        );
    });

    it('Should detect no whitespaces after comma', function() {
        this.shouldDetect(
            ['space-after-comma'],
            'a,b { color:red }',
            {
                'space-after-comma': ''
            }
        );
    });

    it('Should detect a space after comma', function() {
        this.shouldDetect(
            ['space-after-comma'],
            'a, b { color:red }',
            {
                'space-after-comma': ' '
            }
        );
    });

    it('Should detect a space after comma in long selector', function() {
        this.shouldDetect(
            ['space-after-comma'],
            'a ,b, c,d, e { color:red }',
            {
                'space-after-comma': ' '
            }
        );
    });

    it('Should detect no whitespace after comma in long selector', function() {
        this.shouldDetect(
            ['space-after-comma'],
            'a,b , c,d { color:red }',
            {
                'space-after-comma': ''
            }
        );
    });

    it('Shouldn’t detect whitespace after comma in selector without commas', function() {
        this.shouldDetect(
            ['space-after-comma'],
            'a { color:red }',
            {}
        );
    });
});
