const application = (head, ...tail) => `${head}(${tail.map(expression).join(', ')})`

const expression = ast => {
    if (!Array.isArray(ast)) return value(ast)
    if (ast.length === 0) return `()`
    if (ast.length === 1) return expression(ast[0])

    const [head, ...tail] = ast
    if (languageConstructions.hasOwnProperty(head)) return languageConstructions[head](...tail)

    return application(head, ...tail)
}

const nary = symbol => (...parameters) => `(${parameters.map(expression).join(` ${symbol} `)})`
const unary = symbol => parameter => `(${symbol}${expression(parameter)})`

const languageConstructions = {
    '=': (left, ...right) => `const ${expression(left)} = ${expression(right)};`,
    '?': (ifCondition, thenCase, elseCase) =>
        !!elseCase
            ? `${expression(ifCondition)} ? ${expression(thenCase)} : ${expression(elseCase)}`
            : `if (${expression(ifCondition)}) {${expression(thenCase)}}`,
    '|': (...elements) => `[${elements.map(expression).join(', ')}]`,
    '<-': returningValue => `return ${expression(returningValue)}`,

    '+': nary('+'),
    '-': (...parameters) => (parameters.length > 1 ? nary(...parameters) : unary(...parameters)),
    '*': nary('*'),
    '/': nary('/'),
    '%': nary('%'),

    '&&': nary('&&'),
    '||': nary('||'),
    '!': unary('!'),

    '>': nary('>'),
    '>=': nary('>='),
    '<': nary('<'),
    '<=': nary('<='),
    '==': nary('=='),
    '!=': nary('!='),
    '===': nary('==='),
    '!==': nary('!==')
}

const value = ast => ast

module.exports = expression
