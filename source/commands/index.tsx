
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
			<Text bold>Welcome to the BOOST CLI!</Text>
			<Text>You can deploy your BOOST system using this tool.</Text>
		</Box>
	);
}
