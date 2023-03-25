import assert from 'node:assert';
import { describe, it } from 'node:test';
import * as Parser from './parser.cjs';
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe), then = wrap('Then ')(it);
given("a test suite", () => {
    then('assertions don\'t fail', () => assert.strictEqual(1, 1))
    then('it provides a parse function', () => assert.strictEqual(typeof Parser.parse, 'function'))
})

given("a parser", () => {
    const tests = [
        {
            then: 'it can parse a self reference `me`',
            src: 'me',
            expect: { type: "SelfReferenceExpression" },
        },
        {
            then: 'it can parse a self reference `I`',
            src: 'I',
            expect: { type: "SelfReferenceExpression" },
        },
        {
            then: 'it can parse an untargeted style attr expression',
            src: '*color',
            expect: { type: "StyleAttrExpression", attr: 'color', target: null }
        },
        {
            then: 'it can parse a targeted style attr expression',
            src: '*color of abcd',
            expect: { type: "StyleAttrExpression", attr: 'color', target: { type: "IdentifierExpression", value: "abcd" } }
        },
        {
            then: 'it can parse setting a variable to a string',
            src: 'set myColor to "blue"',
            expect: { type: "SetExpression", target: { type: "IdentifierExpression", value: "myColor"}, value: { type: "StringExpression", value: "blue" }}
        },
        {
            then: 'it can parse setting an untargeted style attr expression to a string',
            src: 'set *color to "blue"',
            expect: { type: "SetExpression", target: { type: "StyleAttrExpression", attr: 'color', target: null }, value: { type: "StringExpression", value: "blue" }}
        },
        {
            then: 'it can parse setting a targeted style attr expression to a string',
            src: 'set *color of xxx to "blue"',
            expect: { type: "SetExpression", target: { type: "StyleAttrExpression", attr: 'color', target: { type: "IdentifierExpression", value: "xxx" } }, value: { type: "StringExpression", value: "blue" } }
        },
        {
            then: 'it can parse an integer',
            src: '12345',
            expect: { type: "NumberExpression", value: '12345' }
        },
        {
            then: 'it can parse a float',
            src: '12345.0001',
            expect: { type: "NumberExpression", value: '12345.0001' }
        },
        {
            then: 'it can parse a seconds duration expression',
            src: '1s',
            expect: { type: "SecondsDurationExpression", value: { type: "NumberExpression", value: '1' }}
        },
        {
            then: 'it can parse a milliseconds duration expression',
            src: '1000ms',
            expect: { type: "MillisecondsDurationExpression", value: { type: "NumberExpression", value: '1000' }}
        },
        {
            then: 'it can parse a wait expression',
            src: 'wait 1000ms',
            expect: { type: "WaitExpression", duration: { type: "MillisecondsDurationExpression", value: { type: "NumberExpression", value: '1000' }}}
        },
        {
            then: 'it can parse a log expression without text',
            src: 'log',
            expect: { type: "LogExpression", args: [] }
        },
        {
            then: 'it can parse a log command with text',
            src: 'log "hello"',
            expect: { type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }
        },
        {
            then: 'it can parse two log commands concatenated with `then`',
            src: 'log "hello" then log "hola"',
            expect: { type: "CompoundExpression", first: { type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }, next: { type: "LogExpression", args: [{ type: "StringExpression", value: 'hola' }] }  }
        },
        {
            then: 'it can parse a single-line on-click feature ',
            src: 'on click log "hello"',
            expect: { type: "Feature", event: "click", body: [{ type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }] }
        },
        {
            then: 'it can parse a multi-line on-click feature ',
            src: 'on click\nlog "hello"\nlog',
            expect: { type: "Feature", event: "click", body: [{ type: "LogExpression", args: [{ type: "StringExpression", value: 'hello' }] }, { type: "LogExpression", args: [] }] }
        },
        {
            then: 'it can parse a dollar sign identifier expression ',
            src: '$',
            expect: { type: "IdentifierExpression", value: "$" }
        },
        {
            then: 'it can parse a underscore identifier expression ',
            src: '_',
            expect: { type: "IdentifierExpression", value: "_" }
        },
        {
            then: 'it can parse a single-letter identifier expression ',
            src: 'x',
            expect: { type: "IdentifierExpression", value: "x" }
        },
        {
            then: 'it can parse a multi-letter identifier expression ',
            src: 'x$_abl',
            expect: { type: "IdentifierExpression", value: "x$_abl" }
        },
        {
            then: 'it can parse a next expression',
            src: 'next ".clazz"',
            expect: { type: "NextExpression", selector: { type: "StringExpression", value: ".clazz" }}
        },
        {
            then: 'it can parse a function call expression with no arguments',
            src: 'call myFunc()',
            expect: { type: "FunctionCallExpression", name: "myFunc", args: [] }
        },
        {
            then: 'it can parse a function call expression with one argument',
            src: 'call func(n)',
            expect: { type: "FunctionCallExpression", name: "func", args: [{ type: "IdentifierExpression", value: "n" }] }
        },
        {
            then: 'it can parse a function call expression with multiple arguments',
            src: 'call my_callable(arg1, arg2)',
            expect: { type: "FunctionCallExpression", name: "my_callable", args: [{ type: "IdentifierExpression", value: "arg1" }, { type: "IdentifierExpression", value: "arg2" }] }
        },
        {
            then: 'it can parse a function call expression with a string argument',
            src: 'call func("abcd")',
            expect: { type: "FunctionCallExpression", name: "func", args: [{ type: "StringExpression", value: "abcd" }] }
        },
        {
            then: 'it can parse a function call expression with a number argument',
            src: 'call func(1)',
            expect: { type: "FunctionCallExpression", name: "func", args: [{ type: "NumberExpression", value: "1" }] }
        }
    ];

    tests.forEach(({ then, src, expect }) => {
        it(then, () => assert.deepEqual(Parser.parse(src), expect))
    })
});
