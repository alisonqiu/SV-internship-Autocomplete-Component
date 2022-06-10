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
    Card, CardContent, CardHeader, Box, Paper, Chip, TextField, Menu
} from '@mui/material';
import {TreeView, TreeItem} from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ArrowRightAlt';
import ChevronRightIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from 'react-query'
import * as React from 'react';
import { AppContext } from "../App";



function Dropdown() {

    const {renderTree,options,menuPosition, setMenuPosition, handleLeftClick, isLoading} = React.useContext(AppContext)

    console.log(options)

    if (isLoading) return 'Loading...'

    return (
        <Container>
            <Grid container >
                <Grid item xs={12}>
                    <TreeView
                        aria-label="option menu"
                        defaultCollapseIcon={<ExpandMoreIcon/>}
                        defaultExpandIcon={<ChevronRightIcon/>}
                    >
                        <Button
                            variant="contained"
                            onClick={handleLeftClick}
                            >
                           Menu
                        </Button>
                        <Menu
                            open={!!menuPosition}
                            onClose={() => setMenuPosition(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={menuPosition}
                        >
                            {renderTree(options, "")}
                        </Menu>
                    </TreeView>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Dropdown;
