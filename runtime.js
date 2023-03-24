export const install = (global) => {
    const g = global.____ = {}
         // Stolen from _hyperscript
    g.next = function(start, root, match, wrap) {
             var results = root.querySelectorAll(match);
             for (var i = 0; i < results.length; i++) {
                 var elt = results[i];
                 if (elt.compareDocumentPosition(start) === Node.DOCUMENT_POSITION_PRECEDING) {
                     return elt;
                 }
             }
             if (wrap) {
                 return results[0];
             }
         }
}
export const run = (program, target) => {
    return eval(program)(target)
}
