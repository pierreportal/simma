import Vanilla from './Vanilla'


const soundFunction = (freq, flavor, amp) => {
  const flavors = {
    'vanilla': <Vanilla note={freq} amp={amp} />,
    'grappe': <Grappe />,
    'mint': <Mint />,
  }
  return flavors[flavor]
}






module.exports = soundFunction