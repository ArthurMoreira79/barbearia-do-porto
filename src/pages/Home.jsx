import Hero from '../sections/Hero.jsx';
import Servicos from '../sections/Servicos.jsx';
import OBar from '../sections/OBar.jsx';
import Barbeiros from '../sections/Barbeiros.jsx';
import Clube from '../sections/Clube.jsx';
import Galeria from '../sections/Galeria.jsx';
import Depoimentos from '../sections/Depoimentos.jsx';
import Contato from '../sections/Contato.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Servicos />
      <OBar />
      <Barbeiros />
      <Clube />
      <Galeria />
      <Depoimentos />
      <Contato />
    </>
  );
}
