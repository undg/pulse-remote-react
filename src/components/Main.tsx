import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { OutputDevices } from './OutputDevices'
import { TabPanel } from './TabPanel'
import Typography from '@mui/material/Typography'

export const Main: React.FC = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const a11yProps = (index: number) => ({
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    })

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="App" {...a11yProps(0)} />
                    <Tab label="Out" {...a11yProps(1)} />
                    <Tab label="In" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography variant="h4" m={2}>...App @TODO</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <OutputDevices />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h4" m={2}>...In @TODO</Typography>
            </TabPanel>
        </Box>
    )
}
