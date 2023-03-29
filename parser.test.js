import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as Parser from './parser.cjs';
import { tests } from "./parserTestDefinitions.js"
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe), then = wrap('Then ')(it);
given("a test suite", () => {
    then('assertions don\'t fail', () => assert.strictEqual(1, 1))
    then('it provides a parse function', () => assert.strictEqual(typeof Parser.parse, 'function'))
})

given("a parser", () => {
    tests.forEach(({ then, src, afterParse }) => {
        it(then, () => assert.deepEqual(Parser.parse(src), afterParse))
    })
});
