import useV2Contract from '@/sdk/v2'

// const dataProvider = {
//   address: '0x1A97E89572Fc303e4BfD4FA49d02Cd94161744DD',
//   abi: dataProviderABI,
// }
// const mlootContract = {
//   address: '0x1dfe7ca09e99d10835bf73044a23b73fc20623df',
//   abi: mlootABI,
// }

export default function Contract() {
  const v2Contract = useV2Contract()
  // console.log('v2Contract :>> ', v2Contract)
  return <div className="contract">{13}</div>
}
