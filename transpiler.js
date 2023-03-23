export const transpile = (tree) =>
    {
        return `(target) => { return ${transpileContents(tree)} }`;
    }

export const transpileContents = (tree) =>
    {
        if (! typesToTranspileFns[tree.type]) throw new Error(`No transpile fn for type '${tree.type}'`)
        return typesToTranspileFns[tree.type](tree);
    }

// Hint: The structure of these sub-trees is exactly what we returned for it in grammar.pegjs
// Which is also the same structure as tested in parser.test.js
export const typesToTranspileFns = {
    "EmptyProgram" : () => '',
    "Feature": (tree) => `target.addEventListener('${tree.event}', () => { ${typesToTranspileFns["CommandList"](tree.body)} })`,
    "Command": (tree) => typesToTranspileFns[`Command-${tree.command}`](tree),
    "Command-log": ({ args }) => `console.log(${args ? args.map(transpileContents).join(", ") : ""})`,
    "CommandList": (array) => array.map(typesToTranspileFns[`Command`]).join(';'),
    "SelfReferenceExpression": ({  }) => `target`,
    "StringLiteral": ({ value }) => `"${value}"`
}
