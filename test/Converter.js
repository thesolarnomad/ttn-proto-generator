import test from 'ava';
import Converter from '../.tmp/Converter';

test('Converter', t => {
    t.is(typeof Converter, 'function');
    t.pass();
});