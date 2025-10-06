import About from "../components/home/About"
import BlogSection from "../components/home/BlogSection"
import Experiences from "../components/home/Experiences"
import Hero from "../components/home/Hero"
import Newsletter from "../components/home/NewsLetter"
import Rooms from "../components/home/Rooms"
import Voice from "../components/home/Voice"
import WhyToroland from "../components/home/WhyToroland"
import Footer from "../components/layouts/Footer"
import Navbar from "../components/layouts/Navbar"

function Home() {
    return(
        <div>
            <Navbar />
            <Hero />
            <About />
            <WhyToroland />
            <Rooms />
            <Experiences />
            <BlogSection />
            <Voice />
            <Newsletter />
            <Footer />
        </div>
    )
}

export default Home