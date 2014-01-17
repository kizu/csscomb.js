module.exports = {

    /**
     * Sets handler value.
     *
     * @param {Array} value Option value
     * @returns {Object|undefined}
     */
    setValue: function(value) {
        delete this._value;

        if (typeof value === 'string' && value.match(/^[ \t\n]*$/)) {
            this._value = value;
        }

        if (typeof this._value === 'string') return this;
    },

    /**
     * Processes tree node.
     * @param {String} nodeType
     * @param {node} node
     */
    process: function(nodeType, node) {
        // Process the commas inside the selectors
        if (nodeType === 'selector') {
            for (var i = node.length; i--;) {
                // Look if the previous item is comma
                if (i > 0 && node[i - 1][0] === 'delim') {
                    // Look if the first simpleSelector have a whitespace node
                    if (node[i][1][0][0] === 's') {
                        if (this._value === '') {
                            node[i].splice(1, 1);
                        } else {
                            node[i][1][1] = this._value;
                        }
                    } else if (this._value !== '') {
                        // Insert the whitespace node if we need
                        node[i].splice(1, 0, ['s', this._value]);
                    }
                }
            }
        }

        // Process the commas iside the values
        // if (nodeType === 'value') {
        //     console.log('');
        //     console.log('');
        //     console.log(nodeType);
        //     console.log(node);
        // }

        // // Process the commas inside the functions
        // if (nodeType === 'functionBody') {
        //     console.log('');
        //     console.log('');
        //     console.log(nodeType);
        //     console.log(node);
        // }


    },

    /**
     * Detects the value of an option at the tree node.
     *
     * @param {String} nodeType
     * @param {node} node
     */
    detect: function(nodeType, node) {
        // Detect the whitespace after commas inside the selectors
        if (nodeType === 'selector') {
            var variants = {};
            var bestGuess = null;
            var maximum = 0;
            for (var i = node.length; i--;) {
                var result = null;
                // Look if the previous item is comma
                if (i > 0 && node[i - 1][0] === 'delim') {
                    if (node[i][1][0][0] === 's') {
                        result = node[i][1][1];
                    } else {
                        result = '';
                    }
                }

                if (result !== null) {
                    if (variants[result]) {
                        variants[result]++;
                    } else {
                        variants[result] = 1;
                    }
                    if (variants[result] > maximum) {
                        maximum = variants[result];
                        bestGuess = result;
                    }
                }

            }
            if (bestGuess !== null) {
                return bestGuess;
            }
        }

    }
};
