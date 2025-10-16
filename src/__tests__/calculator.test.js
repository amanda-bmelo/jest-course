import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Calculator from '../calculator'

jest.mock('../shared/calculator-display', () => {
  return function CalculatorDisplay({ value }) {
    return <div data-testid="display">{value}</div>
  }
})

describe('Calculator', () => {
  test('basic operations and clear functionality', () => {
    render(<Calculator />)
    
    expect(screen.getByTestId('display')).toHaveTextContent('0')
    expect(screen.getByText('AC')).toBeInTheDocument()
    
    fireEvent.click(screen.getByText('8'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('10')
    
    fireEvent.click(screen.getByText('C'))
    expect(screen.getByTestId('display')).toHaveTextContent('0')
    expect(screen.getByText('AC')).toBeInTheDocument()
  })

  test('all mathematical operations work', () => {
    render(<Calculator />)
    
    fireEvent.click(screen.getByText('9'))
    fireEvent.click(screen.getByText('−'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('6')
    
    fireEvent.click(screen.getByText('×'))
    fireEvent.click(screen.getByText('4'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('24')
    
    fireEvent.click(screen.getByText('÷'))
    fireEvent.click(screen.getByText('6'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toHaveTextContent('4')
  })

  test('decimal point and percentage functionality', () => {
    render(<Calculator />)
    
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('●'))
    fireEvent.click(screen.getByText('5'))
    expect(screen.getByTestId('display')).toHaveTextContent('3.5')
    
    fireEvent.click(screen.getByText('C'))
    fireEvent.click(screen.getByText('5'))
    fireEvent.click(screen.getByText('0'))
    fireEvent.click(screen.getByText('%'))
    expect(screen.getByTestId('display')).toHaveTextContent('0.5')
  })

  test('sign toggle functionality', () => {
    render(<Calculator />)
    
    fireEvent.click(screen.getByText('7'))
    fireEvent.click(screen.getByText('±'))
    expect(screen.getByTestId('display')).toHaveTextContent('-7')
    
    fireEvent.click(screen.getByText('±'))
    expect(screen.getByTestId('display')).toHaveTextContent('7')
  })

  test('keyboard input works', () => {
    render(<Calculator />)
    
    fireEvent.keyDown(document, { key: '5' })
    expect(screen.getByTestId('display')).toHaveTextContent('5')
    
    fireEvent.keyDown(document, { key: '+' })
    fireEvent.keyDown(document, { key: '3' })
    fireEvent.keyDown(document, { key: 'Enter' })
    expect(screen.getByTestId('display')).toHaveTextContent('8')
    
    fireEvent.keyDown(document, { key: '.' })
    fireEvent.keyDown(document, { key: '5' })
    expect(screen.getByTestId('display')).toHaveTextContent('8.5')
  })

  test('multiple digits and edge cases', () => {
    render(<Calculator />)
    
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('2'))
    fireEvent.click(screen.getByText('3'))
    fireEvent.click(screen.getByText('4'))
    expect(screen.getByTestId('display')).toHaveTextContent('1234')
    
    fireEvent.click(screen.getByText('0'))
    expect(screen.getByTestId('display')).toHaveTextContent('12340')
    
    fireEvent.click(screen.getByText('%'))
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('='))
    expect(screen.getByTestId('display')).toContainHTML('1')
  })
})
