import './App.css';
import EcommercePage from './component/Ecommerce/EcommercePage';
import FolderStrructure from './component/FolderStructure/FolderStrructure';
import File from './component/RenderList';
import StepperParent from './component/StepperForm/StepperParent';
import StepperParentNew from './component/StepperFormWithoutLib/StepperForm/StepperParentNew';
// import Question from './component/Question';
// import InfiniteScroll from './component/InfiniteScroll';


function App() {
  return (
    <div className="App">
    {/* <InfiniteScroll /> */}
    {/* <Question /> */}
    {/* <FolderStrructure /> */}
    {/* <File /> */}
    {/* <StepperParent/> */}
    {/* <StepperParentNew/> */}

    <EcommercePage />
    </div>
  );
}

export default App;
