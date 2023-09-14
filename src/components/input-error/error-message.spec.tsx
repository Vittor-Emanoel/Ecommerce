import { render } from '@testing-library/react'
import ErrorMessage from './error-message.component'
import Colors from '../../theme/theme.color'

describe('input-error-message', () => {
  it('should show message with error color ', () => {
    const { getByText } = render(<ErrorMessage>Lorem ipsum</ErrorMessage>)

    const message = getByText('Lorem ipsum')

    expect(message).toHaveStyle({ color: Colors.error })
  })
})
