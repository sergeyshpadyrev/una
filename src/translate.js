module.exports = config => {
    const translateRules = require('./translate.rules')(config)
    const translate = node => {
        if (!Array.isArray(node)) {
            switch (node) {
                case '::':
                    return '[]'
                case ':':
                    return '{}'
                default:
                    return node
            }
        }
        if (node.length === 1) return translate(node[0])

        const [value, ...children] = node
        const translateRule = translateRules[value]
        if (translateRule) return translateRule(translate, value, children)

        if (typeof value === 'string' && value.startsWith('.') && value.length > 1) {
            const field = `${translate(children[0])}.${value.substring(1)}`
            return children.length > 1 ? `${field}(${children.slice(1).map(translate).join(', ')})` : field
        }

        return !!children && children.length > 0 ? `${translate(value)}(${children.map(translate).join(', ')})` : node
    }

    return translate
}
