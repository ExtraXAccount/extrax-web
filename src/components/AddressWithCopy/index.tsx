import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import styles from './index.module.scss'

export default function AddressWithCopy({ address }: { address: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = useCallback(() => {
    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  return (
    <em className={styles.addressWrapper} onClick={(e) => e.stopPropagation()}>
      {address.slice(0, 6)}...{address.slice(-4)}
      <i className={classNames('iconfont icon-copy', styles.iconfont)}></i>
      <CopyToClipboard text={address} onCopy={onCopy}>
        <span
          className={classNames(styles.copyHint, {
            'color-safe': copied,
          })}
        >
          <i className={classNames('iconfont icon-copy', styles.iconfont)}></i>
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </CopyToClipboard>
    </em>
  )
}
