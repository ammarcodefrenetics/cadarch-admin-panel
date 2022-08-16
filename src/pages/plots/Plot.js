import React, { useState } from "react";

import { Container, Button, Grid } from '@material-ui/core';
// styles
import useStyles from "./styles";


// components


import PageTitle from "../../components/PageTitle/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import PlotDialog from "./components/plotDialog/PlotDialog";
import { UpdateDataAPI } from "../../Services/UpdateDataAPI";

function Plot(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dataId, setDataId] = useState('');
    const [isUpdate, setIsUpdate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [dialogState, setDialogState] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    //
    const [plot, setPlot] = useState(null);

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
    const addNew = () => {
        setDialogState(true);
    };
    const backButton = () => {
        setDialogState(false);
        setPlot({});
    }
    const handleView = (dataObject) => {
        setPlot(dataObject);
        setIsEdit(true);
        setDialogState(true);
    }
    const handleEdit = (dataObject) => {
        setPlot(dataObject);
        setIsEdit(true);
        setDialogState(true);
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this record?", "confirm", function () {
            UpdateDataAPI('plot/deleteplotbyid', null, idToDelete).then((result) => {
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
        setPlot(null);
        setIsEdit(false);
        setDialogState(false);
    }

    return (
        <>
            <PageTitle title="Plots" />

            <Container maxWidth={false} className={classes.positionRelative}>
                <Grid item lg={12}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                    >+ Add New
                    </Button>
                </Grid>
                <Grid style={{width:'100%'}} item lg={12}>

                    <SearchGrid
                        dp={true}
                        isUpdate={isUpdate}
                        isView={false}
                        isEditAble={true}
                        isDelete={true}
                        isSearchAble={true}
                        isCustomSearch={false}
                        columnCode="PlotColumns"
                        searchPanelParams="PlotColumns"
                        // isRowClickAble={true}
                        // rowClick={getId}
                        // onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        apiUrl="plot/getallplots"
                        filter={filterValues}
                    />
                </Grid>
            </Container>
            {
                <PlotDialog
                    data={plot}
                    isEdit={isEdit}
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
        </>
    );
}
export default withSnackbar(Plot)
