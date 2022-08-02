import React, { useState } from "react";

import { Container, Button } from '@material-ui/core';
// styles
import useStyles from "./styles";


// components


import PageTitle from "../../components/PageTitle";
import SearchGrid from '../../components/SearchGrid/SearchGrid';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
function UsersList(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});

    const handleUpdate = () => { setIsUpdate(!isUpdate); }

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
    //
    return (
        <>
            <PageTitle title="User list" />

            <Container maxWidth={false} className={classes.positionRelative}>

                <SearchGrid
                    dp={true}
                    isUpdate={isUpdate}
                    isView={true}
                    isEditAble={true}
                    isDelete={false}
                    isSearchAble={false}
                    isCustomSearch={true}
                    columnCode="UsersColumns"
                    searchPanelParams="UsersColumns"
                    // isRowClickAble={true}
                    // rowClick={getId}
                    // onView={handleView}
                    // onEdit={handleView}
                    // onDelete={handleDelete}
                    apiUrl="mobileUsers/loadallmobileusers"
                    filter={filterValues}
                />
            </Container>
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
    )
}

export default withSnackbar(UsersList)
