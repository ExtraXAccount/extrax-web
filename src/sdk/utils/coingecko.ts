import axios from 'axios'

export async function getCoingeckoPriceByIds(ids: string[]) {
  if (!ids || !ids.length) {
    return
  }
  const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
    params: {
      vs_currencies: 'usd',
      ids: ids.join(','),
    },
  })
  return res.data
}
