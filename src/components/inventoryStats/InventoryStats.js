import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineRemoveShoppingCart,MdOutlineCategory, MdCurrencyExchange } from "react-icons/md";

const InventoryStats = (props) => {
    const {statsData} = props
    
    return (<div className="flex my-3"> 
                {statsData?.length && statsData.map((stat,index)=>{
                    return(<div className="flex flex-1 rounded-lg p-4 mx-2 bg-lime-950" key={`${index}${stat.label}`}>
                                {getIcon(stat.icon)}
                                <div className="ml-5">
                                    <p className="text-base">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-4">{stat.value}</p>
                                </div>
                            </div>)
                })}
            </div>)
}

//to get suitable icon for stat cards
const getIcon = (type)=> {
    let icon=""
    if(type==="cart"){
        icon=<LuShoppingCart className="text-3xl"/>
    }else if(type==="currency"){
        icon=<MdCurrencyExchange className="text-3xl"/>
    }else if(type==="outOfStock"){
        icon=<MdOutlineRemoveShoppingCart className="text-3xl"/>
    }else if(type==="category"){
        icon=<MdOutlineCategory className="text-3xl"/>
    }
    return icon
}

export default InventoryStats