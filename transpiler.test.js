import { match, strictEqual } from 'node:assert';
import { describe, it } from 'node:test';
import * as Parser from './parser.cjs';
import { transpile } from "./transpiler.js";
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe);
const when = wrap('When ')(describe);
const then = wrap('Then ')(it);
const t = (program) => transpile(Parser.parse(program))
const tMatches = (program, regex) => () => match(t(program), regex);
const tEquals = (program, value) => () => strictEqual(t(program), value);
given("a test suite", () => {
    then('assertions don\'t fail', () => strictEqual(1, 1))
})
given("a transpiler", () => {
    then(
        "it provides a transpile function",
        () => strictEqual(typeof transpile, "function"))
    then(
        "it transpiles an empty program",
        tMatches('', /\(target\)\s*=>\s*{\s*return\s*}/))
    when("it transpiles a integer expression", tMatches('3', /3/));
    when("it transpiles a float number expression", tMatches('3.14', /3\.14/));
    when("it transpiles a integer seconds expression to milliseconds", tMatches('3s', /\(\s*3\s*\*\s*1000\)/));
    when("it transpiles a float seconds expression to milliseconds", tMatches('3.14s', /\(\s*3.14\s*\*\s*1000\)/));
    when("it transpiles a integer milliseconds expression", tMatches('5ms', /5/));
    when("it transpiles a float milliseconds expression", tMatches('5.44ms', /5.44/));
    when("it transpiles an untargeted style attr expression", () => {
        const program = t('*backgroundColor');
        then("it attempts to access the style", () => match(program, /backgroundColor/))
        then("it uses the default target", () => match(program, /target\./))
        });
    when("it transpiles a targeted style attr expression", () => {
        const program = t('*backgroundColor of anotherTarget');
        then("it accesses the style ", () => match(program, /\.style\.backgroundColor/))
        then("it uses the given target", () => match(program, /anotherTarget/))
        });
    when("it transpiles a next expression", () => {
        const program = t('next ".clazz"');
        then("it calls the runtime function", () => match(program, /____.next\(/))
        then("it passes the selector", () => match(program, /\.clazz/))
        });
    when("it transpiles setting an untargeted style attr expression to a string", () => {
        const program = t('set *backgroundColor to "blue"');
        then("it accesses the style ", () => match(program, /\.style\.backgroundColor/))
        then("it uses the default target", () => match(program, /target\./))
        then("it sets", () => match(program, /=/))
        then("it provides the value", () => match(program, /blue/))
        });
    then(
        "it transpiles a log command with no text",
        tMatches('log', /console\.log\(\)/))
    then(
        "it transpiles a log command with text",
        tMatches('log "hello"', /console\.log\("hello"\)/))
    when("it transpiles an on-click feature", () => {
        const program = t('on click\nlog "hello"');
        then("it adds an event", () => match(program, /target\.addEventListener/))
        then("it includes a log", () => match(program, /console\.log\("hello"\)/))
    })
    when("it transpiles a self reference", () => {
        then("`me` reflects the target", () => match(t('me'), /return target/))
        then("`I` reflects the target", () => match(t('I'), /return target/))
    })
    when("it transpiles a function call expression", () => {
        then("the function name is present", () => match(t('call myFunc()'), /myFunc/))
        then("the function is called", () => match(t('call myFunc()'), /myFunc\s*\(\s*\)/))
        then("the function is called with arguments", () => match(t('call myFunc(a, b, c)'), /myFunc\s*\(\s*a\s*,\s*b\s*,\s*c\s*\)/))
    })
})
