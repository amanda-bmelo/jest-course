import React from 'react'
import {render, screen} from '@testing-library/react'
import CalculatorDisplay from '../calculator-display'

jest.mock('../utils', () => ({
  getFormattedValue: jest.fn(value => value),
}))

import {getFormattedValue} from '../utils'
const mockGetFormattedValue = getFormattedValue

describe('CalculatorDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetFormattedValue.mockImplementation(value => value)
  })

  describe('Basic Rendering', () => {
    test('renders with basic numeric value', () => {
      render(<CalculatorDisplay value="0" />)
      expect(screen.getByTestId('total')).toBeInTheDocument()
    })

    test('renders with different values', () => {
      mockGetFormattedValue.mockReturnValue('123')
      render(<CalculatorDisplay value="123" />)
      expect(screen.getByText('123')).toBeInTheDocument()
    })

    test('calls getFormattedValue with correct parameters', () => {
      render(<CalculatorDisplay value="42" />)
      expect(mockGetFormattedValue).toHaveBeenCalledWith(
        '42',
        expect.any(String),
      )
    })
  })

  describe('Props and Attributes', () => {
    test('accepts additional props', () => {
      render(
        <CalculatorDisplay
          value="100"
          data-testid="custom-display"
          className="custom-class"
        />,
      )

      const element = screen.getByTestId('custom-display')
      expect(element).toHaveClass('custom-class')
    })

    test('renders as div element', () => {
      render(<CalculatorDisplay value="50" />)
      const container = screen.getByTestId('total').parentElement
      expect(container.tagName.toLowerCase()).toBe('div')
    })
  })

  describe('Integration Tests', () => {
    test('renders AutoScalingText component', () => {
      render(<CalculatorDisplay value="999" />)
      const autoScalingElement = screen.getByTestId('total')
      expect(autoScalingElement).toBeInTheDocument()
      expect(autoScalingElement).toHaveClass('autoScalingText')
    })

    test('value prop is required', () => {
      const consoleSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {})
      render(<CalculatorDisplay value="test" />)
      consoleSpy.mockRestore()
    })
  })
})
