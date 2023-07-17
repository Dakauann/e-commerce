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
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Eye } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export default function LoginPage() {
	const { toast } = useToast()
	const formSchema = z.object({
		Email: z.string().email(),
		Password: z
			.string()
			.min(8)
			.max(100)
			.refine((value) => {
				return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
			}),
		ConfirmPassword: z
			.string()
			.min(8)
			.max(100)
			.refine((value) => {
				return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value)
			}),
	})
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			Email: '',
			Password: '',
			ConfirmPassword: '',
		},
	})
	const [userRequestInfos, setUserRequestInfos] = useState({
		loading: false,
		errorMessage: '',
	})
	const [showStates, setShowStates] = useState({
		Password: false,
		ConfirmPassword: false,
	})
	const router = useRouter()

	function onSubmit(data: any) {
		setUserRequestInfos({
			loading: true,
			errorMessage: '',
		})
		fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((res) => {
			if (res.status == 200) {
				res.json().then((data) => {
					setUserRequestInfos({
						loading: false,
						errorMessage: '',
					})
					router.push('/login')
					toast({
						title: 'Account created',
						description:
							'Your account has been created. Please login using the credentials you provided.',
						status: 'success',
						duration: 5000,
					})
				})
			} else {
				console.log(res.status)
				setUserRequestInfos({
					loading: false,
					errorMessage: res.statusText,
				})
			}
		})
	}

	return (
		<main className='flex flex-col items-center justify-center min-h-noNav'>
			<h1 className='font-bold text-xl text-center'>Register</h1>
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
										<div className='flex gap-2'>
											<Input
												{...form.register(
													'ConfirmPassword',
													{
														validate: (value) => {
															return (
																value ===
																	form.getValues(
																		'Password',
																	) ||
																'The passwords do not match'
															)
														},
													},
												)}
												type={
													showStates.Password
														? 'text'
														: 'password'
												}
												placeholder='*******'
												{...field}
											/>
											<Button
												type='button'
												variant={'outline'}
												onClick={() => {
													setShowStates({
														...showStates,
														Password:
															!showStates.Password,
													})
												}}>
												<Eye size={15} />
											</Button>
										</div>
									</FormControl>
									<FormDescription>
										Your password
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='ConfirmPassword'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<div className='flex gap-2'>
											<Input
												type={
													showStates.ConfirmPassword
														? 'text'
														: 'password'
												}
												placeholder='*******'
												{...field}
											/>
											<Button
												type='button'
												variant={'outline'}
												onClick={() => {
													setShowStates({
														...showStates,
														ConfirmPassword:
															!showStates.ConfirmPassword,
													})
												}}>
												<Eye size={15} />
											</Button>
										</div>
									</FormControl>
									<FormDescription>
										Your password
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						{userRequestInfos.errorMessage != '' && (
							<FormMessage className='text-center my-2 text-lg'>
								{userRequestInfos.errorMessage}
							</FormMessage>
						)}
						<Button type='submit' className='w-full mt-2'>
							Register
						</Button>
					</form>
				</Form>

				<Separator className='my-4' />

				<div className='flex flex-col items-center justify-center'>
					<p className='text-center mb-2'>Already have an account?</p>
					<Button
						variant='outline'
						className='text-center w-full'
						onClick={() => {
							router.push('/login')
						}}>
						Login
					</Button>
				</div>
			</div>
		</main>
	)
}
