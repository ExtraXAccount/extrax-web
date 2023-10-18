import './index.scss'

import Contract from './Contract'
// import LendingList from './LendingList'

export default function Lend() {
  return (
    <div className="page-app page-lending">
      <h2>lend page</h2>

      {/* <LendingList /> */}
      <Contract />
    </div>
  )
}
