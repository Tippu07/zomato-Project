import React, { Component } from 'react';
import Api from '../Api'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const styles = {
    card: {
        maxWidth: 345,
        margin:10,
    },
    media: {
        height: 140,
    },
};

class DisplayBookedRestaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookedRestaurants: [],
            restoId: this.props.restaurantId,
            isLoaded: false
        }
    }
    componentDidMount() {
        Api.getRestaurantById(this.state.restoId)
            .then(bookedResto => {
                this.setState({
                    bookedRestaurants: bookedResto,
                    isLoaded: true
                })
            })
    }
    render() {
        if (this.state.isLoaded === false) {
            return <h5>Loading...</h5>
        }
        else {
            return (
                <div>
                    {this.state.bookedRestaurants.map(restaurant => {
                        return (
                            <Card style={styles.card} key={restaurant.id}>
                                <CardActionArea>
                                    <CardMedia style={styles.media}
                                        image={restaurant.featured_image?restaurant.featured_image:null}
                                        title="Contemplative Reptile"
                                    />
                                    <div className="card-button">{restaurant.user_rating.aggregate_rating}</div>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {restaurant.name}
                                        </Typography>
                                        <Typography component="p">
                                            {restaurant.location.address}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        )
                    })}
                </div>
            )
        }
    }
}
export default withStyles(styles)(DisplayBookedRestaurants)