export const moneyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function calculateShare(total, members) {
  return moneyFormatter.format(total / members)
}
