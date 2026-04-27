import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { GameCard } from "@/components/games/game-card"
import { FeaturedListingsByGame } from "@/components/home/featured-listings-by-game"
import { createClient } from "@/lib/supabase/server"
import { 
  Shield, 
  Lock, 
  CreditCard, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Users,
  Zap,
  TrendingUp,
  Gamepad2,
  DollarSign,
  Sparkles
} from "lucide-react"
import Image from "next/image"
import { OrganizationJsonLd, WebsiteJsonLd, MarketplaceJsonLd, FAQJsonLd } from "@/components/seo/json-ld"

const defaultGames = [
  { name: "Valorant", slug: "valorant", image: "/games/valorant-cover.jpg" },
  { name: "League of Legends", slug: "lol", image: "/games/lol-cover.jpg" },
  { name: "Fortnite", slug: "fortnite", image: "/games/fortnite-cover.jpg" },
  { name: "CS2", slug: "cs2", image: "/games/cs2-cover.jpg" },
  { name: "Free Fire", slug: "freefire", image: "/games/freefire-cover.jpg" },
]

const features = [
  {
    icon: Lock,
    title: "Sistema Escrow",
    description: "Seu dinheiro fica protegido até você confirmar o recebimento da conta. Segurança total em cada transação."
  },
  {
    icon: Shield,
    title: "Vendedores Verificados",
    description: "Todos os vendedores passam por um processo de verificação. Veja avaliações e histórico antes de comprar."
  },
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Aceitamos Pix, cartão de crédito e outras formas de pagamento. Tudo processado com segurança."
  },
  {
    icon: MessageSquare,
    title: "Chat Integrado",
    description: "Converse diretamente com vendedores sem sair da plataforma. Tire todas suas dúvidas antes de comprar."
  },
]

const steps = [
  {
    number: "01",
    title: "Encontre sua conta",
    description: "Navegue pelo marketplace e encontre a conta perfeita para você. Filtre por jogo, rank e preço."
  },
  {
    number: "02",
    title: "Faca o pagamento",
    description: "Pague com segurança. Seu dinheiro fica em escrow até você confirmar o recebimento."
  },
  {
    number: "03",
    title: "Receba os dados",
    description: "O vendedor envia os dados da conta. Você verifica e confirma que tudo está correto."
  },
  {
    number: "04",
    title: "Confirme e avalie",
    description: "Confirme o recebimento e avalie o vendedor. O pagamento é liberado automaticamente."
  },
]


