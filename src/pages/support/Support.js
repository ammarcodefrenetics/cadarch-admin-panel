import React, { useState } from "react";

import { Container, Button, Grid } from '@material-ui/core';
// styles
import useStyles from "./styles";


// components


import PageTitle from "../../components/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import RenovationDialog from "./components/supportDialog/SupportDialog";
import { UpdateDataAPI } from "../../Services/UpdateDataAPI";

function Support(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [dialogState, setDialogState] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    //
    const [renovation, setRenovation] = useState({});

    //
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
    const ShowActionDialog = (actiontype, title, message, type, OnOkCallback, OnCancellCallback) => {
        setActionDialogProps(prevState => ({
            ...prevState,
            dialogactiontype: actiontype,
            actiondialogstate: true,
            actiondialogtitle: title,
            actiondialogmessage: message,
            actiondialogtype: type,
            OnOk: OnOkCallback,
            OnCancel: OnCancellCallback
        }));
    }

    const handleView = (dataObject) => {
        setRenovation(dataObject);
        setDialogState(true);
    }
    const handleEdit = (dataObject) => {
        setRenovation(dataObject);
        setDialogState(true);
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        console.log(idToDelete , " deleting support id")
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {
            UpdateDataAPI('support/deletesupportbyid', null, idToDelete).then((result) => {
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Success", result.responseMessage, "success", 3000);
                    handleUpdate();
                } else {
                    showMessage("Error", result.responseMessage, "error", 3000);
                }
            })
        })
    }
    const handleClose = () => {
        handleUpdate();
        setDialogState(false);
    }

    return (
        <>
            <PageTitle title="Support" />
            <Container maxWidth={false} className={classes.positionRelative}>
                {/* <Button
                    size="small"
                    className={classes.newAddBtn2}
                    onClick={addNew}
                >+ Add New
                </Button> */}
                <Grid>
                <SearchGrid
                    dp={true}
                    isUpdate={isUpdate}
                    isView={false}
                    isEditAble={false}
                    isDelete={true}
                    isSearchAble={true}
                    isCustomSearch={false}
                    columnCode="SupportColumns"
                    searchPanelParams="SupportColumns"
                    // isRowClickAble={true}
                    // rowClick={getId}
                    // onView={handleView}
                    // onEdit={handleView}
                    onDelete={handleDelete}
                    apiUrl="support/loadallsupport"
                    filter={filterValues}
                />
                </Grid>
                
            </Container>
            {/* {
                <RenovationDialog
                    data={renovation}
                    dialogOpenClose={dialogState}
                    handleClose={handleClose} />
            } */}
            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={actiondialogprops.OnOk}

                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />
            {/* <div className={classes.opacityContainer}>
                <span>Coming soon</span>
            </div> */}
        </>
    );
}
export default withSnackbar(Support)
