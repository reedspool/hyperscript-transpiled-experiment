import { match, strictEqual, ok } from 'node:assert';
import { describe, it } from 'node:test';
import sinon, { fake, replace, restore } from "sinon"
import * as Parser from './parser.cjs';
import { transpile } from "./transpiler.js";
import { run } from "./runtime.js";
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe);
const when = wrap('When ')(describe);
const then = wrap('Then ')(it);
const t = (program) => transpile(Parser.parse(program))


given("a runtime", () => {
    then('it runs an empty program', () => run(t('')))
    when('it runs an empty log command', () => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const output = run(t('log'))
        then("it returns undefined", () => strictEqual(output, undefined));
        then("it calls console.log", () => strictEqual(consoleLog.callCount, 1));
        then("it calls console.log with no args", () => ok(consoleLog.calledWithExactly()));

        restore();
    })
    when('it runs a self reference expression', () => {
        const target = {};
        let output = run(t('me'), target)
        then("`me` returns target", () => strictEqual(output, target));
        output = run(t('I'), target)
        then("`I` returns target", () => strictEqual(output, target));
    })
    when('it runs a log command with some text', () => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const output = run(t('log "hello"'))
        then("it returns undefined", () => strictEqual(output, undefined));
        then("it calls console.log", () => strictEqual(consoleLog.callCount, 1));
        then("it calls console.log with string", () => ok(consoleLog.calledWithExactly("hello")));
        restore();
    })
    when('it runs a function call expression', () => {
        const consoleLog = fake();
        global.consoleLog = consoleLog;
        const output = run(t('call consoleLog("hello")'))
        then("it returns undefined", () => strictEqual(output, undefined));
        then("it calls the given function", () => strictEqual(consoleLog.callCount, 1));
        restore();
    })
    when('it runs an on-click feature', () => {
        const consoleLog = fake();
        replace(console, "log", consoleLog);
        const addEventListener = fake();
        const target = { addEventListener };
        const output = run(t('on click\nlog "hello"'), target)
        then("it returns undefined", () => strictEqual(output, undefined));
        then("it calls addEventListener", () => strictEqual(addEventListener.callCount, 1));
        then("it calls addEventListener on target", () => ok(addEventListener.calledOn(target)));
        const [ _, listener ] = addEventListener.args[0]
        strictEqual(typeof listener, "function")
        then("it doesn't call console.log until listener fired", () => {
            strictEqual(consoleLog.callCount, 0)
            listener();
            strictEqual(consoleLog.callCount, 1)
            restore();
        });
    })
})
