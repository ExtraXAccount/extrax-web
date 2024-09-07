export function getHealthFactorInfo(healthFactor: number) {
  if (healthFactor >= 3 || healthFactor === -1) {
    return {
      type: 'safe',
      label: 'Conservative'
    }
  }
  if (healthFactor >= 1.1) {
    return {
      type: 'warn',
      label: 'Moderate'
    }
  }
  return {
    type: 'danger',
    label: 'Risky'
  }
}
