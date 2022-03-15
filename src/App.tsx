import { AudioDevices } from './components'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
function App() {
    return (
        <div className="App">
            <Box display="flex" justifyContent="center">
                <Typography variant="h2">Pulse audio remote</Typography>
            </Box>
            <AudioDevices />
        </div>
    )
}

export default App
