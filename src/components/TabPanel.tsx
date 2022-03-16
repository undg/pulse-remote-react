import Box from '@mui/material/Box'

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && <Box>{children}</Box>}
    </div>
)
