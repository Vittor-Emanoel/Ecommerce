import { render } from '@testing-library/react'
import Loading from './loading.component'

describe('loading', () => {
  it('should show a message if there is one', () => {
    const { getByText } = render(<Loading message="aguarde..." />)

    getByText('aguarde...')
  })
})
