
import React, { useState, useEffect, useRef } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    IconButton,
    Dialog,
    InputBase,
    InputAdornment
} from '@material-ui/core';
import { AttachFile, Close as CloseIcon }
    from '@material-ui/icons';
// import CloseIcon from "../../../../images/icons/math-plus.png"
import { DraggableComponent, ErrorMessage, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { InputBaseField, TextareaField, CheckboxField, SelectField } from "../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import GoogleMap from "../../../../components/googleMaps/GoogleMap";
import { Scrollbars } from "rc-scrollbars";
import axios from 'axios';
import { UpdateDataAPI } from "../../../../Services/UpdateDataAPI";
function ArchitectureDialog({ data, dialogOpenClose, handleClose, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    //end dropdown lists
    const [errorMessages, setErrorMessages] = useState({
    });

    const [state, setState] = useState(data ? data : {});
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const handleChange = e => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleChkboxChange = e => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }
    // const init = () => {
    //     setState({
    //         // architectureType: "",
    //         // architectureTypeOptionsList: [],
    //         // location: "",
    //         isFollowUp: false,
    //         // details: "",
    //         comments: "",
    //         // audioFile: "",
    //         // address: "",
    //         // attachmentsPath: [],
    //     });
    // }

    const ResetForm = () => {

        // if (data && data != null) {
        setState({
            id: data?._id,
            architectureType: data?.renovationType,
            architectureTypeOptionsList: data?.architectureTypeOptionsList,
            location: data?.location,
            isFollowUp: data?.isFollowUp,
            details: data?.details,
            comments: data?.comments ?? '',
            audioFile: data?.audioFile,
            address: data?.address,
            attachmentsPath: data?.attachmentsPath,
        });
        // }
        // else {
        //     init();
        // }
    }

    useEffect(() => {

        ResetForm();

    }, [dialogOpenClose]);
    const validate = (isValidated) => {
        if (!state.isFollowUp || state.isFollowUp === false) {
            setErrorMessages(prevState => ({
                ...prevState,
                isFollowUpError: true
            }));
            isValidated = false;
            showMessage('Error', 'Please select follow up', 'error', 2000);
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                isFollowUpError: false
            }));
        }
        if (!state.comments || state.comments.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                commentsError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                commentsError: false
            }));
        }
        return isValidated;
    }
    const Save = () => {
        let isValidated = validate(true);
        if (isValidated) {
            let postData = {
                isFollowUp: state.isFollowUp,
                comments: state.comments,
            };

            UpdateDataAPI('architecture/updatearchitecture', postData, data._id).then((result) => {
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Succcess", result.responseMessage, "success", 3000);
                    setTimeout(() => {
                        handleClose();
                    }, 3000)
                }
            })
        }
    }

    function clear() {
        ResetForm();
        setErrorMessages({});
    }
    function deleteRecord() { }

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
    const closeDialog = (event, reason) => {
        if (reason !== 'backdropClick') {
            handleClose();
        }
    }
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                onClose={closeDialog}
                disableEscapeKeyDown
                classes={{ paper: classes.dialogPaper }}>

                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>View Architecture</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={closeDialog} />
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={350} autoHeightMax={530}>
                                <Grid container className={classes.InnerContent}>
                                    <Grid item lg={12} >

                                        <Grid container direction="row">

                                            <Label title="Architecture Type" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <InputBaseField
                                                    disabled={true}
                                                    id="architectureType"
                                                    name="architectureType"
                                                    value={data.architectureType}
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            {/* <Label title="Area" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <InputBaseField
                                                    id="area"
                                                    name="area"
                                                    value={data.area}
                                                    onChange={handleChange}
                                                />
                                            </Grid> */}

                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Location" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <InputBaseField
                                                    disabled={true}
                                                    id="location"
                                                    name="location"
                                                    value={data.address}
                                                    onChange={handleChange}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <CheckboxField
                                                    id="isFollowUp"
                                                    name="isFollowUp"
                                                    checked={state.isFollowUp}
                                                    label="Is Followed Up"
                                                    onChange={handleChkboxChange}
                                                />
                                            </Grid>

                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Details" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >

                                                <TextareaField
                                                    rowsMin={5}
                                                    id="details"
                                                    name="details"
                                                    value={data.details}
                                                    MaxLength="2000"
                                                    placeholder="Details"
                                                    Disabled={true}
                                                    onChange={handleChange}
                                                />

                                            </Grid>


                                            <Label title="Comments" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >

                                                <TextareaField
                                                    rowsMin={5}
                                                    id="comments"
                                                    name="comments"
                                                    value={state.comments}
                                                    MaxLength="2000"
                                                    placeholder="Comments"
                                                    onChange={handleChange}
                                                />
                                                {
                                                    errorMessages.commentsError &&
                                                    <ErrorMessage> Please enter your comments </ErrorMessage>
                                                }
                                            </Grid>

                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Audio File" xs={12} sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={8} md={8} lg={8} style={{ marginTop: 10, marginBottom: 10 }}  >

                                                <audio controls className={classes.audioFile}>
                                                    <source src={`http://localhost:5000/${data.audioFile}`} type="audio/mpeg" />
                                                </audio>

                                                {/* <GoogleMap /> */}

                                            </Grid>

                                        </Grid>
                                        {data.location ? (
                                            <Grid>
                                                <GoogleMap coords={data?.location[0]?.coordinates} />
                                            </Grid>
                                        ) : null}
                                        {
                                            (data?.attachmentsPath?.length > 0) &&
                                            <Grid container direction="row">

                                                <FormGroupTitle>Attached Images</FormGroupTitle>
                                                <Grid item xs={12} sm={2} md={2} lg={2} />

                                                <Grid item xs={12} sm={10} md={10} lg={10}>

                                                    <ul className={classes.imageList}>
                                                        {
                                                            // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((item, i) => {
                                                            (data?.attachmentsPath?.length > 0) && data.attachmentsPath.map((item, i) => {
                                                                let extArray = item.path.split(".")[1];
                                                                if (extArray !== "mp3" && extArray !== 'm4a') {
                                                                    var path = "http://localhost:5000/" + item.path
                                                                    return (
                                                                        <li key={item._id} className={classes.root}>
                                                                            <a href={path} target="_blank">
                                                                                <img src={path} />
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                }
                                                            })}
                                                    </ul>

                                                </Grid>

                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Scrollbars>
                        </div>

                        <div className={classes.footer}>
                            {/* <div className={classes.footerRight}> */}
                            <Grid item lg={12} container direction="row">
                                <Grid
                                    container
                                    item
                                    alignItems="center"
                                    justify="center"
                                    xs={12} sm={12} md={12} lg={12}
                                >
                                    {loading.isSaving ?
                                        <FormBtn id="loadingSave" disabled={false} size="medium">
                                            Update
                                        </FormBtn>
                                        : <FormBtn id="save" onClick={Save} size="medium">
                                            Update
                                        </FormBtn>
                                    }
                                    <FormBtn id={"reset"} onClick={clear} size="medium" >Reset </FormBtn>
                                    <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </Dialog>

            <ActionDialog
                title={actiondialogprops.actiondialogtitle}
                message={actiondialogprops.actiondialogmessage}
                type={actiondialogprops.actiondialogtype}
                actiondialogOpenClose={actiondialogprops.actiondialogstate}
                onSubmit={deleteRecord}
                onCancel={() => setActionDialogProps(prevState => ({
                    ...prevState,
                    actiondialogstate: false,
                }))
                }
            />


        </>

    );
}
export default withSnackbar(ArchitectureDialog)