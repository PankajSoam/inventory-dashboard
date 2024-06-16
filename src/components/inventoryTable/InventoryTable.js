import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md"
import { IoEyeOutline } from "react-icons/io5"

const InventoryTable = (props) => {
    const {inventoryData, deleteRow, handleEditClick, handleDisableClick, isAdminView, handleModal} = props
    const headerLabels = ["Name","Category","Price","Quantity","Value","ACTION"]

    return (<div className="flex flex-col bg-zinc-600 py-2 rounded-xl text-sm">
                {/* table header */}
                <div className="flex flex-1 my-3 px-4">
                    {headerLabels.map((label,index)=>{
                        return <div className="flex-1" key={`${label}${index}`}><span className="bg-zinc-950 text-lime-600 p-1 rounded">{label}</span></div>
                    })}
                </div>
                <hr/>
                {/* table header end*/}
                <div className="flex flex-col flex-1 ">
                    {inventoryData?.length && inventoryData.map((row,index)=>{
                        return (<>
                                    <div className={`flex flex-1 my-3 px-4 ${row.isDisabled? "text-neutral-500":""}`} key={`${index}${row.name}`}>
                                        <div className="flex-1 ">{row?.name}</div>
                                        <div className="flex-1">{row?.category}</div>
                                        <div className="flex-1">{row?.price}</div>
                                        <div className="flex-1">{row?.quantity}</div>
                                        <div className="flex-1">{row?.value}</div>
                                        <div className="flex flex-row flex-1">
                                            <MdOutlineEdit className={`ml-1 ${isAdminView && !row.isDisabled ? "cursor-pointer" : "pointer-events-none"}`} onClick={()=>{
                                                handleEditClick(index)
                                                handleModal()
                                                }}/> 
                                            <IoEyeOutline className={`ml-1 text-neutral-200 ${isAdminView ? "text-purple-400 cursor-pointer": "text-neutral-200 pointer-events-none"}`} onClick={()=>handleDisableClick(index)}/>
                                            <MdOutlineDeleteOutline className={`ml-1 ${isAdminView ? "text-red-600 cursor-pointer": "text-neutral-200 pointer-events-none"}`} onClick={()=>deleteRow(index)}/> 
                                        </div>
                                    </div>
                                    {index<inventoryData?.length-1 && <hr/>}
                                </>
                                )
                    })}
                </div>

            </div>)
}

export default InventoryTable