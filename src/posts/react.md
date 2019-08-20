---
title: "How to use React Testing Library to rewrite an Enzyme Component test"
date: "2019-16-08"
description: "A mini-rewrite case study of two testing libraries."
---

![ReactJS](../images/reactjs.jpeg)

## Learnings from a recent conversion

At Flatiron School, we have been adding a ton of new test coverage using Kent Dodd’s React Testing Library. Check out my blog post on Creating Readable Tests Using React Testing Library for some awesome tips on using the tool (I know, I know! That was a shameless plug). As we’ve been improving our overall front end (FE) test coverage, there have been certain React components using Enzyme tests that needed some attention.
Since I’ve been learning a lot in this conversion process, I wanted to share some solutions so that you too might be able to convert tests around a React component from using Enzyme to using React Testing Library. I also wanted to share some cool bonuses you might get in the process of conversion (improved test coverage anyone?).

## Quick Setup Info

This is using code that has been slightly modified and simplified from our code base. To get this running locally, copy the code over to a simple Create React App and add the React Testing Library.

## The Component(s) we are testing

The core component we will be testing is for a textarea input that uses a secondary child component to render an error message. Here is what the code looks like:

```
// TextAreaInput.jsx
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import InputError from './InputError'

const TextAreaInput = ({
labelText,
id,
className,
labelClassName,
errorMessage,
disabled,
handleOnChange,
name,
…props
}) => {
let inputClassName = `input${className ?` \${className}`: ''}`
const forId = id || name

if (errorMessage) {
inputClassName = `${inputClassName} red-border`
}

if (disabled) {
inputClassName = `${inputClassName} disabled-input`
}

return (
<Fragment>
<label className={labelClassName} htmlFor={forId} >
{labelText}
</label>
<textarea
{…props}
className={inputClassName}
id={forId}
disabled={disabled}
onChange={handleOnChange}
/>
<InputError errorMessage={errorMessage} />
</Fragment>
)
}

TextAreaInput.propTypes = {
labelText: PropTypes.string,
errorMessage: PropTypes.string,
value: PropTypes.string,
id: PropTypes.string,
placeholder: PropTypes.string,
 className: PropTypes.string,
labelClassName: PropTypes.string,
disabled: PropTypes.bool,
name: PropTypes.string.isRequired,
handleOnChange: PropTypes.func.isRequired
}

TextAreaInput.defaultProps = {
labelText: '',
errorMessage: '',
placeholder: '',
className: '',
labelClassName: 'large-heading',
disabled: false
}

export default TextAreaInput

// InputError.jsx
import React from 'react'
import PropTypes from 'prop-types'

const InputError = ({ className, typographyClass, errorMessage }) => {
const cssClasses = `${typographyClass} ${className}`

if (!errorMessage) { return null }

return (

<div className={cssClasses}>
{errorMessage}
</div>
)
}

InputError.propTypes = {
className: PropTypes.string,
errorMessage: PropTypes.string,
typographyClass: PropTypes.string
}

InputError.defaultProps = {
className: '',
errorMessage: '',
typographyClass: 'large-heading red-heading smaller-font-size unselectable'
}

export default InputError

```

## The original Enzyme test

This is what our current tests look like:

```

import React from 'react'
import { shallow } from 'enzyme'
import TextAreaInput from './TextAreaInput'
import InputError from './InputError'

describe('<TextAreaInput />', function testsRelyOnTHIS () {
beforeEach(() => {
this.labelText = 'Input text label'
this.labelClassName = 'label-class'
this.inputClassName = 'input-class'
this.onClick = 'hello'
this.errorMessage = 'Invalid input'
this.wrapper = shallow(
<TextAreaInput
labelText={ this.labelText }
labelClassName={ this.labelClassName }
className={ this.inputClassName }
onClick={ this.onClick }
errorMessage={ this.errorMessage }
handleOnChange={() => {}}
/>
)
})

it('renders the provided label text', () => {
const node = this.wrapper.find('label')

expect(node).toHaveText(this.labelText)
})

it('adds the labelClassName to the label element', () => {
const node = this.wrapper.find('label')

expect(node).toHaveClassName(this.labelClassName)
})

it('renders an input textarea', () => {
const node = this.wrapper.find('textarea')

expect(node).toExist()
})

it('adds the inputClassName to the textarea element', () => {
const node = this.wrapper.find('textarea')

expect(node).toHaveClassName(this.inputClassName)
})

it('renders the input error component with the errorMessage prop', () => {
const node = this.wrapper.find(InputError)

expect(node).toHaveProp('errorMessage', this.errorMessage)
})
})

```

So before we start refactoring and talking about changes, we should state some facts about our tests using the Jest coverage tool. Running yarn test — coverage (or npm run test — coverage, if you use NPM), I get the following info:

1. 54 lines of code in test file.
2. The code coverage for TextAreaInput.jsx is currently 90% on statements and 62.5% for branches.
3. The code coverage for required InputError.jsx is currently 42.86% on statements and 0% for branches.

- The overall code coverage for both components is currently 72.2% on statements and 50% for branches.

## {mount, shallow} vs render

With Enzyme we have the concepts of Mount and Shallow for rendering component. This is a really good Gist on the differences: Difference between Shallow, Mount and render of Enzyme. Basic answer: Mount renders everything and allows all lifecycle methods to be used & Shallow only renders the component with limited functionality and no child components. This allows for basic unit testing, but the UI never really works independently of itself, so we’ve found that we get brittle test coverage when we used Shallow in the past.
The tests we have above only use Shallow, so each component is tested individually and does not signify that the component is working together as a whole in the UI.
The Render function we will be using from the React Testing Library works similarly to Mount and will render all of the child components for us as well as have access to lifecycle methods (our example code uses stateless components so this is a non-issue for the following tests) in its mount and un-mounting process.

## Looking for similar test patterns

So the first thing I like to do is try to find testing strategies that work in Enzyme and React Testing Library (i.e. Integration Testing or as a user would interact with the component).
So for example, let’s refactor this portion:

```
import React from 'react'
import { shallow } from 'enzyme'
import TextAreaInput from './TextAreaInput'

describe('<TextAreaInput />', function testsRelyOnTHIS () {
beforeEach(() => {
this.labelText = 'Input text label'
this.labelClassName = 'label-class'
this.inputClassName = 'input-class'
this.onClick = 'hello'
this.errorMessage = 'Invalid input'
this.wrapper = shallow(
<TextAreaInput
labelText={ this.labelText }
labelClassName={ this.labelClassName }
className={ this.inputClassName }
onClick={ this.onClick }
errorMessage={ this.errorMessage }
handleOnChange={() => {}}
/>
)
})

it('renders the provided label text', () => {
const node = this.wrapper.find('label')

expect(node).toHaveText(this.labelText)
})
})

```
