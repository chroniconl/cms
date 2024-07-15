import * as React from 'react';
import { Html, Button, Heading, Text } from "@react-email/components";

export function UnreadNotifications({
	url,
	count,
}: {
	url: string;
	count: number;
}) {

	return (
		<Html lang="en">
			<Heading>People are inquiring about your site</Heading>
			<Text>You have {count} unread user-submitted forms that need your attention.</Text>
			<Button href={url}>Read your notifications</Button>
		</Html>
	);
}
