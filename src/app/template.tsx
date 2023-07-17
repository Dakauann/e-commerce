import Navbar from '@/components/navbar'
import SessionProviderWrapper from '@/components/providers/session-provider'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

export default function LayoutTemplate({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<SessionProviderWrapper>
				<Navbar />
				{children}
				<Toaster />
			</SessionProviderWrapper>
		</>
	)
}
