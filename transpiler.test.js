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
    then("it transpiles a log command with no text",
         () => assert.strictEqual(transpile(Parser.parse('log')), "function (target){ console.log() }"))
    then("it transpiles a log command with text",
         () => assert.strictEqual(transpile(Parser.parse('log "hello"')), 'function (target){ console.log("hello") }'))
    then("it transpiles an on-click feature",
         () => assert.strictEqual(transpile(Parser.parse('on click\nlog "hello"')), 'function (target){ target.addEventListener(\'click\', () => { console.log("hello") }) }'))
})
