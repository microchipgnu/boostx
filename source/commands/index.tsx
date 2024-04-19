
import { Box, Text } from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import React from 'react';

export default function Index() {

	return (
		<Box flexDirection='column'>
			<Gradient name="retro">
				<BigText text="$BOOSTX" />
			</Gradient>
			<Text>Run `boostx new` to get started.</Text>
		</Box>
	);
}
