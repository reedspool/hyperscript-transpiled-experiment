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
    then('it can parse a log expression without text',
         () => assert.deepEqual(Parser.parse('log'),
                                { type: "LogExpression", args: [] }))
    then('it can parse a self reference `me`',
         () => assert.deepEqual(Parser.parse('me'),
                                { type: "SelfReferenceExpression" }))
    then('it can parse a self reference `I`',
         () => assert.deepEqual(Parser.parse('I'),
                                { type: "SelfReferenceExpression" }))
    then('it can parse an untargeted style attr expression',
         () => assert.deepEqual(Parser.parse('*color'),
                                { type: "StyleAttrExpression", attr: 'color', target: null }))
    then('it can parse a targeted style attr expression',
         () => assert.deepEqual(Parser.parse('*color of abcd'),
                                { type: "StyleAttrExpression", attr: 'color', target: { type: "IdentifierExpression", value: "abcd" } }))
    then('it can parse an integer',
         () => assert.deepEqual(Parser.parse('12345'),
                                { type: "NumberExpression", value: '12345' }))
    then('it can parse a float',
         () => assert.deepEqual(Parser.parse('12345.0001'),
                                { type: "NumberExpression", value: '12345.0001' }))
    then('it can parse a log command with text',
         () => assert.deepEqual(Parser.parse('log "hello"'),
                                { type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }))
    then('it can parse a single-line on-click feature ',
         () => assert.deepEqual(Parser.parse('on click log "hello"'),
                                { type: "Feature", event: "click", body: [{ type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }] }))
    then('it can parse a multi-line on-click feature ',
         () => assert.deepEqual(Parser.parse('on click\nlog "hello"\nlog'),
                                { type: "Feature", event: "click", body: [{ type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }, { type: "LogExpression", args: [] }] }))
    then('it can parse a dollar sign identifier expression ',
         () => assert.deepEqual(Parser.parse('$'),
                                { type: "IdentifierExpression", value: "$" }))
    then('it can parse a underscore identifier expression ',
         () => assert.deepEqual(Parser.parse('_'),
                                { type: "IdentifierExpression", value: "_" }))
    then('it can parse a single-letter identifier expression ',
         () => assert.deepEqual(Parser.parse('x'),
                                { type: "IdentifierExpression", value: "x" }))
    then('it can parse a multi-letter identifier expression ',
         () => assert.deepEqual(Parser.parse('x$_abl'),
                                { type: "IdentifierExpression", value: "x$_abl" }))
    then('it can parse a next expression',
         () => assert.deepEqual(Parser.parse('next ".clazz"'),
                                { type: "NextExpression", selector: { type: "StringExpression", value: ".clazz" }}))
    then('it can parse a function call expression with no arguments',
         () => assert.deepEqual(Parser.parse('call myFunc()'),
                                { type: "FunctionCallExpression", name: "myFunc", args: [] }))
    then('it can parse a function call expression with one argument',
         () => assert.deepEqual(Parser.parse('call func(n)'),
                                { type: "FunctionCallExpression", name: "func", args: [{ type: "IdentifierExpression", value: "n" }] }))
    then('it can parse a function call expression with multiple arguments',
         () => assert.deepEqual(Parser.parse('call my_callable(arg1, arg2)'),
                                { type: "FunctionCallExpression", name: "my_callable", args: [{ type: "IdentifierExpression", value: "arg1" }, { type: "IdentifierExpression", value: "arg2" }] }))
    then('it can parse a function call expression with a string argument',
         () => assert.deepEqual(Parser.parse('call func("abcd")'),
                                { type: "FunctionCallExpression", name: "func", args: [{ type: "StringExpression", value: "abcd" }] }))
    then('it can parse a function call expression with a number argument',
         () => assert.deepEqual(Parser.parse('call func(1)'),
                                { type: "FunctionCallExpression", name: "func", args: [{ type: "NumberExpression", value: "1" }] }))
})
