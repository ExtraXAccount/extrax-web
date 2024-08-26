import { UiPoolDataProviderV3__factory } from '@/typechain-types'

import { LendingPoolConfig } from '../../config/constants'
import { UI_POOL_DATA_PROVIDER_V3 } from '../../config/contract-id'
import { getProvider } from '../../config/provider'

export function getUiDataProvider(chain: string) {
  return UiPoolDataProviderV3__factory.connect(LendingPoolConfig[chain][UI_POOL_DATA_PROVIDER_V3], getProvider(chain))
}
