import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { createPublicClient, createWalletClient, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia, baseSepolia } from 'viem/chains';
import zod from 'zod';
import { abi, bytecode } from '../../core/contracts/basic-erc-20/basic.js';
import { useConfig } from '../../core/hooks/use-config.js';

export const alias = "n"

export const options = zod.object({
	name: zod.string().default('your-project-name').describe('Name'),
});

type Props = {
	options: zod.infer<typeof options>;
};


const CreateAndFundAccount = ({ setStep }: { setStep: (step: string) => void }) => {
	const { getValue, setValue, configLoaded } = useConfig();
	const [privateKey, setPrivateKey] = useState<`0x${string}` | undefined>();
	const [balance, setBalance] = useState<bigint>(0n);

	const getChain = () => {
		const network = getValue("network") as string | undefined;
		switch (network) {
			case "base-sepolia":
				return baseSepolia;
			case "arbitrum-sepolia":
				return arbitrumSepolia;
			default:
				return undefined;
		}
	};

	const fetchBalance = async (address: `0x${string}`) => {
		const chain = getChain();
		if (!chain) return 0n;
		const publicClient = createPublicClient({
			chain: chain,
			transport: http()
		});
		return await publicClient.getBalance({
			address: address,
			blockTag: "pending"
		}).catch((error: Error) => {
			console.error('Failed to fetch balance:', error);
			return 0n;
		});
	};

	const initializeAccount = async () => {
		let _privateKey = getValue("privateKey") as `0x${string}` | undefined;
		if (!_privateKey) {
			_privateKey = generatePrivateKey();
			setValue("privateKey", _privateKey);
		}

		setPrivateKey(_privateKey);
		const newBalance = await fetchBalance(privateKeyToAccount(_privateKey).address);
		setBalance(newBalance);
	};

	useEffect(() => {
		if (configLoaded) {
			initializeAccount();
		}
	}, [configLoaded]);

	useEffect(() => {
		if (balance > 0n) {
			setValue("address", privateKeyToAccount(privateKey!).address);
			setStep("project-name");
		}
	}, [balance]);

	useInterval(() => {
		if (privateKey) {
			fetchBalance(privateKeyToAccount(privateKey).address).then(newBalance => {
				if (newBalance !== balance) {
					setBalance(newBalance);
				}
			});
		}
	}, balance === 0n ? 1000 : null);

	if (!privateKey) {
		return (
			<Box flexDirection="row">
				<Spinner />
				<Text> Creating account...</Text>
			</Box>
		);
	}

	return (
		<Box flexDirection='column' flexBasis="100%">
			<Box flexDirection="row">
				<Spinner />
				<Text>
					{balance === 0n ? 'Waiting for funds...' : 'Account created and funded'}
				</Text>
			</Box>
			<Text>Your address is <Text color="green">{privateKeyToAccount(privateKey).address}</Text></Text>
			<Text>Send some ETH to this address to proceed.</Text>
		</Box>
	);
};


const MultiSelect = ({ setStep, configValue, nextStep, options }: { setStep: (step: string) => void, configValue: string, nextStep: string, options: any }) => {
	const { setValue } = useConfig()

	const handleSelect = async (item: any) => {
		await setValue(configValue, item.value)
		setStep(nextStep);
	};

	return (
		<Box flexDirection='column' flexBasis={"100%"}>
			<Text>In which network do you want to deploy?</Text>
			<SelectInput items={options} onSelect={handleSelect} />
		</Box>
	);
}

const Question = ({ question, configValue, nextStep, setStep }: { question: string, configValue: string, nextStep: string, setStep: (step: string) => void }) => {
	const [query, setQuery] = useState('');
	const { setValue } = useConfig()

	const handleSubmit = (value: string) => {

		setValue(configValue, value)
		setStep(nextStep);
		setQuery('');
	}

	return (
		<Box>
			<Box marginRight={1}>
				<Text>{question}</Text>
			</Box>

			<TextInput value={query} onChange={setQuery} onSubmit={handleSubmit} />
		</Box>
	);
};

