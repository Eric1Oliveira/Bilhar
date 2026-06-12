import Link from "next/link";

export const metadata = {
  title: "Termos de Uso — Sinuca Ideal",
};

const SECTIONS = [
  {
    title: "1. Aceitação dos Termos",
    content: `Ao acessar e utilizar o site da Sinuca Ideal (sinucaideal.com.br), você concorda integralmente com estes Termos de Uso. Caso não concorde com alguma disposição, solicitamos que não utilize nossos serviços. Nos reservamos o direito de alterar estes termos a qualquer momento, sendo que as alterações entrarão em vigor após a publicação no site.`,
  },
  {
    title: "2. Produtos e Serviços",
    content: `A Sinuca Ideal oferece mesas de bilhar, snooker e acessórios para compra e aluguel. Todas as descrições de produtos, imagens e especificações técnicas são fornecidas para fins informativos e estamos comprometidos com sua precisão. Pequenas variações de cor e acabamento podem ocorrer em função do processo artesanal de fabricação.`,
  },
  {
    title: "3. Configurador 3D e Visualização AR",
    content: `O configurador 3D e a ferramenta de Realidade Aumentada são disponibilizados como recursos de apoio à decisão de compra. As imagens geradas são aproximações visuais e podem não representar fielmente as condições de iluminação e escala reais do ambiente do cliente. A Sinuca Ideal não se responsabiliza por decisões baseadas exclusivamente nas previsualizações digitais.`,
  },
  {
    title: "4. Processo de Compra",
    content: `Ao finalizar um pedido, o cliente declara que as informações fornecidas são verdadeiras e que está de acordo com o preço, condições de pagamento e prazo de entrega exibidos. O contrato de compra e venda considera-se celebrado após a confirmação do pagamento. Para pagamentos via PIX e boleto, o pedido será confirmado após a identificação do crédito em nossa conta.`,
  },
  {
    title: "5. Preços e Pagamentos",
    content: `Todos os preços exibidos no site estão em Reais (BRL) e incluem os impostos aplicáveis, exceto o frete, que é calculado separadamente no checkout. Aceitamos PIX (5% de desconto), cartão de crédito em até 12x sem juros e boleto bancário (3% de desconto). A Sinuca Ideal se reserva o direito de cancelar pedidos em caso de erro manifesto de preço.`,
  },
  {
    title: "6. Entrega e Montagem",
    content: `Os prazos de entrega são estimativas baseadas na região de destino e disponibilidade em estoque. Mesas profissionais exigem equipe especializada para montagem, que será agendada com o cliente após a confirmação do pedido. O cliente é responsável por garantir acesso adequado ao local de instalação e por comunicar qualquer restrição de acesso com antecedência.`,
  },
  {
    title: "7. Garantia e Devolução",
    content: `As garantias variam por linha de produto (2 a 7 anos para estrutura). O cliente tem direito à troca ou devolução em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor (Lei 8.078/1990), desde que o produto esteja sem sinais de uso. Defeitos de fabricação são cobertos pela garantia do produto, com atendimento em domicílio.`,
  },
  {
    title: "8. Aluguel de Mesas",
    content: `Os contratos de aluguel são regidos por instrumento contratual específico assinado digitalmente pelo cliente. O cliente é responsável pela conservação do produto durante o período de locação e pelo pagamento das mensalidades nas datas acordadas. Atrasos de pagamento estão sujeitos a juros de 1% ao mês e multa de 2%.`,
  },
  {
    title: "9. Propriedade Intelectual",
    content: `Todo o conteúdo do site — textos, imagens, logotipos, modelos 3D, layouts e marcas — é de propriedade exclusiva da Sinuca Ideal e protegido pela legislação de propriedade intelectual. É vedada a reprodução, distribuição ou uso comercial de qualquer conteúdo sem autorização prévia e expressa.`,
  },
  {
    title: "10. Limitação de Responsabilidade",
    content: `A Sinuca Ideal não se responsabiliza por danos indiretos, lucros cessantes ou danos morais decorrentes do uso ou da impossibilidade de uso dos produtos ou serviços, exceto nos casos previstos em lei. Nossa responsabilidade está limitada ao valor pago pelo cliente no pedido específico.`,
  },
  {
    title: "11. Lei Aplicável e Foro",
    content: `Estes Termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa decorrente destes Termos será submetida ao foro da comarca de São Paulo, SP, com exclusão de qualquer outro, por mais privilegiado que seja.`,
  },
];

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      <div className="bg-bilhar-dark-2/50 border-b border-bilhar-green/20 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">
            Termos de <span className="gradient-emerald">Uso</span>
          </h1>
          <p className="text-gray-400 text-sm">Última atualização: janeiro de 2025</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-8 space-y-8">
          <p className="text-gray-400 text-sm leading-relaxed">
            Bem-vindo à Sinuca Ideal. Leia atentamente estes Termos de Uso antes de utilizar nossos serviços. Eles estabelecem as condições que regem o uso do site, as compras, aluguéis e demais interações com nossa empresa.
          </p>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-semibold text-white text-base mb-3" style={{ borderBottom: "1px solid rgba(47,212,138,0.12)", paddingBottom: "8px" }}>
                {section.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}

          <div className="pt-4" style={{ borderTop: "1px solid rgba(47,212,138,0.12)" }}>
            <p className="text-gray-500 text-sm">
              Em caso de dúvidas sobre estes Termos, entre em contato:{" "}
              <a href="mailto:juridico@sinucaideal.com.br" className="text-bilhar-green-bright hover:text-white transition-colors">
                juridico@sinucaideal.com.br
              </a>
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/privacidade" className="text-sm text-bilhar-green-bright hover:text-white transition-colors">
                Política de Privacidade →
              </Link>
              <Link href="/ajuda" className="text-sm text-bilhar-green-bright hover:text-white transition-colors">
                Central de Ajuda →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
