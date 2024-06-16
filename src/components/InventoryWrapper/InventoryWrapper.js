import InventoryStats from "../inventoryStats/InventoryStats"
import InventoryTable from "../inventoryTable/InventoryTable"


const InventoryWrapper = (props) => {
    
  return (<div>Inventory wrapper
                <InventoryStats />
                <InventoryTable />
  </div>)
   
}

export default InventoryWrapper