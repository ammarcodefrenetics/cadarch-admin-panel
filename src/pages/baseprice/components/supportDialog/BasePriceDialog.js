
import React, { useState, useEffect } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    Dialog,
} from '@material-ui/core';
import { AttachFile, Close as CloseIcon }
    from '@material-ui/icons';
// import CloseIcon from "../../../../images/icons/math-plus.png"
import { DraggableComponent, ErrorMessage, FormBtn, FormGroupTitle, Label } from "../../../../components/UiElements/UiElements";
import { InputBaseField, TextareaField, CheckboxField } from "../../../../components/InputField/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import SearchGrid from '../../../../components/SearchGrid/SearchGrid';
import { Scrollbars } from "rc-scrollbars";
import { UpdateDataAPI } from "../../../../Services/UpdateDataAPI";
import GoogleMap from "../../../../components/googleMaps/GoogleMap";
// import GoogleMap from "../../../../components/googleMaps/GoogleMap";

function BasePriceDialog({ dialogOpenClose, handleClose, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    //--//
    const [basePrice , setBasePrice]=useState('')
    const [loading, setLoading] = useState({ isSaving: false });

    const [errorMessages, setErrorMessages] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });

    const handleChange = e => {
            setBasePrice(e.target.value)
       
    }

    const validate = (isValidated) => {
        const re = /^[0-9\b]+$/;
        if (!basePrice || basePrice === null || basePrice === undefined  ||  !re.test(basePrice) ) {
            setErrorMessages(true);
            isValidated = false;
            // showMessage('Error', 'Please Enter base price', 'error', 2000);
            return isValidated
        }
        else {
            setErrorMessages(false);
            return isValidated
        }
    }
    const Save = async () => {
        let isValidated = validate(true);
        if (isValidated) {
            let postData = {
               basePrice:basePrice,
               isActive:false
            };
            setLoading({isSaving:true})
            PostDataAPI('baseprice/addbaseprice', postData).then((result) => {
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    showMessage("Succcess", result.responseMessage, "success", 3000);
                    setTimeout(() => {
                        handleClose();
                    }, 2000)
                }
                clear()
                
            })
        }
    }

    function clear() {
        setBasePrice('')
        setLoading({isSaving:false})
        setErrorMessages(false);
    }

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
            setBasePrice('')
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
                            <FormGroupTitle>Add Base Price</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={closeDialog} />
                            {/* <span className={classes.crossButton} onClick={handleClose}><img src={CloseIcon} /></span> */}
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={120} autoHeightMax={70} >
                                <Grid container className={classes.InnerContent}>
                                    <Grid item lg={8} md={10} >
                                        <Grid container direction="row">
                                            <Label title="Base Price (PKR)" xs={5} sm={6} md={4} lg={5} />
                                            <Grid item xs={5} sm={6} md={4} lg={5} >
                                                <InputBaseField
                                                    id="baseprice"
                                                    name="baseprice"
                                                    value={basePrice}
                                                    type="number"
                                                    onChange={handleChange}
                                                />
                                                  {
                                                    errorMessages &&
                                                    <ErrorMessage > Please enter base price </ErrorMessage>
                                                }
                                            </Grid>
                                           
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
                                    
                                       {
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
            {/* <ActionDialog
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
            /> */}


        </>

    );
}
export default withSnackbar(BasePriceDialog)
