// import Footer from "../components/Footer";
import Header from "../components/Header";

export default function BasicLayout({ children }) {
    return (
      <>
        <Header/>
        {/* style={{height:'85vh'}} */}
        <main>
          {children}
        </main>
        {/* <Footer/> */}
      </>
    );
}