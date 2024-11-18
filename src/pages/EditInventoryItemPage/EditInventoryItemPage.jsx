import "./EditInventoryItemPage.scss"
import EditInventoryItemHeader from '../../../src/components/EditInventoryItemHeader/EditInventoryItemHeader'
import EditInventoryItemBody from '../../../src/components/EditInventoryItemBody/EditInventoryItemBody'
function EditInventoryItem() {
  return (
    <>
    <div className="card">
      <EditInventoryItemHeader />
      <EditInventoryItemBody />
    </div>
    </>
  )
}

export default EditInventoryItem