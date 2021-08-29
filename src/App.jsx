import {
  AppBar, Button, Toolbar, Typography, TextField, makeStyles,
} from '@material-ui/core';
import React from 'react';
import ChartDialog from './ChartDialog';

const useStyles = makeStyles({
  flexDiv: {
    display: 'flex',
    flexDirection: 'column',
  },
  textDiv: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function App() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [xLabel, setXLabel] = React.useState('');
  const [yLabel, setYLabel] = React.useState('');

  const handleClick = () => setDialogOpen(true);
  const handleChange = (setter) => (event) => setter(event.target.value);
  const handleClose = () => setDialogOpen(false);

  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography>
            There is a clear correlation between...
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.flexDiv}>
        <div className={classes.textDiv}>
          <TextField value={xLabel} onChange={handleChange(setXLabel)} />
          and
          <TextField value={yLabel} onChange={handleChange(setYLabel)} />
        </div>
        <Button onClick={handleClick}>Submit</Button>
        <ChartDialog open={dialogOpen} xLabel={xLabel} yLabel={yLabel} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default App;
