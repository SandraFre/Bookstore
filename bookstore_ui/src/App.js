import Header from "./components/header/Header";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
            <BrowserRouter>
                <div className="container">
                    <Header/>
                </div>
            </BrowserRouter>
    );
}

export default App;
