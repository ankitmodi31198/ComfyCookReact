import React, { Component } from 'react';
import Axios from 'axios';
import config from 'react-global-configuration'
import decode from 'jwt-decode'
import { Button } from 'reactstrap'

class GetMyRecipe extends Component {
    state = {
        food: null
    }
    componentDidMount() {
        Axios.get(config.get('server_path')+'/food/'+decode(localStorage.getItem('user')).id+'/'+this.props.foodId)
            .then(res => {                
                if (res.data.success) {
                    this.setState({food: res.data.food})
                    
                }
            })
            .catch(err => console.log(err))
    }
    render() {        
        return (
            <React.Fragment>
                {this.state.food ? 
                    (                        
                        <React.Fragment>
                            <h2>{this.state.food.name}</h2>
                            <h6>- {this.state.food.cusine.name} ({this.state.food.category.veg ? 'pure veg' : 'pure non-veg'} {this.getFoodSpecialCategory()})</h6>
                            <hr/>
                            <h6>Ingredients:</h6>
                            <ol>
                            {this.state.food.ingredients.map((i, key) => 
                                (
                                        <li key={key}>{i.ing.name} <i>{i.quantity} {i.unit}</i></li>
                                    
                                )    
                            )}
                            </ol>
                            {this.state.food.servings ? (<b>Servings: {this.state.food.servings}</b>) : (null)}
                            <h5>Steps: </h5>
                            <ol>
                                {this.state.food.recipe.step ? 
                                    (
                                        <React.Fragment>
                                            {this.state.food.recipe.step.map((s, key1) => 
                                                (
                                                    <li key={key1}> {s.description}</li>
                                                )
                                            )}
                                        </React.Fragment>
                                    ):(null)
                                }
                            </ol>
                            <Button onClick={this.props.closeFoodPage} >back</Button>
                        </React.Fragment>
                    ) 
                    : 
                    (null)
                }
            </React.Fragment>
        );
    }

    getFoodSpecialCategory() {
        return <span>{this.state.food.category.special.Jain ? ('| Jain') : (this.state.food.category.special.swaminarayan ? ('| Swaminarayan') : (this.state.food.category.special.faradi ? ('| Faradi') : (null)))}</span>;
    }
}
 
export default GetMyRecipe;