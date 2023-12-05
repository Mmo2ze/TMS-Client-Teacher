import { Dna } from  'react-loader-spinner'


const Spinners = () => {
  return (
    <div className="fixed top-1/2 left-1/2  center">
<Dna
  visible={true}
  height="120"
  width="120"
  ariaLabel="dna-loading"
  wrapperStyle={{}}
  wrapperClass="dna-wrapper"
/>
    </div>
  )
}

export default Spinners



{/* <Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /> */}