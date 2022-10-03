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

# Userflow guide for NBV
First we have to create a multi signature XPUB, to create a new one we are going to use Blue Wallet.

### Create XPUB
	1. BW - Go to add
	2. BW - Select "Vault"
	3. BW - Tap on "Create"
	4. BW - Tap on "Let's start"
	5. BW - Tap on "Create New"
	6. Save your new Seed key in a safe place.
	7. Tap on "Done"
	8. Save QR of the XPUB (Take Screenshot)

### Link your XPUB to your polkadot address
	1. Go to https://portal-dev.hashed.systems/nbv
	2. Login using polkadotJS
	3. Go to "Extended Keys"
	4. Click on Scanner icon
	5. Scan your multi signature XPUB (Here we will use the screenshot we saved before)
	6. Click on "Set Xpub" button
### Create a new vault
	1. Go to My Vaults on portal and click on "Create vault"
	2. Fill in the form with all settings you want to your new vault (label, cosigners, threshold, etc)
### Transfer sats to vault
	1. On "My Vaults" you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Get receive address" to see the address you send Sats to from other wallet
### Import vault on Blue Wallet
	1. On "My Vaults" you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Export descriptor"
	4. Blue Wallet - Click on "Add", then on "Import wallet" and finally on "Scan or import file"
	5. Blue Wallet - Scan the descriptor QR from NBV
	6. Blue Wallet - Click on your new vault and go to "Manage keys"
	7. Blue Wallet - Find your Xpub and click on "I have a seed for this key" 
	8. Blue Wallet - Write your seed and click on "Import"
	9. Blue Wallet - Click on Save
### Create a new proposal
**Note:** The vault must have a balance greater than 0 sats

	1. Click on "My Vaults", then you can see a list of all vaults where you are cosigner or owner
	2. Click on a vault to see details
	3. Click on "Create proposal" 
	4. Fill in the form to create a new proposal (Description, recipient address, amount)
	5. Click on "Create proposal"
	6. You can see the details by clicking on an item from the proposal list
### Sign, Finalize and Broadcast a proposal
	1. Click on proposal details of the proposal you want to sign
	2. Click on Sign PSBT
	3. Blue Wallet - Click on your vault then click on "Send"
	4. Blue Wallet - Click on "..." (More options)
	5. Blue Wallet - Click on "Sign a transaction"
	6. Blue Wallet - Scan the QR codes from NBV
	7. Blue Wallet - When "Co-sign this transaction?" appears click on "YES"
	8. Blue Wallet - Click on "Provide signature" (Should appear a dynamic QR)
	9. On NBV click on "Continue"
	10. Scan the QR codes from Blue Wallet on NBV
	11. Click on Save (Save your signed PSBT)
	12. In this section there are "Finalize" and "Broadcast" buttons, to click on these buttons the following rules must be followed:
		1. To Finalize, the threshold must be passed
		2. To Broadcast, the proposal must be Finalized before
