import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as Parser from './parser.cjs';
import { transpile } from "./transpiler.js";
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe), then = wrap('Then ')(it);
given("a test suite", () => {
    then('assertions don\'t fail', () => assert.strictEqual(1, 1))
})
given("a transpiler", () => {
    then("it provides a transpile function", () => assert.strictEqual(typeof transpile, "function"))
})
