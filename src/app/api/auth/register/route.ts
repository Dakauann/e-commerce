import { prisma } from '@/lib/database/db'
import { NextResponse } from 'next/server'

function Delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function POST(request: Request, response: Response) {
	await Delay(1000)
	const {
		Email,
		Password,
	}: {
		Email: string
		Password: string
	} = await request.json()

	// validate if the email is valid
	if (Email === '' || Password === '') {
		return NextResponse.json(
			{
				error: 'Please enter your email and password',
			},
			{
				status: 400,
			},
		)
	}

	try {
		await prisma.user.create({
			data: {
				email: Email,
				password: Password,
			},
		})

		return NextResponse.json(
			{
				error: null,
				message: 'User created successfully',
			},
			{
				status: 200,
			},
		)
	} catch (error) {
		return NextResponse.json(
			{
				error: true,
			},
			{
				status: 400,
				statusText:
					"Couldn't create user. Verify if you are registering a email that is not already registered.",
			},
		)
	}
}
