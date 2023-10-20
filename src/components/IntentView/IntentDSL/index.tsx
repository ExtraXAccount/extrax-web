import './index.scss'

import { useAppDispatch, useAppSelector } from '@/state'
import { daiDSL, uniswapDSL } from '@/state/dsl/constants'
import { setDSLText } from '@/state/dsl/reducer'

export default function IntentDSL() {
  const value = useAppSelector((state) => state.dsl.text)
  const dispatch = useAppDispatch()
  return (
    <div className="intent-dsl">
      <div className="intent-dsl-template">
        Use
        <button className="btn-base" onClick={() => dispatch(setDSLText(uniswapDSL))}>
          Uniswap v3
        </button>
        <button className="btn-base" onClick={() => dispatch(setDSLText(daiDSL))}>
          sDAI
        </button>
        Template
      </div>
      <div className="intent-dsl-textarea">
        <div className="intent-dsl-textarea-bg"></div>
        <div className="intent-dsl-textarea-info">Input your intent here💡</div>
        <textarea
          name=""
          id=""
          cols={30}
          rows={10}
          value={value}
          onChange={(e) => {
            dispatch(setDSLText(e.target.value))
          }}
        ></textarea>
      </div>
    </div>
  )
}
