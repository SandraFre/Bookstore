import Header from "./components/header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/footer/Footer";

function App() {
    return (
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Footer/>
                </div>
            </BrowserRouter>
    );
}

export default App;
