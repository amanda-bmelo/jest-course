import React from 'react'
import {render} from '@testing-library/react'
import {createSerializer} from '@emotion/jest'
import CalculatorDisplay from '../calculator-display'

expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `${className}-${index}`
    },
  }),
)

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class="css-11a8id8-CalculatorDisplay"><div class="autoScalingText" style="transform: scale(1,1);" data-testid="total">0</div></div>"`,
  )
})
