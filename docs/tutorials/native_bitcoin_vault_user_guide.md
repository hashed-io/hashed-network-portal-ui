
# Native Bitcoin Vault User Guide

This tutorial will go through NBV user flow! The following tutorials will show some words highlighted in blue. If you click on them, they will take you to an external page if that is the case, or they will redirect you to some section of this document.

### Requeriments
* Install one of the following browsers:
    * Firefox -> Download <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">here</a>.
    * Google chrome -> Download <a href="https://www.google.com/chrome/" target="_blank">here</a>.
* Install polkadot{.js} extension -> Download <a href="https://polkadot.js.org/extension/" target="_blank">here</a>.
* Install BlueWallet on your mobile
-> Download <a href="https://bluewallet.io/" target="_blank">here</a>
    
**Note:** If you aren't familiar with any concepts, we suggest reading the <a href="#refConcepts">last section</a> first.

**Note:** If you are starting with BlueWallet or Polkadot{JS} you can go through the following tutorials.
 * Create an account using <a>Polkadot{JS}</a>
 * Create an account using <a>Blue Wallet</a>
<hr>

First, we need to access to the Hashed Network Portal <a href="https://portal-dev.hashed.systems/login" target="_blank">site</a>.

<div style="text-align: center">
<img src="./assets/login_screen.png" style="width: 30vw; min-width: 250px">
</div>

1. Login using polkadot {JS}
    * Choose an account
    * Click on "Login" button
    * Sign transaction (You must write your account password)
<div style="text-align: center">
<img src="./assets/sign_message.png" style="width: 30vw; min-width: 250px">
</div>

2. If you logged correctly you will see the following screen.
<div style="text-align: center">
<img src="./assets/sign_message.png" style="width: 30vw; min-width: 250px">
</div>

* Click on "Extended Keys"





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


<div id="refConcepts"></div>

# **How to Safely Store Your Wallet**

--- 
In the following tutorial, we'll talk about some concepts related to wallets & keys so you can be familiar with them.

- ### **About Keys**

You will be given two kinds of keys: a public key, which functions similar to an email address (you may safely share it with others, enabling you to send and receive payments), and a private key, which is often a string of letters and numbers (and which is not to be shared with anyone). 

- ### **What is a private key?**

A `private key` is a secret string of letters and numbers that allows you to access and manage your cryptocurrency funds. It is like a password that proves your ownership of your cryptocurrency.

-  ### **About Wallets**

Just like your bank PIN, keeping your private keys safe is important! Store them offline somewhere safe. Some investors keep their private keys on a computer that isn't connected to the internet, written on pieces of paper, or even just memorized.

A common misconception in cryptocurrency regarding wallets is that they store tokens. However, a wallet is used to store private keys in an encrypted file to sign transactions. Therefore, wallets don't serve as a storage medium for tokens.

A user builds a transaction object, usually through an interface (`Proxy website`), sends that object to the wallet to be signed (`Anchor Wallet`); the wallet then returns that transaction object with a signature which is then broadcast to the network. When/if the network confirms that the transaction is valid, it is included in a blockchain block.

- ### **Where To Store Private Keys?**

1. **Hardware Wallets:**  Use hardware wallets to keep your private keys safe. A hardware wallet is a flash drive-like device designed specifically for storing your private keys.

2. **Online? AT YOUR OWN RISK!:** It's not recommended to keep private keys online, in the mail, or in the cloud because they are most susceptible to getting hacked there. Many users take screenshots of their private keys, and their photo album is usually synced online. This previous action creates a security risk and is something you should do at your own risk.

3. **Offline Flash drive:** If you don't have a hardware wallet, you can temporarily keep your private keys or seed in an offline flash drive or HDD. But these options are only safe as long as they aren't in the hands of an attacker. 

4. **Paper wallet:** A paper wallet is free and is just a piece of paper that prints the pair of private and public keys on it. 

5. **Memorize it:** It's hard to memorize your private key. 

We hope these insights will help you make the best decision for yourself and also help you secure your private keys.

<style>
.image1: {
    width: 100px
}
</style>
