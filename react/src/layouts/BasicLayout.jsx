// import Footer from "../components/Footer";
import Header from "../components/Header";

export default function BasicLayout({ children }) {
    return (
      <>
        <Header/>
        <main style={{height: '85vh'}}>{children}</main>
        {/* <Footer/> */}
      </>
    );
}