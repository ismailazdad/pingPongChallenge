import '../../style/App.css';
import '../../style/Layout.css';
import Banner from '../../components/Banner/Banner'
import Footer from "../../components/Footer/Footer";
import logo from '../../assets/logo.png'
import MyForm from "../../components/MyForm/MyForm";


function Home() {
    return (
        <div>
            <Banner>
                <img src={logo} alt='ping pong challenge' className='lmj-logo'/>
                <h1 className='lmj-title'>Ping Pong Pixel</h1>
            </Banner>
            <MyForm/>
            <Footer/>
        </div>
    )
}

export default Home;
