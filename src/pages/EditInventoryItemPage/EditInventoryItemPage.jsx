import "./EditInventoryItemPage.scss"
import EditInventoryItemHeader from '../../../src/components/EditInventoryItemHeader/EditInventoryItemHeader'
import EditInventoryItemBody from '../../../src/components/EditInventoryItemBody/EditInventoryItemBody'
function EditInventoryItem() {
  return (
    <>
    <div className="card">
      <EditInventoryItemHeader />
      <EditInventoryItemBody />
      <div className="button-group">
          <button type="button" className="cancel-button">Cancel</button>
          <button type="submit" className="save-button">Save</button>
      </div>
    </div>
    </>
  )
}

export default EditInventoryItem