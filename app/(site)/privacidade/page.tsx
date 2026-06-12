import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade — Sinuca Ideal",
};

const SECTIONS = [
  {
    title: "1. Informações que Coletamos",
    content: `Coletamos informações que você nos fornece diretamente ao criar uma conta, fazer um pedido ou entrar em contato conosco. Isso inclui: nome completo, e-mail, CPF, telefone, endereço de entrega e dados de pagamento (tokenizados — nunca armazenamos números de cartão). Também coletamos automaticamente dados de navegação como endereço IP, tipo de dispositivo, páginas visitadas e tempo de sessão, por meio de cookies e tecnologias similares.`,
  },
  {
    title: "2. Como Usamos Suas Informações",
    content: `Utilizamos os dados coletados para: processar pedidos e pagamentos; entregar e montar produtos; enviar atualizações sobre pedidos por e-mail e WhatsApp; melhorar nosso site e configurador 3D; personalizar sua experiência; enviar ofertas e novidades (apenas com seu consentimento); e cumprir obrigações legais e regulatórias.`,
  },
  {
    title: "3. Compartilhamento de Dados",
    content: `Não vendemos seus dados pessoais a terceiros. Podemos compartilhar informações com: parceiros de logística para viabilizar a entrega; processadores de pagamento (Mercado Pago, operadoras de cartão); serviços de nuvem que hospedam nossa plataforma; e autoridades governamentais quando exigido por lei. Todos os parceiros estão sujeitos a acordos de confidencialidade.`,
  },
  {
    title: "4. Cookies e Rastreamento",
    content: `Utilizamos cookies essenciais (necessários para o funcionamento do site), cookies de análise (para entender como você usa o site, via ferramentas anônimas) e cookies de preferência (para lembrar suas escolhas no configurador). Você pode gerenciar as preferências de cookies nas configurações do seu navegador. Desativar cookies essenciais pode comprometer o funcionamento do site.`,
  },
  {
    title: "5. Retenção de Dados",
    content: `Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas nesta política e obrigações legais. Dados de compra são retidos por 5 anos conforme legislação fiscal. Dados de conta são retidos enquanto a conta estiver ativa e por 2 anos após o encerramento. Você pode solicitar a exclusão de seus dados a qualquer momento, respeitadas as obrigações legais.`,
  },
  {
    title: "6. Segurança dos Dados",
    content: `Adotamos medidas técnicas e organizacionais para proteger seus dados, incluindo: criptografia TLS em todas as transmissões, armazenamento em servidores certificados, controle de acesso interno restrito, e monitoramento contínuo contra acesso não autorizado. Em caso de incidente de segurança que afete seus dados, notificaremos a ANPD e os titulares afetados conforme determina a LGPD.`,
  },
  {
    title: "7. Seus Direitos (LGPD)",
    content: `Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a: confirmar a existência de tratamento de seus dados; acessar seus dados; corrigir dados incompletos ou incorretos; solicitar a anonimização, bloqueio ou eliminação de dados desnecessários; solicitar a portabilidade dos dados; revogar o consentimento a qualquer momento; e opor-se ao tratamento. Para exercer qualquer direito, envie e-mail para privacidade@sinucaideal.com.br.`,
  },
  {
    title: "8. Menores de Idade",
    content: `Nossos serviços são destinados a pessoas com 18 anos ou mais. Não coletamos intencionalmente dados de menores de 18 anos. Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluir essas informações o mais rapidamente possível.`,
  },
  {
    title: "9. Links para Terceiros",
    content: `Nosso site pode conter links para sites externos como Instagram, YouTube e WhatsApp. Esta Política de Privacidade aplica-se exclusivamente ao nosso site. Não temos controle sobre as práticas de privacidade de sites de terceiros e recomendamos que você leia as políticas individuais de cada serviço.`,
  },
  {
    title: "10. Alterações nesta Política",
    content: `Esta Política pode ser atualizada periodicamente. Notificaremos mudanças significativas por e-mail ou por aviso em destaque no site. A data da última atualização está sempre indicada no topo desta página. Ao continuar usando nossos serviços após as alterações, você aceita a nova versão.`,
  },
  {
    title: "11. Contato e DPO",
    content: `Para questões sobre privacidade, tratamento de dados ou para exercer seus direitos, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo e-mail privacidade@sinucaideal.com.br ou pelo telefone (11) 99999-0000. Respondemos em até 15 dias úteis.`,
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">
      <div className="bg-bilhar-dark-2/50 border-b border-bilhar-green/20 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-bold text-3xl text-white mb-2">
            Política de <span className="gradient-emerald">Privacidade</span>
          </h1>
          <p className="text-gray-400 text-sm">Última atualização: janeiro de 2025 — Em conformidade com a LGPD (Lei 13.709/2018)</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-card p-8 space-y-8">
          <p className="text-gray-400 text-sm leading-relaxed">
            A Sinuca Ideal está comprometida com a proteção dos seus dados pessoais. Esta Política descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
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
              DPO — Encarregado de Proteção de Dados:{" "}
              <a href="mailto:privacidade@sinucaideal.com.br" className="text-bilhar-green-bright hover:text-white transition-colors">
                privacidade@sinucaideal.com.br
              </a>
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="/termos" className="text-sm text-bilhar-green-bright hover:text-white transition-colors">
                Termos de Uso →
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
