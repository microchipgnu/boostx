import { Text } from 'ink';
import React from 'react';
import zod from 'zod';

export const options = zod.object({
	name: zod.string().default('Stranger').describe('Name'),
});

type Props = {
	options: zod.infer<typeof options>;
};

export default function Index({ options }: Props) {

	return (
		<Text>
			Hello, <Text color="red">{options.name}</Text>
		</Text>
	);
}
