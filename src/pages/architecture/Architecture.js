import React, { useState } from "react";

import { Container, Button, Grid } from '@material-ui/core';
// styles
import useStyles from "./styles";


// components


import PageTitle from "../../components/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import ArchitectureDialog from "./components/architectureDialog/ArchitectureDialog";

function Architecture(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [architecture, setArchitecture] = useState({});

    const [dialogState, setDialogState] = useState(false);
    const [dataId, setDataId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});
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
        setArchitecture(dataObject);
        setDialogState(true);
    }
    const handleEdit = (dataObject) => {
        setArchitecture(dataObject);
        setDialogState(true);
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this patient?", "confirm", function () {

        })
    }
    const handleClose = () => {
        handleUpdate();
        setDialogState(false);
    }
    return (
        <>
            <PageTitle title="Architecture" />

            <Container maxWidth={false} className={classes.positionRelative}>

                {/* <Button
                    size="small"
                    className={classes.newAddBtn2}
                    onClick={addNew}
                >
                    + Add New </Button> */}

                <SearchGrid
                    dp={true}
                    isView={false}
                    isEditAble={true}
                    isDelete={false}
                    isUpdate={isUpdate}
                    isSearchAble={true}
                    isCustomSearch={false}
                    columnCode="AchitectureColumns"
                    searchPanelParams="AchitectureColumns"
                    // isRowClickAble={true}
                    // rowClick={getId}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    apiUrl="architecture/loadallarchitecture"
                    filter={filterValues}
                />
            </Container>
            {
                <ArchitectureDialog
                    data={architecture}
                    dialogOpenClose={dialogState}
                    handleClose={handleClose} />

            }
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
export default withSnackbar(Architecture)
