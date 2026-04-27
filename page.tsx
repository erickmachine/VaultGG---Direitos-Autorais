"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  UserCheck,
  AlertTriangle,
  Search,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  RefreshCw,
  Star,
  Headphones,
  BookOpen,
  Gavel,
} from "lucide-react"

// ─── Dados das categorias ─────────────────────────────────────────────────────
const categories = [
  {
    id: "compras",
    icon: ShoppingCart,
    color: "text-primary",
    bg: "bg-primary/10",
    title: "Compras",
    description: "Como comprar, proteção e garantias",
    count: 8,
  },
  {
    id: "vendas",
    icon: CreditCard,
    color: "text-green-500",
    bg: "bg-green-500/10",
    title: "Vendas",
    description: "Como anunciar, receber pagamentos",
    count: 6,
  },
  {
    id: "escrow",
    icon: Lock,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    title: "Sistema Escrow",
    description: "Proteção de pagamentos passo a passo",
    count: 5,
  },
  {
    id: "conta",
    icon: UserCheck,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    title: "Minha Conta",
    description: "Perfil, verificação e configurações",
    count: 7,
  },
  {
    id: "disputas",
    icon: Gavel,
    color: "text-red-500",
    bg: "bg-red-500/10",
    title: "Disputas",
    description: "Como abrir e resolver disputas",
    count: 4,
  },
  {
    id: "reembolso",
    icon: RefreshCw,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    title: "Reembolsos",
    description: "Política e processo de reembolso",
    count: 4,
  },
]

