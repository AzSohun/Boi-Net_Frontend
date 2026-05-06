import AboutCommunity from "../Components/About/AboutCommunity";
import AboutHero from "../Components/About/AboutHero";
import AboutPhilosophy from "../Components/About/AboutPhilosophy";
import AboutValues from "../Components/About/AboutValues";


export default function About() {
    return (
        <div className="pt-20">
            <AboutHero />
            <AboutPhilosophy />
            <AboutValues />
            <AboutCommunity />
        </div>
    );
}
