class AmountUtils {
  static dollarUSLocale = Intl.NumberFormat('en-US')
  static formatToUSLocale (amount) {
    return this.dollarUSLocale.format(amount)
  }

  static getPercentage (current, vs) {
    try {
      const percentage = (current * 100) / vs
      const fixed4Number = percentage.toFixed(4)
      const fixed2Number = percentage.toFixed(2)
      const firstTwoDecimals = fixed4Number.slice(-4, -2)
      const firstTwoDecimalsAreZero = Number.parseFloat(firstTwoDecimals) === 0
      return firstTwoDecimalsAreZero ? Number.parseFloat(fixed4Number) : Number.parseFloat(fixed2Number)
    } catch (e) {
      console.error(e)
      return 0
    }
  }

  static parseAmount (amount) {
    try {
      let value = amount
      if (typeof amount === 'string') {
        value = amount.replaceAll(',', '')
      }
      return Number.parseFloat(value)
    } catch (e) {
      console.error('parseAmount', e)
      return 0
    }
  }
}

export default AmountUtils
