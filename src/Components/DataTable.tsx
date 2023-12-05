import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import React from 'react';

const DataTable = (props) => {

  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      rowCount={props.rowCount}
      loading={props.loading}
      onRowSelectionModelChange={(newRowSelectionModel) => {
        console.log(newRowSelectionModel);

        props.setRowSelectionModel(newRowSelectionModel);
      }}
      rowSelectionModel={props.rowSelectionModel}
      pageSizeOptions={[25]}
      paginationModel={props.paginationModel}
      paginationMode="server"
      onPaginationModelChange={(newPaginationModel: GridPaginationModel) => {
        console.log('newPaginationModel => ', newPaginationModel);
        props.onPaginationModelChange(newPaginationModel)
      }}
      checkboxSelection={props.checkboxSelection}
      rowHeight={props.rowHeight}
      editMode="row"
    />

  )
}

export default DataTable;