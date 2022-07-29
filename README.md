# Hashed Portal

## See Storybook documentation
```bash
yarn
yarn storybook
```

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
yarn run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Userflow guide
1. Create XPUB
	1. BW - Go to add
	2. BW - Add Vault (Create, Let Start)
	3. BW - On Vault Key do click on Create New, then save your seed recovery
	4. BW - You can do click on share your xpub
2. Link your XPUB to your polkadot address
	1. Go to https://portal-dev.hashed.systems/nbv and login using polkadotJS
	2. Go to "Extended Keys" and go through userflow to import your XPUB (Scan QR from BW or write manually)
	3. Do click on set Xpub
3. Create a new vault
	1. Go to My Vaults on portal and do click on "Create vault"
	2. Fill the form with all settings you wanna to your new vault (label, cosigners, threshold, etc)
4. Fund your vault (To can create proposals (to move the vault's founds) the vault must have balance greater than 0 sats)
	1. On "My Vaults" section you can see a list of all vaults where you are cosigner or owner
	2. Do click in a vault to see details
	3. Do click on "Get receive address" to see the address to you send Sats from other wallet
5. Import vault on BW
	1. On "My Vaults" section you can see a list of all vaults where you are cosigner or owner
	2. Do click in a vault to see details
	3. Do click on "Export descriptor"
	4. BW - Go to Add, then on Import wallet and finally on Scan or import file
	5. BW - Scan the descriptor QR from NBV
	6. BW - Do click on you new vault and go to "Manage keys"
	7. BW - Find your Xpub and do click on "I have a seed for this key" 
	8. BW - Write your seed and do click on "Import"
	9. BW - Do click on Save
6. Create a new proposal
	1. On "My Vaults" section you can see a list of all vaults where you are cosigner or owner
	2. Do click in a vault to see details
	3. Do click on "Create proposal" 
	4. Fill the form to create a new proposal (Description, recipient address, amount)
	5. Do click on "Create proposal"
	6. You can see the details doing click on an item from the proposal list
7. Sign, Finalize and Broadcast a proposal
	1. Go to proposal details of the proposal you wanna sign
	2. Do click on Sign PSBT
	3. BW - Go to your vault then do click on "Send"
	4. BW - Do click on "..." (More options)
	5. BW - Do click on "Sign a transaction"
	6. BW - Scann the QRS from NBV
	7. BW - When appear "Co-sign this transaction?" do click on "YES"
	8. BW - Do click on "Provide signature" (Should appear a dynamic QR)
	9. On NBV do click on "Continue"
	10. Scan the QRS from BW on NBV
	11. Do click on Save (Save your signed PSBT)
	12. On this section are the "Finalize" and "Broadcast" buttons, to do click on these buttons the follows rules must be passed:
		1. To Finalize the threshold must be passed
		2. To Broadcast the proposal must be Finalized before
