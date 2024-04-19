import { DataLocationOffChain, EvmChains, OffChainSignType, SignProtocolClient, SpMode } from '@ethsign/sp-sdk';
import lighthouse from '@lighthouse-web3/sdk';
import axios from 'axios';
import { ethers } from 'ethers';
import { promises as fs } from 'fs';
import { Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import path from 'path';
import React, { useEffect, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { createPublicClient, createWalletClient, encodeFunctionData, http } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { arbitrumSepolia, baseSepolia, gnosisChiado } from 'viem/chains';
import { abi, bytecode } from '../../core/contracts/basic-erc-20/basic.js';
import { useConfig } from '../../core/hooks/use-config.js';

export const alias = "n"

const getChain = (network: string | undefined) => {
	switch (network) {
		case "base-sepolia":
			return baseSepolia;
		case "arbitrum-sepolia":
			return arbitrumSepolia;
		case "gnosis-chiado":
			return gnosisChiado;
		default:
			return undefined;
	}
};

const getSignChain = (network: string | undefined) => {
	switch (network) {
		case "base-sepolia":
			return EvmChains.baseSepolia;
		case "arbitrum-sepolia":
			return EvmChains.arbitrumSepolia;
		case "gnosis-chiado":
			return EvmChains.gnosisChiado;
		default:
			return undefined;
	}
}

const CreateAndFundAccount = ({ setStep }: { setStep: (step: string) => void }) => {
	const { getValue, setValue, configLoaded } = useConfig();
	const [privateKey, setPrivateKey] = useState<`0x${string}` | undefined>();
	const [balance, setBalance] = useState<bigint>(0n);

	const fetchBalance = async (address: `0x${string}`) => {
		const chain = getChain(getValue("NETWORK"));
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
		let _privateKey = getValue("PRIVATE_KEY") as `0x${string}` | undefined;
		if (!_privateKey) {
			_privateKey = generatePrivateKey();
			setValue("PRIVATE_KEY", _privateKey);
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
			setValue("ADDRESS", privateKeyToAccount(privateKey!).address);
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

const MultiSelect = ({ setStep, configValue, nextStep, options, question, onFinished }: { setStep: (step: string) => void, configValue: string, nextStep: string, options: any, question: string, onFinished?: (value: string) => void }) => {
	const { setValue } = useConfig()

	const handleSelect = async (item: any) => {
		await setValue(configValue, item.value)
		setStep(nextStep);
		onFinished && onFinished(item.value);
	};

	return (
		<Box flexDirection='column' flexBasis={"100%"}>
			<Text>{question}</Text>
			<SelectInput items={options} onSelect={handleSelect} />
		</Box>
	);
}

const Question = ({ question, configValue, nextStep, setStep, onFinished }: { question: string, configValue: string, nextStep: string, setStep: (step: string) => void, onFinished?: () => void }) => {
	const [query, setQuery] = useState('');
	const { setValue } = useConfig()

	const handleSubmit = (value: string) => {

		setValue(configValue, value)
		setStep(nextStep);
		setQuery('');
		onFinished && onFinished();
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

	const handleDeployment = async () => {
		const chain = getChain(getValue("NETWORK"));
		const walletClient = createWalletClient({
			chain: chain,
			transport: http(),
			account: privateKeyToAccount(getValue("PRIVATE_KEY") as `0x${string}`),
		});
		const hash = await walletClient.deployContract({
			abi: abi,
			bytecode: bytecode,
			args: [
				getValue("PROJECT_NAME"),
				getValue("SYMBOL"),
			]
		})
		setHash(hash);
	}

	const fetchTransactionReceipt = async () => {
		const chain = getChain(getValue("NETWORK"));
		const publicClient = createPublicClient({
			chain: chain,
			transport: http(),
		});

		if (hash) {
			const txReceipt = await publicClient.waitForTransactionReceipt({ hash })
			setTransactionReceipt(txReceipt);
			setValue("CONTRACT_ADDRESS", txReceipt.contractAddress);
			setStep("epoch")
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

const CreateEpochOnChainSchema = ({ setStep, nextStep }: { setStep: (step: string) => void, nextStep: string }) => {
	const { getValue, setValue, configLoaded } = useConfig()

	const createEpochSchema = async () => {
		const network = getValue("NETWORK");

		const signChain = getSignChain(network);
		const chain = getChain(network);

		if (!signChain) return

		const client = new SignProtocolClient(SpMode.OnChain, {
			chain: signChain,
			account: privateKeyToAccount(getValue("PRIVATE_KEY") as `0x${string}`)
		});

		// epoch-data should be a stringified object with {address: to_claim_amount}[]
		const registerSchema = await client.createSchema({
			name: "user-earnings-schema",
			data: [{ name: "address", type: "address" }, { name: "amount", type: "uint256" }],
		});

		setValue("USER_EARNINGS_SCHEMA", `onchain_evm_${chain?.id}_${registerSchema.schemaId}`);
		setStep(nextStep);
	}

	useEffect(() => {
		if (!configLoaded) return
		createEpochSchema()
	}, [configLoaded])

	return (
		<Text>Registering earnings schema on chain...</Text>
	)
}

const CreateOffchainBoostSchema = ({ setStep, nextStep }: { setStep: (step: string) => void, nextStep: string }) => {
	const { getValue, setValue, configLoaded } = useConfig()

	const createEpochSchema = async () => {
		const client = new SignProtocolClient(SpMode.OffChain, {
			signType: OffChainSignType.EvmEip712,
			account: privateKeyToAccount(getValue("PRIVATE_KEY") as `0x${string}`),
		});

		const registerBoostSchema = await client.createSchema({
			name: "boost-schema",
			data: [{ name: "curator-fid", type: "string" }, { name: "cast-hash", type: "string" }],
			dataLocation: DataLocationOffChain.IPFS
		});

		// await client.createAttestation({
		// 	schemaId: registerBoostSchema.schemaId,
		// 	data: JSON.stringify(
		// 		{ "boost-data": "a" }
		// 	),
		// 	indexingValue: 'xxx',
		// 	dataLocation: DataLocationOnChain.IPFS,
		// });

		setValue("BOOST_FULL_SCHEMA_ID", `${registerBoostSchema.schemaId}`);
		setStep(nextStep);
	}

	useEffect(() => {
		if (!configLoaded) return
		createEpochSchema()
	}, [configLoaded])

	return (
		<Text>Registering boost schema off chain...</Text>
	)
}

const CreateEpochStateSchema = ({ setStep, nextStep }: { setStep: (step: string) => void, nextStep: string }) => {
	const { getValue, setValue, configLoaded } = useConfig()

	const createEpochSchema = async () => {
		const client = new SignProtocolClient(SpMode.OffChain, {
			signType: OffChainSignType.EvmEip712,
			account: privateKeyToAccount(getValue("PRIVATE_KEY") as `0x${string}`),
		});

		const epochStateSchema = await client.createSchema({
			name: "epoch-state-schema",
			data: [{ name: "computed-data", type: "string" }, { name: "ipfs-hash", type: "string" }, { name: "ipfs-url", type: "string" }, { name: "epoch", type: "string" }],
			dataLocation: DataLocationOffChain.IPFS
		});

		setValue("EPOCH_STATE_FULL_SCHEMA_ID", `${epochStateSchema.schemaId}`);
		setStep(nextStep);
	}

	useEffect(() => {
		if (!configLoaded) return
		createEpochSchema()
	}, [configLoaded])

	return (
		<Text>Creating epoch schema on chain...</Text>
	)
}

const SetupContractSPInstanceAndSchema = ({ setStep, nextStep }: { setStep: (step: string) => void, nextStep: string }) => {
	const { getValue, configLoaded } = useConfig()

	const configure = async () => {

		const network = getValue("NETWORK");
		const schemaId = getValue("USER_EARNINGS_SCHEMA");
		const address = getValue("ADDRESS");

		const chain = getChain(network);

		const walletClient = createWalletClient({
			chain,
			transport: http(),
			account: privateKeyToAccount(getValue("PRIVATE_KEY") as `0x${string}`),
		})

		const publicClient = createPublicClient({
			chain: chain,
			transport: http(),
		})

		const spInstance = network === "base-sepolia" ? "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD" : "0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD";

		const currentNonce = await publicClient.getTransactionCount({ address: address, blockTag: "latest" });

		await walletClient.sendTransaction({
			data: encodeFunctionData({
				abi: abi,
				functionName: 'setSPInstance',
				args: [spInstance]
			}),
			to: getValue("CONTRACT_ADDRESS"),
			nonce: currentNonce
		})

		const onChainSchemaId = schemaId.split("_")[schemaId.split("_").length - 1];

		await walletClient.sendTransaction({
			data: encodeFunctionData({
				abi: abi,
				functionName: 'setSchemaID',
				args: [onChainSchemaId]
			}),
			to: getValue("CONTRACT_ADDRESS"),
			nonce: currentNonce + 1
		})


		setStep(nextStep);
	}

	useEffect(() => {
		if (!configLoaded) return
		configure()
	}, [configLoaded])

	return (
		<Text>Finalizing contract details...</Text>
	)
}
const GetLighthouseApiKey = ({ setStep, nextStep }: { setStep: (step: string) => void, nextStep: string }) => {
	const { getValue, setValue, configLoaded } = useConfig()


	const getApiKey = async (address: `0x${string}`, privateKey: `0x${string}`) => {

		const signAuthMessage = async (privateKey: string | ethers.SigningKey, verificationMessage: string | Uint8Array) => {
			const signer = new ethers.Wallet(privateKey)
			const signedMessage = await signer.signMessage(verificationMessage)
			return (signedMessage)
		}

		const wallet = {
			publicKey: address,
			privateKey: privateKey,
		}
		const verificationMessage = (
			await axios.get(
				`https://api.lighthouse.storage/api/auth/get_message?publicKey=${wallet.publicKey}`
			)
		).data
		const signedMessage = await signAuthMessage(wallet.privateKey, verificationMessage)
		const response = await lighthouse.getApiKey(wallet.publicKey, signedMessage)

		return response.data.apiKey
	}

	const configure = async () => {
		const address = getValue("ADDRESS");
		const privateKey = getValue("PRIVATE_KEY");

		const apiKey = await getApiKey(address, privateKey as `0x${string}`);

		setValue("LIGHTHOUSE_STORAGE_API_KEY", apiKey)
		setStep(nextStep);
	}

	useEffect(() => {
		if (!configLoaded) return
		configure()
	}, [configLoaded])

	return (
		<Text>Getting your Lighthouse Storage API Key...</Text>
	)
}

export default function New() {
	const { config } = useConfig()
	const [step, setStep] = useState("loading")

	useEffect(() => {
		if (!config) {
			setStep("select-network")
			return
		}

		if (config) {
			if (config["NETWORK"]) {
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
			<MultiSelect setStep={setStep} question='Select network:' options={[
				{
					label: 'Base Sepolia',
					value: 'base-sepolia'
				},
				{
					label: 'Arbitrum Sepolia',
					value: 'arbitrum-sepolia'
				},
				{
					label: 'Gnosis Chiado',
					value: 'gnosis-chiado'
				},
			]} configValue="NETWORK" nextStep="create-account"></MultiSelect>
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
				configValue="PROJECT_NAME"
				nextStep="project-description"
				setStep={setStep}
			/>
		);
	}

	if (step === "project-description") {
		return (
			<Question
				question="What is the description of your project?"
				configValue="PROJECT_DESCRIPTION"
				nextStep="token-ticker"
				setStep={setStep}
			/>
		);
	}

	if (step === "token-ticker") {
		return (
			<Question
				question="What is the ticker for your token (for example, DEGEN)?"
				configValue="SYMBOL"
				nextStep="select-rules"
				setStep={setStep}
			/>
		);
	}

	if (step === "select-rules") {
		return (
			<MultiSelect setStep={setStep} question='Choose rule system:' options={[
				{
					label: 'Basic',
					value: 'basic'
				},
				{
					label: 'Rewards for POAP holders',
					value: 'only-poap-holders'
				},
				{
					label: '$DEGEN holders',
					value: 'degen-holders'
				},
			]} configValue="RULES" nextStep="token-supply"></MultiSelect>
		);
	}

	if (step === "token-supply") {
		return (
			<MultiSelect setStep={setStep} question='Choose token supply:' options={[
				{
					label: 'Linear',
					value: 'linear'
				},
				{
					label: 'Quadratic',
					value: 'quadratic'
				},
			]} configValue="TOKEN_SUPPLY" nextStep="contract-deployment"></MultiSelect>
		);
	}

	if (step === "contract-deployment") {
		return (
			<ContractDeployment setStep={setStep} />
		)
	}

	if (step === "epoch") {
		return (
			<MultiSelect setStep={setStep} question='What is your desired epoch in hours (12h, 24h, etc)?' options={[
				{
					label: '30min',
					value: '*/30 * * * *'
				},
				{
					label: '1h',
					value: '0 * * * *'
				},
				{
					label: '5h',
					value: '0 */5 * * *'
				},
				{
					label: '12h',
					value: '0 */12 * * *'
				},
				{
					label: '1d',
					value: '0 0 * * *'
				},
				{
					label: '1w',
					value: '0 0 * * 0'
				},
			]} configValue="EPOCH_CRONJOB" nextStep="create-epoch-schema" onFinished={async (value: string) => {
				const absolutePath = path.resolve("vercel.json");
				await fs.writeFile(absolutePath, JSON.stringify({
					"crons": [
						{
							"path": "/epoch",
							"schedule": value
						}
					]
				}
				));
			}}></MultiSelect>
		);
	}

	if (step === "create-epoch-schema") {
		return (
			<CreateEpochOnChainSchema setStep={setStep} nextStep="create-boost-schema" />
		);
	}
	if (step === "create-boost-schema") {
		return (
			<CreateOffchainBoostSchema setStep={setStep} nextStep="create-epoch-state-schema" />
		);
	}
	if (step === "create-epoch-state-schema") {
		return (
			<CreateEpochStateSchema setStep={setStep} nextStep="airstack-api-key" />
		);
	}

	if (step === "airstack-api-key") {
		return (
			<Question
				question="Get your Airstack API Key (https://airstack.xyz/) and drop it here:"
				configValue="AIRSTACK_API_KEY"
				nextStep="lighthouse-storage-api-key"
				setStep={setStep}
			/>
		);
	}
	if (step === "lighthouse-storage-api-key") {
		return (
			<GetLighthouseApiKey
				nextStep="setup-contract-sp-instance-and-schema"
				setStep={setStep}
			/>
		);
	}
	if (step === "setup-contract-sp-instance-and-schema") {
		return (
			<SetupContractSPInstanceAndSchema setStep={setStep} nextStep="system-deployment" />
		);
	}


	if (step === "system-deployment") {
		return (
			<Text>Ready to deploy!</Text>
		)
	}

	return (
		<Text>Ready to deploy!</Text>
	)
}
