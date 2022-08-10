import React, { useEffect, useState } from 'react'

import {
    Box,
    Card,
    Container,
    Grid,
    Paper,
    Tooltip,
} from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import PageTitle from "../../components/PageTitle";
import { InputBaseField, InputBaseFieldNumber, TextareaField } from "../../components/InputField";
import { ShadowBox, ShadowBoxMin, FormGroupTitle, FormBtn, ErrorMessage, Label } from "../../components/UiElements";
import { withSnackbar } from '../../components/Message/Alert'
import editIcon from '../../images/icons/pencil.png'

import useStyles from './styles';
import { UpdateDataAPI } from '../../Services/UpdateDataAPI';

function Profile(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [loading, setLoading] = useState({ isLoading: false, isSaving: false })
    const [editMode, setEditMode] = useState(false)

    const [state, setState] = useState({
        userId: '', firstName: "", lastName: "", cellPhone: '', profilePhoto: ''
    });

    const code = "+92"
    const [profileImage, setProfileImage] = useState({ file: null, userPhoto: null, userPhotoName: null });

    const [errorMessages, setErrorMessages] = useState({ errorFirstName: false, errorLastName: false, errorCellPhone: false })
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user_info'))
        setState({ userId: user._id, firstName: user.firstName, lastName: user.lastName, cellPhone: user.cellPhone, profilePhoto: user.profilePhoto })
    }, [])
    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function uploadSingleFile(e) {
        if (editMode) {
            setProfileImage({
                file: URL.createObjectURL(e.target.files[0]),
                userPhoto: e.target.files[0],
                userPhotoName: e.target.files[0].name
            })
        }
        else {
            return
        }

    }
    const handleHomePhoneChange = e => {

        if (e.nativeEvent.data != "e") {

            if (e.nativeEvent.data != null || e.target.value != "") {
                // for fomatting
                const re = /^[0-9\b]+$/;
                e.target.value = e.target.value.replace(' ', '').replace('(', '').replace(')', '').replace('-', '');
                const { name, value } = e.target;
                if ((e.target.value === '' || re.test(e.target.value))) {

                    var cleaned = ('' + e.target.value).replace(/\D/g, '')
                    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
                    if (match) {
                        var intlCode = (match[1] ? '+1 ' : ''),
                            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

                        setState(prevState => ({
                            ...prevState,
                            [name]: number
                        }));

                        setErrorMessages(prevState => ({
                            ...prevState,
                            errorPhoneLength: false
                        }));

                        return;
                    }

                    setState(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                else {
                    if (!re.test(e.target.value)) {
                        e.preventDefault();
                    }

                }
            }
            else {

                const { name, value } = e.target;
                setState(prevState => ({
                    ...prevState,
                    [name]: value
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorPhoneLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }
    const handleCellPhoneChange = e => {
        e.preventDefault()
        // for fomatting
       
        const { name, value } = e.target;
        
            setState((prev) => ({
                ...prev,
                [name]: value
            }))
   
      
    }
    const validateProfile = (isValidated) => {
        //option Validt

        if (!state.firstName || state.firstName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorFirstName: false
            }));
        }
        if (!state.lastName || state.lastName.trim() === "") {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorLastName: false
            }));
        }
        if (!state.cellPhone || state.cellPhone.length < 13 ||  !/^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/.test(state.cellPhone)) {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCellPhone: true
            }));
            isValidated = false;
        } else {
            setErrorMessages(prevState => ({
                ...prevState,
                errorCellPhone: false
            }));
        }
        return isValidated;
    }

    const handleSave = () => {
        const validated = validateProfile(true)
        console.log(validated, "validation")
        if (validated) {
            const formData = new FormData();

            let postData = {
                firstName: state.firstName,
                lastName: state.lastName,
                cellPhone: state.cellPhone,
                profilePhoto: state.profilePhoto
            };
            formData.append("model", JSON.stringify(postData));
            formData.append("attachments", profileImage?.userPhoto ?? '');
            setLoading((prev) => ({
                ...prev,
                isSaving: true
            }))
            UpdateDataAPI('users/updateprofile', formData, state.userId, "form").then((result) => {
                console.log('result', result);
                if (result.responseCode == 1 && result.responseStatus == "success") {
                    console.log(result.data, "logging data")
                    sessionStorage.setItem('user_info', JSON.stringify(result.data))
                    showMessage("Success", result.responseMessage, "success", 3000);
                    setEditMode(false)
                    setLoading((prev) => ({
                        ...prev,
                        isSaving: false
                    }))
                }
            })
        }
    }



    return (
        <>
            <PageTitle title="Update Profile" />

            <Container maxWidth={false}>
                    <Grid container >

                        <FormGroupTitle>Profile:</FormGroupTitle>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card style={{
                                padding: '2 0',
                                margin: '0 auto',
                                border: "1px solid #E8E8E8",
                                borderRadius: "10px",
                                maxWidth: 500,
                                textAlign: 'center',
                                position: 'relative'


                            }}
                                elevation={3}
                            >
                                <Card style={{ position: 'absolute', cursor: 'pointer', right: 5, top: 5, height: 25, width: 25, borderRadius: 5, padding: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }} elevation={3}>
                                   <Tooltip title="Edit Profile">
                                   <img onClick={() => setEditMode(!editMode)} style={{ width: '15px' }} src={editIcon} alt='edit' />
                                   </Tooltip> 
                                </Card>
                                <Grid item style={{ marginLeft: 'auto', marginRight: 'auto' }}>

                                    <Grid container lg={12} direction="row" >
                                        <Grid style={{ margin: '0 auto', marginBottom: 10 }} item>
                                            <Grid container justify="center" justify-content='center'>
                                                <label htmlFor="fileUploadField" className={classes.uploadImageLabel}>
                                                    {profileImage.file || state.profilePhoto ?
                                                        <img style={editMode? {cursor:'pointer'}:{cursor:'no-drop'}} id='profileImgSource' src={profileImage.file != null ? profileImage.file : "http://localhost:5000" + state.profilePhoto.replace(/\\/g, "/").replace('public/', '/')} alt='' className={classes.uploadImage} />
                                                        : <div className={classes.uploadImageBox}></div>
                                                    }
                                                    <AddAPhotoIcon style={editMode? {cursor:'pointer'}:{cursor:'no-drop'}} className={classes.uploadImageIcon} />
                                                </label>
                                                <form>

                                                    <div>
                                                        {editMode ? <input type="file" id="fileUploadField"  className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" />
                                                            : null}
                                                    </div>

                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid style={{ margin: '0 auto', marginTop: 10 }} container direction="row">
                                        <Label size={2} lg={4} md={4} sm={4} title="First Name" />
                                        <Grid item xs={12} sm={6} lg={6} md={8}>
                                            <InputBaseField
                                                placeholder="First Name"
                                                onChange={handleChange}
                                                type="string"
                                                name="firstName"
                                                value={state.firstName}
                                                MaxLength="50"
                                                IsDisabled={editMode ? false : true}
                                            />
                                            {errorMessages.errorFirstName && (<ErrorMessage >
                                                Please enter first name
                                            </ErrorMessage>)}
                                        </Grid>
                                    </Grid>
                                    {/* 
                            <Grid lg={6} md={6} sm={12} style={{margin:'0 auto', marginTop:10}} container direction="row">
                                <Label size={2} md={4} lg={4} sm={4} title="Middle Name" />

                                <Grid item xs={12} sm={6} md={8} lg={6} >
                                    <InputBaseField
                                        placeholder="Middle Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="middleName"
                                        value={state.middleName}
                                        MaxLength="100"
                                    />
                                </Grid>
                            </Grid> */}

                                    <Grid style={{ margin: '0 auto', marginTop: 10 }} container direction="row">
                                        <Label size={2} lg={4} md={4} sm={4} title="Last Name" />

                                        <Grid item xs={12} sm={6} md={8} lg={6} >
                                            <InputBaseField
                                                placeholder="Last Name"
                                                onChange={handleChange}
                                                type="string"
                                                name="lastName"
                                                value={state.lastName}
                                                MaxLength="50"
                                                IsDisabled={editMode ? false : true}
                                            />
                                            {errorMessages.errorLastName && (<ErrorMessage >
                                                Please enter last name
                                            </ErrorMessage>)}
                                        </Grid>
                                    </Grid>

                                    {/* <Grid container lg={6} md={6} sm={12} style={{margin:'0 auto', marginTop:10}} direction="row">
                                <Label size={2} lg={4} md={4} sm={4} title="Home Phone" />

                                <Grid item xs={12} sm={6} md={8} lg={6} >

                                    <InputBaseField
                                        placeholder="(863) 993-2966"
                                        onChange={handleHomePhoneChange}
                                        name="homePhone"
                                        value={state.homePhone}
                                        MaxLength="14"
                                    />

                                </Grid>
                            </Grid> */}

                                    <Grid container style={{ margin: '0 auto', marginTop: 10 }} direction="row">
                                        <Label size={2} md={4} lg={4} sm={4} title="Cell #" />

                                        <Grid item xs={12} md={8} sm={6} lg={6} >
                                            <InputBaseField
                                                placeholder="+92XXXXXXXXX"
                                                onChange={handleCellPhoneChange}
                                                name="cellPhone"
                                                value={state.cellPhone}
                                                MaxLength="13"
                                                IsDisabled={editMode ? false : true}
                                            />
                                            {errorMessages.errorCellPhone && (<ErrorMessage >
                                                +92xxxxxxxxxx please enter number in this formate
                                            </ErrorMessage>)}

                                        </Grid>
                                    </Grid>

                                    <Grid style={{ margin: '0 auto', marginBottom: 10, marginTop: 10 }} container direction="row">


                                        <Grid style={{ margin: '0 auto', textAlign: 'center' }} item xs={12} sm={12} md={12} lg={6} >

                                            {
                                                loading.isSaving ?
                                                    <FormBtn id="loadingSave" disabled={false} size="medium">Save</FormBtn>
                                                    : <FormBtn id="save" disabled={editMode ? false : true} onClick={handleSave} size="medium" >Save</FormBtn>
                                            }

                                            <FormBtn onClick={() => setEditMode(false)} disabled={editMode ? false : true} id='reset' btnType='reset' >Cancel</FormBtn>

                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Card>

                        </Grid>

                    </Grid>
            </Container>
        </>
    )
}

export default withSnackbar(Profile)