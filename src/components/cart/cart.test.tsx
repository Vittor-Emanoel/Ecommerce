import { renderWithRedux } from '../../helpers/test.helpers'
import CartComponent from './cart.component'

describe('cart', () => {
  it('should show correct cart products', () => {
    const { getByText } = renderWithRedux(<CartComponent />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              name: 'bota',
              imageUrl: 'image',
              price: 1000,
              quantity: 1
            }
          ]
        }
      } as any
    })
    getByText(/bota/i)
    getByText('R$1000')
    getByText('1')
    getByText('Total: R$1000')
  })
})
