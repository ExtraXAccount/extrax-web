import './index.scss'

import { Tooltip } from 'antd'

export default function Hint(props: {
  content: React.ReactNode,
  children?: React.ReactNode
}) {
  const { content, children } = props

  return (
    <Tooltip title={content}>
      <div className='ex-hint ai-ct'>
        {children}
        <i className='iconfont icon-question-circle-fill'></i>
      </div>
    </Tooltip>
  )
}