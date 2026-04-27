export const dynamic = 'force-dynamic'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CookieBanner } from '@/components/layout/cookie-banner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vaultgg.com.br'),
  title: {
    default: 'VaultGG - Comprar e Vender Contas de Jogos | Marketplace Seguro',
    template: '%s | VaultGG'
  },
  description: 'O maior marketplace brasileiro para comprar e vender contas de jogos com segurança. Sistema de escrow, proteção ao comprador e vendedor. Valorant, League of Legends, Fortnite, CS2, Free Fire e mais. Transações 100% seguras.',
  keywords: [
    'comprar conta valorant',
    'vender conta valorant', 
    'comprar conta lol',
    'vender conta lol',
    'comprar conta fortnite',
    'vender conta fortnite',
    'comprar conta cs2',
    'vender conta cs2',
    'comprar conta free fire',
    'vender conta free fire',
    'marketplace de jogos',
    'marketplace de contas',
    'comprar conta de jogo',
    'vender conta de jogo',
    'conta smurf valorant',
    'conta smurf lol',
    'contas de jogos baratas',
    'marketplace gamer',
    'vaultgg',
    'ggmax alternativa'
  ],
  authors: [{ name: 'VaultGG', url: 'https://vaultgg.com.br' }],
  creator: 'VaultGG',
  publisher: 'VaultGG',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://vaultgg.com.br',
    siteName: 'VaultGG',
    title: 'VaultGG - Comprar e Vender Contas de Jogos | Marketplace Seguro',
    description: 'O maior marketplace brasileiro para comprar e vender contas de jogos com segurança. Sistema de escrow, proteção total. Valorant, LoL, Fortnite, CS2 e mais.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VaultGG - Marketplace de Contas de Jogos',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VaultGG - Comprar e Vender Contas de Jogos',
    description: 'Marketplace seguro para comprar e vender contas de Valorant, LoL, Fortnite, CS2 e mais.',
    images: ['/og-image.jpg'],
    creator: '@vaultgg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vaultgg.com.br',
  },
  category: 'gaming',
  verification: {
    google: 'seu-codigo-de-verificacao-google',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark bg-background">
      <body className="font-sans antialiased min-h-screen scrollbar-thin">
        {children}
        <CookieBanner />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
