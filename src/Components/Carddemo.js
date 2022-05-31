import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ship from '../trans.jpg'

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: '100vw' }}>
      <CardActionArea sx={{ display: 'flex' }}>
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          TRANS-ATLANTIC
SLAVE TRADE DATABASE
          </Typography>
          <Typography variant="body2" color="text.secondary">
          This database compiles information about more than 36,000 voyages that forcibly transported enslaved Africans across the Atlantic between 1514 and 1866. Search and analyze the database for information on the broad origins of enslaved people, the tortuous Middle Passage, and the destinations of Africans in the Americas.
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="140"
          image={ship}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions>
        <Button variant = 'outlined' size="small" color="primary">
          About
        </Button>
        <Button variant = 'outlined' size="small" color="primary">
          Database
        </Button>
        <Button variant = 'outlined' size="small" color="primary">
          Estimate
        </Button>
        <Button variant = 'outlined' size="small" color="primary">
          Essays
        </Button>
        <Button variant = 'outlined' size="small" color="primary">
          Downloads
        </Button>
        <Button variant = 'outlined' size="small" color="primary">
          Contribute
        </Button>
      </CardActions>
    </Card>
  );
}