const ContractDeployment = ({ setStep }: { setStep: (step: string) => void }) => {

	const [hash, setHash] = useState<`0x${string}` | undefined>();
	const [transactionReceipt, setTransactionReceipt] = useState<any>(null);
	const { setValue, configLoaded, getValue } = useConfig()

	const getChain = () => {
		const network = getValue("network") as string | undefined;
		switch (network) {
			case "base-sepolia":
				return baseSepolia;
			case "arbitrum-sepolia":
				return arbitrumSepolia;
			default:
				return undefined;
		}
	};



	const handleDeployment = async () => {
		const chain = getChain();
		const walletClient = createWalletClient({
			chain: chain,
			transport: http(),
			account: privateKeyToAccount(getValue("privateKey") as `0x${string}`),
		});
		const hash = await walletClient.deployContract({
			abi: abi,
			bytecode: bytecode,
			args: [
				getValue("projectName"),
				getValue("tokenTicker"),
			],
		})
		setHash(hash);
	}

	const fetchTransactionReceipt = async () => {
		const chain = getChain();
		const publicClient = createPublicClient({
			chain: chain,
			transport: http(),
		});

		if (hash) {
			const txReceipt = await publicClient.waitForTransactionReceipt({ hash })
			setTransactionReceipt(txReceipt);
			setValue("contract-address", txReceipt.contractAddress);
			setStep("system-deployment")
		}
	}

	useEffect(() => {
		if (hash) {
			fetchTransactionReceipt();
		}
	}, [hash])

	useEffect(() => {

		if (configLoaded) {
			handleDeployment()
		}

	}, [configLoaded])

	return (
		transactionReceipt && transactionReceipt.status === "success" ? <Text>Contract deployed!</Text> : <Text>Deploying Contract...</Text>
	)
}


export default function New({ options }: Props) {
	const { config } = useConfig()
	const [step, setStep] = useState("loading")

	useEffect(() => {
		if (!config) {
			setStep("select-network")
			return
		}

		if (config) {
			if (config["network"]) {
				setStep("create-account")
				return
			}

			setStep("select-network")
		}
	}, [config])


	if (!config) {
		return <Text>Config not found</Text>
	}

	if (step === "loading") {
		return (
			<Text>
				<Text>
					<Spinner></Spinner>
				</Text>
				<Text>
					Initiating...
				</Text>
			</Text>
		);
	}
	if (step === "select-network") {
		return (
			<MultiSelect setStep={setStep} options={[
				{
					label: 'Base Sepolia',
					value: 'base-sepolia'
				},
				{
					label: 'Arbitrum Sepolia',
					value: 'arbitrum-sepolia'
				},
			]} configValue="network" nextStep="create-account"></MultiSelect>
		);
	}

	if (step === "create-account") {
		return (
			<CreateAndFundAccount setStep={setStep}></CreateAndFundAccount>
		);
	}

	if (step === "project-name") {
		return (
			<Question
				question="What is the name of your project?"
				configValue="projectName"
				nextStep="project-description"
				setStep={setStep}
			/>
		);
	}

	if (step === "project-description") {
		return (
			<Question
				question="What is the description of your project?"
				configValue="projectDescription"
				nextStep="token-ticker"
				setStep={setStep}
			/>
		);
	}

	if (step === "token-ticker") {
		return (
			<Question
				question="What is the ticker for your token (for example, DEGEN)?"
				configValue="tokenTicker"
				nextStep="contract-deployment"
				setStep={setStep}
			/>
		);
	}

	if (step === "contract-deployment") {
		return (
			<ContractDeployment setStep={setStep} />
		)
	}

	if (step === "airstack-api-key") {
		return (
			<Question
				question="Get your Airstack API Key (https://airstack.xyz/) and drop it here:"
				configValue="airstackApiKey"
				nextStep="system-deployment"
				setStep={setStep}
			/>
		);
	}

	if (step === "system-deployment") {
		return (
			<Text>System Deployment</Text>
		)
	}

	return (
		<Text>Done! {options.name}</Text>
	);
}
