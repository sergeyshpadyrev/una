# Una

<i>Una</i> is a functional programming language that took the best parts from Javascript, Lisp and Python.

## Installation

To use <i>Una</i> to your project you need to install babel plugin:

```
npm i --save-dev babel-plugin-una-language
```

or

```
yarn add -D babel-plugin-una-language
```

then

## Documentation

### Functional operators

#### ->

#### -->

#### <-

#### <--

### Import and export modules

#### =->

#### <-=

## Advanced techniques

### Pattern matching

```
= count <-
    ? (== value 0) 1
    ? (== value 1) 2
    ? (< value 10) 3
    4
```
