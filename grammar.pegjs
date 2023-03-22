toplevel =
  command / feature

feature =
        descriptor:featureDescriptor NL body:featureBody
        { return { type: 'Feature', event: descriptor.event, body } }

featureDescriptor =
        "on" whitespace _ event:eventName
        { return { event } }

featureBody
  = command|1.., commandDelimeter|

command = command:"log" args:( whitespace _ StringLiteral )?
  { return { type: "Command", command, args: args && [args[2]] } }

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

StringLiteral
  = '"' chars:DoubleStringCharacter* '"' {
      return { type: "StringLiteral", value: chars.join("") };
    }
//     / "'" chars:SingleStringCharacter* "'" {
//       return { type: "Literal", value: chars.join("") };
//     }

// END Stolen from PEG.js JavaScript grammar example

DoubleStringCharacter
 = !('"') char:. { return char }

SingleStringCharacter
 = "\\\'" / .
