import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { HeartsCascade } from "@/components/hearts-cascade"
import { getCategoryGroupsWithSubs } from "@/lib/data"

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categoryGroups = await getCategoryGroupsWithSubs()

  return (
    <>
      <HeartsCascade />
      <Header categoryGroups={categoryGroups} />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}
