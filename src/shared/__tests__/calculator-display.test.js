import React from 'react'
import {render} from '@testing-library/react'
import {createSerializer, matchers} from '@emotion/jest'
import CalculatorDisplay from '../calculator-display'

expect.extend(matchers)
expect.addSnapshotSerializer(
  createSerializer({
    classNameReplacer(className, index) {
      return `my-new-class-name-${index}`
    },
  }),
)

test('renders', () => {
  const {container} = render(<CalculatorDisplay value="0" />)
  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div class="css-125fbpn-calculator-display--CalculatorDisplay"><div class="autoScalingText" style="transform: scale(1,1);" data-testid="total">0</div></div>"`,
  )
})
