import { Context } from '../../utils'

export default async (parent, args, ctx: Context, info) => {
  const {
    billingAddress: billing,
    customer,
    productId,
    token,
    shippingAddress: shipping
  } = args
  const { moltin } = ctx

  try {
    const cartId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    )

    await moltin.Cart(cartId).AddProduct(productId)

    const { json: order } = await moltin
      .Cart(cartId)
      .Checkout(customer, billing, shipping)

    await moltin.Orders.Payment(order.id, {
      gateway: 'stripe',
      method: 'purchase',
      payment: token
    })

    return {
      id: order.data.id
    }
  } catch ({ status, json }) {
    return {
      status,
      errors: json
    }
  }
}
