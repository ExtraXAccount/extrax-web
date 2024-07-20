import './dialogApyDisplay.scss'

import React from 'react'

export default function DialogApyDisplay(props: {
  list: {
    title: string
    content: React.ReactNode
  }[]
}) {
  return (
    <div className="dialog-apy-display flex ai-ct">
      {props.list.map((item) => {
        return (
          <section className="dialog-apy-display-item" key={item.title}>
            <div className="dialog-apy-display-item-title text-sm-2">{item.title}</div>
            <div className="dialog-apy-display-item-content">{item.content}</div>
          </section>
        )
      })}
    </div>
  )
}
