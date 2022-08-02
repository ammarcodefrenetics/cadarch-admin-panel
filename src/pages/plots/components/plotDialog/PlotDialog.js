
import React, { useState, useEffect, useRef } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    Dialog,
    InputBase,
    InputAdornment,
    IconButton
} from '@material-ui/core';
import { AttachFile, Close as CloseIcon }
    from '@material-ui/icons';
import ViewIcon from "../../../../images/icons/view.png"
import Profile from "../../../../images/profile-pic.jpg"
import { DraggableComponent, ErrorMessage, FormBtn, FormGroupTitle, Label, ImageViewer } from "../../../../components/UiElements/UiElements";
import { InputBaseField, TextareaField, CheckboxField, SelectField, InputBaseFieldNumber } from "../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import SearchGrid from '../../../../components/SearchGrid/SearchGrid';
import { Scrollbars } from "rc-scrollbars";
import { UpdateDataAPI } from "../../../../Services/UpdateDataAPI";
import { Typography } from "antd";
import { data } from "../../../../components/SearchGrid/component/setupData";
// import GoogleMap from "../../../../components/googleMaps/GoogleMap";

function PlotDialog({ data, isEdit, dialogOpenClose, handleClose, ...props }) {
    console.log(data , " data in plots")

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    //--//
    const [imagViewerDialogState, setImagViewerDialogState] = useState(false);
    const [optionImagePath, setOptionImagePath] = useState(false);

    const inputFile = useRef(null);
    const unitList = [
        { value: "Marla", label: "Marla" },
        { value: "Kanal", label: "Kanal" },
    ]

    const [allergyId, setAllergyId] = useState(props.allergyId);

    //end dropdown lists
    const [errorMessages, setErrorMessages] = useState({
        titleError: false, sizeError: false, unitError: false,
        lengthError: false, widthError: false, heightError: false,
        coveredAreaError: false, coveredAreaWithBasementError: false,
        fileError: false
    });

    const [state, setState] = useState({ image: { file: null, fileToSend: null, fileName: null } });
    const [loading, setLoading] = useState({ isSaving: false, isUpdating: false });
    //grid
    const [isUpdate, setIsUpdate] = useState(false);
    const [filterValues, setFilterValues] = useState({});
    const [attachment, setAttachment] = useState({ file: null, fileToSend: null, fileName: null });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //file upload
    const handleSelectFile = () => {
        inputFile.current.click();
    }
    function handleFileUpload(e) {

        let files = e.target.files;
        // let attachment = {
        //     file: URL.createObjectURL(files[0]),
        //     fileToSend: files[0],
        //     fileName: files[0].name
        // }

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
            size: '',
            unit: "",
            length: "",
            width: "",
            coveredAreaWithBasement: "",
            coveredArea: "",
            image: "",
            attachmentPath: ""
        });
        setAttachment({ file: null, fileToSend: null, fileName: null });
        setErrorMessages({
            titleError: false, sizeError: false, unitError: false,
            lengthError: false, widthError: false, heightError: false,
            coveredAreaError: false, coveredAreaWithBasementError: false,
            fileError: false
        });
    }
    const ResetForm = () => {
        if (data && data != null) {
            let path = data?.attachmentsPath[0]?.path.replace(/\\/g, "/").replace('public/', '/') ?? '';
            setState({
                id: data._id,
                title: data.title,
                length: data.length,
                width: data.width,
                size: data.size?.split(" ")[0],
                unit: data.size?.split(" ")[1],
                coveredAreaWithBasement: data.coveredAreaWithBasement,
                coveredArea: data.coveredArea,
                image: path,
                attachmentPath: "http://localhost:5000" + path
            });
            setOptionImagePath(`http://localhost:5000${path}`);
            setAttachment({
                fileName: path ?? ''
            })
        }
        else {
            init();
        }
    }
    //functions
    const getId = dataId => { }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => { }
    const handleChange = e => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    const handleChkboxChange = e => {
        const { name, checked } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: checked
        }));
    }

    useEffect(() => {

        ResetForm();

    }, [dialogOpenClose, data]);

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
        }
        if (!state.size || state.size === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                sizeError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                sizeError: false
            }));
        }
        if (!state.unit || state.unit.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                unitError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                unitError: false
            }));
        }
        if (!state.length || state.length === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                lengthError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                lengthError: false
            }));
        }
        if (!state.width || state.width === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                widthError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                widthError: false
            }));
        }
        if (!state.coveredArea || state.coveredArea === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                coveredAreaError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                coveredAreaError: false
            }));
        }
        if (!state.coveredAreaWithBasement || state.coveredAreaWithBasement === 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                coveredAreaWithBasementError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                coveredAreaWithBasementError: false
            }));
        }
        if (!attachment || attachment?.fileName == null || attachment?.fileName?.trim() == "" ) {
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
        }
        return isValidated;
    }
    const saveData = () => {
        console.log(attachment , "attachement upon saving")
        let validated = validate(true);
        if (validated) {
            let postData = {
                title: state.title,
                size: state.size,
                unit: state.unit,
                length: state.length,
                width: state.width,
                coveredAreaWithBasement: state.coveredAreaWithBasement,
                coveredArea: state.coveredArea,
            };
            const formData = new FormData();
            formData.append("model", JSON.stringify(postData));
            formData.append("attachments", attachment?.fileToSend);
            setLoading({ isSaving: true })
            PostDataAPI('plot/addplot', formData, "form").then((result) => {
                setLoading({ isSaving: false })
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Succcess", result.responseMessage, "success", 3000);
                    setState(result.data.data);
                    handleClose();
                } else {
                    showMessage("Error", result.responseMessage, "error", 3000);
                }
            })
        }
    }
    const updateData = () => {
        console.log(attachment , "attachement upon updating")
        let validated = validate(true);
        if (validated) {
            let postData = {
                title: state.title,
                size: state.size,
                unit: state.unit,
                length: state.length,
                width: state.width,
                coveredAreaWithBasement: state.coveredAreaWithBasement,
                coveredArea: state.coveredArea,
                oldAttachments: state.attachmentPath
            };
            const formData = new FormData();
            formData.append("model", JSON.stringify(postData));
            formData.append("attachments", attachment?.fileToSend);
            setLoading({ isUpdating: true })
            UpdateDataAPI('plot/updateplot', formData, data._id, "form").then((result) => {
                setLoading({ isUpdating: false })
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Succcess", result.responseMessage, "success", 3000);
                    handleClose();
                } else {
                    showMessage("Error", result.responseMessage, "error", 3000);
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
                            <FormGroupTitle>{isEdit ? "Edit Plot" : "Add Plot"}</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={closeDialog} />
                            {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span> */}
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={250} autoHeightMax={750} >
                                <Grid container className={classes.InnerContent}>

                                    <Grid item lg={12} >

                                        <Grid container direction="row">

                                            <Label title="Title" xs={12} sm={3} md={3} lg={3} />

                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <InputBaseField
                                                    id="title"
                                                    name="title"
                                                    value={state.title}
                                                    placeholder="25x40"
                                                    onChange={handleChange}
                                                />
                                                {
                                                    errorMessages.titleError &&
                                                    <ErrorMessage > Please enter title </ErrorMessage>
                                                }
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Label" xs={12} sm={3} md={3} lg={3} />

                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <Grid container >
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <InputBaseFieldNumber
                                                            id="size"
                                                            name="size"
                                                            value={state.size}
                                                            placeholder="Size"
                                                            onChange={handleChange}
                                                        />
                                                        {
                                                            errorMessages.sizeError &&
                                                            <ErrorMessage > Please enter size </ErrorMessage>
                                                        }
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} />
                                                    <Grid item xs={12} sm={4} md={4} lg={4}>
                                                        <SelectField
                                                            id="unit"
                                                            name="unit"
                                                            value={state.unit}
                                                            placeholder="Slect Unit"
                                                            onChange={handleChange}
                                                            options={unitList}
                                                        />
                                                        {
                                                            errorMessages.unitError &&
                                                            <ErrorMessage > Please enter unit </ErrorMessage>
                                                        }
                                                    </Grid>

                                                </Grid>
                                            </Grid>

                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Length (ft)" xs={12} sm={3} md={3} lg={3} />

                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <Grid container direction="row">
                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        <InputBaseFieldNumber
                                                            id="length"
                                                            name="length"
                                                            value={state.length}
                                                            onChange={handleChange}
                                                        />
                                                        {
                                                            errorMessages.lengthError &&
                                                            <ErrorMessage > Please enter length </ErrorMessage>
                                                        }
                                                    </Grid>
                                                    <Label title="Width (ft)" xs={12} sm={4} md={4} lg={4} />
                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        <InputBaseFieldNumber
                                                            id="width"
                                                            name="width"
                                                            value={state.width}
                                                            onChange={handleChange}
                                                        />
                                                        {
                                                            errorMessages.widthError &&
                                                            <ErrorMessage > Please enter width </ErrorMessage>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            
                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Covered Area (sq. ft)" xs={12} sm={3} md={3} lg={3} />


                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <InputBaseFieldNumber
                                                    id="coveredArea"
                                                    name="coveredArea"
                                                    value={state.coveredArea}
                                                    onChange={handleChange}
                                                    endAdornment="sq ft"
                                                />
                                                {
                                                    errorMessages.coveredAreaError &&
                                                    <ErrorMessage > Please enter covered area </ErrorMessage>
                                                }
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Covered Area Basement (sq. ft)" xs={12} sm={3} md={3} lg={3} />


                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <InputBaseFieldNumber
                                                    id="coveredAreaWithBasement"
                                                    name="coveredAreaWithBasement"
                                                    value={state.coveredAreaWithBasement}
                                                    onChange={handleChange}
                                                    endAdornment="sq ft"
                                                />
                                                {
                                                    errorMessages.coveredAreaWithBasementError &&
                                                    <ErrorMessage > Please enter area with basement</ErrorMessage>
                                                }
                                                {/* <Typography className={classes.subText}>Sq. ft</Typography> */}
                                            </Grid>
                                        </Grid>

                                        <Grid container direction="row">

                                            <Label title="Image" xs={12} sm={3} md={3} lg={3} />


                                            <Grid item xs={12} sm={8} md={8} lg={8} >
                                                <span className={classes.btnSpan}>
                                                    {/* <img
                                                        id="uploadFile"
                                                        onClick={handleSelectFile}
                                                        className={classes.uploadFile}
                                                        src={attachment.photo ? attachment.photo
                                                            : state.attachmentPath ? state.attachmentPath
                                                                : Profile}
                                                    /> */}
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
                                                    <img onClick={() => setImagViewerDialogState(true)} src={ViewIcon} className={classes.viewIcon} alt='view' />
                                                </span>

                                                <input
                                                    multiple
                                                    type="file"
                                                    ref={inputFile}
                                                    accept="image/*"
                                                    id="fileUploadField"
                                                    onChange={handleFileUpload}
                                                    // accept=".png, .jpg, .jpeg"
                                                    style={{ display: "none" }}
                                                />
                                                {
                                                    errorMessages.fileError &&
                                                    <ErrorMessage > Please select image</ErrorMessage>
                                                }
                                            </Grid>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Scrollbars>
                        </div>

                        <div className={classes.footer}>
                            <Grid container direction="row" alignItems="center" justifyContent="flex-start">
                                <Grid item xs={12} sm={3} md={3} lg={3} />
                                <Grid item xs={12} sm={8} md={8} lg={8} >
                                    {isEdit && isEdit != null ?
                                        loading.isUpdating ?
                                            <FormBtn id="loadingSave" disabled={false} size="medium">
                                                Update
                                            </FormBtn>
                                            : <FormBtn id="save" onClick={updateData} size="medium">
                                                Update
                                            </FormBtn> :
                                        loading.isSaving ?
                                            <FormBtn id="loadingSave" disabled={false} size="medium">
                                                Save
                                            </FormBtn>
                                            : <FormBtn id="save" onClick={saveData} size="medium">
                                                Save
                                            </FormBtn>
                                    }
                                    <FormBtn id={"reset"} onClick={clear} size="medium" >Reset </FormBtn>
                                    <FormBtn id={"reset"} size="medium" onClick={handleClose}>Close</FormBtn>
                                </Grid>
                            </Grid>
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
export default withSnackbar(PlotDialog)