import test from 'ava';
import Encoder from '../tmp/Encoder';

test('Encoder', t => {
    t.is(typeof Encoder, 'function');
    t.pass();
});