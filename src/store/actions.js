import axios from 'axios'
export const getProducts = ({ commit }) => {
  axios.get('product').then((response) => {
    commit('SET__PRODUCTS', response.data)
  })
}
