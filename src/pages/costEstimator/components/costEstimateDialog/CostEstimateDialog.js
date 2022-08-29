
import React from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    Dialog,
    Typography,
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';
import { DraggableComponent, FormGroupTitle } from "../../../../components/UiElements/UiElements";
import { withSnackbar } from '../../../../components/Message/Alert'
import { Scrollbars } from "rc-scrollbars";
function CostEstimateDialog({ data, dialogOpenClose, handleClose, showMessage, ...props }) {

    // handle styles
    var classes = useStyles();

    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                onClose={handleClose}
                disableEscapeKeyDown
                classes={{ paper: classes.dialogPaper }}>

                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Cost Estimate</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={handleClose} />
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={530}>
                                <Grid container direction="column" className={classes.InnerContent}>
                                    <div className={classes.headerContainer}>
                                        <div className={classes.headerSubContainer}>
                                            <span>
                                                <Typography className={classes.headerLabel}>User Name:</Typography>
                                                <Typography className={classes.labelValue}>{data?.userId?.fullName}</Typography>
                                            </span>
                                            <span>
                                                <Typography className={classes.headerLabel}>Estimate Cost:</Typography>
                                                <Typography className={classes.labelValue}>{data?.totalEstimate?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').substring(0, data?.totalEstimate?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').length-3)} <strong> /RS</strong></Typography>
                                            </span>
                                        </div>
                                        <div className={classes.headerSubContainer}>
                                            <span>
                                                <Typography className={classes.headerLabel}>Contact:</Typography>
                                                <Typography className={classes.labelValue}>{data?.userId?.phoneNumber}</Typography>
                                            </span>
                                            <span>
                                                <Typography className={classes.headerLabel}>Date:</Typography>
                                                <Typography className={classes.labelValue}>{data?.createdAt?.split("T")?.[0]}</Typography>
                                            </span>
                                        </div>
                                    </div>
                                    {data?.details?.length > 0 ?
                                        < table className={classes.detailsTable}>
                                            <thead>
                                                <tr>
                                                    <td>Question</td>
                                                    <td>Option</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.details?.map((item, i) => (
                                                    <tr key={i}>
                                                        <td>{item?.questionId?.title}</td>
                                                        <td>{item?.optionId?.title}</td>
                                                    </tr>
                                                )
                                                )}
                                            </tbody>
                                        </table>
                                        : null
                                    }
                                </Grid>
                            </Scrollbars>
                        </div>

                    </div>
                </div>
            </Dialog>

        </>

    );
}
export default withSnackbar(CostEstimateDialog)