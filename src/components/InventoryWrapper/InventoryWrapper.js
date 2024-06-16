import { useEffect, useState } from "react"
import InventoryStats from "../inventoryStats/InventoryStats"
import InventoryTable from "../inventoryTable/InventoryTable"

const InventoryWrapper = (props) => {
    const {isAdminView} = props
    const [stats,setStats] = useState([
        {icon:"cart",label:"Total product",value: "0"},
        {icon:"currency",label:"Total store value",value: "0"},
        {icon:"outOfStock",label:"Out of stocks",value: "0"},
        {icon:"category",label:"No of category",value: "0"},
    ])
    const [inventoryData,setInventoryData] = useState([])
    const [editModalData,setEditModalData] = useState(null)
    const [showModal, setShowModal] = useState(false)

    useEffect(()=>{
        fetchData()
    },[])
    useEffect(()=>{
        const totalProduct = inventoryData?.length
        
        const totalStoreValue = inventoryData.reduce((acc,value,index)=>{
                                    if(value?.isDisabled){
                                        return acc
                                    }
                                    return acc+extractNumberFromString(value?.value)

                                },0)
        const totalOutOfStock = inventoryData.reduce((acc,value,index)=>{
                                    if(value?.isDisabled || extractNumberFromString(value.quantity)){
                                        return acc
                                    }
                                    if(extractNumberFromString(value?.quantity)===0){
                                        return acc+1

                                    }

                                },0)
        const categoryCount = countUniqueNames(inventoryData)
        const newStatsValue = stats.map((stat,index)=>{
            return {
                ...stat,
                value: index===0 ?  totalProduct : index===1 ? totalStoreValue :  index===2 ? totalOutOfStock :categoryCount
            }
        })
        setStats(newStatsValue)

    },[inventoryData])

    const handleModal = ()=>{
        setShowModal(!showModal)
    }
    const  countUniqueNames = (arr) => {
        const uniqueNames = new Set()
        for (const obj of arr) {
            if (obj.hasOwnProperty("category") && !obj.isDisabled) {
                uniqueNames.add(obj.category)
            }
        }
        return uniqueNames.size
    }

    const deleteRow = (index)=> {
        const newInventoryData = inventoryData?.filter((product,idx)=>index!==idx)
        setInventoryData(newInventoryData)
    }
    const handleEditClick = (index) => {
        
        setEditModalData({
            data:inventoryData[index],
            index:index
        })
    }

    const saveEditChanges = () => {
        const newInventoryData = inventoryData.map((product,index)=>{
            if(index===editModalData?.index){
                return editModalData?.data
            }
            return product
        })
        setInventoryData(newInventoryData)
    }

    function extractNumberFromString(inputString="") {
        if(Number.isInteger(inputString)){
            return inputString
        }
        const cleanedString = inputString.replace(/^\D+/g, '')
        const extractedNumber = parseInt(cleanedString, 10)
        
        return isNaN(extractedNumber) ? "" : extractedNumber
    }
    const handleDisableClick = (index)=>{
        const newInventoryData = inventoryData.map((product,idx)=>{
            if(index===idx){
                return {
                    ...product,
                    isDisabled: !product.isDisabled
                }
            }
            return product
        })

        setInventoryData(newInventoryData)
    }
    const fetchData = async ()=> {

        const responseData = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
        const parseData = await responseData.json()
        setInventoryData(parseData)
    }


    return (<div className="p-2 relative">
                <h1 className="text-4xl">Inventory Stats</h1>
                <InventoryStats statsData={stats}/>
                <InventoryTable 
                    inventoryData={inventoryData}
                    deleteRow={deleteRow} 
                    handleEditClick={handleEditClick} 
                    handleDisableClick={handleDisableClick} 
                    isAdminView={isAdminView} 
                    handleModal={handleModal}
                />

                { showModal && <div className="fixed h-screen w-screen bg-opacity-50  bg-gray-600 inset-0 z-10 w-screen overflow-y-auto">
                    <div className=" absolute left-1/2 top-1/2  transform -translate-x-1/2 transform -translate-y-1/2">
                        <div className="bg-neutral-800 p-4 max-w-lg rounded-lg ">
                        <div>
                            <h2 className="text-2xl font-semibold">Edit product</h2>
                            <p>{editModalData?.data?.name}</p>
                        </div>
                        <div className="flex flex-wrap">
                            <div  className="flex flex-col w-1/2 p-2 pl-0 mt-2">
                                <label>Category</label>
                                <input 
                                    type="text" 
                                    className=" rounded bg-neutral-700 p-1" 
                                    placeholder="Category"
                                    value={editModalData?.data?.category}
                                    onChange={(e)=>{
                                        setEditModalData({
                                            ...editModalData,
                                            data: {
                                                ...editModalData?.data,
                                                category: e.target.value
                                            }

                                        })
                                    }}
                                    />
                            </div>
                            <div className="flex flex-col w-1/2 p-2 pr-0 mt-2">
                                <label>Price</label>
                                <input 
                                    type="text" 
                                    className=" rounded bg-neutral-700 p-1" 
                                    placeholder="Price"
                                    value={extractNumberFromString(editModalData?.data?.price)}
                                    onChange={(e)=>{
                                        setEditModalData({
                                            ...editModalData,
                                            data: {
                                                ...editModalData?.data,
                                                price: e.target.value
                                            }

                                        })
                                    }}
                                        
                                />
                            </div>
                            <div className="flex flex-col w-1/2 p-2 pl-0 mt-2">
                                <label>Quantity</label>
                                <input 
                                    type="text" 
                                    className=" rounded bg-neutral-700 p-1" 
                                    placeholder="Quantity"
                                    value={extractNumberFromString(editModalData?.data?.quantity)}  
                                    onChange={(e)=>{
                                        setEditModalData({
                                            ...editModalData,
                                            data: {
                                                ...editModalData?.data,
                                                quantity: e.target.value
                                            }

                                        })
                                    }}      
                                />
                            </div>
                            <div className="flex flex-col w-1/2 p-2 pr-0 mt-2">
                                <label>Value</label>
                                <input 
                                    type="text" 
                                    className=" rounded bg-neutral-700 p-1" 
                                    placeholder="Value"
                                    value={extractNumberFromString(editModalData?.data?.value)} 
                                    onChange={(e)=>{
                                        setEditModalData({
                                            ...editModalData,
                                            data: {
                                                ...editModalData?.data,
                                                value: e.target.value
                                            }

                                        })
                                    }}   
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-2">
                            <button className="text-lime-600 px-2 py-1 hover:pointer" onClick={()=>setShowModal(false)}>Cancel</button>
                            <button 
                                className="bg-neutral-700 rounded px-2 py-1 hover:pointer ml-3" 
                                onClick={()=>{
                                    if(editModalData?.data?.category && editModalData?.data?.value!==""  && editModalData?.data?.price!=="" && editModalData?.data?.quantity !== ""){
                                        saveEditChanges()
                                        setShowModal(false)
                                    }
                                }}
                                >
                                    Save</button>

                        </div>
                    </div>
                    </div>
                </div>}
            </div>)
}

export default InventoryWrapper