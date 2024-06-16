import Toggle from "../toggle/Toggle"

const Header = (props) => {
const {handleToggleChange} = props
    
  return (
    <div className=" bg-zinc-800">
      <Toggle onToggle={handleToggleChange}/>
    </div>
  )
}
export default Header