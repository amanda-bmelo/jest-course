import React from 'react'
import {render, screen} from '@testing-library/react'
import App from '../app'

jest.mock('../calculator', () => {
  return function Calculator() {
    return <div data-testid="calculator">Calculator Component</div>
  }
})

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    test('renders without crashing', () => {
      render(<App />)
      expect(screen.getByTestId('calculator')).toBeInTheDocument()
    })

    test('renders Calculator component', () => {
      const {container} = render(<App />)
      expect(container.innerHTML).toMatchInlineSnapshot(
        `"<div><div data-testid="calculator">Calculator Component</div><div style="margin-top: 30px; text-align: center;">Calculator component <a href="https://codepen.io/mjijackson/pen/xOzyGX">created</a> by <br><a href="https://twitter.com/mjackson">Michael Jackson</a> of <a href="https://reacttraining.com/">React Training</a></div></div>"`,
      )
    })
  })

  describe('Links and Navigation', () => {
    test('contains link to CodePen', () => {
      render(<App />)
      const codePenLink = screen.getByRole('link', {name: 'created'})
      expect(codePenLink).toHaveAttribute(
        'href',
        'https://codepen.io/mjijackson/pen/xOzyGX',
      )
    })

    test('contains link to Twitter', () => {
      render(<App />)
      const twitterLink = screen.getByRole('link', {name: 'Michael Jackson'})
      expect(twitterLink).toHaveAttribute(
        'href',
        'https://twitter.com/mjackson',
      )
    })

    test('contains link to React Training', () => {
      render(<App />)
      const reactTrainingLink = screen.getByRole('link', {
        name: 'React Training',
      })
      expect(reactTrainingLink).toHaveAttribute(
        'href',
        'https://reacttraining.com/',
      )
    })
  })

  describe('Structure and Layout', () => {
    test('has correct container structure', () => {
      const {container} = render(<App />)
      const mainDiv = container.firstChild
      expect(mainDiv.tagName.toLowerCase()).toBe('div')
      expect(mainDiv.children).toHaveLength(2)
    })

    test('contains line break in footer', () => {
      const {container} = render(<App />)
      const brElements = container.querySelectorAll('br')
      expect(brElements).toHaveLength(1)
    })
  })
})
