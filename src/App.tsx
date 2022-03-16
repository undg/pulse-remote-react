import { useMemo, useState } from 'react'
import { PaletteMode } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './scss/style.scss'
import { Body, Header, Main } from './components'
import { ThemeModeContext } from './context'

export const App: React.FC = () => {
    const [mode, setMode] = useState<PaletteMode>('dark')

    const themeMode = useMemo(
        () => ({
            toggle: () => {
                setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))
            },
        }),
        []
    )

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    )

    return (
        <ThemeModeContext.Provider value={themeMode}>
            <ThemeProvider theme={theme}>
                <Body>
                    <Header />
                    <Main />
                </Body>
            </ThemeProvider>
        </ThemeModeContext.Provider>
    )
}

