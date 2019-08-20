---
title: "Setting up unit tests with Gatsbyjs"
date: "2019-15-08"
description: "Having just installed gatsbyjs, my next aim is to setup gatsby to do Test Driven Development."
---

![ReactJS](../images/gatsby.png)

#Setting up your environment

## Installing dependencies

```
npm install -D jest babel-jest react-test-renderer identity-obj-proxy babel-core@^7.0.0-bridge.0 @babel/core babel-preset-gatsby

```

## Creating a configuration file for Jest

Create jest.config.js
Setup jest-preprocess.js
setup folder `__mocks__`
Note the double underscore for `__mocks__`
setup fileMock.js
setup loadershim.js
setup `__mocks__`/gatsby.js
setup `__tests__`folder in src
setup test for index.js in `__tests__` folder
setup jest in package.json

## Writing tests

I encountered error testing index.js — found out that index.js requires us to mock graphql (i think)
IndexPage › renders correctly
Invariant Violation: mockConstructor(...): Nothing was returned from render. This usually means a return statement is missing. Or, to render nothing, return null.

But testing About.jsx was ok — about only returns <div>About</div>

```
    describe('About', () => {
    it('renders correctly', () => {
    const location = {pathname: '/About',}
    const tree = renderer.create(<About location={location} />).toJSON()
    expect(tree).toMatchSnapshot()})})

```

    -> created ```__test__``` in src/components
    -> wanted to write test for header.js but confused by graphql data

sidetrack — uninstalled react-test-renderer and installed react-testing-library

`npm install -D react-testing-library jest-dom`

setup setup-test-env.js
added setupTestFrameworkScriptFile: “<rootDir>/setup-test-env.js” to jest.config.js

## Wrote passing test for about

```
   describe('About', () => {
   it('renders correctly', () => {
   const location = {
   pathname: '/About',}
   const { getByText } = render(<About location={location} />)
   expect(getByText(/bout/)).toBeInTheDocument() })})

```

## Wrote passing test for header component

```
    it('renders correctly', () => {
    const { getByText } = render(<Header siteTitle="hello" />)
    expect(getByText(/hello/)).toBeInTheDocument() })
```
