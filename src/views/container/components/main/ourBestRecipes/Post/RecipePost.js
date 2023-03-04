import './PostRecipe.css';
import './ResponsiveCardRecipe.css';
import { Button } from '@mui/material';

export const RecipePost = (props) => {
    return (
        <div className="postWrapper">
            <div className="leftInfo">
                <img src={props.src} alt={props.alt} />
            </div>
            <div className="rigthInfo">
                <h2>{props.title}</h2>
                <Button variant="contained" type="submit">
                    Book
                </Button>
                {/* <button>See Recipe</button> */}
            </div>
        </div>
    );
};
