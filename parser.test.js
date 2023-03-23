import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as Parser from './parser.cjs';
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe), then = wrap('Then ')(it);
given("a test suite", () => {
    then('assertions don\'t fail', () => assert.strictEqual(1, 1))
})

given("a parser", () => {
    then('it provides a parse function',
         () => assert.strictEqual(typeof Parser.parse, 'function'))
    then('it can parse a log command without text',
         () => assert.deepEqual(Parser.parse('log'),
                                { type: "Command", command: "log", args: null }))
    then('it can parse a self reference',
         () => assert.deepEqual(Parser.parse('me'),
                                { type: "SelfReferenceExpression" }))
    then('it can parse a log command with text',
         () => assert.deepEqual(Parser.parse('log "hello"'),
                                { type: "Command", command: "log", args: [{ type: "StringLiteral", value: 'hello' }] }))
    then('it can parse a single-line on-click feature ',
         () => assert.deepEqual(Parser.parse('on click log "hello"'),
                                { type: "Feature", event: "click", body: [{ type: "Command", command: "log", args: [{ type: "StringLiteral", value: 'hello' }] }] }))
    then('it can parse a multi-line on-click feature ',
         () => assert.deepEqual(Parser.parse('on click\nlog "hello"\nlog'),
                                { type: "Feature", event: "click", body: [{ type: "Command", command: "log", args: [{ type: "StringLiteral", value: 'hello' }] }, { type: "Command", command: "log", args: null }] }))
})
