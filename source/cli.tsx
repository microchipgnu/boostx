#!/usr/bin/env node
import Pastel from 'pastel';

const app = new Pastel({
	importMeta: import.meta,
	description: "",
	name: "boostx",
	version: "0.0.0-alpha.0",
});

await app.run();