// ─── FAQs ─────────────────────────────────────────────────────────────────────
const faqs = [
  // Compras
  {
    category: "compras",
    q: "Como funciona o processo de compra na VaultGG?",
    a: "Ao comprar uma conta, você realiza o pagamento que fica retido em nosso sistema de escrow. O vendedor entrega os dados da conta dentro do prazo combinado. Você verifica se tudo está correto e confirma o recebimento. So entao o pagamento e liberado ao vendedor. Se houver qualquer problema, você pode abrir uma disputa.",
  },
  {
    category: "compras",
    q: "Meu pagamento e seguro?",
    a: "Sim. Todo pagamento e processado via Stripe com criptografia de ponta a ponta. O valor fica retido em escrow e só e liberado ao vendedor após você confirmar o recebimento da conta. Jamais enviamos seu dinheiro diretamente sem sua confirmação.",
  },
  {
    category: "compras",
    q: "Quanto tempo o vendedor tem para entregar?",
    a: "O prazo padrao de entrega e de 24 horas após a confirmação do pagamento. Caso o vendedor não entregue dentro do prazo, o pedido e automaticamente cancelado e você recebe reembolso integral.",
  },
  {
    category: "compras",
    q: "Posso cancelar uma compra?",
    a: "Voce pode solicitar cancelamento antes do vendedor marcar como entregue. Apos a entrega, você tem 24 horas para verificar a conta e confirmar ou abrir uma disputa. Nunca confirme o recebimento sem verificar os dados.",
  },
  {
    category: "compras",
    q: "O que fazer se a conta não e como descrito?",
    a: "Abra uma disputa dentro de 24 horas após receber os dados. Nossa equipe analisara as evidencias (prints, videos) e tomara uma decisao imparcial. Se o vendedor tiver descrito incorretamente, você recebera reembolso integral.",
  },
  {
    category: "compras",
    q: "Quais formas de pagamento sao aceitas?",
    a: "Aceitamos cartao de crédito, débito e Pix. Todos os pagamentos passam pelo Stripe, garantindo total segurança dos seus dados financeiros.",
  },
  {
    category: "compras",
    q: "Ha alguma taxa para o comprador?",
    a: "Nao. O comprador não paga nenhuma taxa adicional. O valor exibido no anúncio e exatamente o que você pagara.",
  },
  {
    category: "compras",
    q: "Como acompanho minha compra?",
    a: "Acesse Dashboard > Compras para ver o status em tempo real de todas as suas transações. Você também recebe notificações por email em cada etapa.",
  },
  // Vendas
  {
    category: "vendas",
    q: "Como criar um anúncio?",
    a: 'Acesse Dashboard > Anúncios > Novo Anúncio. Preencha todas as informações: jogo, título, descrição detalhada, rank, imagens e preço. Quanto mais detalhes você fornecer, maior a chance de vender rapido.',
  },
  {
    category: "vendas",
    q: "Qual a comissão cobrada sobre as vendas?",
    a: "A VaultGG cobra uma comissão de 10% sobre o valor da venda. Essa taxa cobre a proteção do escrow, suporte ao comprador e os custos de processamento de pagamento.",
  },
  {
    category: "vendas",
    q: "Quando recebo meu pagamento?",
    a: "Apos o comprador confirmar o recebimento da conta, o saldo e creditado na sua carteira VaultGG imediatamente. Você pode solicitar saque para sua conta bancaria, que e processado em até 2 dias úteis.",
  },
  {
    category: "vendas",
    q: "Preciso ser verificado para vender?",
    a: "Vendedores não verificados podem criar até 3 anúncios. Para desbloquear anúncios ilimitados e o selo de vendedor verificado, envie seus documentos em Dashboard > Configurações > Verificação.",
  },
  {
    category: "vendas",
    q: "Meu anúncio foi recusado, o que fazer?",
    a: "Anúncios sao recusados quando violam os termos de uso, contem informações falsas ou imagens inadequadas. Você recebe um email com o motivo. Corrija o problema e reenvie o anúncio.",
  },
  {
    category: "vendas",
    q: "Posso editar um anúncio após publicar?",
    a: "Sim, você pode editar descrição, imagens e preço enquanto o anúncio estiver ativo e sem compras em andamento. Anúncios com transações ativas não podem ser alterados.",
  },
  // Escrow
  {
    category: "escrow",
    q: "O que e o sistema Escrow da VaultGG?",
    a: "Escrow e um serviço de custodia onde retemos o pagamento do comprador até que a transação seja concluida com sucesso. Isso protege o comprador de não receber a conta e protege o vendedor de ter seu produto tomado sem pagamento.",
  },
  {
    category: "escrow",
    q: "Quando o dinheiro e liberado ao vendedor?",
    a: "O dinheiro e liberado automaticamente quando: (1) o comprador confirma o recebimento, ou (2) o prazo de 24 horas para contestação expira sem abertura de disputa. Em disputas, o dinheiro e liberado após a decisao da nossa equipe.",
  },
  {
    category: "escrow",
    q: "E possivel o vendedor receber sem o comprador confirmar?",
    a: "Sim, se o comprador não confirmar nem abrir disputa dentro de 24 horas após a entrega, o sistema libera o pagamento automaticamente. Isso evita que vendedores honestos fiquem com o pagamento retido indefinidamente.",
  },
  {
    category: "escrow",
    q: "O escrow protege o vendedor também?",
    a: "Sim. O pagamento já está confirmado antes de você entregar os dados. Você não corre risco de entregar a conta e não receber. O comprador pagou e o dinheiro está custodiado aguardando apenas a confirmação de entrega.",
  },
  {
    category: "escrow",
    q: "O que acontece em caso de disputa no escrow?",
    a: "O dinheiro permanece congelado até nossa equipe analisar as evidencias de ambas as partes. Tomamos uma decisao imparcial baseada nos fatos apresentados e liberamos o valor para o lado que tiver razao.",
  },
  // Conta
  {
    category: "conta",
    q: "Como verificar minha conta?",
    a: "Acesse Dashboard > Configurações > Verificação. Envie uma foto do seu documento (RG, CNH ou passaporte) e um selfie segurando o documento. A verificação e concluida em até 48 horas.",
  },
  {
    category: "conta",
    q: "Por que minha conta foi suspensa?",
    a: "Contas sao suspensas por violação dos Termos de Uso, como tentativas de fraude, informações falsas em anúncios ou comportamento abusivo. Você recebe um email com o motivo. Para contestar, abra um chamado em Suporte.",
  },
  {
    category: "conta",
    q: "Como alterar minha senha?",
    a: "Acesse Dashboard > Configurações > Segurança e clique em Alterar Senha. Você precisara informar a senha atual e a nova senha. Se esqueceu a senha, use a opcao Esqueci minha senha na tela de login.",
  },
  {
    category: "conta",
    q: "Posso ter mais de uma conta?",
    a: "Nao. Cada pessoa pode ter apenas uma conta na VaultGG. Contas multiplas sao detectadas automaticamente e todas podem ser suspensas. Se tiver problemas para acessar sua conta, use a recuperação de senha.",
  },
  {
    category: "conta",
    q: "Como funciona o sistema de reputação?",
    a: "Sua reputação e calculada com base nas avaliações recebidas de compradores e vendedores. A nota vai de 0 a 5 estrelas. Vendedores com alta reputação aparecem em destaque no marketplace e geram mais confianca.",
  },
  {
    category: "conta",
    q: "Como excluir minha conta?",
    a: "Para excluir sua conta, acesse Dashboard > Configurações > Segurança > Excluir Conta. Atencao: essa ação e irreversivel e exclui todos seus dados, anúncios e histórico. Saldos pendentes devem ser sacados antes da exclusão.",
  },
  {
    category: "conta",
    q: "Posso trocar meu nome de usuário?",
    a: "Sim, você pode trocar o nome de usuário uma vez a cada 30 dias em Dashboard > Configurações > Perfil. O @ de usuário antigo e liberado após 7 dias.",
  },
  // Disputas
  {
    category: "disputas",
    q: "Como abrir uma disputa?",
    a: "Acesse Dashboard > Compras, selecione a transação em questão e clique em Abrir Disputa. Descreva o problema com detalhes e anexe evidencias (prints, videos). Você tem até 24 horas após a entrega para abrir a disputa.",
  },
  {
    category: "disputas",
    q: "Quanto tempo demora para resolver uma disputa?",
    a: "Nossa equipe analisa disputas em até 48 horas. Em casos complexos, podemos solicitar informações adicionais, o que pode estender o prazo para até 5 dias úteis.",
  },
  {
    category: "disputas",
    q: "Quais evidencias devo fornecer?",
    a: "Quanto mais evidencias melhor: prints mostrando o estado da conta, videos de gameplay, comprovante de que a conta não e como descrita. Evidencias claras aceleram a resolução.",
  },
  {
    category: "disputas",
    q: "Posso apelar de uma decisao de disputa?",
    a: "Se discordar da decisao, você pode abrir um recurso em até 48 horas pela plataforma. O recurso e analisado por um membro senior da equipe diferente do que decidiu originalmente.",
  },
  // Reembolso
  {
    category: "reembolso",
    q: "Quando tenho direito a reembolso?",
    a: "Voce tem direito a reembolso quando: a conta não e entregue no prazo, a conta não corresponde ao descrito, a conta já estava banida na entrega, ou o vendedor não responde a disputa.",
  },
  {
    category: "reembolso",
    q: "Como funciona o processo de reembolso?",
    a: "Apos a decisao de disputa em seu favor, o reembolso e processado em até 5 dias úteis para o metodo de pagamento original. Pagamentos via Pix sao reembolsados para a chave Pix informada.",
  },
  {
    category: "reembolso",
    q: "Posso receber reembolso se eu mesmo confirmar o recebimento?",
    a: "Nao. Ao confirmar o recebimento, você atesta que a conta está conforme o anúncio e o pagamento e liberado ao vendedor. Por isso, nunca confirme antes de verificar completamente a conta recebida.",
  },
  {
    category: "reembolso",
    q: "Qual a política de reembolso completa?",
    a: 'Leia nossa Política de Reembolso completa em /reembolso. Ela cobre todos os cenarios, prazos e procedimentos detalhadamente.',
  },
]

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AjudaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch =
      !searchQuery ||
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !activeCategory || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-card/40 border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-4xl px-4 py-14 md:py-20 text-center">
            <Badge variant="secondary" className="mb-5">
              <BookOpen className="mr-1.5 h-3 w-3" />
              Central de Ajuda
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Como podemos ajudar voce?
            </h1>
            <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Encontre respostas rápidas sobre compras, vendas, pagamentos e segurança na VaultGG.
            </p>

            {/* Search */}
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar na central de ajuda..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setActiveCategory(null) }}
                className="pl-10 h-12 rounded-xl bg-background border-border/60 text-sm"
              />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14 lg:px-8 space-y-12">

          {/* Categories */}
          {!searchQuery && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-5">Navegar por categoria</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                {categories.map(cat => {
                  const Icon = cat.icon
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(isActive ? null : cat.id)}
                      className={[
                        "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                        isActive
                          ? "border-primary/60 bg-primary/5"
                          : "border-border/50 bg-card/60 hover:border-border hover:bg-card",
                      ].join(" ")}
                    >
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${cat.bg}`}>
                        <Icon className={`h-4 w-4 ${cat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{cat.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{cat.description}</p>
                        <p className="text-xs text-primary mt-1">{cat.count} artigos</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {/* FAQ list */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">
                {activeCategory
                  ? categories.find(c => c.id === activeCategory)?.title
                  : searchQuery
                  ? `Resultados para "${searchQuery}"`
                  : "Perguntas frequentes"}
              </h2>
              {(activeCategory || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory(null); setSearchQuery("") }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Limpar filtro
                </button>
              )}
            </div>

            {filteredFaqs.length === 0 ? (
              <div className="rounded-xl border border-border/40 bg-card/40 py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium text-foreground">Nenhum resultado encontrado</p>
                <p className="text-xs text-muted-foreground mt-1">Tente outros termos ou abra um chamado de suporte.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFaqs.map((faq, i) => {
                  const isOpen = openFaq === i
                  const cat = categories.find(c => c.id === faq.category)
                  return (
                    <div
                      key={i}
                      className="rounded-xl border border-border/40 bg-card/60 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left hover:bg-muted/30 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {cat && !activeCategory && (
                            <div className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-md ${cat.bg}`}>
                              <cat.icon className={`h-3 w-3 ${cat.color}`} />
                            </div>
                          )}
                          <span className="text-sm font-medium text-foreground">{faq.q}</span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-border/30 pt-3">
                          <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>

          {/* Contact support */}
          <section className="rounded-2xl border border-border/40 bg-gradient-to-br from-primary/5 via-card to-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    Não encontrou o que precisava?
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Nossa equipe de suporte está disponível 24/7 para ajudar com qualquer problema.
                    Tempo medio de resposta: menos de 2 horas.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="https://discord.gg/ebUk6VenN"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="mr-2 h-4 w-4 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.08.114 18.1.134 18.11a19.904 19.904 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/mensagens">
                    Abrir chamado
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick links */}
            <div className="mt-6 flex flex-wrap gap-3 border-t border-border/30 pt-5">
              {[
                { label: "Termos de Uso", href: "/termos" },
                { label: "Política de Privacidade", href: "/privacidade" },
                { label: "Política de Reembolso", href: "/reembolso" },
                { label: "Como Funciona", href: "/#como-funciona" },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowRight className="h-3 w-3" />
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
