import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
    InputBase,
    Checkbox,
    TextareaAutosize,
    NativeSelect,
    Radio,
    RadioGroup,
    FormControlLabel,
    Select,
    MenuItem,
    TextField,
    Input,
    InputAdornment,
    Switch
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { InputNumber } from 'antd';//, DatePicker
import useStyles from "./styles";

// import moment from 'moment';


function InputBaseField({ id, placeholder, name, value, type, MaxLength, MinLength, IsDisabled, onChange, InputRef, InputProps, ...props }) {
    var classes = useStyles();
    //onClick, onFocus, onKeyDown, onKeyUp, onBlur,

    const onChangeEvent = (event) => {
        onChange(event);
    };


    return (
        <InputBase
            id={id}
            className={classes.baseInput}
            placeholder={placeholder}
            name={name}
            value={value}
            type={type}
            inputProps={{
                maxLength: MaxLength,
                minLength: MinLength,
                autoComplete: "off",
                ref: input => InputRef = input,
                ...InputProps
            }}
            onChange={onChangeEvent}
            disabled={IsDisabled}
            {...props}

        />

    );
}


InputBaseField.propTypes = {
    // onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    // onFocus: PropTypes.func.isRequired,
    // onKeyDown: PropTypes.func.isRequired,
    // onKeyUp: PropTypes.func.isRequired,
    // onBlur: PropTypes.func.isRequired,
};

function InputPaymentField({ name, value, id, placeholder, IsDisabled, onChange, MaxLength, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (numberValue) => {
        let event = {
            target: {
                id: id,
                name: name,
                value: numberValue,
            }
        }
        onChange(event);
    };
    const handleFocus = (event) => {
        console.log(event)
        event.target.select();
    }
    return (
        <InputNumber
            id={id}
            name={name}
            placeholder={placeholder}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
            value={value}
            className={classes.InputNumber}
            disabled={IsDisabled}
            onChange={onChangeEvent}
            onFocus={handleFocus}
            maxLength={MaxLength}
            {...props}
        />
    )
}

function InputBaseAdornmentField({ id, placeholder, name, value, type, MaxLength, IsDisabled, onChange, startadornment, InputRef, InputProps, ...props }) {
    var classes = useStyles();
    //onClick, onFocus, onKeyDown, onKeyUp, onBlur,
    const onChangeEvent = (event) => {
        onChange(event);
    };
    return (
        <>
            <InputBase
                id={id}
                classes={{
                    root: classes.adornmentBaseInput,
                    focused: classes.adornmentBaseInputFocused
                }}
                startAdornment={
                    <InputAdornment >{startadornment}</InputAdornment>
                }
                placeholder={placeholder}
                name={name}
                value={value}
                type={type}
                inputRef={InputRef}
                inputProps={{ maxLength: MaxLength, autoComplete: "off", ...InputProps }}
                onChange={onChangeEvent}
                disabled={IsDisabled}
                {...props}

            />

        </>
    );
}


InputBaseField.propTypes = {
    //   onClick: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    // onFocus: PropTypes.func.isRequired,
    // onKeyDown: PropTypes.func.isRequired,
    // onKeyUp: PropTypes.func.isRequired,
    // onBlur: PropTypes.func.isRequired,
};

function InputBaseFieldNumber({ id, placeholder, name, value, type, MaxLength, MinLength, MinValue, MaxValue, IsDisabled, endAdornment, onChange, InputProps, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        if (MinValue != null && MaxValue != null) {
            if (event.target.value >= MinValue && event.target.value <= MaxValue) {
                onChange(event);
            }
        } else {
            onChange(event);
        }
    };
    return (
        <>
            <InputBase
                id={id}
                className={classes.baseInput}
                placeholder={placeholder}
                name={name}
                value={value}
                type="number"
                // inputProps={{ autoComplete: "off", ...InputProps }}
                onChange={onChangeEvent}
                disabled={IsDisabled}
                InputProps={{
                    endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
                }}
                {...props}

            />

        </>
    );
}


InputBaseFieldNumber.propTypes = {
    onChange: PropTypes.func.isRequired,
};


function TextareaField({ id, name, value, MaxLength, MinLength, placeholder, rowsMin, onChange, InputProps, Disabled, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <TextareaAutosize
                id={id}
                className={classes.baseTextarea}
                rowsMin={rowsMin}
                placeholder={placeholder}
                onChange={onChangeEvent}
                name={name}
                value={value}
                maxLength={MaxLength}
                disabled={Disabled}
                inputProps={{ minlength: MinLength, autoComplete: "off", ...InputProps }}
                rows={5}
                {...props}

            />

        </>
    );
}


TextareaField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function SelectField({ id, name, value, options, onChange, placeholder, InputRef, Disabled, ...props }) {
    var classes = useStyles();
    if (value == null || value == undefined)
        value = "";

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <NativeSelect
                id={id}
                disableUnderline
                className={classes.selectBaseInput}
                onChange={onChangeEvent}
                name={name}
                value={value}
                inputProps={InputRef}
                input={<Input inputRef={InputRef}
                    disabled={Disabled}
                />

                }
                {...props}
            >
                {
                    placeholder ? (<option value="">{placeholder}</option>) : ('')
                }
                {
                    options.map((option, i) => (
                        <option key={i} value={option.value}>{option.label}</option>
                    ))
                }
            </NativeSelect>
        </>
    );
}


SelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function CustomSelectField({ id, name, value, options, onChange, placeholder, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <Select
                id={id}
                disableUnderline
                displayEmpty
                className={classes.custmBaseInput}
                onChange={onChangeEvent}
                name={name}
                value={value}
                {...props}
            >
                {
                    placeholder ? (<option value="">{placeholder}</option>) : ('')
                }
                {
                    options.map((option) => (
                        <MenuItem value={option.value}>
                            <span
                                style={{ width: "18px", float: "left", height: "18px", margin: "0px 5px", backgroundColor: option.label }}>
                                {" "}</span >
                            <span style={{ float: "left" }}>
                                {option.label}</span >
                        </MenuItem>
                        // <option value={option.value}>
                        //     <Avatar variant="square" 
                        //         style={{width:"10%",height:"25px",margin:"7px 5px" 
                        //         ,backgroundColor:option.label}}>
                        //         {" "}
                        //     </Avatar>
                        //     {option.label}
                        // </option>
                    ))
                }
            </Select>
        </>
    );
}


CustomSelectField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function MultiSelectField({ id, name, Value, options, onChange, placeholder, isDisabled, isDisableClearable, ...props }) {
    var classes = useStyles();
    const [defvalue, setDefaultValues] = useState([]);
    const onChangeEvent = (selected) => {
        if (selected != null) {
            let selectedvalues = selected.map((sel) => {
                return sel.value;
            })
            onChange(name, selectedvalues);
        }
    };
    //Get default set option
    const getSelectedItem = () => {
        let defaultvalues = [];
        const item = options.map((opt) => {
            if (Value != null || Value != undefined) {
                Value.map((selval) => {
                    if (opt.value === selval) {
                        defaultvalues.push(opt);
                    }
                })
                setDefaultValues(defaultvalues);
            }
        }); setDefaultValues(defaultvalues);
        return item || {};
    }
    //Get default selected value when options or values provided are changed
    useEffect(() => {
        getSelectedItem();
    }, [Value, options])

    return (
        <>
            <Autocomplete
                multiple
                limitTags={1}
                size="small"
                value={defvalue}
                name={name}
                options={options}
                // defaultValue={defvalue}
                filterSelectedOptions
                disableClearable={isDisableClearable}
                getOptionLabel={(option) => option.label}
                disabled={isDisabled}
                onChange={(event, values) => onChangeEvent(values)}
                className={classes.baseInputAutocomplete}
                // classes={{ inputRoot: classes.baseInputAutocomplete }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                    // className={classes.baseTextarea}
                    // label="Multiple values"
                    />
                )}
            />
        </>
    );
}


MultiSelectField.propTypes = {
    onChange: PropTypes.func.isRequired
};
function CheckboxField({ id, name, checked, label, value, color = 'primary', onChange, IsDisabled, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        if (onChange)
            onChange(event);
    };

    return (
        <>
            <FormControlLabel
                control={
                    <Checkbox
                        disabled={IsDisabled}
                        color={color}
                        className={classes.checkBoxBtn}
                        onChange={onChangeEvent}
                        name={name}
                        id={id}
                        checked={checked}
                        value={value}
                        {...props}

                    />
                }
                label={label}
            />

        </>
    );
}


CheckboxField.propTypes = {
    onChange: PropTypes.func.isRequired,
};
function RadioboxField({ id, name, value, options, labelPlacement, onChange, ...props }) {
    var classes = useStyles();

    const onChangeEvent = (event) => {
        onChange(event);
    };

    return (
        <>
            <RadioGroup
                aria-label={id}
                className={classes.radioBtn}
                name={name}
                value={value}
                row
                onChange={onChangeEvent}
                {...props}
            >
                {options.map((option, i) => (
                    <FormControlLabel key={i} labelPlacement={labelPlacement} value={option.value} control={<Radio color="primary" />} label={option.label} />
                ))}
            </RadioGroup>
        </>
    );
}


RadioboxField.propTypes = {
    onChange: PropTypes.func.isRequired,
};

function SwitchBoxField({ id, name, label, checked, value, onChange, disabled, classes, ...props }) {
    var classes = useStyles();

    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
        }
    };
    return (
        <FormControlLabel
            control={
                <Switch
                    focusVisibleClassName={classes.focusVisible}
                    disableRipple
                    classes={{
                        root: classes.root,
                        switchBase: classes.switchBase,
                        thumb: classes.thumb,
                        track: classes.track,
                        checked: classes.checked,
                    }}
                    className={classes.switchBtn}
                    name={name}
                    id={id}
                    disabled={disabled}
                    checked={checked ? true : false}
                    onChange={handleChange}
                    {...props}
                />
            }
            label={label}
        />
    )
}
export { InputBaseField, InputBaseAdornmentField, InputBaseFieldNumber, CheckboxField, TextareaField, SelectField, CustomSelectField, MultiSelectField, RadioboxField, InputPaymentField, SwitchBoxField };

