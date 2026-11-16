export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src="/img/logo.jpg" alt="" loading="lazy" />
        <p>
          Rua do Trapiche, 120 — Praia Grande, Centro Histórico, São Luís – MA
          <br />
          Terça a sábado, das 10h às 21h · Domingo e segunda fechado
        </p>
        <p>Venda de bebidas alcoólicas proibida para menores de 18 anos.</p>
        <p className="aviso">
          Projeto demonstrativo — empresa fictícia. Desenvolvido por{' '}
          <a
            href="https://github.com/ArthurMoreira79"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arthur Moreira
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
