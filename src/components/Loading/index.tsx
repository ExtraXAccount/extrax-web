import './index.scss'

import cx, { Argument } from 'classnames'

interface IProps {
  className?: Argument
}
export default function Loading(props?: IProps) {
  return <i className={cx('iconfont icon-loading', props?.className)}></i>
}
