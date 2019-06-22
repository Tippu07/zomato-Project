import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import BookRestaurants from './BookRestaurants'
const styles = {
    card: {
        maxWidth: 345,
        margin:10,
    },
    media: {
        height: 140,
    },
};

class DisplayRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <Card style={styles.card} >
                <CardActionArea>
                    <CardMedia style={styles.media}
                        image={this.props.restaurant.featured_image}
                        title="Contemplative Reptile"
                    />
                     <div className="card-button">{this.props.restaurant.user_rating.aggregate_rating?this.props.restaurant.user_rating.aggregate_rating:null}</div>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.restaurant.name}
                        </Typography>
                        <Typography component="p">
                            {this.props.restaurant.location.address}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <BookRestaurants restaurantId={this.props.restaurant.id} userId={this.props.userId}/>
                </CardActions>
            </Card>
        )
    }
}


export default withStyles(styles)(DisplayRestaurants);