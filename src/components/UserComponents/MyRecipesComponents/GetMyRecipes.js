import React, { Component } from 'react';
import { Button } from 'reactstrap'
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap'

class GetMyRecipes extends Component {
    state = {
        foods: []
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+decode(localStorage.getItem('user')).id)
            .then(res => {
                if (res.data.success) {
                    this.setState({foods: res.data.foods})
                }
            })
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container">
                    <center><h3>Your Recipes</h3></center>
                    <Row>
                        {this.state.foods.map((f, key) => 
                            <Col md="6">
                                <Card body outline color="secondary">
                                    <CardTitle>{f.name}</CardTitle>
                                    <CardText>{f.user.details.name}</CardText>
                                    <Button>View</Button>
                                </Card>   
                            </Col>
                        )}
                    </Row>                    
                    <Button onClick={this.props.makeNewRecipe} className="btn btn-success btn-lg mt-5">Add New</Button> 
                </div>                
            </React.Fragment>
        );
    }
}
 
export default GetMyRecipes;