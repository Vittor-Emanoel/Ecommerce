import { render } from '@testing-library/react'
import CustomButton from './custom-button.component'
import { BsBagCheck } from 'react-icons/bs'

describe('Custom-Button', () => {
  it('should render with correct children', () => {
    const { getByText } = render(<CustomButton>lorem ipsum</CustomButton>)

    getByText('lorem ipsum')
  })
})

describe('Custom-Button', () => {
  it('should render container icon when startIcon prop is passed ', () => {
    const { container } = render(
      <CustomButton startIcon={<BsBagCheck />}>lorem ipsum</CustomButton>
    )

    const iconContainer = container.querySelector('div')
    expect(iconContainer).toBeInTheDocument()
  })
})
