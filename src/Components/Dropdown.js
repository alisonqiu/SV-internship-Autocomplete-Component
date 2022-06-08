import {
    Container,
    Slider,
    Button,
    Checkbox,
    FormControlLabel,
    ListItem,
    Grid,
    List,
    ListItemText,
    Card, CardContent, CardHeader, Box, Paper, Chip, TextField
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronRightIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from 'react-query'
import * as React from 'react';
import { AppContext } from "../App";



function Dropdown() {

    const { renderTree,options} = React.useContext(AppContext)

    console.log(options)

    return (
        <Container>


            <Grid container >
                <Grid item xs={12}>
                    <Card sx={{height: 500, flexGrow: 1, maxWidth: 800, overflowY: 'auto'}}>
                        <CardContent>
                            <TreeView
                                aria-label="option menu"
                                defaultCollapseIcon={<ExpandMoreIcon/>}
                                defaultExpandIcon={<ChevronRightIcon/>}
                            >
                                {
                                    
                                renderTree(options, "")}
                            </TreeView>
                        </CardContent>
                    </Card>
                </Grid>
                {/* <Grid item xs={4}>
                    <Card  sx={{ flexGrow: 1, height: 500, overflowY: 'auto'}}>
                        <CardHeader
                            title="Selected Options"
                        />
                        <CardContent>
                            <Box>
                                <Grid container spacing={2}>
                                    {labels.map((item) =>
                                        <Grid item>
                                            <Chip label={item} color="primary" />
                                        </Grid>)}
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid> */}
            </Grid>

    
        </Container>
    );
}

export default Dropdown;