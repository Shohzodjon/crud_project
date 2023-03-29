import state from './state'

export const SET__PRODUCTS = (state, products) => {
  state.products = products
}

export const ADD__DATA = (state, newproduct) => {
  state.products.push(newproduct)
}

export const DELETE__DATA = (state, id) => {
  state.products = state.products.filter((item) => item.id !== id)
}
