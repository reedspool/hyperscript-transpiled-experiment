import { match, strictEqual, ok, deepEqual } from 'node:assert';
import { describe, it, test } from 'node:test';
import sinon, { fake, replace, restore, useFakeTimers } from "sinon"
import * as Parser from './parser.cjs';
import { transpile } from "./transpiler.js";
import { run } from "./runtime.js";
const wrap = (text) => (fn) => (text2, ...args) => fn(text + text2, ...args)
const given = wrap('Given ')(describe);
const when = wrap('When ')(it);
const then = wrap('Then ')(it);
const t7e = (program) => transpile(Parser.parse(program))

test("runtime", async (t) => {
    await t.test('it runs an empty program', () => run(t7e('')))
    await t.test('it runs a number expression', async (t) => {
        await t.test("it returns a JS value for an integer", async () => strictEqual(await run(t7e('3')), 3));
        await t.test("it returns a JS value for a float", async () => strictEqual(await run(t7e('3.14')), 3.14));
    })
    await t.test('it runs a duration expression', async (t) => {
        await t.test("it returns an integer second value * 1000", async () => strictEqual(await run(t7e('3s')), 3000));
        await t.test("it returns an float second value * 1000", async () => strictEqual(await run(t7e('3.14s')), 3140));
        await t.test("it returns an integer millisecond value", async () => strictEqual(await run(t7e('3ms')), 3));
        await t.test("it returns an float millisecond value", async () => strictEqual(await run(t7e('3.14ms')), 3.14));
    })
    await t.test('it runs a wait expression', async (t) => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const clock = useFakeTimers()
        const wait = fake()
        global.____ = { wait }

        const output = run(t7e('wait 1234ms then log "hello"'))
        // clock.tick(1232);
        await t.test("it doesn't continue too soon", () => strictEqual(consoleLog.callCount, 0));
        // clock.tick(1);
        await t.test("it continues on time", () => strictEqual(consoleLog.callCount, 1));
        await t.test("it calls global wait function", () => strictEqual(____.wait.callCount, 1));
        await t.test("it calls global wait function correctly", () => deepEqual(____.wait.firstCall.args, [1234]));
        clock.restore();
        restore();
    })
    await t.test('it runs a self reference expression', async (t) => {
        const target = {};
        await t.test("`me` returns target", async () => strictEqual(await run(t7e('me'), target), target));
        await t.test("`I` returns target", async () => strictEqual(await run(t7e('I'), target), target));
    })
    await t.test('it runs an untargeted style attr expression', async (t) => {
        const target = { style: { backgroundColor : "tomato" } };
        const output = await run(t7e('*backgroundColor'), target)
        await t.test("it returns a JS value", () => strictEqual(output, "tomato"));
    })
    await t.test('it runs a targeted style attr expression', async (t) => {
        const next = { style: { fontSize : 3.14 } }
        global.____ = { next: () => next }
        global.document = { body: {} };
        const target = {};
        const output = await run(t7e('*fontSize of next ".clazz"'), target)
        await t.test("it returns a JS value", () => strictEqual(output, 3.14));
    })
    await t.test('it runs a next expression', async (t) => {
        global.____ = { next: fake() }
        global.document = { body: {} };
        const target = {};
        const output = await run(t7e('next ".clazz"'), target)
        await t.test("it returns an HTML element", () => strictEqual(output, undefined));
        await t.test("it calls global next function", () => strictEqual(____.next.callCount, 1));
        await t.test("it calls global next function correctly", () => deepEqual(____.next.firstCall.args, [target, document.body, ".clazz", false]));
        restore();
    })
    await t.test('it runs an empty log command', async (t) => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const output = await run(t7e('log'))
        await t.test("it returns undefined", () => strictEqual(output, undefined));
        await t.test("it calls console.log", () => strictEqual(consoleLog.callCount, 1));
        await t.test("it calls console.log with no args", () => ok(consoleLog.calledWithExactly()));

        restore();
    })
    await t.test('it runs a log command with some text', async (t) => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const output = await run(t7e('log "hello"'))
        await t.test("it returns undefined", () => strictEqual(output, undefined));
        await t.test("it calls console.log", () => strictEqual(consoleLog.callCount, 1));
        await t.test("it calls console.log with string", () => ok(consoleLog.calledWithExactly("hello")));
        restore();
    })
    await t.test('it runs two logs concatenated by `then`', async (t) => {
        const consoleLog = fake();
        replace(console, "log", consoleLog)
        const output = await run(t7e('log "first" then log "second"'))
        await t.test("it returns undefined", () => strictEqual(output, undefined));
        await t.test("it calls console.log", () => strictEqual(consoleLog.callCount, 2));
        await t.test("it calls console.log with the first string", () => deepEqual(consoleLog.firstCall.args, ["first"]));
        await t.test("it calls console.log with the second string", () => deepEqual(consoleLog.secondCall.args, ["second"]));
        restore();
    })
    await t.test('it runs a function call expression', async (t) => {
        const consoleLog = fake();
        global.consoleLog = consoleLog;
        const output = await run(t7e('call consoleLog("hello")'))
        await t.test("it returns undefined", () => strictEqual(output, undefined));
        await t.test("it calls the given function", () => strictEqual(consoleLog.callCount, 1));
        restore();
    })
    await t.test('it runs an on-click feature', async (t) => {
        const consoleLog = fake();
        replace(console, "log", consoleLog);
        const addEventListener = fake();
        const target = { addEventListener };
        const output = await run(t7e('on click\nlog "hello"'), target)
        await t.test("it returns undefined", () => strictEqual(output, undefined));
        await t.test("it calls addEventListener", () => strictEqual(addEventListener.callCount, 1));
        await t.test("it calls addEventListener on target", () => ok(addEventListener.calledOn(target)));
        const [ _, listener ] = addEventListener.args[0]
        strictEqual(typeof listener, "function")
        await t.test("it doesn't call console.log until listener fired", () => {
            strictEqual(consoleLog.callCount, 0)
            listener();
            strictEqual(consoleLog.callCount, 1)
            restore();
        });
    })
});
