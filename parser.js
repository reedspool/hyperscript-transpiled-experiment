// Generated by Peggy 3.0.2.
//
// https://peggyjs.org/

"use strict";

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { toplevel: peg$parsetoplevel };
  var peg$startRuleFunction = peg$parsetoplevel;

  var peg$c0 = "on";
  var peg$c1 = "then";
  var peg$c2 = "log";
  var peg$c3 = "next";
  var peg$c4 = "set";
  var peg$c5 = "to";
  var peg$c6 = "*";
  var peg$c7 = "of";
  var peg$c8 = "wait";
  var peg$c9 = "ms";
  var peg$c10 = "s";
  var peg$c11 = ".";
  var peg$c12 = "me";
  var peg$c13 = "I";
  var peg$c14 = "call";
  var peg$c15 = "(";
  var peg$c16 = ")";
  var peg$c17 = ",";
  var peg$c18 = ";";
  var peg$c19 = "click";
  var peg$c20 = "init";
  var peg$c21 = "\"";
  var peg$c22 = "\\'";

  var peg$r0 = /^[0-9]/;
  var peg$r1 = /^[a-zA-Z_$]/;
  var peg$r2 = /^[\n]/;
  var peg$r3 = /^[ \t]/;

  var peg$e0 = peg$literalExpectation("on", false);
  var peg$e1 = peg$literalExpectation("then", false);
  var peg$e2 = peg$literalExpectation("log", false);
  var peg$e3 = peg$literalExpectation("next", false);
  var peg$e4 = peg$literalExpectation("set", false);
  var peg$e5 = peg$literalExpectation("to", false);
  var peg$e6 = peg$literalExpectation("*", false);
  var peg$e7 = peg$literalExpectation("of", false);
  var peg$e8 = peg$literalExpectation("wait", false);
  var peg$e9 = peg$literalExpectation("ms", false);
  var peg$e10 = peg$literalExpectation("s", false);
  var peg$e11 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e12 = peg$literalExpectation(".", false);
  var peg$e13 = peg$literalExpectation("me", false);
  var peg$e14 = peg$literalExpectation("I", false);
  var peg$e15 = peg$literalExpectation("call", false);
  var peg$e16 = peg$literalExpectation("(", false);
  var peg$e17 = peg$literalExpectation(")", false);
  var peg$e18 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", "$"], false, false);
  var peg$e19 = peg$literalExpectation(",", false);
  var peg$e20 = peg$literalExpectation(";", false);
  var peg$e21 = peg$literalExpectation("click", false);
  var peg$e22 = peg$literalExpectation("init", false);
  var peg$e23 = peg$classExpectation(["\n"], false, false);
  var peg$e24 = peg$classExpectation([" ", "\t"], false, false);
  var peg$e25 = peg$literalExpectation("\"", false);
  var peg$e26 = peg$anyExpectation();
  var peg$e27 = peg$literalExpectation("\\'", false);

  var peg$f0 = function() { return { type: "EmptyProgram" }  };
  var peg$f1 = function(descriptor, body) { return { type: 'Feature', event: descriptor.event, body } };
  var peg$f2 = function(event) { return { event } };
  var peg$f3 = function(first, next) {
                   return next ? { type: "CompoundExpression", first, next: next[5] } : first
};
  var peg$f4 = function(arg) { return { type: "LogExpression", args: arg ? [arg[2]] : [] } };
  var peg$f5 = function(selector) { return { type: "NextExpression", selector } };
  var peg$f6 = function(target, value) {
              return { type: "SetExpression", target, value }
};
  var peg$f7 = function(attr, target) { return { type: "StyleAttrExpression", attr, target: target && target[5] } };
  var peg$f8 = function(duration) { return { type: "WaitExpression", duration: duration && duration[2] } };
  var peg$f9 = function(value) { return { type: "MillisecondsDurationExpression", value } };
  var peg$f10 = function(value) { return { type: "SecondsDurationExpression", value } };
  var peg$f11 = function() { return { type: "NumberExpression", value: text() } };
  var peg$f12 = function() { return { type: "SelfReferenceExpression" } };
  var peg$f13 = function(name, args) { return { type: "FunctionCallExpression", name, args }};
  var peg$f14 = function() { return { type: "IdentifierExpression", value: text() } };
  var peg$f15 = function() { return text() };
  var peg$f16 = function(chars) {
      return { type: "StringExpression", value: chars.join("") };
    };
  var peg$f17 = function(char) { return char };
  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;

  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parsetoplevel() {
    var s0;

    s0 = peg$parsefeature();
    if (s0 === peg$FAILED) {
      s0 = peg$parsecompoundExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parseempty();
      }
    }

    return s0;
  }

  function peg$parseempty() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parse_();
    peg$savedPos = s0;
    s1 = peg$f0();
    s0 = s1;

    return s0;
  }

  function peg$parsefeature() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsefeatureDescriptor();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      s3 = [];
      s4 = peg$parseNL();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseNL();
      }
      s4 = peg$parse_();
      s5 = peg$parsefeatureBody();
      if (s5 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f1(s1, s5);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefeatureDescriptor() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c0) {
      s1 = peg$c0;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        s4 = peg$parseeventName();
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f2(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefeatureBody() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parsecompoundExpression();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$currPos;
      s3 = peg$parsecommandDelimeter();
      if (s3 !== peg$FAILED) {
        s3 = peg$parsecompoundExpression();
        if (s3 === peg$FAILED) {
          peg$currPos = s2;
          s2 = peg$FAILED;
        } else {
          s2 = s3;
        }
      } else {
        s2 = s3;
      }
    }
    if (s1.length < 1) {
      peg$currPos = s0;
      s0 = peg$FAILED;
    } else {
      s0 = s1;
    }

    return s0;
  }

  function peg$parsecompoundExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$parseexpression();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parsewhitespace();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        if (input.substr(peg$currPos, 4) === peg$c1) {
          s5 = peg$c1;
          peg$currPos += 4;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
        if (s5 !== peg$FAILED) {
          s6 = peg$parsewhitespace();
          if (s6 !== peg$FAILED) {
            s7 = peg$parse_();
            s8 = peg$parseexpression();
            if (s8 !== peg$FAILED) {
              s3 = [s3, s4, s5, s6, s7, s8];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f3(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseexpression() {
    var s0;

    s0 = peg$parseselfReferenceExpression();
    if (s0 === peg$FAILED) {
      s0 = peg$parsesetExpression();
      if (s0 === peg$FAILED) {
        s0 = peg$parsestyleAttrExpression();
        if (s0 === peg$FAILED) {
          s0 = peg$parsefunctionCallExpression();
          if (s0 === peg$FAILED) {
            s0 = peg$parsenextExpression();
            if (s0 === peg$FAILED) {
              s0 = peg$parselogExpression();
              if (s0 === peg$FAILED) {
                s0 = peg$parsewaitExpression();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseidentifierExpression();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsestringExpression();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsesecondsDurationExpression();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsemillisecondsDurationExpression();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parsenumberExpression();
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parselogExpression() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c2) {
      s1 = peg$c2;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e2); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parsewhitespace();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parseexpression();
        if (s5 !== peg$FAILED) {
          s3 = [s3, s4, s5];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f4(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenextExpression() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c3) {
      s1 = peg$c3;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        s4 = peg$parsestringExpression();
        if (s4 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f5(s4);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesetExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 3) === peg$c4) {
      s1 = peg$c4;
      peg$currPos += 3;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e4); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        s4 = peg$parsesettableExpression();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsewhitespace();
          if (s5 !== peg$FAILED) {
            s6 = peg$parse_();
            if (input.substr(peg$currPos, 2) === peg$c5) {
              s7 = peg$c5;
              peg$currPos += 2;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e5); }
            }
            if (s7 !== peg$FAILED) {
              s8 = peg$parsewhitespace();
              if (s8 !== peg$FAILED) {
                s9 = peg$parse_();
                s10 = peg$parseexpression();
                if (s10 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s0 = peg$f6(s4, s10);
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesettableExpression() {
    var s0;

    s0 = peg$parsestyleAttrExpression();
    if (s0 === peg$FAILED) {
      s0 = peg$parseidentifierExpression();
    }

    return s0;
  }

  function peg$parsestyleAttrExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 42) {
      s1 = peg$c6;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsejsIdentifier();
      if (s2 !== peg$FAILED) {
        s3 = peg$currPos;
        s4 = peg$parsewhitespace();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (input.substr(peg$currPos, 2) === peg$c7) {
            s6 = peg$c7;
            peg$currPos += 2;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e7); }
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parsewhitespace();
            if (s7 !== peg$FAILED) {
              s8 = peg$parse_();
              s9 = peg$parseexpression();
              if (s9 !== peg$FAILED) {
                s4 = [s4, s5, s6, s7, s8, s9];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        peg$savedPos = s0;
        s0 = peg$f7(s2, s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsewaitExpression() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c8) {
      s1 = peg$c8;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parsewhitespace();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        s5 = peg$parsedurationExpression();
        if (s5 !== peg$FAILED) {
          s3 = [s3, s4, s5];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f8(s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsedurationExpression() {
    var s0;

    s0 = peg$parsemillisecondsDurationExpression();
    if (s0 === peg$FAILED) {
      s0 = peg$parsesecondsDurationExpression();
    }

    return s0;
  }

  function peg$parsemillisecondsDurationExpression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsenumberExpression();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.substr(peg$currPos, 2) === peg$c9) {
        s3 = peg$c9;
        peg$currPos += 2;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e9); }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f9(s1);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsesecondsDurationExpression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsenumberExpression();
    if (s1 !== peg$FAILED) {
      s2 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 115) {
        s3 = peg$c10;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e10); }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f10(s1);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumberExpression() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = [];
    if (peg$r0.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e11); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 46) {
        s3 = peg$c11;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e12); }
      }
      if (s3 !== peg$FAILED) {
        s4 = [];
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s5 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e11); }
        }
        if (s5 !== peg$FAILED) {
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            if (peg$r0.test(input.charAt(peg$currPos))) {
              s5 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e11); }
            }
          }
        } else {
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s3 = [s3, s4];
          s2 = s3;
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f11();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseselfReferenceExpression() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c12) {
      s1 = peg$c12;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s1 === peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 73) {
        s1 = peg$c13;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e14); }
      }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f12();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsefunctionCallExpression() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c14) {
      s1 = peg$c14;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e15); }
    }
    if (s1 !== peg$FAILED) {
      s2 = peg$parsewhitespace();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        s4 = peg$parsejsIdentifier();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (input.charCodeAt(peg$currPos) === 40) {
            s6 = peg$c15;
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e16); }
          }
          if (s6 !== peg$FAILED) {
            s7 = peg$parse_();
            s8 = peg$parseargList();
            s9 = peg$parse_();
            if (input.charCodeAt(peg$currPos) === 41) {
              s10 = peg$c16;
              peg$currPos++;
            } else {
              s10 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e17); }
            }
            if (s10 !== peg$FAILED) {
              peg$savedPos = s0;
              s0 = peg$f13(s4, s8);
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseidentifierExpression() {
    var s0, s1;

    s0 = peg$currPos;
    s1 = peg$parsejsIdentifier();
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f14();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsejsIdentifier() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$currPos;
    s2 = peg$parseidentifierStart();
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseidentifierPart();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseidentifierPart();
      }
      s2 = [s2, s3];
      s1 = s2;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f15();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseidentifierStart() {
    var s0;

    if (peg$r1.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }

    return s0;
  }

  function peg$parseidentifierPart() {
    var s0;

    s0 = peg$parseidentifierStart();
    if (s0 === peg$FAILED) {
      if (peg$r0.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e11); }
      }
    }

    return s0;
  }

  function peg$parseargList() {
    var s0, s1, s2, s3, s4, s5;

    s0 = [];
    s1 = peg$parseexpression();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$currPos;
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (input.charCodeAt(peg$currPos) === 44) {
        s4 = peg$c17;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e19); }
      }
      if (s4 !== peg$FAILED) {
        s5 = peg$parse_();
        s3 = [s3, s4, s5];
        s2 = s3;
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s2 = peg$parseexpression();
        if (s2 === peg$FAILED) {
          peg$currPos = s1;
          s1 = peg$FAILED;
        } else {
          s1 = s2;
        }
      } else {
        s1 = s2;
      }
    }

    return s0;
  }

  function peg$parsecommandDelimeter() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 59) {
      s2 = peg$c18;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e20); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parse_();
      s2 = peg$parseNL();
      if (s2 !== peg$FAILED) {
        s3 = peg$parse_();
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseeventName() {
    var s0;

    if (input.substr(peg$currPos, 5) === peg$c19) {
      s0 = peg$c19;
      peg$currPos += 5;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }
    if (s0 === peg$FAILED) {
      if (input.substr(peg$currPos, 4) === peg$c20) {
        s0 = peg$c20;
        peg$currPos += 4;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e22); }
      }
    }

    return s0;
  }

  function peg$parseNL() {
    var s0;

    if (peg$r2.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e23); }
    }

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    s0 = [];
    s1 = peg$parsewhitespace();
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      s1 = peg$parsewhitespace();
    }

    return s0;
  }

  function peg$parsewhitespace() {
    var s0;

    if (peg$r3.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e24); }
    }

    return s0;
  }

  function peg$parsestringExpression() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 34) {
      s1 = peg$c21;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e25); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseDoubleStringCharacter();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseDoubleStringCharacter();
      }
      if (input.charCodeAt(peg$currPos) === 34) {
        s3 = peg$c21;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e25); }
      }
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f16(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseDoubleStringCharacter() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = peg$currPos;
    peg$silentFails++;
    if (input.charCodeAt(peg$currPos) === 34) {
      s2 = peg$c21;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e25); }
    }
    peg$silentFails--;
    if (s2 === peg$FAILED) {
      s1 = undefined;
    } else {
      peg$currPos = s1;
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      if (input.length > peg$currPos) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e26); }
      }
      if (s2 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f17(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSingleStringCharacter() {
    var s0;

    if (input.substr(peg$currPos, 2) === peg$c22) {
      s0 = peg$c22;
      peg$currPos += 2;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e27); }
    }
    if (s0 === peg$FAILED) {
      if (input.length > peg$currPos) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e26); }
      }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
