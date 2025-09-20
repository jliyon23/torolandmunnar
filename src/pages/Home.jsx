import About from "../components/home/About"
import Experiences from "../components/home/Experiences"
import Hero from "../components/home/Hero"
import Rooms from "../components/home/Rooms"
import Voice from "../components/home/Voice"
import WhyToroland from "../components/home/WhyToroland"
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
            <Voice />
        </div>
    )
}

export default Home