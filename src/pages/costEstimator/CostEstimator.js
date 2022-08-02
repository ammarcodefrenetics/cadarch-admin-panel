import React, { useEffect, useState } from "react";
import { Container, Button, Grid, InputBase, Icon, Tooltip } from '@material-ui/core';
import { SearchOutlined as SearchIcon } from '@material-ui/icons';
// styles
// components
import LoadingIcon from "../../images/icons/loaderIcon.gif";
import View from "../../images/icons/view.png";
import Erase from "../../images/icons/erase.png";
import Delete from "../../images/icons/trash.png";
import PageTitle from "../../components/PageTitle";
// import SearchGrid from '../../components/SearchGrid/SearchGrid';
import { PostDataAPI } from '../../Services/PostDataAPI';
import { withSnackbar } from "../../components/Message/Alert";
import { ActionDialog } from "../../components/ActionDialog/ActionDialog";
import CostEstimateDialog from "./components/costEstimateDialog/CostEstimateDialog";
import useStyles from "./styles";

import { data as gridCnfg } from '../../components/SearchGrid/component/setupData';
import { Table, Empty } from 'antd';
import '../../components/SearchGrid/style.css';
import '../../components/antd.css';
import '../../components/SearchGrid/antStyle.css';
import { GetDataAPI } from "../../Services/GetDataAPI";
import { UpdateDataAPI } from "../../Services/UpdateDataAPI";
// import  '../../components/antd.css';

const axios = require('axios').default;
function CostEstimator(props) {
    var classes = useStyles();
    const { showMessage } = props;

    //--//
    const [rowsData, setRowsData] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("");

    const handleSearch = (e) => {
        const currValue = e.target.value;
        setValue(currValue);
        if (currValue && currValue !== undefined && currValue != null && currValue !== "") {
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

    //--//
    const [isUpdate, setIsUpdate] = useState(false);
    //--//

    const [dataObject, setDataObject] = useState({});
    const [dialogState, setDialogState] = useState(false);
    //State For Action Dialog
    const [actiondialogprops, setActionDialogProps] = useState({
        actiondialogstate: false, actiondialogtitle: "Title", actiondialogmessage: "Message", actiondialogtype: "warning"
    });
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
    const handleView = dataObject => {
        setDataObject(dataObject);
        setDialogState(true);
    }
    const handleUpdate = () => { setIsUpdate(!isUpdate); }
    const handleDelete = (idToDelete) => {
        ShowActionDialog(true, "Delete", "Are you sure, you want to delete this patient?", "confirm", function () {
            UpdateDataAPI('costestimator/deletecostestimator', null, idToDelete).then((result) => {
                if (result.responseCode === 1 && result.responseStatus === "success") {
                    showMessage("Success", "Record deleted successfully.", "success", 3000);
                    handleUpdate();
                }
                else {
                    showMessage("Error", result.message, "error", 3000);
                }
            })
        })
    }
    const loadData = (filterValues) => {
        setIsLoading(true)
        GetDataAPI('costestimator/loadallcostestimator').then((result) => {
            setIsLoading(false);
            if (result.responseCode === 1 && result.responseStatus === "success") {
                setRowsData(
                    result.data.data.map((item, i) => {
                        // item.key = item[gridCnfg[props.columnCode][0].dataIndex];
                        item.constructionType = item?.details?.[0]?.optionId?.title;
                        item.plotLocation = item?.details?.[0]?.optionId?.title;
                        item.userName = item?.userId?.fullName
                        item.contact = item?.userId?.phoneNumber
                        item.action =
                            <div style={{ width: "100%", textAlign: "center" }}><Tooltip title="View">
                                <Icon>
                                    <img src={View}
                                        alt="view"
                                        onClick={() => handleView(item)}
                                        className={classes.viewIcon}
                                        disabled={true} />
                                </Icon>
                            </Tooltip>
                                {/* {isEditAble && <Tooltip title="Edit">
                                    <Icon> <img src={Erase} onClick={() => onEdit(item)} className={classes.Icon} disabled={true} /> </Icon>
                                </Tooltip>
                                } */}
                                <Tooltip title="Delete">
                                    <Icon>
                                        <img
                                            alt="delete"
                                            src={Delete}
                                            className={classes.Icon}
                                            onClick={() => handleDelete(item._id)}
                                        />
                                    </Icon>
                                </Tooltip>
                            </div>
                        return { ...item }
                    }));
            }
        });
    }
    useEffect(() => {
        loadData();
    }, [isUpdate])
    return (
        <>
            <PageTitle title="Cost Estimator" />

            <Container maxWidth={false} className={classes.positionRelative}>

                <Grid container justifyContent="flex-end" >
                    <Grid item xs={5} sm={5} md={5} lg={5} xl={5} />
                    <Grid item xs={7} sm={7} md={7} lg={7} xl={7}>
                        <Grid container justifyContent="flex-end">
                            <Grid item xs={7} sm={7} md={7} lg={7} xl={7} />
                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
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
                        </Grid>
                    </Grid>
                </Grid>
                <div className="custom-grid">
                    <Table
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //         onClick: (e) => handleRowClick(e, record.key),
                        //     };
                        // }}
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
                        // rowClassName={(record, index) => isRowClickAble ? "claimRow" : ""}
                        scroll={true}
                        pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: [5, 10, 20, 30] }}
                        dataSource={rowsData}
                        columns={gridCnfg['CostEstimator']}
                    // rowSelection={isSelection ? { selectedRowKeys: selectedRows, onChange: onSelectChange } : null}
                    />
                </div>
            </Container>
            {
                <CostEstimateDialog
                    data={dataObject}
                    dialogOpenClose={dialogState}
                    handleClose={() => setDialogState(false)} />
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
export default withSnackbar(CostEstimator)
