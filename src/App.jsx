import {
  Typography, TextField, makeStyles,
} from '@material-ui/core';
import React from 'react';
import ChartComponent from './ChartComponent';

const HASH_X_LABEL = 'x-label';
const HASH_Y_LABEL = 'y-label';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  textDiv: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
  },
  textFieldPadding: {
    paddingLeft: '5px',
    paddingRight: '5px',
  },
  alignRight: {
    textAlign: 'right',
  },
  textField: {
    minWidth: '35rem',
  },
}));

function App() {
  const [xLabel, setXLabel] = React.useState('');
  const [yLabel, setYLabel] = React.useState('');

  const handleChange = (setter) => (event) => setter(event.target.value);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    setXLabel(params.get(HASH_X_LABEL) || '');
    setYLabel(params.get(HASH_Y_LABEL) || '');
  }, []);

  React.useEffect(() => {
    if (xLabel && yLabel) {
      const params = new URLSearchParams({
        [HASH_X_LABEL]: xLabel,
        [HASH_Y_LABEL]: yLabel,
      });
      window.location.hash = params.toString();
    } else {
      window.location.hash = '';
    }
  }, [xLabel, yLabel]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>
        There is a clear correlation between
      </Typography>
      <div className={classes.textDiv}>
        <TextField
          value={xLabel}
          onChange={handleChange(setXLabel)}
          inputProps={{
            className: classes.alignRight,
          }}
          className={classes.textField}
        />
        <Typography className={classes.textFieldPadding}>and</Typography>
        <TextField
          value={yLabel}
          onChange={handleChange(setYLabel)}
          className={classes.textField}
        />
      </div>
      <ChartComponent xLabel={xLabel} yLabel={yLabel} />
    </div>
  );
}

export default App;
