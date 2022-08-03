import React, { useState, useEffect } from "react"
import { InputBase } from "@material-ui/core"
// import { PostDataAPI } from '../../Services/PostDataAPI';
import { GetDataAPI } from '../../Services/GetDataAPI';
import useStyles from './styles'
import { data as gridCnfg } from './component/setupData';
import View from "../../images/icons/view.png";
import Erase from "../../images/icons/erase.png";
import Delete from "../../images/icons/trash.png";
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import arrowUp from '../../images/icons/arrow-up.png'
import arrowDown from '../../images/icons/arrow-down.png'
import { Switch } from 'antd';

import {
    Icon,
    Typography,
    Grid,
    Tooltip
} from "@material-ui/core";
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
import "./style.css";
import { Table, Empty } from 'antd';
// import 'antd/dist/antd.css';
import "../antd.css";
import "./antStyle.css";


export default function SearchGrid({ code, apiurl, onEdit, onDelete, onAddNew, isSearchAble, Title, onChange, isUpdate, isView, isEditAble, isDelete, isSelection, isRowClickAble, onView, rowClick, getSelectedRows, isCustomSearch, isQuestions, onSwipe,isToggle,onToggle, ...props }) {
    var classes = useStyles();
    let data=[]
    //Grid//
    const [rowsData, setRowsData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});
    const [dependencies, setDependencies] = useState('')

    const [value, setValue] = useState('');
    const handleView = (e, object) => {
        e.stopPropagation();
        onView(object);
    }
    const handleEdit = (e, id) => {
        e.stopPropagation();
        onEdit(id);
    }
    const handleDelete = (e, id) => {
        e.stopPropagation();
        onDelete(id);
    }

    //load dependencies
    const loadDependencies = async () => {
        const result = await GetDataAPI('dependencies/getDependencies')
        if (result.responseCode == 1 && result.responseStatus == "success") {
            setDependencies(result.data.data)
            data=result.data.data
        }
    }

    //sort question Array
    const sortingByDisplayOrder = (arr) => {
        return arr.sort((a, b) => {
            if (b.displayOrder > a.displayOrder) {
                return -1;
            } else if (a.displayOrder > b.displayOrder) {
                return 1;
            } else {
                return 0;
            }
        });
    }
   
    //check question type
    const sortByQuestionType = (questions) => {
        let checkBasic = []
        let checkDetailed = []
        for (let j = 0; j < questions.length; j++) {
            if (questions[j].isBasic === true) {
                checkBasic.push(questions[j])
            }
            else if (questions[j].isBasic === false) {
                checkDetailed.push(questions[j])
            }
        }
        // let sortedCheckBasic = sortingByDisplayOrder(checkBasic)
        // let sortedCheckDetailed = sortingByDisplayOrder(checkDetailed)
        return [...checkBasic, ...checkDetailed]

    }
    const loadData = (filter, Values) => {
        setIsLoading(true)
    

        GetDataAPI(props.apiUrl).then((result) => {

            setIsLoading(false);
            if (result.responseCode == 1 && result.responseStatus == "success") {
                let allQuestions = []
                if (isQuestions) {
                  allQuestions = sortByQuestionType(result.data.data)
                }
                setRowsData(
                    isQuestions ? allQuestions.map((item, i ,array) => { 
                        item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                      
                        // item.isBasic = item.isBasic ? 'yes' : 'no'
                     
                        item.size = item.size ? item.size + " " + item.unit : ""
                        item.action =
                            <div style={{ width: "100%", textAlign: "right"  }}>
                                {isQuestions && i !== allQuestions.length - 1 && <Tooltip style={{ paddingRight: 5 }} title="Swipe Down">
                                    <Icon> <img src={arrowDown} onClick={() => {
                                        onSwipe(item._id, array[i + 1]._id,item.isBasic, array[i + 1].isBasic, data, item.displayOrder, array[i + 1].displayOrder)
                                    }} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                }
                                {isQuestions && i !== 0 && <Tooltip style={{ paddingRight: 5 }} title="Swipe Up">
                                    <Icon> <img src={arrowUp} onClick={() => {
                                        onSwipe(item._id, array[i - 1]._id,item.isBasic, array[i - 1].isBasic, data, item.displayOrder, array[i - 1].displayOrder)
                                    }
                                     } className={classes.Icon} /> </Icon>
                                </Tooltip>
                                }
                                {isView && <Tooltip title="View">
                                    <Icon> <img src={View} onClick={() => onView(item)} className={classes.viewIcon} disabled={true} /> </Icon>
                                </Tooltip>
                                }
                                {isEditAble && <Tooltip title="Edit">
                                    <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} disabled={true} /> </Icon>
                                </Tooltip>
                                }
                                {isDelete && <Tooltip title="Delete">
                                    <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                }
                                
                            </div>

                        return { ...item }
                    }) :
                        result.data.data.map((item, i) => {
                            item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                            item.isBasic = item.isBasic ? 'yes' : 'no'
                            item.size = item.size ? item.size + " " + item.unit : ""
                            item.action =
                                <div style={{ width: "100%", textAlign: "right" }}>
                                    {isView && <Tooltip title="View">
                                        <Icon> <img src={View} onClick={() => onView(item)} className={classes.viewIcon} disabled={true} /> </Icon>
                                    </Tooltip>
                                    }
                                    {isEditAble && <Tooltip title="Edit">
                                        <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} disabled={true} /> </Icon>
                                    </Tooltip>
                                    }
                                    {isToggle &&  <Tooltip title="Toggle">
                                    <Icon> <Switch onChange={(e)=>{onToggle(e,item._id)}} disabled={item.isActive} checked={item.isActive} size="small" className={classes.Icon} /> </Icon>
                                </Tooltip>}
                                    {isDelete && !isToggle && <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                    }
                                    {isDelete && isToggle && !item.isActive && <Tooltip title="Delete">
                                        <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                    </Tooltip>
                                    }
                                   

                                </div>

                            return { ...item }
                        }));

                setGridData( isQuestions ? allQuestions.map((item, i) => {
                    item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                    item.isBasic = item.isBasic ? 'yes' : 'no'
                    item.size = item.size ? item.size + " " + item.unit : ""
                    item.action =
                        <div style={{ width: "100%", textAlign: "right"  }}>
                            {isQuestions && i !== allQuestions.length - 1 && <Tooltip style={{ paddingRight: 5 }} title="Swipe Down">
                                <Icon> <img src={arrowDown} onClick={() => onSwipe(item._id, allQuestions[i + 1]._id,item.isBasic, allQuestions[i + 1].isBasic, data, item.displayOrder, allQuestions[i + 1].displayOrder)} className={classes.Icon} /> </Icon>
                            </Tooltip>
                            }
                            {isQuestions && i !== 0 && <Tooltip style={{ paddingRight: 5 }} title="Swipe Up">
                                <Icon> <img src={arrowUp} onClick={() => onSwipe(item._id, allQuestions[i - 1]._id,item.isBasic, allQuestions[i - 1].isBasic, data, item.displayOrder, allQuestions[i - 1].displayOrder)} className={classes.Icon} /> </Icon>
                            </Tooltip>
                            }
                            {isView && <Tooltip title="View">
                                <Icon> <img src={View} onClick={() => onView(item)} className={classes.viewIcon} disabled={true} /> </Icon>
                            </Tooltip>
                            }
                            {isEditAble && <Tooltip title="Edit">
                                <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} disabled={true} /> </Icon>
                            </Tooltip>
                            }
                            {isDelete && <Tooltip title="Delete">
                                <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                            </Tooltip>
                            }
                            
                        </div>

                    return { ...item }
                }) :
                    result.data.data.map((item, i) => {
                        item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                        item.isBasic = item.isBasic ? 'yes' : 'no'
                        item.size = item.size ? item.size + " " + item.unit : ""
                        item.action =
                            <div style={{ width: "100%", textAlign: "right" }}>
                                {isView && <Tooltip title="View">
                                    <Icon> <img src={View} onClick={() => onView(item)} className={classes.viewIcon} disabled={true} /> </Icon>
                                </Tooltip>
                                }
                                {isEditAble && <Tooltip title="Edit">
                                    <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} disabled={true} /> </Icon>
                                </Tooltip>
                                }
                                {isToggle &&  <Tooltip title="Toggle">
                                <Icon> <Switch onChange={(e)=>{onToggle(e,item._id)}} disabled={item.isActive} checked={item.isActive} size="small" className={classes.Icon} /> </Icon>
                            </Tooltip>}
                                {isDelete && !isToggle && <Tooltip title="Delete">
                                    <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                }
                                {isDelete && isToggle && !item.isActive && <Tooltip title="Delete">
                                    <Icon> <img src={Delete} onClick={() => onDelete(item[gridCnfg[props.columnCode][0].dataIndex])} className={classes.Icon} /> </Icon>
                                </Tooltip>
                                }
                               

                            </div>

                        return { ...item }
                    }));
            }
        });
    }
    useEffect(() => {
        if (isQuestions) {
            loadDependencies()
        }
        if (true) {
            if (props.filter !== undefined) {
                loadData(props.filter);
            }
            else {
                loadData(values);
            }
        };
    }, [isUpdate])

    const handleSearch = (e) => {
        const currValue = e.target.value;
        setValue(currValue);
        if (currValue && currValue != undefined && currValue != null && currValue != "") {
            let filteredData = [...gridData];
            filteredData = filteredData.filter(entry => {
                var hasValue = false;
                for (var prop in entry) {
                    if (Object.prototype.hasOwnProperty.call(entry, prop)) {
                        hasValue = entry[prop]?.toString().toLowerCase().includes(currValue.toLowerCase());
                        if (hasValue)
                            break;
                    }
                }
                return hasValue;
            }
            );
            setRowsData(filteredData);
        } else {
            const filteredData = [...gridData];
            setRowsData(filteredData);
        }
    }
    const [selectedRows, setSelectedRows] = useState([]);
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRows(selectedRowKeys);
        if (!!getSelectedRows) {
            getSelectedRows(selectedRowKeys);
        }
    }
    const onSearchSubmit = (searchvalues) => {
        loadData(searchvalues);
    }
    const handleRowClick = (e, key) => {
        if (!!rowClick) {
            rowClick(key);
        }
    };
    return (
        <>
            {/* {isLoading ? (
                <>
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" height={41} width="100%" style={{ marginBottom: 6 }} />
                    <Skeleton className={classes.bgColor} animation="wave" variant="rect" width="100%">
                        <div style={{ paddingTop: '27%' }} />
                    </Skeleton>
                </>
            ) : ( */}
            <>
                {/* {isCustomSearch && <SearchGridForm defaultvalues={values} searchPanelParams={props.searchPanelParams} Apply={onSearchSubmit} />} */}
                <Grid container item direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid container item justifyContent="flex-start" direction="column" xs={5} sm={5} md={5} lg={5} xl={5}>

                        {Title ? <Typography className={classes.title}>{Title}</Typography> : ""}

                    </Grid>
                    <Grid container item justifyContent="flex-end" direction="row" xs={7} sm={7} md={7} lg={7} xl={7}>
                        {isSearchAble ?
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <InputBase
                                    id="search"
                                    name="search"
                                    value={value}
                                    placeholder="Search"
                                    className="grid-search-input"
                                    startAdornment={<SearchIcon />}
                                    onChange={handleSearch}
                                />
                            </Grid>
                            : ""}
                    </Grid>
                </Grid>
                <>
                    <div className={props.dp == 'true' ? 'dp-table' : ''}>
                        <div className="custom-grid">
                            <Table
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: (e) => handleRowClick(e, record.key),
                                    };
                                }}
                                locale={{
                                    emptyText: (
                                        <Empty
                                            image={isLoading && LoadingIcon}
                                            description={isLoading ? "Loading..." : "No Record Found"}
                                            imageStyle={{ height: 30, display: !isLoading ? "none" : "" }}
                                        />
                                    )
                                }}

                                showSorterTooltip={false}
                                checkStrictly={true}
                                rowClassName={(record, index) => isRowClickAble ? "claimRow" : ""}

                                scroll={true}
                                pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                                dataSource={rowsData}
                                columns={gridCnfg[props.columnCode]}
                                rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                            />
                        </div>
                    </div>
                </>
            </>
            {/* )
            } */}
        </>
    )

}