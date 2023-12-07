export const ctrlpaymentFields = (payment) => {
    let msg : string = 'OK';
    if (isNaN(payment.idCustomer) || payment.idCustomer === undefined || payment.idCustomer === null || payment.idCustomer < 0) {
        msg = 'Customer account must be provided'
        return msg
      }
      if (payment.paymentMode === undefined || payment.paymentMode === null || payment.paymentMode === '-1') {
        msg = 'Payment mode must be provided'
        return msg
      }
    return msg
}