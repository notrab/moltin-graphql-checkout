import { Context } from '../../utils'

export default async (parent, args, ctx: Context, info) => {
  const { moltin } = ctx

  const { json: { data } } = await moltin.Products.All()

  try {
    return data
  } catch ({ status, json }) {
    return {
      status,
      errors: json
    }
  }

  return { success: true }
}
