import React from "react";
import { Tag } from "antd";
import { LinkS } from "../../UiElements/UiElements";
import { Icon } from "@material-ui/core";
import { AttachFile as AttachFileIcon, Check as CheckIcon } from '@material-ui/icons';
export const data = {
    PatientColumns: [
        {
            title: '',
            dataIndex: 'patientId',
            className: "custom-grid-hide-col"
        },
        {
            title: '',
            dataIndex: 'dp',
        },
        {
            title: 'Chart ID',
            dataIndex: 'chartNumber',
            className: "width130",
            sorter: (a, b) => {
                a = a.chartNumber != null ? a.chartNumber + '' : "";
                b = b.chartNumber != null ? b.chartNumber + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width150",
            sorter: (a, b) => {
                a = a.name != null ? a.name : "";
                b = b.name != null ? b.name : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress',
            className: "width140",
            sorter: (a, b) => {
                a = a.emailAddress != null ? a.emailAddress + '' : "";
                b = b.emailAddress != null ? b.emailAddress + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Last Appointment',
            dataIndex: 'lastAppointment',
            className: "width180",
            sorter: (a, b) => {
                a = a.lastAppointment != null ? a.lastAppointment + '' : "";
                b = b.lastAppointment != null ? b.lastAppointment + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Next Appointment',
            dataIndex: 'nextAppointment',
            className: "width180",
            sorter: (a, b) => {
                a = a.nextAppointment != null ? a.nextAppointment + '' : "";
                b = b.nextAppointment != null ? b.nextAppointment + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Cell #',
            dataIndex: 'cellPhone',
            className: "width150",
            sorter: (a, b) => {
                a = a.cellPhone != null ? a.cellPhone + '' : "";
                b = b.cellPhone != null ? b.cellPhone + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Status',
            dataIndex: 'statusCode',
            className: "width50",
            sorter: (a, b) => {
                a = a.statusCode != null ? a.statusCode + '' : "";
                b = b.statusCode != null ? b.statusCode + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width100"
        }
    ],
    CostEstimator: [
        {
            title: '',
            dataIndex: 'estimatorId',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Construction Type',
            dataIndex: 'constructionType',
            className: "width150",
            sorter: (a, b) => {
                a = a.title != null ? a.title : "";
                b = b.title != null ? b.title : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Location',
            dataIndex: 'plotLocation',
            className: "width150",
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Total Estimate',
            dataIndex: 'totalEstimate',
            className: "width150",
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'User Name',
            dataIndex: 'userName',
            className: "width150",
            sorter: (a, b) => {
                a = a.isBasic != null ? a.isBasic + '' : "";
                b = b.isBasic != null ? b.isBasic + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            className: "width150",
            sorter: (a, b) => {
                a = a.isBasic != null ? a.isBasic + '' : "";
                b = b.isBasic != null ? b.isBasic + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "width100"
        }
    ],
    Question: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col"
        // },
        {
            title: 'Title',
            dataIndex: 'title',
            className: "width150",
            // sorter: (a, b) => {
            //     a = a.title != null ? a.title : "";
            //     b = b.title != null ? b.title : "";
            //     return a.localeCompare(b);
            // },
        },
        {
            title: 'Display Order',
            dataIndex: 'displayOrder',
            className: "width150",
           
        },
        {
            title: 'Description',
            dataIndex: 'details',
            className: "width300",
            // sorter: (a, b) => {
            //     a = a.details != null ? a.details + '' : "";
            //     b = b.details != null ? b.details + '' : "";
            //     return a.localeCompare(b);
            // },
        },
        {
            title: 'Is Basic',
            dataIndex: 'isBasic',
            className: "width65",
            render: function (text, record, index) {
                return record.isBasic ?
                    <span >yes</span> :
                    <span >no</span>

            }
            // sorter: (a, b) => {
            //     a = a.isBasic != null ? a.isBasic + '' : "";
            //     b = b.isBasic != null ? b.isBasic + '' : "";
            //     return a.localeCompare(b);
            // },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "width100"
        }
    ],
    AddCostEstimatorColumns: [
        {
            title: '',
            dataIndex: 'questionId',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Image',
            dataIndex: 'image',
            className: "width65",
        },
        {
            title: 'Title',
            dataIndex: 'title',
            className: "width150",
            sorter: (a, b) => {
                a = a.title != null ? a.title : "";
                b = b.title != null ? b.title : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Description',
            dataIndex: 'description',
            className: "width220",
            sorter: (a, b) => {
                a = a.description != null ? a.description + '' : "";
                b = b.description != null ? b.description + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Price Effect PSF',
            dataIndex: 'priceEffectPSF',
            className: "width120",
            sorter: (a, b) => {
                a = a.priceEffectPSF != null ? a.priceEffectPSF + '' : "";
                b = b.priceEffectPSF != null ? b.priceEffectPSF + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Display Order',
            dataIndex: 'displayOrder',
            className: "width80",
            sorter: (a, b) => {
                a = a.displayOrder != null ? a.displayOrder + '' : "";
                b = b.displayOrder != null ? b.displayOrder + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width100"
        }
    ],
    RenovationColumns: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col"
        // },
        {
            title: 'Renovation Type',
            dataIndex: 'renovationType',
            className: "width65",
            sorter: (a, b) => {
                a = a.renovationType ?? "";
                b = b.renovationType ?? "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: "width150",
            sorter: (a, b) => {
                a = JSON.stringify(a.location) ?? "";
                b = JSON.stringify(b.location) ?? "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Area',
            dataIndex: 'area',
            className: "width100",
            sorter: (a, b) => {
                a = JSON.stringify(a.area) ?? ''
                b = JSON.stringify(a.area) ?? ""

                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Details',
            dataIndex: 'details',
            className: "width220",
            ellipsis:true,

            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "width100"
        }
    ],
    RenovationAreaColumns: [
        {
            title: '',
            dataIndex: 'renovationId',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Location',
            dataIndex: 'location',
            className: "width150",
            sorter: (a, b) => {
                a = a.location != null ? a.location : "";
                b = b.location != null ? b.location : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Area',
            dataIndex: 'area',
            className: "width120",
            sorter: (a, b) => {
                a = a.area != null ? a.area : "";
                b = b.area != null ? b.area : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Details',
            dataIndex: 'details',
            className: "width220",
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Images',
            dataIndex: 'imgaes',
            className: "width200",
            // sorter: (a, b) => {
            //     a = a.description != null ? a.description + '' : "";
            //     b = b.description != null ? b.description + '' : "";
            //     return a.localeCompare(b);
            // },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "center",
            className: "width100"
        }
    ],
    AchitectureColumns: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col"
        // },
        {
            title: 'Architecture Type',
            dataIndex: 'architectureType',
            className: "width150",
            sorter: (a, b) => {
                a = a.architectureType != null ? a.architectureType : "";
                b = b.architectureType != null ? b.architectureType : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            className: "width150",
            sorter: (a, b) => {
                a = a.address != null ? a.address : "";
                b = b.address != null ? b.address : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Details',
            dataIndex: 'details',
            className: "width220",
            ellipsis:true,
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "width100"
        }
    ],
    ConstructionColumns: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col"
            
        // },
        {
            title: 'Construction Type',
            dataIndex: 'constructionType',
            sorter: (a, b) => {
                a = a.constructionType != null ? a.constructionType : "";
                b = b.constructionType != null ? b.constructionType : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => {
                a = a.location != null ? a.location : "";
                b = b.location != null ? b.location : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>
            }
        },
        {
            title: 'Area',
            dataIndex: 'area',
            sorter: (a, b) => {
                a = a.area != null ? a.area : "";
                b = b.area != null ? b.area : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Details',
            dataIndex: 'details',
            ellipsis:true,
            className:'width220',
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return !record.isFollowUp ?
                    <span style={{ fontWeight: 900 }}>{text}</span> :
                    <span >{text}</span>

            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className:"width150"
        },
        
    ],
    PlotColumns: [
        {
            title: '',
            dataIndex: '_id',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Title',
            dataIndex: 'title',
            sorter: (a, b) => {
                a = a.title != null ? a.title : "";
                b = b.title != null ? b.title : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Label',
            dataIndex: 'size',
            sorter: (a, b) => {
                a = a.label != null ? a.label : "";
                b = b.label != null ? b.label : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Covered Area',
            dataIndex: 'coveredArea',
            sorter: (a, b) => {
                a = a.coveredArea != null ? a.coveredArea + '' : "";
                b = b.coveredArea != null ? b.coveredArea + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Area With Basement',
            dataIndex: 'coveredAreaWithBasement',
            sorter: (a, b) => {
                a = a.coveredAreaWithBasement != null ? a.coveredAreaWithBasement + '' : "";
                b = b.coveredAreaWithBasement != null ? b.coveredAreaWithBasement + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
        }
    ],
    NewsColumns: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col",
     
        // },
        {
            title: 'Title',
            dataIndex: 'title',
            className: "width300",
            sorter: (a, b) => {
                a = a.title != null ? a.title : "";
                b = b.title != null ? b.title : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Details',
            dataIndex: 'details',
            className: "width300",
            ellipsis:true,
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            className: "width300",
            align: "right",
        }
    ],
    UsersColumns: [
        {
            title: '',
            dataIndex: '_id',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Name',
            dataIndex: 'fullName',
            className: "width150",
            sorter: (a, b) => {
                a = a.title != null ? a.title : "";
                b = b.title != null ? b.title : "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Contact',
            dataIndex: 'phoneNumber',
            className: "width220",
            sorter: (a, b) => {
                a = a.details != null ? a.details + '' : "";
                b = b.details != null ? b.details + '' : "";
                return a.localeCompare(b);
            },
        },
    ],
    SupportColumns: [
        // {
        //     title: '',
        //     dataIndex: '_id',
        //     className: "custom-grid-hide-col"
        // },
        {
            title: 'Support Type',
            dataIndex: 'type',
            className: "width150",
            sorter: (a, b) => {
                a = a.type ?? "";
                b = b.type ?? "";
                return a.localeCompare(b);
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
            className: "width150",
            sorter: (a, b) => {
                a = a.name;
                b = b.name;
                return a.localeCompare(b);
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            className: "width100",
            sorter: (a, b) => {
                a = JSON.stringify(a.email) ?? ''
                b = JSON.stringify(a.email) ?? ""

                return a.localeCompare(b);
            },
        },
        {
            title: 'Message',
            dataIndex: 'message',
            className: "width220",
            ellipsis:true
        },
        {
            title: 'Date & time',
            dataIndex: 'createdAt',
            className: "width100",
            ellipsis:true,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: function (text, record) {
                let time = `${new Date(record.createdAt)}`
                return <span>{time}</span>

            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: "right",
            className: "width100"
        }
    ],
    BasePriceColumns: [
        {
            title: '',
            dataIndex: '_id',
            className: "custom-grid-hide-col"
        },
        {
            title: 'Base Price',
            dataIndex: 'basePrice',
            className: "width150",
           
            sorter: (a, b) => {
                a = a.type ?? "";
                b = b.type ?? "";
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return record.isActive ?
                    <span >{text}</span> :
                    <span style={{color:'gray'}}>{text}</span>

            }
        },
        {
            title: 'Status',
            dataIndex: 'isActive',
            className: "width150",
            sorter: (a, b) => {
                a = JSON.stringify(a.name ) ?? '';
                b = JSON.stringify(b.name) ?? '';
                return a.localeCompare(b);
            },
            render: function (text, record, index) {
                return record.isActive ?
                    <span >Active</span> :
                    <span style={{color:'gray'}}>Inactive</span>

            }
        },
       
        {
            title: 'Action',
            dataIndex: 'action',
            align:'right',
            className: "width100"
        }
    ],
};
