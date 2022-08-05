import React, { useState } from 'react'

import {
    Container,
    Grid,
} from '@material-ui/core';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import PageTitle from "../../components/PageTitle";
import { InputBaseField, InputBaseFieldNumber, TextareaField } from "../../components/InputField";
import { ShadowBox, ShadowBoxMin, FormGroupTitle, FormBtn, ErrorMessage, Label } from "../../components/UiElements";
import { withSnackbar } from '../../components/Message/Alert'

import useStyles from './styles';

function Profile(props) {
    var classes = useStyles();
    const { showMessage } = props;

    const [isSaveLoading, setIsSaveLoading] = useState(false)

    const [state, setState] = useState({
        firstName: "", lastName: "", homePhone: "", cellPhone: "+92",
    });
    const [profileImage, setProfileImage] = useState({ file: null, userPhoto: null, userPhotoName: null });

    const [errorMessages, setErrorMessages] = useState({ errorFirstName: false, errorLastName: false })

    const handleChange = e => {

        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function uploadSingleFile(e) {
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0]),
            userPhoto: e.target.files[0],
            userPhotoName: e.target.files[0].name
        })
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
                            errorCellLength: false
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
                    [name]: number
                }));

                if (e.target.value != "") {

                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: true
                    }));
                }
                else {
                    setErrorMessages(prevState => ({
                        ...prevState,
                        errorCellLength: false
                    }));
                }
            }

        }
        else
            e.preventDefault();

    }

    const handleSave = () => {
        console.log(state , "state")
     }
    return (
        <>
            <PageTitle title="Update Profile" />

            <Container maxWidth={false}>

                <ShadowBoxMin shadowSize={3} >
                    {/* <ShadowBox> */}

                    <Grid container >

                        <FormGroupTitle>Profile:</FormGroupTitle>

                        <Grid item xs={12} sm={12} md={12} lg={12}>

                            {/* <Grid container direction="row" >
                                <Grid item xs={12} sm={6} md={6} lg={5} >

                                    <FormGroupTitle>Profile:</FormGroupTitle>

                                </Grid>
                            </Grid> */}

                            <Grid container lg={12} direction="row" >
                                <Grid  style={{margin:'0 auto' , marginBottom:10}} item xs={12} sm={4} md={4} lg={4} >
                                    <Grid container justify="center" justify-content='center'>
                                        <label htmlFor="fileUploadField" className={classes.uploadImageLabel}>
                                            {profileImage.file || state.photoPath ?
                                                <img id='profileImgSource' src={profileImage.file != null ? profileImage.file : "." + state.photoPath} alt='' className={classes.uploadImage} />
                                                : <div className={classes.uploadImageBox}></div>
                                            }
                                            <AddAPhotoIcon className={classes.uploadImageIcon} />
                                        </label>
                                        <form>

                                            <div>
                                                <input type="file" id="fileUploadField" className={classes.inputFile} onChange={uploadSingleFile} accept=".png, .jpg, .jpeg" />
                                            </div>

                                        </form>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid lg={6} md={6} sm={12} style={{margin:'0 auto', marginTop:10}} container direction="row">
                                <Label size={2} lg={4} md={4} sm={4} title="First Name" />
                                <Grid item xs={12} sm={6} lg={6} md={8}>
                                    <InputBaseField
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="firstName"
                                        value={state.firstName}
                                        MaxLength="100"
                                    />
                                    {/* {errorMessages.errorFirstName && (!state.firstName || state.firstName.trim() == "") ? (<ErrorMessage >
                                Please enter first name
                            </ErrorMessage>) : ('')} */}
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

                            <Grid lg={6} md={6} sm={12} style={{margin:'0 auto', marginTop:10}} container direction="row">
                                <Label size={2} lg={4} md={4} sm={4} title="Last Name"/>

                                <Grid item xs={12} sm={6} md={8} lg={6} >
                                    <InputBaseField

                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        type="text"
                                        name="lastName"
                                        value={state.lastName}
                                        MaxLength="100"
                                    />
                                    {/* {errorMessages.errorLastName && (!state.lastName || state.lastName.trim() == "") ? (<ErrorMessage >
        Please enter last name
    </ErrorMessage>) : ('')} */}
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

                            <Grid container lg={6} md={6} sm={12} style={{margin:'0 auto', marginTop:10}} direction="row">
                                <Label size={2} md={4} lg={4} sm={4} title="Cell #" />

                                <Grid item xs={12} md={8} sm={6} lg={6} >

                                    <InputBaseField
                                        placeholder="+92XXXXXXXXX"
                                        onChange={handleCellPhoneChange}
                                        name="cellPhone"
                                        value={state.cellPhone}
                                        MaxLength="10"
                                    />

                                </Grid>
                            </Grid>

                            <Grid style={{margin:'0 auto' , marginBottom:10, marginTop:10}} lg={8} container direction="row">


                                <Grid style={{margin:'0 auto',textAlign:'center'}} item xs={12} sm={12} md={12} lg={6} >

                                    {
                                        isSaveLoading ?
                                            <FormBtn id="loadingSave" size="medium">Save</FormBtn>
                                            : <FormBtn id="save" onClick={handleSave} size="medium" >Save</FormBtn>
                                    }

                                    <FormBtn id='reset' btnType='reset' >Cancel</FormBtn>

                                </Grid>
                            </Grid>

                        </Grid>

                    </Grid>

                </ShadowBoxMin>
                {/* </ShadowBox> */}

            </Container>
        </>
    )
}

export default withSnackbar(Profile)