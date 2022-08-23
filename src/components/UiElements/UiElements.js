import React from "react";

import {
    List,
    ListItem,
    ListItemAvatar,
    Link as Hyperlink,
    Paper,
    Typography,
    Button,
    FormLabel,
    CircularProgress,
    Grid as DivGrid,
    Divider,
    FormHelperText,
    Dialog
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DescriptionIcon from '@material-ui/icons/Description';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '../../images/icons/deleteBtnIcon.png';
import useStyles from "./styles";
import Draggable from 'react-draggable';
import { Close as CloseIcon } from '@material-ui/icons';

function LinkItem({ itemLink, itemImage, itemTitle, itemContent, ...props }) {
    var classes = useStyles();


    return (
        <>
            <List className={classes.LinkItemBox} {...props}>
                <ListItem className={classes.itemList} alignItems="flex-start">
                    <Link className={classes.itemLinkBox} to={itemLink}>
                        <ListItemAvatar>
                            <img alt={itemTitle} src={itemImage} />
                        </ListItemAvatar>
                        <div className={classes.itemContentBox}>
                            <span className={classes.itemTextTitle}>{itemTitle}</span>
                            <p className={classes.itemTextContent}>{itemContent}</p>
                        </div>
                    </Link>
                </ListItem>
            </List>
        </>
    );
}
function LinkS({ onClick, href, children, target, ...props }) {
    var classes = useStyles();


    return (
        <>
            <Hyperlink className={classes.hyperlink} href={href} target={target} onClick={onClick} {...props}>
                {children}
            </Hyperlink>
        </>
    );
}

function ShadowBox({ shadowSize, outlined, children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Paper className={classes.shadowBox} elevation={shadowSize} variant={outlined}   {...props}>
                {children}
            </Paper>
        </>
    )
}
function ShadowBoxMin({ shadowSize, outlined, children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Paper className={classes.shadowBoxMin} elevation={shadowSize} variant={outlined}   {...props}>
                {children}
            </Paper>
        </>
    )
}
function FooterBtn({ children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <div className={classes.footerBtn} {...props}>
                {children}
            </div>
        </>
    )
}
function FormGroupTitle({ children, ...props }) {
    var classes = useStyles();
    return (
        <>
            <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                <span className={classes.baseTitle}>{children}</span>
                <span className={classes.baseLine}> </span>
            </Typography>
        </>
    )
}
function FormBtn({ id, btnType, onClick, size, children, disabled, ...props }) {
    var classes = useStyles();
    //Class name ( classes.saveBtn, classes.resetBtn, classes.updateBtn, classes.deleteBtn )
    return (
        <>
            {id == "save" ?
                <Button id={id}
                    className={classes.saveBtn}
                    disabled={disabled}
                    onClick={onClick}
                    size={size}
                    startIcon={btnType === "back" ? <ArrowBackIosIcon /> : btnType === "search" ? <SearchIcon /> : btnType === "next" ? null : btnType === "logs" ? <DescriptionIcon /> : btnType === undefined ? <SaveIcon /> : null}
                    endIcon={btnType === "next" ? <ArrowForwardIosIcon /> : null}
                    {...props}>
                    {children}</Button>
                : ''
            }
            {id == "reset" ?
                <Button id={id} className={classes.resetBtn} disabled={disabled} onClick={onClick} size={size} {...props}>{children}</Button>
                : ''
            }
            {id == "update" ?
                <Button id={id} className={classes.updateBtn} disabled={disabled} onClick={onClick} size={size}

                    {...props}>{children}</Button>
                : ''
            }
            {id == "delete" ?
                <Button id={id} className={classes.deleteBtn} disabled={disabled} onClick={onClick} size={size}
                    startIcon={<img src={DeleteIcon} alt="deleteIcon" />}
                    {...props}>{children}</Button>
                : ''
            }
            {id == "loadingSave" ?
                <Button id={id} className={classes.saveBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
            {id == "loadingDelete" ?
                <Button id={id} className={classes.deleteBtn} size={size} onClick={onClick} disabled={disabled} {...props}>
                    <CircularProgress className={classes.circularProgressBar} size={20} />
                    {children}
                </Button>
                : ''
            }
        </>
    )
}
function Label({ sm, md, lg, title, mandatory, isTextAreaInput, isDisabled, ...props }) {
    var classes = useStyles();
    return (
        <>
            <DivGrid item xs={12} sm={sm} md={md} lg={lg} >
                <DivGrid container className={classes.labelAlign}>
                    <FormLabel disabled={isDisabled} className={isTextAreaInput ? classes.textAreaInput : classes.lableInput} {...props}>
                        {title}
                        {mandatory ?
                            <span className={classes.mandatorColor}>*</span> : null
                        }:
                    </FormLabel>
                </DivGrid>
            </DivGrid>
        </>
    )
}
function CustomLabel({ size, title, mandatory, ...props }) {
    var classes = useStyles();
    return (
        <>
            <DivGrid item xs={12} sm={size} md={size} lg={size} container direction="row" className={classes.labelAlign}>
                <FormLabel className={classes.customLableInput} {...props}>
                    {title}
                    {mandatory ?
                        <span className={classes.mandatorColor}>*</span>
                        : ""
                    }:
                </FormLabel>
            </DivGrid>
        </>
    )
}
function CustomDivider({ Orientation, isLight, Varient, ...props }) {
    var classes = useStyles();
    return (
        <>
            {/* <Typography variant="subtitle1" className={classes.formTitle} gutterBottom>
                <span className={classes.baseLine}> </span>
            </Typography> */}
            <Divider
                light={isLight}
                varient={Varient}
                className={classes.customDivider}
                orientation={Orientation}
            />
        </>
    )
}
function DraggableComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}
function ErrorMessage({ children, textArea, ...props }) {
    var classes = useStyles();
    return (
        <>
            <FormHelperText className={textArea === true ? classes.errorMessageTextArea : classes.errorMessage}>
                <span>{children}</span>
            </FormHelperText>
        </>
    )
}
function ImageViewer({ file, filePath, dialogOpenClose, handleClose, ...props }) {
    console.log(file , " --- " , filePath)
    var classes = useStyles();
    const onClose = (e, reason) => {
        if (reason !== "backdropClick" || reason !== "escapeKeyDown") {
            handleClose();
        }
        return;
    };
    return (
        <>
            <Dialog
                PaperComponent={DraggableComponent}
                open={dialogOpenClose}
                onClose={onClose}
                maxWidth={false}
                disableEscapeKeyDown
                classes={{ paper: classes.dialogPaper }}>
                <div className={classes.dialogContent}>
                    <div className={classes.box}>
                        <div className={classes.header} id="draggable-dialog-title">
                            <FormGroupTitle>Image</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={onClose} />
                        </div>
                        <div  className={classes.content}>
                            <img src={filePath && !file ?filePath:file} alt="img"/>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export { LinkItem, LinkS, ShadowBox, ShadowBoxMin, FooterBtn, FormGroupTitle, FormBtn, Label, CustomLabel, CustomDivider, DraggableComponent, ErrorMessage, ImageViewer };

