import './index.scss'

import cx from 'classnames'
import * as React from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { lock, unlock } from 'tua-body-scroll-lock'

interface IPropTypes {
  title?: string
  open: boolean
  onClose: () => void
  onClickOutside?: () => void
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  extraNode?: React.ReactNode
}

export default function Dialog(props: IPropTypes) {
  const scrollContainer = React.useRef(null)

  function handleClickOutside() {
    const { onClose, onClickOutside } = props
    if (onClickOutside) {
      onClickOutside()
    }
  }
  const { title, open, children, onClose, className, style, extraNode } = props

  React.useEffect(() => {
    if (open) {
      lock(scrollContainer.current)
    } else {
      unlock(scrollContainer.current)
    }
    return () => unlock(scrollContainer.current)
  }, [open])

  return createPortal(
    <TransitionGroup>
      {open && (
        <CSSTransition classNames="ex-dialog-transition" timeout={500}>
          <div className={cx('ex-dialog', className)}>
            <div className="ex-dialog-mask" onClick={handleClickOutside} />
            <div className="ex-dialog-content" style={style}>
              <i className="ex-dialog-close" onClick={onClose} />
              {Boolean(title) && <h2>{title}</h2>}
              <div ref={scrollContainer} className="ex-dialog-content-box">
                {children}
              </div>
              {extraNode}
            </div>
          </div>
        </CSSTransition>
      )}
    </TransitionGroup>,
    document.body,
  )
}