export default async function HomePage() {
  const supabase = await createClient()
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  // Get games from database
  const { data: gamesData } = await supabase
    .from('games')
    .select('id, name, slug, cover_url')
    .eq('is_active', true)
    .order('name')

  // Get listing counts per game
  const { data: listingCounts } = await supabase
    .from('listings')
    .select('game_id')
    .eq('status', 'active')

  const countByGame = listingCounts?.reduce((acc, listing) => {
    acc[listing.game_id] = (acc[listing.game_id] || 0) + 1
    return acc
  }, {} as Record<string, number>) || {}

  // Format games for display — sorted by listing count (most visited first)
  const games = (gamesData?.map(game => ({
    ...game,
    image_url: game.cover_url || `/games/${game.slug}-cover.jpg`
  })) || defaultGames.map((g, i) => ({ 
    id: i.toString(), 
    name: g.name, 
    slug: g.slug, 
    image_url: g.image,
    cover_url: null
  }))).sort((a, b) => (countByGame[b.id] || 0) - (countByGame[a.id] || 0))

  return (
    <>
      {/* SEO Structured Data */}
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <MarketplaceJsonLd />
      <FAQJsonLd />
      
      <div className="min-h-screen flex flex-col">
        <Header user={profile} />
        
        <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-32 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4 sm:mb-6">
                <Zap className="mr-1 h-3 w-3" />
                Marketplace #1 do Brasil
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground text-balance">
                Compre e venda contas de jogos com{" "}
                <span className="text-gradient-primary">segurança total</span>
              </h1>
              
              <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
                Sistema de escrow integrado, vendedores verificados e suporte 24/7. 
                A forma mais segura de negociar contas de Valorant, LoL, Fortnite e muito mais.
              </p>
              
              <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4">
                <Button size="lg" asChild className="w-full sm:w-auto min-w-[200px]">
                  <Link href="/marketplace">
                    Explorar Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto min-w-[200px]">
                  <Link href="/vender">
                    Vender Minha Conta
                  </Link>
                </Button>
              </div>


            </div>
          </div>
        </section>

        {/* Games Section - Horizontal Carousel */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-6 md:mb-8 px-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Jogos Disponíveis
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Encontre contas dos jogos mais populares
              </p>
            </div>
            
            {/* Horizontal scrollable carousel */}
            <div className="relative">
              {/* Fade edges on desktop */}
              <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
              <div className="hidden md:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
              
              <div 
                className="flex gap-3 sm:gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {games.map((game) => (
                  <GameCard
                    key={game.id}
                    name={game.name}
                    slug={game.slug}
                    imageUrl={game.image_url}
                    className="snap-start"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Listings by Game */}
        <FeaturedListingsByGame games={games} />

        {/* GIF Showcase - Buy & Sell CTA */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-10 md:mb-14">
              <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
                <Sparkles className="mr-1 h-3 w-3" />
                Skins Raras e Contas Exclusivas
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-foreground">
                Transforme suas <span className="text-gradient-primary">conquistas</span> em dinheiro
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Aquele inventario de skins raras ou conta rankeada pode valer mais do que você imagina. 
                Venda com segurança ou encontre a conta dos seus sonhos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
              {/* Valorant Card - For Sellers */}
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                <Image
                  src="/gifs/valorant.gif"
                  alt="Valorant Skins"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-green-500/20 backdrop-blur-sm">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Vender
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Venda suas Skins Raras
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Skins lendarias de Valorant, inventarios exclusivos. Transforme em dinheiro real com total segurança.
                  </p>
                  <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    <Link href="/vender">
                      Anunciar Agora
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* CS2 Card - For Buyers */}
              <div className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                <Image
                  src="/gifs/csgo.gif"
                  alt="CS2 Gameplay"
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/20 backdrop-blur-sm">
                      <Gamepad2 className="h-5 w-5 text-blue-400" />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      Comprar
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Encontre Contas Pro
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Contas rankeadas, Prime, inventarios completos. Comece no nivel que você merece.
                  </p>
                  <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                    <Link href="/marketplace">
                      Explorar Marketplace
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom stats */}
            <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-12 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary">R$ 500K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Ja negociados</div>
              </div>
              <div className="w-px h-10 bg-border hidden md:block" />
              <div>
                <div className="text-2xl md:text-3xl font-bold text-green-500">5 min</div>
                <div className="text-xs md:text-sm text-muted-foreground">Tempo medio de venda</div>
              </div>
              <div className="w-px h-10 bg-border hidden md:block" />
              <div>
                <div className="text-2xl md:text-3xl font-bold text-blue-500">0%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Taxa para compradores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="segurança" className="py-16 md:py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <Badge variant="outline" className="mb-4">
                <Shield className="mr-1 h-3 w-3" />
                Segurança em Primeiro Lugar
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Por que escolher a VaultGG?
              </h2>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Construimos a plataforma mais segura para negociar contas de jogos.
                Cada transação e protegida do inicio ao fim.
              </p>
            </div>
            
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/50 border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3 md:mb-4">
                      <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="como-funciona" className="py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Como Funciona
              </h2>
              <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground">
                Comprar uma conta na VaultGG e simples e seguro
              </p>
            </div>
            
            <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.number} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-1/2" />
                  )}
                  <div className="text-4xl md:text-5xl font-bold text-primary/20 mb-3 md:mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 md:py-20 bg-card/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50 p-6 sm:p-8 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    Milhares de jogadores já confiam na VaultGG
                  </h2>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                    Junte-se a comunidade que já realizou mais de 10.000 transações 
                    seguras. Nosso sistema de reputação e escrow garante que você 
                    sempre tenha uma experiência positiva.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Garantia de reembolso em caso de problemas",
                      "Mediação de disputas por nossa equipe",
                      "Verificação de identidade dos vendedores",
                      "Historico completo de transações"
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" className="mt-6 md:mt-8 w-full sm:w-auto" asChild>
                    <Link href="/auth/cadastro">
                      Criar Conta Gratis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <Card className="bg-background/50 backdrop-blur">
                    <CardContent className="p-4 md:p-6 text-center">
                      <Users className="h-6 w-6 md:h-8 md:w-8 text-primary mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-bold text-foreground">5K+</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Usuários Ativos</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 backdrop-blur">
                    <CardContent className="p-4 md:p-6 text-center">
                      <Star className="h-6 w-6 md:h-8 md:w-8 text-warning mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-bold text-foreground">4.9</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Avaliação Media</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 backdrop-blur">
                    <CardContent className="p-4 md:p-6 text-center">
                      <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-success mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-bold text-foreground">98%</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Sucesso</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50 backdrop-blur">
                    <CardContent className="p-4 md:p-6 text-center">
                      <Shield className="h-6 w-6 md:h-8 md:w-8 text-accent mx-auto mb-2" />
                      <div className="text-xl md:text-2xl font-bold text-foreground">100%</div>
                      <div className="text-xs md:text-sm text-muted-foreground">Seguro</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Pronto para começar?
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground">
              Crie sua conta gratuita e comece a explorar o marketplace agora mesmo.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/marketplace">
                  Ver Anúncios
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/vender">
                  Anunciar Conta
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </>
  )
}
