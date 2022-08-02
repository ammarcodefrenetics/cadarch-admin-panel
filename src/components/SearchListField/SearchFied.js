import React, { useState, useEffect } from "react";

// styles
import {
    InputBase,
    InputAdornment,
    Grid,
    Typography,
    Box, Popper,
} from "@material-ui/core";
import {
    Search as SearchIcon
} from "@material-ui/icons";
import useStyles from "./styles";
import { Autocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GetUserInfo } from '../../Services/GetUserInfo';
import { GetDataAPI } from "../../Services/GetDataAPI";

export default function SearchList({ code, apiUrl, isDisabled, popperWidth, mandatory, searchId, ...props }) {
    const { value } = props;
    var classes = useStyles();
    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const [searchResults, setSearchResults] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(open && searchResults.length <= 0);
    useEffect(() => {
        if (true) {
            setLoading(true)
            GetDataAPI(apiUrl).then((result) => {
                setLoading(false)
                if (result.responseCode == 1 && result.responseStatus == "success" && result.data.data != null) {
                    setSearchResults(
                        result.data.data.map((item, i) => {
                            return { id: item._id, value: item.title, diplayOrder: item.diplayOrder };
                        }));
                }
            });
        }
    }, [searchTerm, value, props.searchTerm, code, searchId]);
    const handleOnChange = (event) => {
        let inputValue = event.target.value;
        setSearchTerm(inputValue);
        if (inputValue === "") {
            let emptyItem = { id: "", value: "", extraParam1: "", extraParam2: "" }
            props.onChangeValue(props.name, emptyItem);
            setOpen(false);
        }
    };
    const onSelect = (event, item) => {
        props.onChangeValue(props.name, item);
    }
    const PopperMy = (props) => {
        if (popperWidth != undefined) {
            return (<Popper {...props} placement={'bottom-start'} style={{ width: 350 }} />)
        } else {
            return (<Popper {...props} />)
        }
    }
    return (
        <div className={classes.searchPanel} >
            <Autocomplete
                PopperComponent={PopperMy}
                // elevation={8}
                // disableClearable
                classes={{
                    root: mandatory ? classes.InputBaseAutocompleteMandatory : classes.InputBaseAutocomplete,
                    inputRoot: classes.baseInputAutocomplete,
                }}
                getOptionLabel={(option) => option.value ? option.value : ""}
                // defaultValue={{ id: props.value }}
                onChange={(event, value) => onSelect(event, value)}
                options={searchResults}
                disabled={isDisabled}
                noOptionsText={loading ? 'Loading...' : "No Result Found"}
                open={open}
                onOpen={() => { setOpen(true); }}
                onClose={() => { setOpen(false); }}
                loading={loading}
                filterOptions={(options) => options}
                renderInput={(params) => (
                    <InputBase
                        {...params}
                        fullWidth
                        InputProps={{ ...params.InputProps, type: 'search' }}
                        ref={params.InputProps.ref}
                        maxLength="280"
                        name="searchlist"
                        placeholder={props.placeholderTitle}
                        value={value}
                        onChange={handleOnChange}
                        endAdornment={
                            <InputAdornment position="start">
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : <SearchIcon />}
                                </>
                            </InputAdornment>
                        } />
                )}
                renderOption={(option) => {
                    return (
                        <Box className={classes.autoCompleteBox} fullWidth>
                            <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" className={classes.autoCompleteGrid}>
                                <Grid container alignItems="flex-start" justify="flex-start" dirextion="row" xs={12} sm={12} md={12} lg={12}>
                                    <Typography className={classes.NameTypography} align="left">
                                        {option.value}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                }}
            />
        </div>

    );
}
