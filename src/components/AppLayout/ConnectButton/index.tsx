import './index.scss'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <div
            className="connect-button"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button">
                    Connect Wallet
                  </button>
                )
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                )
              }

              return (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                    className="connect-button-chain"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="connect-button-display"
                  >
                    <i className="connect-button-display-avatar">🦊</i>
                    {account.displayName}
                    {account.displayBalance ? ` (${account.displayBalance})` : ''}
                    <div className="connect-button-display-settings">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_4444_3548)">
                          <path
                            d="M5.43365 11.9944H6.56634C6.7832 11.9944 6.96918 11.9336 7.1243 11.812C7.27945 11.6905 7.38133 11.525 7.42995 11.3156L7.67106 10.2665L7.8505 10.2048L8.76452 10.7657C8.94394 10.8817 9.13272 10.9266 9.33086 10.9004C9.529 10.8742 9.7047 10.7845 9.85798 10.6311L10.643 9.8513C10.7963 9.69795 10.886 9.52218 10.9122 9.32399C10.9383 9.12576 10.8935 8.93687 10.7776 8.75733L10.2056 7.84851L10.2729 7.68019L11.3215 7.4334C11.5271 7.38476 11.6916 7.28189 11.815 7.12479C11.9383 6.96773 12 6.7826 12 6.56939V5.45862C12 5.24543 11.9383 5.0603 11.815 4.90322C11.6916 4.74614 11.5271 4.64329 11.3215 4.59467L10.2842 4.34221L10.2112 4.16268L10.7832 3.25385C10.8991 3.07433 10.9439 2.88639 10.9178 2.69004C10.8916 2.49369 10.8019 2.31697 10.6486 2.15989L9.86355 1.37447C9.71403 1.22487 9.5402 1.13698 9.34206 1.1108C9.14395 1.08462 8.95517 1.12763 8.77571 1.23983L7.86169 1.80084L7.67106 1.72791L7.42995 0.678821C7.38133 0.473117 7.27945 0.308555 7.1243 0.185133C6.96918 0.0617111 6.7832 0 6.56634 0H5.43365C5.21683 0 5.03085 0.0617111 4.87571 0.185133C4.72057 0.308555 4.6187 0.473117 4.5701 0.678821L4.32337 1.72791L4.13272 1.80084L3.2243 1.23983C3.04113 1.12763 2.85141 1.08462 2.65514 1.1108C2.45888 1.13698 2.28412 1.22487 2.13085 1.37447L1.35141 2.15989C1.1944 2.31697 1.10374 2.49369 1.07944 2.69004C1.05514 2.88639 1.10094 3.07433 1.21682 3.25385L1.78318 4.16268L1.71589 4.34221L0.678506 4.59467C0.46916 4.64329 0.303739 4.74614 0.182243 4.90322C0.0607478 5.0603 0 5.24543 0 5.45862V6.56939C0 6.7826 0.0616824 6.96773 0.185047 7.12479C0.308412 7.28189 0.472898 7.38476 0.678506 7.4334L1.7271 7.68019L1.78879 7.84851L1.22243 8.75733C1.10654 8.93687 1.06075 9.12576 1.08505 9.32399C1.10935 9.52218 1.2 9.69795 1.35701 9.8513L2.13645 10.6311C2.28972 10.7845 2.46542 10.8742 2.66356 10.9004C2.86169 10.9266 3.05234 10.8817 3.23552 10.7657L4.14393 10.2048L4.32337 10.2665L4.5701 11.3156C4.6187 11.525 4.72057 11.6905 4.87571 11.812C5.03085 11.9336 5.21683 11.9944 5.43365 11.9944ZM5.52337 11.1192C5.42992 11.1192 5.37571 11.0762 5.36076 10.9902L5.02431 9.59887C4.85234 9.55774 4.68879 9.50445 4.53365 9.439C4.37851 9.37355 4.24113 9.30342 4.1215 9.22863L2.89907 9.98032C2.83178 10.029 2.76262 10.0196 2.69159 9.95229L2.02991 9.29032C1.9701 9.23422 1.96262 9.16501 2.00748 9.08271L2.75888 7.87097C2.69533 7.75129 2.62991 7.61478 2.56262 7.46143C2.49533 7.30808 2.43926 7.14539 2.3944 6.97336L1.00374 6.64235C0.91776 6.62737 0.874769 6.57314 0.874769 6.47966V5.54277C0.874769 5.45301 0.91776 5.39878 1.00374 5.38007L2.38879 5.04347C2.43365 4.86021 2.49253 4.69003 2.56542 4.53295C2.63832 4.37587 2.69907 4.24497 2.74767 4.14025L2.00187 2.92847C1.95328 2.84619 1.95888 2.77325 2.01869 2.70968L2.68598 2.0589C2.75328 1.99906 2.82431 1.98971 2.89907 2.03085L4.11029 2.76577C4.22991 2.69845 4.37104 2.63113 4.53365 2.56381C4.69627 2.49649 4.86169 2.44039 5.02992 2.39551L5.36076 1.00421C5.37571 0.918186 5.42992 0.875176 5.52337 0.875176H6.47665C6.57009 0.875176 6.62242 0.918186 6.63364 1.00421L6.97569 2.40673C7.1514 2.45161 7.31495 2.50678 7.46635 2.57223C7.61775 2.63768 7.75514 2.70406 7.87852 2.77139L9.09532 2.03085C9.17383 1.98971 9.24674 1.99906 9.31403 2.0589L9.97569 2.70968C10.0393 2.77325 10.0449 2.84619 9.99252 2.92847L9.24674 4.14025C9.29907 4.24497 9.36075 4.37587 9.4318 4.53295C9.50281 4.69003 9.56075 4.86021 9.60562 5.04347L10.9963 5.38007C11.0823 5.39878 11.1253 5.45301 11.1253 5.54277V6.47966C11.1253 6.57314 11.0823 6.62737 10.9963 6.64235L9.60005 6.97336C9.55518 7.14539 9.50004 7.30808 9.43462 7.46143C9.3692 7.61478 9.30284 7.75129 9.23554 7.87097L9.98695 9.08271C10.0355 9.16501 10.028 9.23422 9.9645 9.29032L9.30841 9.95229C9.2374 10.0196 9.16637 10.029 9.09532 9.98032L7.87289 9.22863C7.75326 9.30342 7.61681 9.37355 7.46354 9.439C7.3103 9.50445 7.14769 9.55774 6.97569 9.59887L6.63364 10.9902C6.62242 11.0762 6.57009 11.1192 6.47665 11.1192H5.52337ZM6 8.14023C6.39253 8.14023 6.75047 8.04393 7.07382 7.85133C7.39722 7.65872 7.65517 7.39973 7.84768 7.07435C8.04019 6.74893 8.13645 6.38988 8.13645 5.99721C8.13645 5.60823 8.04019 5.25198 7.84768 4.92846C7.65517 4.60495 7.39722 4.34689 7.07382 4.15427C6.75047 3.96166 6.39253 3.86535 6 3.86535C5.60748 3.86535 5.24954 3.96166 4.92618 4.15427C4.60281 4.34689 4.34393 4.60495 4.14954 4.92846C3.95515 5.25198 3.85795 5.60823 3.85795 5.99721C3.85795 6.38988 3.95515 6.74799 4.14954 7.07154C4.34393 7.39504 4.60281 7.65403 4.92618 7.84851C5.24954 8.04299 5.60748 8.14023 6 8.14023ZM6 7.27065C5.76823 7.27065 5.55609 7.21362 5.36356 7.09957C5.17104 6.98548 5.01777 6.83213 4.90375 6.63953C4.78973 6.44693 4.73272 6.23282 4.73272 5.99721C4.73272 5.76531 4.78973 5.55399 4.90375 5.36325C5.01777 5.1725 5.17104 5.0201 5.36356 4.90602C5.55609 4.79195 5.76823 4.73492 6 4.73492C6.22804 4.73492 6.43739 4.79195 6.62807 4.90602C6.8187 5.0201 6.97104 5.1725 7.08508 5.36325C7.19908 5.55399 7.25608 5.76531 7.25608 5.99721C7.25608 6.22907 7.19908 6.44132 7.08508 6.63396C6.97104 6.82656 6.8187 6.98083 6.62807 7.09676C6.43739 7.21268 6.22804 7.27065 6 7.27065Z"
                            fill="#666666"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_4444_3548">
                            <rect width="12" height="12" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
