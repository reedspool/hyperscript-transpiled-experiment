toplevel =
  feature / expression / empty

empty = _ { return { type: "EmptyProgram" }  }

feature =
        descriptor:featureDescriptor _ NL* _ body:featureBody
        { return { type: 'Feature', event: descriptor.event, body } }

featureDescriptor =
        "on" whitespace _ event:eventName
        { return { event } }

featureBody
  = expression|1.., commandDelimeter|

logExpression = "log" _ arg:expression?
  { return { type: "LogExpression", args: arg ? [arg] : [] } }

expression = selfReferenceExpression / logExpression / functionCallExpression / identifierExpression / stringExpression / numberExpression

numberExpression = [0-9]+ ("." [0-9]+)? { return { type: "NumberExpression", value: text() } }

selfReferenceExpression =
           ("me" / "I") { return { type: "SelfReferenceExpression" } }

functionCallExpression =
           "call" whitespace _ name:jsIdentifier _ "(" _ args:argList _ ")"
           { return { type: "FunctionCallExpression", name, args }}

identifierExpression = jsIdentifier { return { type: "IdentifierExpression", value: text() } }

jsIdentifier = (identifierStart identifierPart*) { return text() }
identifierStart = [a-zA-Z_$]
identifierPart = identifierStart / [0-9]

argList
= expression|.., _ "," _|

commandDelimeter
= _ ";" _
/ _ NL _

eventName =
          "click" /
          "init"

NL = [\n]
// Disregarded whitespace
_ = whitespace*
whitespace = [ \t]

// BEGIN Stolen from PEG.js JavaScript grammar example
// https://github.com/pegjs/pegjs/blob/master/examples/javascript.pegjs

stringExpression
  = '"' chars:DoubleStringCharacter* '"' {
      return { type: "StringExpression", value: chars.join("") };
    }
//     / "'" chars:SingleStringCharacter* "'" {
//       return { type: "Literal", value: chars.join("") };
//     }

// END Stolen from PEG.js JavaScript grammar example

DoubleStringCharacter
 = !('"') char:. { return char }

SingleStringCharacter
 = "\\\'" / .
