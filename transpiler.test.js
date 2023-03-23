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
        tMatches('', /\(target\)\s*=>\s*{\s*}/))
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
})
