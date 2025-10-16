import React from 'react'
import {render, screen} from '@testing-library/react'
import AutoScalingText from '../auto-scaling-text'

describe('AutoScalingText', () => {
  test('renders with children content', () => {
    const testText = '1234567890'
    render(<AutoScalingText>{testText}</AutoScalingText>)
    expect(screen.getByTestId('total')).toBeInTheDocument()
    expect(screen.getByText(testText)).toBeInTheDocument()
  })

  test('renders without children', () => {
    render(<AutoScalingText />)
    const element = screen.getByTestId('total')
    expect(element).toBeInTheDocument()
    expect(element).toBeEmptyDOMElement()
  })

  test('applies correct CSS class', () => {
    render(<AutoScalingText>Test</AutoScalingText>)
    const element = screen.getByTestId('total')
    expect(element).toHaveClass('autoScalingText')
  })

  test('has default transform scale initially', () => {
    render(<AutoScalingText>Short text</AutoScalingText>)
    const element = screen.getByTestId('total')
    expect(element).toHaveStyle('transform: scale(1,1)')
  })

  test('applies transform with scale function format', () => {
    render(<AutoScalingText>Some text content</AutoScalingText>)
    const element = screen.getByTestId('total')
    const transformStyle = element.style.transform
    expect(transformStyle).toMatch(/scale\(\d+(?:\.\d+)?,\d+(?:\.\d+)?\)/)
  })

  test('has ref attribute for DOM measurement', () => {
    render(<AutoScalingText>Test content</AutoScalingText>)
    const element = screen.getByTestId('total')
    expect(element).toBeInTheDocument()
    expect(element.tagName.toLowerCase()).toBe('div')
  })

  test('renders different types of children', () => {
    const {rerender} = render(<AutoScalingText>Text content</AutoScalingText>)
    expect(screen.getByText('Text content')).toBeInTheDocument()
    rerender(
      <AutoScalingText>
        <span>JSX content</span>
      </AutoScalingText>,
    )
    expect(screen.getByText('JSX content')).toBeInTheDocument()
    rerender(<AutoScalingText>{123456}</AutoScalingText>)
    expect(screen.getByText('123456')).toBeInTheDocument()
  })
})
