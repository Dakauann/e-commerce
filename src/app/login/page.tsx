'use client'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
	const form = useForm()
	const router = useRouter()

	function onSubmit(data: any) {
		if (data.Email === undefined || data.Email === '') {
			form.setError('Email', {
				type: 'manual',
				message: 'Email is required',
			})

			return
		} else if (data.Password === undefined || data.Password === '') {
			form.setError('Password', {
				type: 'manual',
				message: 'Password is required',
			})

			return
		}

		const { Email, Password } = data

		signIn('credentials', {
			Email,
			Password,
			callbackUrl: '/',
		})
	}

	return (
		<main className='flex flex-col items-center justify-center min-h-noNav'>
			<h1 className='font-bold text-xl text-center'>
				Login to start shopping 🛒
			</h1>
			<div className='w-[70vw] max-w-[35rem] h-max'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name='Email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
											type='email'
											placeholder='example@mail.com'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										The email you registered.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='Password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='*******'
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Your password
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit' className='w-full mt-2'>
							Login
						</Button>
					</form>
				</Form>

				<Separator className='my-4' />

				<div className='flex flex-col items-center justify-center'>
					<p className='text-center mb-2'>Does not have an account?</p>
					<Button
						variant='outline'
						className='text-center w-full'
						onClick={() => {
							router.push('/register')
						}}>
						Register
					</Button>
				</div>
			</div>
		</main>
	)
}
