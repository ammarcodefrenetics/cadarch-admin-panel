import React, { useState } from "react";

import { Container, Button, Grid } from '@material-ui/core';
// styles
import useStyles from "./styles";

// components

import PageTitle from "../../components/PageTitle/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import AddNews from "./components/addNews/AddNews";
import { UpdateDataAPI } from "../../Services/UpdateDataAPI";

function News(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dialogState, setDialogState] = useState(false);

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    //
    const [news, setNews] = useState(null);
    const [isEdit, setIsEdit] = useState(false);


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

    const handleView = (dataObject) => {
        setNews(dataObject);
        setDialogState(true);
    }
    const handleEdit = (dataObject) => {
        setNews(dataObject);
        setIsEdit(true);
        setDialogState(true);
    }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this patient?", "confirm", function () {
            UpdateDataAPI('news/deletenewsbyid', null, idToDelete).then((result) => {
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Success", result.responseMessage, "success", 3000);
                    handleUpdate();
                } else {
                    showMessage("Error", result.responseMessage, "error", 3000);
                }
            })
        })
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }

    const closeNewsDialog = () => {
        handleUpdate();
        setDialogState(false);
        setNews({});
        setIsEdit(false);
    }
    return (
        <>
            <PageTitle title="News" />
            <Container maxWidth={false} className={classes.positionRelative}>
                <Grid item lg={12}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                    >+ Add New </Button>
                </Grid>
                <Grid item lg={12}>
                    <SearchGrid
                        dp={true}
                        isUpdate={isUpdate}
                        isSearchAble={true}
                        isCustomSearch={false}
                        isView={false}
                        isEditAble={true}
                        isDelete={true}
                        columnCode="NewsColumns"
                        searchPanelParams="NewsColumns"
                        // isRowClickAble={true}
                        // onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        apiUrl="news/loadallnews"
                        filter={filterValues}
                    />
                </Grid>
            </Container>
            {
                <AddNews
                    data={news}
                    isEdit={isEdit}
                    dialogOpenClose={dialogState}
                    handleClose={closeNewsDialog} />
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
export default withSnackbar(News)
