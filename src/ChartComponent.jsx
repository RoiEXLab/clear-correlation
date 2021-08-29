import { Button, Container } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import {
  VictoryAxis, VictoryChart, VictoryLine, VictoryTheme,
} from 'victory';
import domToImage from 'dom-to-image';

const useStyles = makeStyles({
  container: (props) => ({
    display: props.xLabel && props.yLabel ? 'unset' : 'none',
    maxHeight: '75vh',
  }),
  wrapper: {
    backgroundColor: 'white',
  },
});

const getAxisStyle = (theme) => ({
  ticks: {
    stroke: 'transparent',
  },
  grid: {
    stroke: 'transparent',
  },
  tickLabels: {
    fill: 'transparent',
  },
  axis: {
    stroke: theme.palette.primary.main,
  },
  axisLabel: {
    fill: theme.palette.text.primary,
  },
});

const getLineStyle = (theme) => ({
  data: {
    stroke: theme.palette.primary.main,
  },
});

const dataSize = 25;
const dataNoise = 0.5;

const applyNoise = (x) => x + (Math.random() * dataNoise) - (dataNoise / 2);

const randomData = () => Array.from(new Array(dataSize).keys()).map((value) => ({
  x: applyNoise(value),
  y: applyNoise(value),
}));

function ChartComponent(props) {
  const {
    xLabel, yLabel,
  } = props;
  const theme = useTheme();
  const axisStyle = getAxisStyle(theme);
  const lineStyle = getLineStyle(theme);
  const classes = useStyles(props);
  const chartElement = React.useRef(null);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (xLabel && yLabel) {
      setData(randomData());
    }
  }, [!!(xLabel && yLabel)]);

  const storeAsImage = (format) => async () => {
    const imageUrl = await format(chartElement.current);
    const dummyElement = document.createElement('a');
    dummyElement.href = imageUrl;
    dummyElement.download = `${xLabel}_${yLabel}_correlation`;
    dummyElement.click();
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <div ref={chartElement} className={classes.wrapper}>
        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine data={data} style={lineStyle} />
          <VictoryAxis label={xLabel} style={axisStyle} />
          <VictoryAxis label={yLabel} style={axisStyle} dependentAxis />
        </VictoryChart>
      </div>
      <Button onClick={storeAsImage(domToImage.toSvg)}>Export Chart (.svg)</Button>
      <br />
      <Button onClick={storeAsImage(domToImage.toPng)}>Export Chart (.png)</Button>
    </Container>
  );
}

ChartComponent.propTypes = {
  xLabel: PropTypes.string.isRequired,
  yLabel: PropTypes.string.isRequired,
};

export default ChartComponent;
