import { Context } from '../../utils'

export default async (parent, args, ctx: Context, info) => {
  const { moltin } = ctx

  const {
    json: { data, included: { main_images } }
  } = await moltin.Products.With(['main_image']).All()

  const products = data.map(product => {
    const imageId = product.relationships.main_image
      ? product.relationships.main_image.data.id
      : false

    return {
      ...product,
      image: imageId
        ? main_images.find(img => img.id === imageId).link.href
        : null
    }
  })

  try {
    return products
  } catch ({ status, json }) {
    return {
      status,
      errors: json
    }
  }

  return { success: true }
}
