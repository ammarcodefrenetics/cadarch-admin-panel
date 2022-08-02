
import { Line, Column } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { BoxContainer } from '../boxContainer/BoxContainer';
import useStyles from "./styles";
import axios from 'axios';
const Graph = () => {
    var classes = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = async () => {
        const res = await axios.get('http://localhost:5000/api/dashboard/getallusersbymonth')
        if (res.data.responseCode === 1) {
            setData(res?.data?.data?.graphData ?? [])
        }
        else {
            setData([])
        }
    };

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        seriesField: 'category',
        isGroup: 'true',
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
    };
    return (

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <BoxContainer style={{ position: 'relative' }}>
                {data.length < 1 ? (
                    <Grid className={classes.noGraph}>No Records to Show</Grid>
                ) : (
                    <>
                        <Column {...config} />
                        {/* <Line {...config}/> */}
                    </>
                )
                }
            </BoxContainer>
        </Grid>
    )
};

export default Graph
