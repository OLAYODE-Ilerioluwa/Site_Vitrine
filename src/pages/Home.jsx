import { NavBar } from "../components/NavBar.jsx";
import {HeroSection} from "../components/HeroSection.jsx";
import {AboutMe} from "../components/AboutMe.jsx"
import { Skills } from "../components/Skills.jsx";
import { Projets } from "../components/Projets.jsx";
import { Contact } from "../components/Contact.jsx";
import { Footer} from "../components/Footer.jsx"
import { Parcours } from "../components/Parcours.jsx";
import { Entreprise } from "../components/Entreprise.jsx";


export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden w-full">
      {/*Theme toggle*/}

      {/*Navigation*/}
      <NavBar />
      {/*Main content*/}
      <main>
        <HeroSection/>
        <AboutMe/>
        <Parcours/>
        <Entreprise/>
        <Skills/>
        <Projets/>
        <Contact/>
      </main>
      {/*Footer*/}
      <Footer/>
    </div>
  );
};
