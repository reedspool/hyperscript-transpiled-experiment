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

expression =
           selfReferenceExpression /
           setExpression /
           styleAttrExpression /
           functionCallExpression /
           nextExpression /
           logExpression /
           // All the things that start with identifiers ("call", "next", "log")
           // must come before identifier expression
           identifierExpression /
           stringExpression /
           // Anything with a number first must come before numbers
           secondsDurationExpression /
           millisecondsDurationExpression /
           numberExpression

logExpression = "log" arg:(whitespace _ expression)?
                { return { type: "LogExpression", args: arg ? [arg[2]] : [] } }

nextExpression = "next" whitespace _ selector:stringExpression
               { return { type: "NextExpression", selector } }

setExpression = "set" whitespace _ target:styleAttrExpression whitespace _ "to" whitespace _ value:expression {
              return { type: "SetExpression", target, value }
}
styleAttrExpression = "*" attr:jsIdentifier target:(whitespace _ "of" whitespace _ expression)?
               { return { type: "StyleAttrExpression", attr, target: target && target[5] } }

millisecondsDurationExpression = value:numberExpression _ "ms" { return { type: "MillisecondsDurationExpression", value } }
secondsDurationExpression = value:numberExpression _ "s" { return { type: "SecondsDurationExpression", value } }
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
