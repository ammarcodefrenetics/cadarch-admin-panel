
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
import ViewIcon from "../../../../images/icons/view.png"
// import CloseIcon from "../../../../images/icons/math-plus.png"
import { DraggableComponent, FormBtn, FormGroupTitle, Label, ErrorMessage, ImageViewer } from "../../../../components/UiElements/UiElements";
import { InputBaseField, TextareaField } from "../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import SearchGrid from '../../../../components/SearchGrid/SearchGrid';
import { Scrollbars } from "rc-scrollbars";
import { UpdateDataAPI } from "../../../../Services/UpdateDataAPI";
import { baseUrlForFiles } from "../../../../Configuration/baseUrlForFiles";
function AddNews({ data, isEdit, dialogOpenClose, handleClose, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;

    const [imagViewerDialogState, setImagViewerDialogState] = useState(false);
    const [optionImagePath, setOptionImagePath] = useState(false);

    //attachment
    const inputFile = useRef(null);

    const [attachment, setAttachment] = useState({ file: null, fileToSend: null, fileName: null });

    //end dropdown lists
    const [errorMessages, setErrorMessages] = useState({ titleError: false, fileError: false, detailsError: false });

    const [state, setState] = useState({ image: { file: null, fileToSend: null, fileName: null } });
    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    //grid
    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleChange = e => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleSelectFile = () => {
        inputFile.current.click();
    }
    function handleFileUpload(e) {

        let files = e.target.files;
        let attachment = {
            file: URL.createObjectURL(files[0]),
            fileToSend: files[0],
            fileName: files[0].name
        }
        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(files[0]),
            fileToSend: files[0],
            fileName: files[0].name
        })
        // setState(prevState => ({
        //     ...prevState,
        //     ["image"]: files[0]
        // }));

    }
    const init = () => {
        setState({
            title: "",
            details: "",
            image: "",
            attachmentPath: ""
        });
        setAttachment({ file: null, fileToSend: null, fileName: null });
        setErrorMessages({ titleError: false, fileError: false, detailsError: false })
    }

    const ResetForm = () => {

        if (isEdit && data && data != null) {
            let path = data?.attachmentsPath?.[0]?.path.replace(/\\/g, "/").replace('public/', '/') ?? '';
            setState({
                title: data?.title,
                details: data?.details,
                image: path,
                attachmentPath: baseUrlForFiles + path
            });
            setOptionImagePath(`${baseUrlForFiles}${path}`);
            setAttachment({
                fileName: path ?? ''
            })
        }
        else {
            init();
        }
    }
    useEffect(() => {

        ResetForm();

    }, [dialogOpenClose]);
    const validate = (isValidated) => {
        if (!state.title || state.title.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                titleError: true
            }));
            isValidated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                titleError: false
            }));
            // isValidated = true;
        }
        if (!attachment || attachment?.fileName == null || attachment?.fileName?.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                fileError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                fileError: false
            }));
            // isValidated = true;
        }
        if (!state.details || state.details.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                detailsError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                detailsError: false
            }));
            // isValidated = true;
        }
        return isValidated;
    }

    const Save = () => {
        let validated = validate(true);
        if (validated) {
            setLoading({...loading , isSaving:true})
            const formData = new FormData();

            let postData = {
                userId: "6295d0eaf81b7876bcced2e8",
                title: state.title,
                details: state.details,
            };
            formData.append("model", JSON.stringify(postData));
            formData.append("attachments", attachment?.fileToSend);

            PostDataAPI('news/addnews', formData, "form").then((result) => {
                console.log('result', result);
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Succcess", result.responseMessage, "success", 3000);
                    setLoading({...loading , isSaving:false})
                    handleClose();
                }
            })
        }
    }
    const Update = () => {
        let validated = validate(true);
        if (validated) {
            setLoading({...loading , isSaving:true})
            const formData = new FormData();

            let postData = {
                userId: "6295d0eaf81b7876bcced2e8",
                title: state.title,
                details: state.details,
            };
            formData.append("model", JSON.stringify(postData));
            formData.append("attachments", attachment?.fileToSend);

            UpdateDataAPI('news/updatenews', formData, data._id, "form").then((result) => {
                console.log('result', result);
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Success", result.responseMessage, "success", 3000);
                    setLoading({...loading , isSaving:false})
                    handleClose();
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
                            <FormGroupTitle>Add News</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={closeDialog} />
                        </div>
                        <div className={classes.content}>
                            <Scrollbars className={classes.scrollbars}>
                                <Grid container direction="column" className={classes.InnerContent}>

                                    <Grid item lg={12} >

                                        <Grid container direction="row">

                                            <Label title="Title" sm={3} md={3} lg={3} />

                                            <Grid item xs={12} sm={9} md={9} lg={9} >
                                                <InputBaseField
                                                    id="title"
                                                    name="title"
                                                    MaxLength={50}
                                                    value={state.title}
                                                    onChange={handleChange}
                                                />
                                                {errorMessages.titleError ? (<ErrorMessage >
                                                    Please enter news title
                                                </ErrorMessage>) : ('')}
                                            </Grid>
                                        </Grid>
                                        <Grid container direction="row">
                                            <Label title="Image" sm={3} md={3} lg={3} />

                                            <Grid item xs={12} sm={9} md={9} lg={9} >
                                                <span className={classes.btnSpan}>
                                                    <InputBase
                                                        id="uploadFile"
                                                        name="uploadFile"
                                                        className={classes.baseInput}
                                                        placeholder="Select Image"
                                                        // value={state.image?.fileName ?? ''}
                                                        value={attachment?.fileName ?? state.image}
                                                        disabled={true}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    className={classes.attachmentBtn}
                                                                    color="primary"
                                                                    onClick={handleSelectFile}>
                                                                    <AttachFile />
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {/* {attachment?.fileName && state.image ? */}
                                                    <img onClick={() => setImagViewerDialogState(true)} src={ViewIcon} className={classes.viewIcon} alt='view' />
                                                    {/* : null
                                                    } */}
                                                </span>

                                                <form>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            ref={inputFile}
                                                            id="fileUploadField"
                                                            onChange={handleFileUpload}
                                                            accept=".png, .jpg, .jpeg"
                                                            style={{ display: "none" }}
                                                        />
                                                    </div>
                                                </form>
                                                {errorMessages.fileError ? (<ErrorMessage >
                                                    Please select new file
                                                </ErrorMessage>) : ('')}
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                    <Grid container direction="row">

                                        <Label title="Description"  sm={3} md={3} lg={3} />

                                        <Grid item xs={12} sm={9} md={9} lg={9} >

                                            <TextareaField
                                                rowsMin={5}
                                                id="details"
                                                name="details"
                                                value={state.details}
                                                MaxLength="2000"
                                                placeholder="Description"
                                                onChange={handleChange}
                                            />
                                            {errorMessages.detailsError ? (<ErrorMessage >
                                                Please enter new details
                                            </ErrorMessage>) : ('')}
                                        </Grid>

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

                                    {isEdit && isEdit != null ?
                                        loading.isSaving ?
                                            <FormBtn id="loadingSave" disabled={false} size="medium">
                                                Update
                                            </FormBtn>
                                            : <FormBtn id="save" onClick={Update} size="medium">
                                                Update
                                            </FormBtn> :
                                        loading.isSaving ?
                                            <FormBtn id="loadingSave" disabled={false} size="medium">
                                                Save
                                            </FormBtn>
                                            : <FormBtn id="save" onClick={Save} size="medium">
                                                Save
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
            {imagViewerDialogState &&
                <ImageViewer
                    file={attachment?.file}
                    filePath={optionImagePath}
                    dialogOpenClose={imagViewerDialogState}
                    handleClose={() => setImagViewerDialogState(false)} />
            }
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
export default withSnackbar(AddNews)