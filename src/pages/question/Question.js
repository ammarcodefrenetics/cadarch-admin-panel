import React, { useEffect, useState } from "react";

import { Container, Button, Grid } from '@material-ui/core';
// styles
import useStyles from "./styles";


// components


import PageTitle from "../../components/PageTitle/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import AddNewQuestion from "./components/addNewQuestion/AddNewQuestion";
import { UpdateDataAPI } from "../../Services/UpdateDataAPI";
import { GetDataAPI } from "../../Services/GetDataAPI";
const axios = require('axios').default;
let token = sessionStorage.getItem('auth_token');

function CostEstimator(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [dialogState, setDialogState] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({});
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
    const addNew = () => {
        setDialogState(true);
    };
    const handleView = (dataObject) => {
        setData(dataObject);
        setIsEdit(false);
        setDialogState(true);
    }
    const handleEdit = (dataObject) => {
        setData(dataObject);
        setIsEdit(true);
        setDialogState(true);
    }

    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this Question?", "confirm", function () {
            UpdateDataAPI('question/deletequestionbyId', null, idToDelete).then((result) => {
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
        setData(null);
        setIsEdit(false);
        setDialogState(false);
    }
    const handleSwipe = (id1, id2, isBasic1, isBasic2, dependencyArray, displayOrder1, displayOrder2) => {
        if (id1 && id2 && isBasic1 && isBasic2 && dependencyArray && displayOrder1 && displayOrder2) {
            if (dependencyArray.length > 0) {
                for (let i = 0; i < dependencyArray.length; i++) {
                    if (dependencyArray[i].dependsOnQuestion.id === id1 &&
                        dependencyArray[i].dependentQuestion.id === id2
                        ||
                        dependencyArray[i].dependsOnQuestion.id === id2 &&
                        dependencyArray[i].dependentQuestion.id === id1
                    ) {
                        showMessage("Error", "Cannot swipe with parent", "error", 3000);
                        return
                    }
                }
            }
            if (isBasic1 === 'yes' && isBasic2 === 'no' || isBasic2 === 'yes' && isBasic1 === 'no') {
                console.log('got is second check')
                showMessage("Error", "Cannot swipe with basic question", "error", 3000);
                return
            }
            UpdateDataAPI('question/updatequestiondisplayorder', { id1, id2, displayOrder1, displayOrder2 }, null).then((result) => {
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Success", result.responseMessage, "success", 3000);
                    handleUpdate();

                } else {
                    showMessage("Error", result.responseMessage, "error", 3000);
                }
            })
        }
        else {
            console.log('params missing')
            return
        }
    }

    return (
        <>
            <PageTitle title="Questions" />

            <Container maxWidth={false} className={classes.positionRelative}>

                <Grid item lg={12}>
                    <Button
                        size="small"
                        className={classes.newAddBtn2}
                        onClick={addNew}
                    // disabled={!isEditable}
                    // onClick={checkAPI}
                    >+ Add New
                    </Button>

                </Grid>
                <Grid item lg={12}>
                    <SearchGrid
                        dp={true}
                        isUpdate={isUpdate}
                        isSearchAble={true}
                        isCustomSearch={false}
                        columnCode="Question"
                        searchPanelParams="Question"
                        isView={false}
                        isEditAble={true}
                        isDelete={true}
                        // isRowClickAble={true}
                        // rowClick={getId}
                        // onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onSwipe={handleSwipe}
                        apiUrl="question/loadallquestion"
                        filter={filterValues}
                        isQuestions={true}
                    />
                </Grid>
            </Container>
            {
                <AddNewQuestion
                    data={data}
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
export default withSnackbar(CostEstimator)
