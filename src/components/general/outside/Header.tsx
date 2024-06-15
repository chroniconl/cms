"use client";
import { cn } from "@/utils/cn";

import { Fragment, useState } from 'react'
import {
	Dialog,
	DialogPanel,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Popover,
	PopoverButton,
	PopoverGroup,
	PopoverPanel,
	Transition,
} from '@headlessui/react'
import {
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { HeaderLoginButtons } from '@/components/general/outside/HeaderLoginButtons';

const products = [
	{
		name: 'Analytics',
		description: 'Get a better understanding where your traffic is coming from',
		href: '#',
		icon: ChartPieIcon,
	},
	{
		name: 'Engagement',
		description: 'Speak directly to your customers with our engagement tool',
		href: '#',
		icon: CursorArrowRaysIcon,
	},
	{ name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
	{
		name: 'Integrations',
		description: 'Your customers’ data will be safe and secure',
		href: '#',
		icon: SquaresPlusIcon,
	},
]
const callsToAction = [
	{ name: 'Watch demo', href: '#', icon: PlayCircleIcon },
	{ name: 'Contact sales', href: '#', icon: PhoneIcon },
	{ name: 'View all products', href: '#', icon: RectangleGroupIcon },
]

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<header className="relative isolate z-10 bg-white">
			<nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
				<div className="flex lg:flex-1">
					<Link href="/" className="flex gap-2">
						<div className="px-4 py-2 flex items-center justify-center">
							<span className={"text-stone-900 font-black leading-tighter whitespace-nowrap text-2xl"}>
								{"Chroniconl"}
							</span>
						</div>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<PopoverGroup className="hidden lg:flex lg:gap-x-12">
					<Popover>
						<PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
							Blog
							<ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
						</PopoverButton>

						<Transition
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 -translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 -translate-y-1"
						>
							<PopoverPanel className="absolute inset-x-0 top-0 -z-10 bg-white pt-14 shadow-lg ring-1 ring-gray-900/5">
								<div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
									{products.map((item) => (
										<div key={item.name} className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50">
											<div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
												<item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
											</div>
											<a href={item.href} className="mt-6 block font-semibold text-gray-900">
												{item.name}
												<span className="absolute inset-0" />
											</a>
											<p className="mt-1 text-gray-600">{item.description}</p>
										</div>
									))}
								</div>
								<div className="bg-gray-50">
									<div className="mx-auto max-w-7xl px-6 lg:px-8">
										<div className="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
											{callsToAction.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
												>
													<item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
													{item.name}
												</a>
											))}
										</div>
									</div>
								</div>
							</PopoverPanel>
						</Transition>
					</Popover>

					<a href="#" className="text-sm font-semibold leading-6 text-gray-900">
						Docs
					</a>
					<a href="#" className="text-sm font-semibold leading-6 text-gray-900">
						Features
					</a>
					<a href="#" className="text-sm font-semibold leading-6 text-gray-900">
						Pricing
					</a>
				</PopoverGroup>
				<div className="hidden lg:flex lg:flex-1 lg:justify-end">
					<HeaderLoginButtons />
				</div>
			</nav>
			<Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<Link href="/" className="flex gap-2">
							<div className="px-4 py-2 flex items-center justify-center">
								<span className={"text-stone-900 font-black leading-tighter whitespace-nowrap text-2xl"}>
									{"Chroniconl"}
								</span>
							</div>
						</Link>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<Disclosure as="div" className="-mx-3">
									{({ open }) => (
										<>
											<DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
												Blog
												<ChevronDownIcon
													className={cn(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
													aria-hidden="true"
												/>
											</DisclosureButton>
											<DisclosurePanel className="mt-2 space-y-2">
												{[...products, ...callsToAction].map((item) => (
													<DisclosureButton
														key={item.name}
														as="a"
														href={item.href}
														className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
													>
														{item.name}
													</DisclosureButton>
												))}
											</DisclosurePanel>
										</>
									)}
								</Disclosure>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Docs
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Features
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Pricing
								</a>
							</div>
							<div className="py-6">
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Log in
								</a>
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}
