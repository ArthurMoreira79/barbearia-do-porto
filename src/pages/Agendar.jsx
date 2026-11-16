import { useSearchParams } from 'react-router-dom';
import BookingFlow from '../booking/BookingFlow.jsx';
import services from '../data/services.json';
import barbers from '../data/barbers.json';
import drinks from '../data/drinks.json';

export default function Agendar() {
  const [params] = useSearchParams();

  const servicoParam = params.get('servico');
  const barbeiroParam = params.get('barbeiro');

  const inicial = {
    servicosIds: services.some((s) => s.id === servicoParam) ? [servicoParam] : [],
    barbeiroId: barbers.some((b) => b.id === barbeiroParam) ? barbeiroParam : null,
  };

  return (
    <div className="pagina">
      <div className="container">
        <h1 className="pagina-titulo">Agendar horário</h1>
        <BookingFlow
          servicos={services}
          barbeiros={barbers}
          bebidas={drinks}
          inicial={inicial}
        />
      </div>
    </div>
  );
}
