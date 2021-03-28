import './styles/style.scss'
import'./styles/responsive.scss'
import{ performAction} from './js/app'
import{handleSubmit} from './js/handleSubmit'
/*our index.js file inside the client folder should import the main function of your application javascript, it should import your scss, and it should export your main function from your application javascript.*/


export{
    performAction,
    handleSubmit
}