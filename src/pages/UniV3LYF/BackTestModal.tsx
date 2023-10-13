import './BackTestModal.scss'

import { Form, Slider } from 'antd/es'
import { useState } from 'react'

import Dialog from '@/components/Dialog'

import BackTestChart from '../Calculator/BackTestChart'

export default function BackTestModal(props: any) {
  const params = props.params

  const [backDays, setBackDays] = useState(30)

  return (
    <Dialog
      className="backtest-modal"
      open={props.open}
      title="Strategy Performance Backtest"
      onClose={props.onClose}
      onClickOutside={props.onClose}
    >
      <div className="back-test-modal-inner">
        {/* <h2>back-test-inner</h2> */}
        <Form.Item label="Backtest Days">
          <Slider
            className="back-days-setting-slider"
            value={backDays}
            onChange={setBackDays}
            marks={{
              1: '1',
              7: '7',
              14: '14',
              30: '30',
            }}
            step={1}
            min={1}
            max={30}
          />
        </Form.Item>
        <BackTestChart {...params} backDays={backDays}></BackTestChart>
      </div>
    </Dialog>
  )
}
