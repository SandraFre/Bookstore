import Header from "./components/header/Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Content from "./components/content/Content";

function App() {
    return (
            <BrowserRouter>
                <div className="container">
                    <Header/>
                    <Content/>
                    <Footer/>
                </div>
            </BrowserRouter>
    );
}

export default App;
