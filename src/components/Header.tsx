import { useContext } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ThemeModeContext } from '../App'
import { useTheme } from '@mui/material/styles'

export const Header: React.FC = () => {
    const theme = useTheme()
    const themeModem = useContext(ThemeModeContext)
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography variant="h5">Pulse remote</Typography>
            </Box>
            <Box>
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={themeModem.toggle} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>
        </Box>
    )
}
