"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Search, Phone, Mail, MessageCircle } from "lucide-react";

const FAQ_CATEGORIES = [
  {
    id: "produtos",
    label: "Produtos & Modelos",
    questions: [
      {
        q: "Qual a diferença entre os modelos de 7, 8, 9, 10 e 12 palmos?",
        a: "A medida em palmos refere-se ao tamanho da área de jogo. 7 palmos (178cm) é ideal para apartamentos, 8 palmos (200cm) para residências com espaço moderado, 9 palmos (254cm) é o padrão americano profissional, 10 palmos (280cm) para campeonatos regionais, e 12 palmos (357cm) é o padrão internacional de snooker. Recomendamos deixar pelo menos 1,5m de espaço livre em todos os lados para o uso do taco.",
      },
      {
        q: "O que é ardósia e por que ela é importante?",
        a: "Ardósia é uma pedra natural com superfície extremamente lisa e nivelada, utilizada como base de jogo nas mesas profissionais. Ela garante uma superfície perfeitamente plana, essencial para um jogo preciso. Nossas mesas profissionais usam ardósia de 45mm em peças triplas, o padrão mais alto do mercado.",
      },
      {
        q: "Quais feltros estão disponíveis?",
        a: "Trabalhamos com feltros nacionais e importados. A linha profissional usa Simonis 860, o mais utilizado em campeonatos mundiais. Nas linhas lazer e compacta temos feltro nacional premium disponível em 6 cores: verde, carmim, azul, cinza, preto e vinho.",
      },
      {
        q: "As mesas vêm desmontadas ou montadas?",
        a: "As mesas são entregues desmontadas e nossa equipe especializada faz a montagem no local. Não é necessário ter ferramentas ou conhecimento técnico — nós cuidamos de tudo, incluindo o nivelamento profissional da ardósia.",
      },
    ],
  },
  {
    id: "configurador",
    label: "Configurador 3D",
    questions: [
      {
        q: "Preciso criar conta para usar o configurador?",
        a: "Não! Você pode configurar sua mesa sem criar conta. Para salvar a configuração e acessar em outro momento, é necessário criar uma conta gratuita. Sem conta, a configuração fica salva no seu navegador por 7 dias.",
      },
      {
        q: "O preço mostrado no configurador é o final?",
        a: "O preço mostrado é uma estimativa baseada nas suas escolhas de modelo, feltro, madeira, tipo de perna e acessórios. O frete não está incluído e será calculado no checkout após informar o CEP. Valores de opções adicionais como luminária e placar são somados automaticamente.",
      },
      {
        q: "Como funciona a visualização em Realidade Aumentada (AR)?",
        a: "Após configurar sua mesa, clique em 'Visualizar no seu espaço' para abrir a câmera do celular. O sistema sobrepõe um modelo 3D da mesa no ambiente real, permitindo ver as dimensões reais no seu espaço antes de comprar. Disponível em iOS (Safari) e Android (Chrome).",
      },
      {
        q: "Posso pedir uma configuração personalizada fora do configurador?",
        a: "Sim! Para configurações especiais, como medidas customizadas, madeiras exóticas ou detalhes únicos, entre em contato com nossa equipe pelo WhatsApp. Atendemos projetos sob medida com prazo e orçamento personalizados.",
      },
    ],
  },
  {
    id: "compra",
    label: "Compra & Pagamento",
    questions: [
      {
        q: "Quais formas de pagamento são aceitas?",
        a: "Aceitamos PIX (5% de desconto), cartão de crédito em até 12x sem juros, boleto bancário (3% de desconto, prazo de 3 dias úteis). Para aluguel, a cobrança é feita mensalmente no cartão de crédito ou via PIX.",
      },
      {
        q: "Como funciona a garantia?",
        a: "Mesas da linha profissional e championship têm garantia de 5 a 7 anos na estrutura. Linhas lazer e semi-pro têm garantia de 2 a 3 anos. O feltro tem garantia de 2 anos contra defeitos de fabricação (não inclui desgaste normal). Acessórios têm garantia de 1 ano.",
      },
      {
        q: "Posso cancelar ou trocar o produto?",
        a: "Aceitamos cancelamento em até 7 dias após a entrega, conforme o Código de Defesa do Consumidor, desde que o produto não tenha sido utilizado. Para trocas por defeito, a assistência é prestada em domicílio. Entre em contato pelo WhatsApp para iniciar o processo.",
      },
      {
        q: "Há frete grátis?",
        a: "Entregas na Grande São Paulo são isentas de frete. Para demais regiões, o frete é calculado por peso e distância. Peças com mais de 200kg têm logística especializada, inclusa no valor do frete. O frete inclui montagem profissional no local.",
      },
    ],
  },
  {
    id: "aluguel",
    label: "Aluguel de Mesas",
    questions: [
      {
        q: "Posso cancelar o contrato de aluguel antes do prazo?",
        a: "Sim. Para cancelamentos antecipados, aplicamos uma multa rescisória equivalente a 1 mensalidade para contratos de 6 meses, 2 mensalidades para 12 meses e 3 mensalidades para 24 meses. O cancelamento deve ser solicitado com 30 dias de antecedência.",
      },
      {
        q: "A manutenção está inclusa no aluguel?",
        a: "Sim! Todos os planos de aluguel incluem manutenção preventiva anual e suporte técnico em caso de problemas. A troca de feltro é inclusa uma vez por contrato (exceto plano de 6 meses). Peças de reposição são gratuitas durante a vigência do contrato.",
      },
      {
        q: "Posso comprar a mesa no final do contrato?",
        a: "Sim! Ao término do contrato você pode adquirir a mesa com desconto especial de 10 a 15% sobre o valor de tabela vigente. A opção de compra deve ser solicitada com 30 dias de antecedência do término.",
      },
      {
        q: "A mesa pode ser realocada para outro endereço durante o contrato?",
        a: "Sim, permitimos uma realocação por contrato mediante agendamento prévio. O custo de transporte e remontagem varia conforme a distância e será orçado caso a caso.",
      },
    ],
  },
  {
    id: "entrega",
    label: "Entrega & Montagem",
    questions: [
      {
        q: "Qual o prazo de entrega?",
        a: "Para mesas em estoque, o prazo é de 7 a 21 dias úteis para todo o Brasil. Mesas personalizadas (cores ou modelos sob encomenda) podem levar de 21 a 45 dias úteis. Você recebe atualizações por WhatsApp e e-mail durante todo o processo.",
      },
      {
        q: "Como é feita a montagem?",
        a: "Nossa equipe chega com todas as ferramentas necessárias. A montagem inclui: nivelamento da ardósia com instrumentos de precisão, instalação do feltro, ajuste das bolsas e teste completo do jogo. O processo leva entre 2 e 4 horas dependendo do modelo.",
      },
      {
        q: "E se o produto chegar com dano de transporte?",
        a: "Nossa logística é especializada e embalamos as mesas com proteção reforçada. Em caso de qualquer dano, fotografe antes de assinar o recebimento e entre em contato imediatamente. Enviamos solução em até 48 horas.",
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "rgba(47,212,138,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-white font-medium text-sm leading-relaxed">{q}</span>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200" style={{ color: "#2FD48A" }}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AjudaPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("produtos");

  const activeData = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;
  const filteredQuestions = search
    ? FAQ_CATEGORIES.flatMap((c) => c.questions).filter(
        (q) =>
          q.q.toLowerCase().includes(search.toLowerCase()) ||
          q.a.toLowerCase().includes(search.toLowerCase())
      )
    : activeData.questions;

  return (
    <div className="min-h-screen bg-bilhar-dark pt-20">

      {/* Header */}
      <div className="bg-bilhar-dark-2/50 border-b border-bilhar-green/20 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl text-white mb-3">
            Central de <span className="gradient-emerald">Ajuda</span>
          </h1>
          <p className="text-gray-400 mb-8">Encontre respostas rápidas para as dúvidas mais comuns</p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar em todas as perguntas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-bilhar-dark border border-bilhar-green/20 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-500 focus:border-bilhar-green/50 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {search ? (
          <div>
            <p className="text-gray-400 text-sm mb-6">{filteredQuestions.length} resultado(s) para &ldquo;{search}&rdquo;</p>
            <div className="glass-card p-2">
              {filteredQuestions.length > 0 ? (
                <div className="px-4">
                  {filteredQuestions.map((item, i) => (
                    <FAQItem key={i} q={item.q} a={item.a} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">Nenhuma pergunta encontrada para essa busca.</p>
                  <button onClick={() => setSearch("")} className="mt-3 text-sm transition-colors" style={{ color: "#2FD48A" }}>
                    Limpar busca
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category sidebar */}
            <div className="lg:w-56 flex-shrink-0">
              <div className="glass-card p-2 space-y-1 lg:sticky lg:top-24">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-bilhar-green/20 text-bilhar-green-bright"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions */}
            <div className="flex-1">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card px-6 py-2"
              >
                {activeData.questions.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </motion.div>
            </div>
          </div>
        )}

        {/* Contact section */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4">
          <h2 className="sm:col-span-3 font-display font-bold text-2xl text-white mb-2">
            Não encontrou o que <span className="gradient-emerald">precisava?</span>
          </h2>
          {[
            { Icon: Phone, label: "WhatsApp", desc: "(11) 99999-0000", sub: "Atendimento imediato", href: "https://wa.me/5511999990000" },
            { Icon: Mail, label: "E-mail", desc: "contato@sinucaideal.com.br", sub: "Resposta em até 4h", href: "mailto:contato@sinucaideal.com.br" },
            { Icon: MessageCircle, label: "Chat Online", desc: "Segunda a Sexta", sub: "9h às 18h", href: "#" },
          ].map(({ Icon, label, desc, sub, href }) => (
            <a
              key={label}
              href={href}
              className="glass-card p-5 flex items-start gap-4 card-hover group"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(47,212,138,0.08)", border: "1px solid rgba(47,212,138,0.2)" }}>
                <Icon style={{ width: 20, height: 20, color: "#2FD48A" }} />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{label}</p>
                <p className="text-sm" style={{ color: "#2FD48A" }}>{desc}</p>
                <p className="text-gray-500 text-xs mt-0.5">{sub}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
