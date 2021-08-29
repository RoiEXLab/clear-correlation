import { Dialog, Button } from '@material-ui/core';
import React from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import domToImage from 'dom-to-image';

const axisStyle = {
    ticks: {
        stroke: 'transparent'
    },
    grid: {
        stroke: 'transparent'
    },
    tickLabels: {
        fill: 'transparent'
    } 
};

const dataSize = 25;
const dataNoise = 0.5;

const applyNoise = x => x + (Math.random() * dataNoise) - (dataNoise / 2);

const randomData = () => Array.from(new Array(dataSize).keys()).map(value => ({
    x: applyNoise(value),
    y: applyNoise(value)
}));

function ChartDialog(props) {
    const chartElement = React.useRef(null);
    const [ data, setData ] = React.useState([]);

    React.useEffect(() => {
        if (props.open) {
            setData(randomData());
        }
    }, [props.open]);

    const storeAsImage = async () => {
        const imageUrl = await domToImage.toSvg(chartElement.current);
        const dummyElement = document.createElement('a');
        dummyElement.href = imageUrl;
        dummyElement.download = 'Correlation.svg';
        dummyElement.click();
    };


    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <div ref={chartElement}>
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine data={data} />
                    <VictoryAxis label={props.xLabel} style={axisStyle} />
                    <VictoryAxis label={props.yLabel} style={axisStyle} dependentAxis/>
                </VictoryChart>
            </div>
            <Button onClick={storeAsImage}>Export Chart</Button>
        </Dialog>
    );
}

export default ChartDialog;