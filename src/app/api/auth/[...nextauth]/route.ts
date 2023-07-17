import { prisma } from '@/lib/database/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const handler = NextAuth({
	pages: {
		signIn: '/login',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify-request', // (used for check email message)
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'email@something.com',
				},
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials) {
				const {
					Email,
					Password,
				}: {
					Email: string
					Password: string
				} = credentials as any

				const user = await prisma.user.findUnique({
					where: {
						email: Email,
						password: Password,
					},
				})

				if (user) {
                    console.log(user)
                    return user
                } else {
                    return null
                }
			},
		}),
	],
})

export { handler as GET, handler as POST }
