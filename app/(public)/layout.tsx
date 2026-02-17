import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeartsCascade } from "@/components/hearts-cascade"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <HeartsCascade />
      <Header />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
