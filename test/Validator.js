import test from 'ava';
import Validator from '../.tmp/Validator';

test('Validator', t => {
    t.is(typeof Validator, 'function');
    t.pass();
});