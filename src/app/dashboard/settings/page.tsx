import { Label } from '@chroniconl/ui/label'
import { Input } from '@chroniconl/ui/input'
import { Text, Code } from '@/components/text'
import { Heading } from '@/components/heading'
import { Button } from '@chroniconl/ui/button'
import UploadLogo from './_settings_components/UploadLogo'

export default function SettingsPage() {
	return (
		<>
			<div className="space-y-10 divide-y divide-stone-900/10">
				<div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
					<div className="px-4 sm:px-0">
						<Heading>{'Branding'}</Heading>
						<Text>{'The basic branding of your website.'}</Text>
					</div>

					<form className="bg-secondary sm:rounded-xl md:col-span-2">
						<div className="px-4 py-6 sm:p-8">
							<div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
								<div className="sm:col-span-6">
									<Label htmlFor="website">{'Website domain name'}</Label>
									<Text>
										You don't need to include <Code>https://</Code>
									</Text>
									<div className="mt-2">
										<Input
											type="text"
											name="website"
											id="website"
											placeholder="e.g. chroniconl.com"
										/>
									</div>
								</div>

								<div className="sm:col-span-12">
									<Label htmlFor="logo">Logo</Label>
									<UploadLogo />
								</div>
							</div>
						</div>
						<div className="flex items-center justify-end gap-x-6 border-t border-stone-900/10 px-4 py-4 sm:px-8">
							<Button type="button">Cancel</Button>
							<Button type="submit" color="teal">
								Save
							</Button>
						</div>
					</form>
				</div>

				{/* More settings are gonna go here..  */}
			</div>
		</>
	)
}
