# Hashed Portal

## Quick Start
```bash
cp .env.example .env
npm install --global @quasar/cli
npm install
quasar dev
```

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

### Userflow guide for NBV
1. Create XPUB
	1. BW - Go to add
	2. BW - Add Vault (Create, Let Start)
	3. BW - On Vault Key click on Create New, then save your seed recovery
	4. BW - You can click on share your xpub
2. Link your XPUB to your polkadot address
	1. Go to https://portal-dev.hashed.systems/nbv and login using polkadotJS
	2. Go to "Extended Keys" and go through userflow to import your XPUB (Scan QR from BW or write manually)
	3. Click on set Xpub
3. Create a new vault
	1. Go to My Vaults on portal and click on "Create vault"
	2. Fill in the form with all settings you want to your new vault (label, cosigners, threshold, etc)
4. Fund your vault (To create proposals (to move the vault's funds) the vault must have a balance greater than 0 sats)
	1. On "My Vaults" you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Get receive address" to see the address you send Sats to from other wallet
5. Import vault on BW
	1. On "My Vaults" you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Export descriptor"
	4. BW - Click on "Add", then on "Import wallet" and finally on "Scan or import file"
	5. BW - Scan the descriptor QR from NBV
	6. BW - Click on your new vault and go to "Manage keys"
	7. BW - Find your Xpub and click on "I have a seed for this key" 
	8. BW - Write your seed and click on "Import"
	9. BW - Click on Save
6. Create a new proposal
	1. Click on "My Vaults", then you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Create proposal" 
	4. Fill in the form to create a new proposal (Description, recipient address, amount)
	5. Click on "Create proposal"
	6. You can see the details by clicking on an item from the proposal list
7. Sign, Finalize and Broadcast a proposal
	1. Click on proposal details of the proposal you want to sign
	2. Click on Sign PSBT
	3. BW - Click on your vault then click on "Send"
	4. BW - Click on "..." (More options)
	5. BW - Click on "Sign a transaction"
	6. BW - Scan the QR codes from NBV
	7. BW - When "Co-sign this transaction?" appears click on "YES"
	8. BW - Click on "Provide signature" (Should appear a dynamic QR)
	9. On NBV click on "Continue"
	10. Scan the QR codes from BW on NBV
	11. Click on Save (Save your signed PSBT)
	12. In this section there are "Finalize" and "Broadcast" buttons, to click on these buttons the following rules must be followed:
		1. To Finalize, the threshold must be passed
		2. To Broadcast, the proposal must be Finalized before
