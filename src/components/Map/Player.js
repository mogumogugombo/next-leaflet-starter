import { useEffect, useState, useRef } from 'react';
import TextField from '@mui/material/TextField';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PauseIcon from '@mui/icons-material/Pause';

const Player = ({caption, propPlayingStatus, onClickPlay, onClickPause}) => {
  const [playingStatus, setPlayingStatus] = useState(propPlayingStatus);
  // play, pause, forward, rewind
    const playHandler = () => {
      console.log('playHandler');
      onClickPlay();
      setPlayingStatus('play');
    }
    const pauseHandler = () => {
      console.log('pauseHandler');
      onClickPause();
      setPlayingStatus('pause');
    }

    return (
      <>
      <div> 
        {caption}
        <IconButton aria-label="delete" size="small">
          <FastRewindIcon style={{width:'16px', height:'16px'}}/>
        </IconButton>
        {
          playingStatus === 'play' ? 
          <IconButton aria-label="delete" onClick={() => pauseHandler()} size="small">
            <PauseIcon style={{width:'16px', height:'16px'}}/>
          </IconButton>
          :
          <IconButton aria-label="delete" onClick={() => playHandler()} size="small">
            <PlayArrowIcon style={{width:'16px', height:'16px'}}/>
          </IconButton>
        }
        <IconButton aria-label="delete" onClick={() => console.log('forward')} size="small">
          <FastForwardIcon style={{width:'16px', height:'16px'}}/>
        </IconButton>
      </div> 
      </>
    )
  }

  export default Player;