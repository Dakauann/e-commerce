'use client'

import { ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

export default function Navbar() {
	const router = useRouter()
	const { data: session } = useSession()

    console.log(session)

	return (
		<nav className='flex p-2 items-center h-12'>
			<Button variant={'link'} className='text-black font-semibold'>
				D<sup>Commerce</sup>
			</Button>

			{session?.user ? (
				<h1>Logged in</h1>
			) : (
				<Button
					className='ml-auto'
					onClick={() => {
						router.push('/login')
					}}>
					Login
				</Button>
			)}
			{/* <Button
				variant={'outline'}
				className='w-max ml-auto'>
				<ShoppingCart size={15} />
			</Button> */}
		</nav>
	)
}
