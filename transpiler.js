export const transpile = (tree) =>
    {
        return `(target) => { return ${transpileContents(tree)} }`;
    }

export const transpileContents = (tree) =>
    {
        if (! tree) throw new Error("No tree passed to transpile")
        if (! typesToTranspileFns[tree.type]) throw new Error(`No transpile fn for type '${tree.type}'`)
        return typesToTranspileFns[tree.type](tree);
    }

// Hint: The structure of these sub-trees is exactly what we returned for it in grammar.pegjs
// Which is also the same structure as tested in parser.test.js
export const typesToTranspileFns = {
    "EmptyProgram" : () => '',
    "Feature": (tree) => `target.addEventListener('${tree.event}', () => { ${typesToTranspileFns["CommandList"](tree.body)} })`,
    "StyleAttrExpression": ({ attr, target }) => `${target ? transpileContents(target) : 'target'}.style.${attr}`,
    "SetExpression": ({ attr, target, value }) => `${transpileContents(target)} = ${transpileContents(value)}`,
    "NumberExpression": ({ value }) => `${value}`,
    "SecondsDurationExpression": ({ value }) => `(${transpileContents(value)} * 1000)`,
    "MillisecondsDurationExpression": ({ value }) => `${transpileContents(value)}`,
    "NextExpression": ({ selector }) => `____.next(target, document.body, ${transpileContents(selector)}, false)`,
    "LogExpression": ({ args }) => `console.log(${args.length > 0 ? args.map(transpileContents).join(", ") : ""})`,
    "CommandList": (array) => array.map(transpileContents).join(';'),
    "SelfReferenceExpression": ({  }) => `target`,
    "FunctionCallExpression": ({ name, args }) => `${name}(${args.map(transpileContents).join(", ")})`,
    "IdentifierExpression": ({ value }) => `${value}`,
    "StringExpression": ({ value }) => `"${value}"`
}
