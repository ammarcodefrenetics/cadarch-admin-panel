
import React, { useState, useEffect, useRef } from "react";

// styles
import useStyles from "./styles";
import {
    Grid,
    IconButton,
    Dialog,
    InputBase,
    InputAdornment,
    TextField,
    Link,
    Tooltip
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
    AttachFile,
    Close as CloseIcon,
    AddCircle as AddIcon
} from '@material-ui/icons';
// import AddIcon from "../../../../images/icons/add.png"
import EditIcon from "../../../../images/icons/erase.png"
import ViewIcon from "../../../../images/icons/view.png"
import DeleteIcon from "../../../../images/icons/trash.png"
import { DraggableComponent, ErrorMessage, FormBtn, FormGroupTitle, Label, ImageViewer } from "../../../../components/UiElements";
import { InputBaseField, TextareaField, CheckboxField, MultiSelectField, InputBaseFieldNumber } from "../../../../components/InputField";
import { PostDataAPI } from '../../../../Services/PostDataAPI';
import { withSnackbar } from '../../../../components/Message/Alert'
import { ActionDialog } from "../../../../components/ActionDialog/ActionDialog";
import { Scrollbars } from "rc-scrollbars";
import { GetDataAPI } from "../../../../Services/GetDataAPI";
import SearchList from "../../../../components/SearchListField/SearchListField";
import { GetUserInfo } from "../../../../Services/GetUserInfo";
import { UpdateDataAPI } from "../../../../Services/UpdateDataAPI";
import { DeleteDataAPI } from "../../../../Services/DeleteDataAPI";
import { check } from "prettier";
import { baseUrlForFiles } from "../../../../Configuration/baseUrlForFiles";
// import MapComponent from "../../../../components/map/Map";
let dep = null
function AddNewQuestion({ data, isEdit, dialogOpenClose, handleClose, ...props }) {

    // handle styles
    var classes = useStyles();
    const { showMessage } = props;
    let user_info = JSON.parse(GetUserInfo());

    const [imagViewerDialogState, setImagViewerDialogState] = useState(false);
    const [optionImagePath, setOptionImagePath] = useState(false);

    //attachment
    const inputFile = useRef(null);
    const [attachment, setAttachment] = useState({ file: null, fileToSend: null, fileName: null });

    //show forms
    const [showOptionForm, setShowOptionForm] = useState(true);
    const [showDependenciesForm, setShowDependenciesForm] = useState(true);


    //dropdown lists
    const [optionsList, setOptionsList] = useState([]);

    const [state, setState] = useState({});
    const [optionsState, setOptionsState] = useState({});

    //selected items
    const [questions, setQuestions] = useState([]);
    const [questionOptions, setQuestionOptions] = useState([]);
    const [selectedDependencies, setSelectedDependencies] = useState(isEdit ? null : []);


    const [loading, setLoading] = useState({ isSaving: false, isDeleting: false });
    //error message
    const [errorMessages, setErrorMessages] = useState({
        questionTitleError: false,
        questionDisplayOrderError: false,
        questionDetailsError: false,
        questionOptionTitleError: false,
        questionOptionImageError: false,
        questionOptionPSFError: false,
        questionOptionDetailsError: false,
        dependencyQuestionError: false,
        dependencyOptionError: false,
    });
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    });
    //grid
    // const [isUpdate, setIsUpdate] = useState(false);
    // const [filterValues, setFilterValues] = useState({});
    //State For Action Dialog
    // const [actiondialogprops, setActionDialogProps] = useState({
    //     actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "confirm"
    // });
    //intialize values
    const init = () => {
        setState({
            questionId: "",
            questionName: "",
            questionOption: [],
            title: "",
            displayOrder: "",
            isBasic: false,
            isDependent: false,
            details: "",
        });
        setOptionsState({
            title: "",
            priceEffectPSF: '',
            // displayOrder: 0,
            details: "",
            image: "",
        });
        setAttachment({ file: null, fileToSend: null, fileName: null });
        loadQuestionData();
        setQuestionOptions([]);
        console.log(isEdit, " edit vlaue prior to setting dependencies")
        setSelectedDependencies(isEdit ? null : []);
        setErrorMessages({
            questionTitleError: false,
            questionDisplayOrderError: false,
            questionDetailsError: false,
            questionOptionTitleError: false,
            questionOptionImageError: false,
            questionOptionPSFError: false,
            questionOptionDetailsError: false,
            dependencyQuestionError: false,
            dependencyOptionError: false,
            dependenciesError: false
        })
    }
    const ResetForm = () => {
        if (isEdit && data && data != null) {
            setState({
                id: data._id,
                title: data.title,
                displayOrder: data.displayOrder,
                isBasic: data.isBasic,
                isDependent: data.isDependent,
                details: data.details,
            });
            setAttachment({ file: null, fileToSend: null, fileName: null })
            loadData();
        }
        else {
            init();
            // loadQuestionData();
        }
    }
    //handle file upload
    const handleSelectFile = () => {
        inputFile.current.click();
    }
    function handleFileUpload(e) {

        let files = e.target.files;

        setAttachment({ file: null, fileToSend: null, fileName: null });

        setAttachment({
            file: URL.createObjectURL(files[0]),
            fileToSend: files[0],
            fileName: files[0].name
        })
        //
        // setOptionsState(prevState => ({
        //     ...prevState,
        //     ['image']: files[0]
        // }));

    }
    //Change Values handlers
    const handleChange = e => {

        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const handleOptionChange = e => {

        const { name, value } = e.target;

        setOptionsState(prevState => ({
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


    //(#question-section)//
    //select question
    const handleSearcdhListChange = (name, item) => {
        const { id, value } = item;

        loadOptionData(id);

        setState(prevState => ({
            ...prevState,
            questionId: id,
            questionName: value
        }));

    }

    //load all questions and options in dependencies
    const loadQuestionData = (questionId) => {
        setLoading(true)
        GetDataAPI('question/loadallquestion').then((result) => {
            setLoading(false)
            if (result.responseCode == 1 && result.responseStatus == "success" && result.data.data != null) {
                let checkBasic = []
                let checkDetailed = []
                let questions = result.data.data
                for (let j = 0; j < questions.length; j++) {
                    if (questions[j].isBasic === true) {
                        checkBasic.push(questions[j])
                    }
                    else if (questions[j].isBasic === false) {
                        checkDetailed.push(questions[j])
                    }
                }
                let allQuestions = [...checkBasic, ...checkDetailed]
                setQuestions(
                    allQuestions.map((item, i) => {
                        return {
                            id: item._id,
                            value: item.title,
                            displayOrder: item.displayOrder,
                            isBasic: item.isBasic,
                            isDependent: item.isDependent
                        };
                    }));
            }
        });
    }

    //(#option-section)//

    //select options
    const handleMultiSelectChange = (name, selected) => {
        console.log(name, " ----------- ", selected)
        setState(prevState => ({
            ...prevState,
            [name]: selected
        }));
    };
    //load all questions and options in dependencies
    const loadOptionData = (questionId) => {
        GetDataAPI("questionOption/loadallquestionoptions").then((result) => {

            if (result.responseCode == 1 && result.responseStatus == "success") {
                if (result.data?.data && result.data?.data.length > 0) {
                    setOptionsList(result.data.data.filter((option => option.questionId == questionId)).map((item, i) => {
                        let listItem = {
                            value: item._id,
                            label: item.title
                        }
                        return { ...listItem }
                    })
                    )
                } else {
                    setOptionsList([]);
                }
            }
            else if (!result.message) {
                showMessage("Error", result.message, "error", 3000);
            }
        })
    }

    //add options to list
    const addOptionToList = () => {
        let isValidated = validateOption(true);
        if (isValidated) {
            let _questionOptions = [...questionOptions];

            let optionData = {
                _id: optionsState._id,
                title: optionsState.title,
                priceEffectPSF: optionsState.priceEffectPSF,
                // displayOrder: optionsState.displayOrder,
                details: optionsState.details,
                image: attachment.fileToSend
            };
            if (optionsState?._id) {
                let existingOptionIndex = _questionOptions.findIndex(option => option._id === optionsState._id);
                if (existingOptionIndex != -1) {
                    _questionOptions[existingOptionIndex] = optionData;
                }
                else {
                    _questionOptions.push(optionData);
                }

                setQuestionOptions(_questionOptions);

                setOptionsState({
                    title: "",
                    priceEffectPSF: "",
                    // displayOrder: "",
                    details: "",
                    image: "",
                });
                setAttachment({ file: null, fileToSend: null, fileName: null });
            }
            else {
                _questionOptions.push(optionData);

                setQuestionOptions(_questionOptions);

                setOptionsState({
                    title: "",
                    priceEffectPSF: "",
                    // displayOrder: "",
                    details: "",
                    image: "",
                });
                setAttachment({ file: null, fileToSend: null, fileName: null });

            }
        }
    }
    //edit single option
    const editOption = (item) => {
        console.log(item, " inside edit item")
        setOptionsState(item);
        setAttachment({
            file: null,
            fileToSend:null,
            fileName: null
        })
        let path = ''
        if (Array.isArray(item.image) && item.image.length > 0) {
            path = item?.image?.[0]?.replace(/\\/g, "/").replace('public/', '/');
            setOptionImagePath(`${baseUrlForFiles}${path}`)
        }
        else{
            setAttachment({
                file: URL.createObjectURL(item.image),
                fileToSend: item.image,
                fileName: item.image.name
            })
        }


        localStorage.setItem('optionsData', JSON.stringify({ ...item, image: path ?? '' }))
    }
    const viewOptionImage = (item) => {
        if (Array.isArray(item.image) && item.image.length > 0) {
            console.log('in if item : ', item)
            let path = item?.image?.[0]?.replace(/\\/g, "/").replace('public/', '/');
            setOptionImagePath(`${baseUrlForFiles}${path}`)
        }

        setImagViewerDialogState(true);
    }
    //reset optionsState
    const resetOption = () => {

        setOptionsState({
            title: "",
            priceEffectPSF: "",
            // displayOrder: "",
            details: "",
            image: "",
        });

    }
    const handleDeleteOption = (index, idToDelete) => {
        let _selectedOptions = [...questionOptions];
        if (questionOptions?.length > 2) {
            for (let i = 0; i < questionOptions.length; i++) {
                if (!questionOptions[i]._id) {
                    showMessage("Warning", 'Please save newly added option first', "warning", 3000);
                    return
                }
            }
            ShowActionDialog(true, "Delete", "Are you sure, you want to delete this option?", "confirm", function () {
                if (idToDelete) {
                    // _selectedOptions.splice(index, 1);
                    // setQuestionOptions(_selectedOptions);
                    UpdateDataAPI('questionOption/deleteoneoptionbyid', null, idToDelete).then((result) => {
                        if (result.responseCode == 1 && result.responseStatus == "success") {
                            showMessage("Success", result.responseMessage, "success", 3000);
                            _selectedOptions.splice(index, 1);
                            setQuestionOptions(_selectedOptions);
                        } else {
                            showMessage("Error", result.responseMessage, "error", 3000);
                        }
                    })
                }
            })
        } else {
            showMessage("Warning", 'Question must have two options', "warning", 3000);

        }
    }

    //(#dependency-section)//

    //add dependency to list 
    const handleAddDependency = () => {
        let isDependencyValidated = validateDependency(true);
        if (isDependencyValidated) {
            let _selectedDependencies = [...selectedDependencies];

            const selectedOptionObject = optionsList.filter((option) =>
                state.questionOption.includes(option.value)).map((item, i) => {
                    return { title: item.label, id: item.value };
                });
            let dependencyQuestion = {
                id: state.questionId,
                title: state.questionName
            };

            let dependency = {
                dependentQuestion: {
                    title: state.title
                },
                dependsOnQuestion: dependencyQuestion,
                dependsOnOptions: selectedOptionObject
            }
            if (state?.dependencyId) {

                dependency._id = state?.dependencyId;

                let existingdependencyIndex = selectedDependencies.findIndex(dependency => dependency._id === state.dependencyId);

                if (existingdependencyIndex !== -1) {
                    _selectedDependencies[existingdependencyIndex] = dependency;
                }
                else {
                    _selectedDependencies.push(dependency);
                }
                setSelectedDependencies(_selectedDependencies)
                setState(prevState => ({
                    ...prevState,
                    questionId: "",
                    questionName: "",
                    questionOption: []
                }));
                setOptionsList([])
            } else {
                _selectedDependencies.push(dependency);
                setSelectedDependencies(_selectedDependencies)
                setState(prevState => ({
                    ...prevState,
                    questionId: "",
                    questionName: "",
                    questionOption: []
                }));
                setOptionsList([])
            }
        }
    }
    //edit dependency
    const editDependency = (item) => {
        let options = item?.dependsOnOptions?.map((item, i) => {
            return item.id
        });
        loadOptionData(item?.dependsOnQuestion?.id);
        debugger;
        setState(prevState => ({
            ...prevState,
            dependencyId: item?._id ?? "",
            questionId: item?.dependsOnQuestion?.id,
            questionName: item?.dependsOnQuestion?.title,
            questionOption: options
        }));
    }
    const deleteDependency = (index, id) => {
        let _selectedDependencies = [...selectedDependencies];
        if (id && id !== "0") {
            ShowActionDialog(true, "Delete", "Are you sure, you want to delete this Dependency?", "confirm", function () {
                UpdateDataAPI('dependencies/deleteDependencybyid', null, id).then((result) => {
                    if (result.responseCode === 1 && result.responseStatus === "success") {
                        _selectedDependencies.splice(index, 1);
                        setSelectedDependencies(_selectedDependencies);
                        showMessage("Success", result.responseMessage, "success", 3000);
                    } else {
                        showMessage("Error", result.responseMessage, "error", 3000);
                    }
                })
            })
        } else {
            _selectedDependencies.splice(index, 1);
            setSelectedDependencies(_selectedDependencies);
        }
    }
    //(#common-section)//

    //load question/options/dependencies in edit case
    const loadData = () => {
        GetDataAPI("question/getquestionbyId", data._id).then((result) => {
            if (result.responseCode === 1 && result.responseStatus === "success" && result.data.data !== null) {
                // setState(result.data.data.questions);
                setQuestionOptions(result.data.data.options);
                setSelectedDependencies(result.data.data.dependencies)
            }
            else if (!result.responseStatus) {
                showMessage("Error", "something went wrong", "error", 3000);
            }
        })
    }
    const validateQuestion = (isValidated) => {
        if (!state.title || state.title.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                questionTitleError: true
            }));
            isValidated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionTitleError: false
            }));
        }
        // if (!state.displayOrder || state.displayOrder === 0) {
        //     setErrorMessages(prevState => ({
        //         ...prevState,
        //         questionDisplayOrderError: true
        //     }));
        //     isValidated = false;
        // } else {
        //     setErrorMessages(prevState => ({
        //         ...prevState,
        //         questionDisplayOrderError: false
        //     }));
        // }
        if (!state.details || state.details.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                questionDetailsError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionDetailsError: false
            }));
        }
        if (state.isDependent && selectedDependencies.length <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                dependenciesError: true
            }));
            isValidated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                dependenciesError: false
            }));
        }
        return isValidated;
    }
    const validateOption = (isValidated) => {
        //option Validt
        if (!optionsState.title || optionsState.title.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionTitleError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionTitleError: false
            }));
        }
        if (!attachment || attachment?.fileName?.trim() == "" || !attachment?.fileName && !optionsState.image) {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionImageError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionImageError: false
            }));
        }
        if (!optionsState.priceEffectPSF || optionsState.priceEffectPSF <= 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionPSFError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionPSFError: false
            }));
        }
        if (!optionsState.details || optionsState.details.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionDetailsError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionOptionDetailsError: false
            }));
        }
        return isValidated;
    }
    const validateDependency = (isValidated) => {
        if (!state.title || state.title.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                questionTitleError: true
            }));
            isValidated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                questionTitleError: false
            }));
        }
        if (!state.questionName || state.questionName.trim() == "" || !state.questionId || state.questionId.trim() == "") {
            setErrorMessages(prevState => ({
                ...prevState,
                dependencyQuestionError: true
            }));
            isValidated = false;
        }
        else {
            setErrorMessages(prevState => ({
                ...prevState,
                dependencyQuestionError: false
            }));
        }
        if (!state.questionOption || state.questionOption?.length == 0) {
            setErrorMessages(prevState => ({
                ...prevState,
                dependencyOptionError: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                dependencyOptionError: false
            }));
        }
        return isValidated
    }
    //save questionData
    const saveQuestion = async () => {
        let isValidated = validateQuestion(true);
        if (isValidated) {
            if (questionOptions?.length !== 0 && questionOptions?.length >= 2) {
                // let isDisplayOrderExists = questions.findIndex(item => parseInt(item.displayOrder) === parseInt(state.displayOrder));
                // if (isDisplayOrderExists !== -1) {
                //     showMessage("Error", "Display order already exist", "error", 3000);
                //     return;
                // }
                let optionsCounter = 0;
                let postData = {
                    userId: user_info._id,
                    title: state.title,
                    details: state.details,
                    isBasic: state.isBasic,
                    isDependent: state.isDependent,
                    // displayOrder: state.displayOrder,
                };
                setLoading({ ...loading, isSaving: true })
                PostDataAPI('question/addquestion', postData).then((result) => {
                    if (result.responseCode == 1 && result.responseStatus == "success") {
                        //save dependency
                        let dependencies = selectedDependencies.map((item, I) => {
                            item.dependentQuestion.id = result.data.data._id;
                            return { ...item }
                        })
                        PostDataAPI('dependencies/addDependencies', dependencies).then((result) => {
                            if (result.responseCode == 1 && result.responseStatus == "success") { }

                        })
                        //save options
                        questionOptions.map((item, i) => {
                            item.questionId = result.data.data._id;
                            const formData = new FormData();
                            formData.append("model", JSON.stringify(item));
                            formData.append("attachments", item.image);
                            PostDataAPI('questionOption/addquestionoption', formData, "form").then((result) => {
                                if (result.responseCode == 1 && result.responseStatus == "success") {
                                    optionsCounter = optionsCounter + 1;
                                }
                            })
                        })
                        // if (optionsCounter === questionOptions?.length) {

                        showMessage("Succcess", "Question saved successfully", "success", 3000);
                        setLoading({ ...loading, isSaving: false })
                        setTimeout(() => {
                            handleClose();
                        }, 2000);
                        // } else {

                        //     showMessage("Error", "Error while saving options", "error", 3000);

                        // }
                    }
                })
            } else {
                showMessage("Error", "Question must have two options", "error", 3000);
            }
        }
    }
    //update questionData
    const updateQuestion = async () => {
        console.log(state)
        let isValidated = validateQuestion(true);
        if (isValidated) {
            if (questionOptions?.length !== 0 && questionOptions?.length >= 2) {
                let isDisplayOrderExists = questions.filter(item => item.id !== state.id).findIndex(item => parseInt(item.displayOrder) === parseInt(state.displayOrder));
                if (isDisplayOrderExists !== -1) {
                    showMessage("Error", "Display order already exist", "error", 3000);
                    return;
                }
                let postData = {
                    title: state.title,
                    details: state.details,
                    isBasic: state.isBasic,
                    isDependent: state.isDependent,
                    displayOrder: state.displayOrder,
                };
                setLoading({ ...loading, isSaving: true })
                UpdateDataAPI('question/updatequestionbyId', postData, state.id).then((result) => {
                    if (result.responseCode == 1 && result.responseStatus == "success") {
                        let dependencies = selectedDependencies.map((item, I) => {
                            item.dependentQuestion.id = result.data.data._id;
                            return { ...item }
                        })
                        UpdateDataAPI('dependencies/updateDependencybyid', dependencies, null).then((result) => {
                            if (result.responseCode == 1 && result.responseStatus == "success") {
                                console.log('dependency updated successfully')
                            }

                        })

                        questionOptions.map((item, i) => {
                            item.questionId = result.data.data._id;
                            const formData = new FormData();
                            formData.append("model", JSON.stringify(item));
                            formData.append("attachments", item.image);
                            item.image === null && delete item.image
                            if (item._id === undefined) {
                                PostDataAPI('questionOption/addquestionoption', formData, "form").then((result) => {
                                    if (result.responseCode == 1 && result.responseStatus == "success") {
                                        console.log("options added successfully")
                                    }
                                })

                            }
                            else {

                                UpdateDataAPI('questionOption/updateonequestionoption', formData, item._id, "form").then((result) => {
                                    if (result.responseCode == 1 && result.responseStatus == "success") {
                                        console.log('option updated successfully')
                                    }
                                })
                            }
                        })
                        // if (counter === questionOptions?.length) {
                        showMessage("Succcess", "Question updated successfully", "success", 3000);
                        setLoading({ ...loading, isSaving: false })
                        setTimeout(() => {
                            handleClose();
                        }, 2000);
                        // }
                        // else {
                        //     showMessage("Error", "Error occurred while saving options", "error", 3000);
                        // }
                    }
                })
            } else {
                showMessage("Error", "Question must have two options", "error", 3000);
            }
        }
    }
    //reset complete form fields
    function clear() {
        ResetForm();
        setErrorMessages({});
    }

    //useEffect
    useEffect(() => {
        // if(isEdit){
        //     loadDependencies()
        // }
        ResetForm();
    }, [dialogOpenClose, isEdit]);
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
                            <FormGroupTitle>{isEdit ? 'Edit Question' : 'Add New Question'}</FormGroupTitle>
                            <CloseIcon className={classes.crossButton} onClick={closeDialog} />
                        </div>
                        <div className={classes.content}>
                            <Scrollbars autoHeight autoHeightMin={0} autoHeightMax={530}>
                                <Grid container direction="column" className={classes.InnerContent}>

                                    <Grid item lg={12} >

                                        <Grid container direction="row">

                                            <Label title="Title" sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <InputBaseField
                                                    id="title"
                                                    name="title"
                                                    value={state.title}
                                                    onChange={handleChange}
                                                />
                                                {
                                                    errorMessages.questionTitleError &&
                                                    <ErrorMessage > Please enter title </ErrorMessage>
                                                }
                                            </Grid>

                                            <Label title="Description" sm={2} md={2} lg={2} />

                                            <Grid item xs={12} sm={4} md={4} lg={4} >

                                                <TextareaField
                                                    rowsMin={5}
                                                    id="details"
                                                    name="details"
                                                    value={state.details}
                                                    MaxLength="2000"
                                                    placeholder="Description"
                                                    onChange={handleChange}
                                                />
                                                {
                                                    errorMessages.questionDetailsError &&
                                                    <ErrorMessage > Please enter details </ErrorMessage>
                                                }
                                            </Grid>

                                            {/* <Label title="Display Order" sm={2} md={2} lg={2} /> 

                                             <Grid item xs={12} sm={4} md={4} lg={4} >
                                                <InputBaseFieldNumber
                                                    id="displayOrder"
                                                    name="displayOrder"
                                                    value={state.displayOrder}
                                                    onChange={handleChange}
                                                />
                                                {
                                                    errorMessages.questionDisplayOrderError &&
                                                    <ErrorMessage > Please enter display order </ErrorMessage>
                                                }
                                            </Grid>  */}

                                        </Grid>

                                        <Grid container >
                                            <Grid item style={{ paddingLeft: 30, paddingRight: 10 }} xs={12} sm={6} md={6} lg={12}>
                                                <Grid container direction="column">

                                                    <Grid item xs={12} sm={4} md={4} lg={4} />

                                                    <Grid item xs={12} sm={6} md={6} lg={6} >
                                                        <CheckboxField
                                                            id="isBasic"
                                                            name="isBasic"
                                                            checked={state.isBasic}
                                                            IsDisabled={isEdit ? true : false}
                                                            label="Is Basic"
                                                            onChange={handleChkboxChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} md={4} lg={4} />

                                                    <Grid item xs={12} sm={6} md={6} lg={6} >
                                                        <CheckboxField
                                                            id="isDependent"
                                                            name="isDependent"
                                                            checked={state.isDependent}
                                                            label="Is Dependent"
                                                            onChange={handleChkboxChange}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>



                                        </Grid>
                                        <FormGroupTitle>Options</FormGroupTitle>
                                        {optionsState &&
                                            <>
                                                <Grid container >

                                                    <Label title="Option Title" sm={2} md={2} lg={2} />

                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        <InputBaseField
                                                            id="title"
                                                            name="title"
                                                            value={optionsState.title}
                                                            onChange={handleOptionChange}
                                                        />
                                                        {
                                                            errorMessages.questionOptionTitleError &&
                                                            <ErrorMessage > Please enter title </ErrorMessage>
                                                        }
                                                    </Grid>

                                                    <Label title="Image" sm={2} md={2} lg={2} />

                                                    <Grid item xs={12} sm={4} md={4} lg={4} >
                                                        <span className={classes.btnSpan}>
                                                            <Tooltip title={optionsState?.image ?? ""}>
                                                            
                                                                <InputBase
                                                                    id="uploadFile"
                                                                    name="uploadFile"
                                                                    className={classes.baseInput}
                                                                    placeholder="Select Image"
                                                                    value={attachment?.fileName ? attachment?.fileName : optionsState.image ?? null}
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
                                                            </Tooltip>
                                                            {/* <a target='_top' href={`http://localhost:5000${optionsState.image ?? optionsState.image}`} rel='noopener noreferrer'> */}
                                                            <img onClick={() => setImagViewerDialogState(true)} src={ViewIcon} className={classes.viewIcon} alt='view' />
                                                            {/* </a> */}
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
                                                        {
                                                            errorMessages.questionOptionImageError &&
                                                            <ErrorMessage > Please select option image </ErrorMessage>
                                                        }
                                                    </Grid>
                                                    {/* <Grid item xs={2} sm={1} md={1} lg={1} >
                                                        <img src={ViewIcon} className={classes.viewIcon} alt='view' />
                                                    </Grid> */}

                                                </Grid>

                                                <Grid container>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Grid container>
                                                            <Grid item lg={12}>
                                                                <Grid container>

                                                                    <Label title="Price Effect PSF" sm={4} md={4} lg={4} />
                                                                    <Grid item xs={12} sm={5} md={5} lg={5} >
                                                                        <InputBaseFieldNumber
                                                                            id="priceEffectPSF"
                                                                            name="priceEffectPSF"
                                                                            value={optionsState.priceEffectPSF}
                                                                            onChange={handleOptionChange}
                                                                        />
                                                                        {
                                                                            errorMessages.questionOptionPSFError &&
                                                                            <ErrorMessage > Please enter price effect </ErrorMessage>
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid item lg={12}>
                                                                <Grid container>
                                                                    <Grid item xs={4} sm={4} md={4} lg={4} />

                                                                    <Grid item xs={12} sm={5} md={5} lg={5} >
                                                                        <span onClick={addOptionToList} className={classes.addOption} title={"Add New "}>
                                                                            {/* <img src={AddIcon} alt="Add Option" onClick={addOptionToList} /> */}
                                                                            <AddIcon onClick={addOptionToList} />Add Option
                                                                        </span>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                                        <Grid container>

                                                            <Label title="Details" sm={4} md={4} lg={4} />

                                                            <Grid item xs={12} sm={8} md={8} lg={8} >

                                                                <TextareaField
                                                                    rowsMin={5}
                                                                    id="details"
                                                                    name="details"
                                                                    value={optionsState.details}
                                                                    MaxLength="2000"
                                                                    placeholder="Description"
                                                                    onChange={handleOptionChange}
                                                                />
                                                                {
                                                                    errorMessages.questionOptionDetailsError &&
                                                                    <ErrorMessage > Please enter details </ErrorMessage>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>

                                                {/* <Grid container direction="row">

                                                    <Grid item xs={12} sm={2} md={2} lg={2} />

                                                    <Grid item xs={12} sm={6} md={6} lg={6} >
                                                        <FormBtn id="save" disabled={false} size="medium" onClick={addOptionToList}>Save</FormBtn>
                                                        <FormBtn id="reset" size="medium" onClick={resetOption}>Reset </FormBtn>

                                                    </Grid>

                                                </Grid> */}
                                            </>
                                        }
                                        {questionOptions?.length !== 0 &&
                                            <Grid container direction="row">
                                                <table className={classes.icdCodeTable} >
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: "20%", textAlign: "left" }}>Title</th>
                                                            <th style={{ width: "40%", textAlign: "left" }} >Description</th>
                                                            <th style={{ width: "20%", textAlign: "left" }} >price Effect(PSF)</th>
                                                            {/* <th style={{ width: "10%", textAlign: "left" }} >Image</th> */}
                                                            {/* <th style={{ width: "15%" }}>Display Order</th> */}
                                                            <th style={{ width: "10%" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            questionOptions.map((item, i) => {
                                                                return <tr key={item.title}>
                                                                    <td style={{ textAlign: "left" }}>{item.title}</td>
                                                                    <td className={classes.optionDetails} style={{ textAlign: "left", display: 'block', width: '200px' }}>{item.details}</td>
                                                                    <td style={{ textAlign: "left" }}>{item.priceEffectPSF}</td>
                                                                    {/* <td style={{ textAlign: "left" }}>
                                                                        {(Array.isArray(item.image) && item.image.length > 0) || (item.image !== null && item.image !== undefined && item.image !== '') ? <img onClick={() => viewOptionImage(item)} src={ViewIcon} className={classes.viewIcon} alt='view' /> : null}
                                                                    </td> */}
                                                                    <td style={{ textAlign: "center" }}>
                                                                        {isEdit ? <img onClick={() => editOption(item)} src={EditIcon} alt="edit" /> : null}
                                                                        <img src={DeleteIcon} alt="delete" onClick={() => handleDeleteOption(i, item._id)} />
                                                                    </td>
                                                                </tr>
                                                            })
                                                        }
                                                    </tbody>
                                                </table>

                                            </Grid>
                                        }

                                        {state.isDependent &&
                                            <>
                                                <FormGroupTitle>Dependencies</FormGroupTitle>
                                                {showDependenciesForm && state.isBasic && selectedDependencies !== null &&
                                                    <Grid container direction="row">
                                                        <Label title="Title" sm={2} md={2} lg={2} />
                                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                                            {console.log(selectedDependencies, "selected dependencies in parent", "is edit", isEdit)}
                                                            <SearchList
                                                                id={state.id}
                                                                name="questionName"
                                                                value={state.id}
                                                                isEdit={isEdit}
                                                                displayOrder={state.displayOrder}
                                                                searchTerm={state.questionName}
                                                                code="consent_form_for_appointment"
                                                                apiUrl="question/loadallbasicquestion"
                                                                existingDependencies={selectedDependencies}

                                                                onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                                                placeholderTitle="Search Questions"
                                                            />
                                                            {
                                                                errorMessages.dependencyQuestionError &&
                                                                <ErrorMessage > Please select dependent question </ErrorMessage>
                                                            }
                                                        </Grid>

                                                        <Label title="Option" sm={2} md={2} lg={2} />


                                                        <Grid item xs={10} sm={3} md={3} lg={3} >
                                                            <MultiSelectField
                                                                key={state.questionId}
                                                                id="questionOption"
                                                                name="questionOption"
                                                                options={optionsList}
                                                                isDisabled={!state.questionId ? true : false}
                                                                // isDisabled={optionsList.length <= 0 ? true :false}
                                                                onChange={handleMultiSelectChange}
                                                                placeholder='Select Question Option'
                                                                Value={state.questionOption}
                                                                setOptionsList={setOptionsList}
                                                                setState={setState}
                                                            />
                                                            {
                                                                errorMessages.dependencyOptionError &&
                                                                <ErrorMessage > Please select dependent option </ErrorMessage>
                                                            }
                                                        </Grid>
                                                        <Grid item xs={2} sm={1} md={1} lg={1} >

                                                            <AddIcon onClick={handleAddDependency} className={classes.addIcon} />

                                                        </Grid>

                                                    </Grid>
                                                }

                                                {showDependenciesForm && !state.isBasic && selectedDependencies !== null &&
                                                    <Grid container direction="row">
                                                        <Label title="Title" sm={2} md={2} lg={2} />
                                                        <Grid item xs={12} sm={4} md={4} lg={4} >
                                                            <SearchList
                                                                id={state.id}
                                                                name="questionName"
                                                                value={state.id}
                                                                isEdit={isEdit}
                                                                existingDependencies={selectedDependencies}

                                                                displayOrder={state.displayOrder}
                                                                searchTerm={state.questionName}
                                                                code="consent_form_for_appointment"
                                                                apiUrl="question/loadallquestion"
                                                                onChangeValue={(name, item) => handleSearcdhListChange(name, item)}
                                                                placeholderTitle="Search Questions"
                                                            />
                                                            {
                                                                errorMessages.dependencyQuestionError &&
                                                                <ErrorMessage > Please select dependent question </ErrorMessage>
                                                            }
                                                        </Grid>

                                                        <Label title="Option" sm={2} md={2} lg={2} />


                                                        <Grid item xs={10} sm={3} md={3} lg={3} >

                                                            <MultiSelectField
                                                                id="questionOption"
                                                                key={state.questionId}
                                                                name="questionOption"
                                                                options={optionsList}
                                                                isDisabled={!state.questionId ? true : false}
                                                                // isDisabled={optionsList.length <= 0 ? true :false}
                                                                onChange={handleMultiSelectChange}
                                                                placeholder='Select Question Option'
                                                                Value={state.questionOption}
                                                                setOptionsList={setOptionsList}
                                                                setState={setState}
                                                            />
                                                            {
                                                                errorMessages.dependencyOptionError &&
                                                                <ErrorMessage > Please select dependent option </ErrorMessage>
                                                            }
                                                        </Grid>
                                                        <Grid item xs={2} sm={1} md={1} lg={1} >

                                                            <AddIcon onClick={handleAddDependency} className={classes.addIcon} />

                                                        </Grid>

                                                    </Grid>
                                                }

                                                {selectedDependencies?.length != 0 && selectedDependencies !== null &&
                                                    <Grid container direction="row">

                                                        <table className={classes.icdCodeTable} >
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "30%", textAlign: "left" }}>Dependent Question</th>
                                                                    <th style={{ width: "30%", textAlign: "left" }} >Depends on</th>
                                                                    <th style={{ width: "30%", textAlign: "left" }} >Depends on options</th>
                                                                    <th style={{ width: "10%" }}>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    selectedDependencies.map((item, i) => {
                                                                        return <tr key={item._id}>
                                                                            <td style={{ textAlign: "left" }}>{item.dependentQuestion.title}</td>
                                                                            <td style={{ textAlign: "left" }}>{item.dependsOnQuestion.title}</td>
                                                                            <td style={{ textAlign: "left" }}>

                                                                                {
                                                                                    item?.dependsOnOptions?.map((item2, i) => {
                                                                                        return item2.title + `${i < item?.dependsOnOptions.length - 1 ? " - " : ''}`
                                                                                    })
                                                                                }

                                                                            </td>
                                                                            <td style={{ textAlign: "center" }}>
                                                                                {/* <img src={EditIcon} alt="edit" onClick={() => editDependency(item)} /> */}
                                                                                <img src={DeleteIcon} alt="delete" onClick={() => deleteDependency(i, item._id)} />
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>

                                                    </Grid>

                                                }
                                                {
                                                    errorMessages.dependenciesError &&
                                                    <ErrorMessage > Please Add Dependencies </ErrorMessage>
                                                }
                                            </>
                                        }
                                    </Grid>

                                </Grid>
                            </Scrollbars>
                        </div>

                        <div className={classes.footer}>
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
                                            : <FormBtn id="save" onClick={updateQuestion} size="medium">
                                                Update
                                            </FormBtn> :
                                        loading.isSaving ?
                                            <FormBtn id="loadingSave" disabled={false} size="medium">
                                                Save
                                            </FormBtn>
                                            : <FormBtn id="save" onClick={saveQuestion} size="medium">
                                                Save
                                            </FormBtn>
                                    }
                                    {!isEdit && <FormBtn id={"reset"} onClick={clear} size="medium" >Reset </FormBtn>}
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
                    handleClose={() => {
                        setImagViewerDialogState(false)
                        setOptionImagePath('')

                        //     setAttachment({
                        //     file: '',
                        //     fileToSend: '',
                        //     fileName: ''
                        // })

                        // setAttachment((prev)=>({
                        //     ...prev,
                        //     file:'',
                        // }))
                    }} />
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
export default withSnackbar(AddNewQuestion)