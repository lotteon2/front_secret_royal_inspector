export const POINT = {
  YANGBAN_CONFIRMED: '양반 구매 확정',
  GENEREAL_CONFIRMED: '일반 구매 확정',
  PURCHASE_USE: '구매 사용',
  PURCHASE_CANCEL: '구매 취소',
  PHOTO_REVIEW: '포토 리뷰',
  TEXT_REVIEW: '글 리뷰'
}

export const translatePointState = (status: keyof typeof POINT) => {
  let translatedPointState = ''
  switch (status) {
    case 'YANGBAN_CONFIRMED':
      translatedPointState = '양반 구매 확정'
      break
    case 'GENEREAL_CONFIRMED':
      translatedPointState = '일반 구매 확정'
      break
    case 'PURCHASE_USE':
      translatedPointState = '구매 사용'
      break
    case 'PURCHASE_CANCEL':
      translatedPointState = '구매 취소'
      break
    case 'PHOTO_REVIEW':
      translatedPointState = '포토 리뷰'
      break
    case 'TEXT_REVIEW':
      translatedPointState = '글 리뷰'
      break
    default:
      translatedPointState = ''
  }
  return translatedPointState
}
