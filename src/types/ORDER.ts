export const ORDER_STATE = {
  null: 'null',
  ORDER: 'ORDER',
  SHIPPING: 'SHIPPING',
  COMPLETED: 'COMPLETED',
  CONFIRMED: 'CONFIRMED',
  CANCEL: 'CANCEL'
} as const

type ORDER_STATE = (typeof ORDER_STATE)[keyof typeof ORDER_STATE]

export function getOrderState(params: ORDER_STATE) {
  return ORDER_STATE[params] as string
}

export const translateOrderState = (status: ORDER_STATE) => {
  let translatedOrderState = ''
  switch (status) {
    case 'null':
      translatedOrderState = '전체'
       break
    case 'ORDER':
      translatedOrderState = '주문 완료'
      break
    case 'SHIPPING':
      translatedOrderState = '배송중'
      break
    case 'COMPLETED':
      translatedOrderState = '배송 완료'
      break
    case 'CONFIRMED':
      translatedOrderState = '주문 확정'
      break
    case 'CANCEL':
      translatedOrderState = '주문 취소'
      break
    default:
      translatedOrderState = ''
  }
  return translatedOrderState
}
