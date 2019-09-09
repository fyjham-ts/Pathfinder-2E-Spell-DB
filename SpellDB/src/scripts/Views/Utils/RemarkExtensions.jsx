import ActionIcons from './ActionIcons.jsx';
// Special Syntax: |action|: Action icons

var actionParser = function () {
    var tokenizers = this.Parser.prototype.inlineTokenizers;
    var methods = this.Parser.prototype.inlineMethods;

    var tokenizeActionParser = function (eat, value, silent) {
        var match = /^\|([1-3]|(?:free)|(?:reaction))\|/.exec(value)

        if (match) {
            if (silent) {
                return true;
            }

            return eat(match[0])({
                type: 'ActionIcons',
                action: match[1]
            });
        }
    }
    tokenizeActionParser.locator = function (value, fromIndex) {
        return value.indexOf('|', fromIndex);
    };

    tokenizers.actionParser = tokenizeActionParser;
    methods.splice(methods.indexOf('text'), 0, 'actionParser');
}

export var RemarkPlugins = [
    actionParser
];
export var RemarkRenderers = {
    "ActionIcons": ActionIcons
};