
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

### Sections
 <!-- <a href="#refLogin">How to Login</a> -->
[How to login](#refLogin)
  - [Polkadot extension](#polkadot-extension)
  - [Hashed Confidential Docs](#hashed-confidential-docs-google-signin)

 <a href="#refCreateXPUB">How to create and link a new xpub</a>

 <a href="#refCreateVault">How to create a new vault</a>

 <a href="#refExportVault">How to export your vault and import on Blue Wallet</a>

 <a href="#refDepositVault">How to deposit to vault</a>

 <a href="#refCreateProposal">How to create a proposal</a>

[How to sign a proposal](#how-to-sign-a-proposal)
  - [With Blue Wallet](#with-blue-wallet)
  - [With Google Account](#with-hashed-confidential-docs)

[How to create a Proof of Reserves](#how-to-sign-a-proposal)
- [With Hashed Confidential Docs](#with-hashed-confidential-docs-1)

[How to sign Proof of Reserves](#how-to-sign-proof-of-reserves)
- [With Hashed Confidential Docs](#with-hashed-confidential-docs-2)

 <a href="#refFinalizeProposal">How to finalize and broadcast a proposal.</a>

<hr>
<div id="refLogin"></div>

### How to Login
#### Polkadot extension
First, we need to access to the Hashed Network Portal <a href="https://hashed.club/login" target="blank">site</a>.

<div style="text-align: center">
<img src="./assets/login_screen.png" style="width: 30vw; min-width: 250px">
</div>

1. If you have more of one account imported on **Polkadot extension** you can choose an account.
    <div style="text-align: center">
    <img src="./assets/portal_choose_account_login.png" style="width: 30vw; min-width: 250px">
    </div>

2. Click "Login" button
    <div style="text-align: center">
    <img src="./assets/portal_login_btn.png" style="width: 30vw; min-width: 250px">
    </div>

3. Sign transaction (You must write your account password)
    <div style="text-align: center">
    <img src="./assets/sign_message.png" style="width: 30vw; min-width: 250px">
    </div>

    **Note:** You can activate the checkbox **Remember my password for the next 15 minutes** to sign transactions easier.

4. If you logged correctly you will see the following screen.
    <div style="text-align: center">
    <img src="./assets/nbv_home_screen.png" style="width: 30vw; min-width: 250px">
    </div>


<hr/>

#### Hashed Confidential Docs (Google Signin)

First, we need to access to the Hashed Network Portal [site](https://hashed.club/login).

<div style="text-align: center">
<img src="./assets/login_screen.png" style="width: 30vw; min-width: 250px">
</div>

1. Click "Google Sign In" button
    <div style="text-align: center">
    <img src="./assets/hcd_login_btn.png" style="width: 30vw; min-width: 250px">
    </div>

2. Choose an Google Account.
    <div style="text-align: center">
    <img src="./assets/hcd_choose_account.png" style="width: 30vw; min-width: 250px">
    </div>

3. Confirm "Sign Payload" modal

    **Note:** If is the first time login into portal.
    <div style="text-align: center">
      <img src="./assets/hcd_login_sign_payload.png" style="width: 40vw; min-width: 250px">
    </div>

4. Confirm "Call extrinsic" modal

    **Note:** If is the first time login into portal.
    <div style="text-align: center">
      <img src="./assets/hcd_login_call_extrinsic.png" style="width: 40vw; min-width: 250px">
    </div>

5. If you logged correctly you will see the following screen.
    <div style="text-align: center">
    <img src="./assets/nbv_home_screen.png" style="width: 30vw; min-width: 250px">
    </div>

<br>

<div id="refCreateXPUB"></div>

### How to create a new xpub.
To create and link a new xpub we have two options:

* [Create a new xpub from NBV](#createANewXpubFromNBV): Create a new xpub and link to your polkadot account using **Hashed portal web** (recommended).

* [Create a new xpub from Blue Wallet App](#createANewXpubFromBW): Create a new xpub using **Blue Wallet App** then you have to [Link your xpub](#refLinkXPUB) using the portal.

<hr>
<div id="createANewXpubFromNBV"></div>

### How to create a new xpub from NBV (Option 1 recommended).

1. Go to *Extended Keys* page in the portal.
    <div style="text-align: center">
    <img src="./assets/nbv_header_options.png" style="width: 30vw; min-width: 250px">
    </div>

2. Click *Generate a new XPUB* button.
    <div style="text-align: center">
    <img src="./assets/nbv_manage_keys_screen.png" style="width: 30vw; min-width: 250px">
    </div>

3. Save your ***Seed*** in a safe place then click on **I saved my seed in a safe place**.

    **Important:** Not share this Seed with anyone, this value is required to sign transactions using your XPUB on Blue Wallet app.

    **Note:** This image is just an example.

    **Note:** If you aren't familiar with any concepts, we suggest reading the <a href="#refConcepts">last section</a> first.

    <div>
    <img src="./assets/nbv_seed_screen.png" style="width: 30vw; min-width: 250px">
    </div>

4. Sign the transaction using polkadot extension.

5. Now you have created a new Xpub linked to your polkadot account.
<div style="text-align: center">
<img src="./assets/nbv_manage_key_with_xpub_screen.png" style="width: 30vw; min-width: 250px">
</div>

#### Hashed Confidential Docs
1. Go to *Extended Keys* page in the portal.
    <div style="text-align: center">
    <img src="./assets/nbv_header_options.png" style="width: 30vw; min-width: 250px">
    </div>

2. Click *Link XPUB* button.
    <div style="text-align: center">
    <img src="./assets/hcd_link_xpub.png" style="width: 30vw; min-width: 250px">
    </div>
3. Click "Confirm" button to sign the extrinsic
<div style="text-align: center">
  <img src="./assets/hcd_sign_extrinsic.png" style="width: 30vw; min-width: 250px">
</div>

4. Now you have created a new Xpub linked to your polkadot account.
<div style="text-align: center">
<img src="./assets/hcd_xpub.png" style="width: 30vw; min-width: 250px">
</div>

<hr>

<div id="createANewXpubFromBW"></div>

### How to create a new xpub from Blue Wallet (Option 2)

**Note:** You can create a new xpub from NBV web application (recommended) <a href="#createANewXpubFromNBV">How to create a new xpub from NBV web</a>.

1. Open Blue Wallet App on your mobile, we will see a similar screen to the following.
	* Tap on ➕ button on top-right corner.
<div style="text-align: center">
<img src="./assets/bw_home.png" style="width: 30vw; min-width: 250px">
</div>

2. Once taped on add button, we should see the following screen
	* Tap on Vault
	* Tap on ***Create*** button
<div style="text-align: center">
<img src="./assets/bw_xpub_create_vault.png" style="width: 30vw; min-width: 250px">
</div>

3. Tap on ***Let's start*** button.
<div style="text-align: center">
<img src="./assets/bw_let_start_screen.png" style="width: 30vw; min-width: 250px">
</div>

4. Tap on ***Create new*** button.
<div style="text-align: center">
<img src="./assets/bw_create_new_vault_key.png" style="width: 30vw; min-width: 250px">
</div>

5. Save your ***Seed*** in a safe place.

    **Important:** Not share this Seed with anyone, this value is required to sign transactions using your XPUB.

    **Note:** This image is just an example.

    **Note:** If you aren't familiar with any concepts, we suggest reading the <a href="#refConcepts">last section</a> first.

<div style="text-align: center">
<img src="./assets/bw_seed_screen.png" style="width: 30vw; min-width: 250px">
</div>

6. Tap on ***Share*** button.
<div style="text-align: center">
<img src="./assets/bw_share_vault_key.png" style="width: 30vw; min-width: 250px">
</div>

7. Take a screenshot of XPUB qr (just as backup) also we can click on ***Share*** button and save the json was generated.
<div style="text-align: center">
<img src="./assets/bw_sharing_key_vault.png" style="width: 30vw; min-width: 250px">
</div>

<hr />

<div id="refLinkXPUB"></div>

### How to link your XPUB from Blue Wallet (Just valid when you create an Xpub from Blue Wallet)
1. Go to "Extended Keys" page.
<div style="text-align: center">
<img src="./assets/nbv_extended_keys_screen.png" style="width: 30vw; min-width: 250px">
</div>

2. Click "Scan XPUB from Blue Wallet" button.
3. Open on your mobile the XPUB qr you got on previous steps.

    ***Note:*** If you don't have an XPUB yet please review <a href="#refCreateXPUB">How to create a new XPUB from Blue Wallet</a>.

    ***Note:*** This image is just an example.

<div style="text-align: center">
<img src="./assets/bw_sharing_key_vault.png" style="width: 30vw; min-width: 250px">
</div>

4. Scan the XPUB qr.

  **Note:** You must allow camera permission to scan qr.

<div style="text-align: center">
<img src="./assets/nbv_scanning_xpub.png" style="width: 30vw; min-width: 250px">
</div>

5. Sign transaction using polkadot extension.

6. Now you should see the next screen
<div style="text-align: center">
<img src="./assets/nbv_added_xpub_screen.png" style="width: 30vw; min-width: 250px">
</div>

<hr/>

<div id="refCreateVault"></div>

### How to create a new vault

1. Go to "My Vaults" page.
2. Click "Create vault" button.
<div style="text-align: center">
<img src="./assets/nbv_vault_list.png" style="width: 30vw; min-width: 250px" />
</div>

3. Fill out the form with the following fields.
    * Title (Label)
    * Number of cosigners: Number of cosigners allowed to sign a proposal.
    * Minimum threshold: Minimum number of signatures needed to finalize a proposal.
    * Cosigners address
    * Include owner as cosigner (Default selected)
<div style="text-align: center">
<img src="./assets/nbv_create_vault.png" style="width: 30vw; min-width: 250px" />
</div>

4. Click "Create vault" button
5. Sign transaction using polkadot extension.
6. Now you can find your new vault on "My vaults" page

<hr/>

<div id="refExportVault"></div>

### How to export your vault and import on Blue Wallet

1. Go to "My vaults" page.
2. Click the vault you want to see details.
<div style="text-align: center">
<img src="./assets/nbv_click_to_see_details_vault.png" style="width: 30vw; min-width: 250px" />
</div>

3. You should see the next screen.
<div style="text-align: center">
<img src="./assets/nbv_vault_details_screen.png" style="width: 30vw; min-width: 250px" />
</div>

4. Click "Export descriptor" button.
<div style="text-align: center">
<img src="./assets/nbv_vaults_card.png" style="width: 30vw; min-width: 250px" />
</div>

5. You should see the next screen.

    **Note:** Please follow the steps showed on the modal.

    **Note:** If you followed successfully the modal steps you can skip the followings steps to export the vault.

<div style="text-align: center">
<img src="./assets/nbv_export_descriptor.png" style="width: 30vw; min-width: 250px" />
</div>

6. Go to home screen on Blue wallet app.
<div style="text-align: center">
<img src="./assets/bw_home.png" style="width: 30vw; min-width: 250px" />
</div>

7. Tap on ➕ button positioned on top right corner.
8. Top on "Import wallet" button.
<div style="text-align: center">
<img src="./assets/bw_add_wallet.png" style="width: 30vw; min-width: 250px" />
</div>

9. Tap on "Scan or import a file".
10. Scan this qr from Blue Wallet.
    **Note:** You must allow camera permissions to scan qr.
11. You should see the vault from Blue Wallet
<div style="text-align: center">
<img src="./assets/bw_vault_list.png" style="width: 30vw; min-width: 250px" />
</div>

**Note:** ***To sign transactions you need to write the SEED of your xpub***

12. On Blue Wallet click on a vault to see details, you should see the next screen.

<div style="text-align: center">
<img src="./assets/bw_vault_details.png" style="width: 30vw; min-width: 250px" />
</div>

13. Click "Manage Keys" button.

14. Click "I have a seed for this key" option for your respective XPUB.

<div style="text-align: center">
<img src="./assets/bw_manage_key.png" style="width: 30vw; min-width: 250px" />
</div>

15. Write your SEED and click on Save.
<div style="text-align: center">
<img src="./assets/bw_write_seed_screen.png" style="width: 30vw; min-width: 250px" />
</div>

<hr/>

<div id="refDepositVault"></div>

### How to deposit to vault

1. Go to "My vaults" page.
2. Click the vault you want to transfer to see details.

3. Get **receive address** to transfer btc to vault from your preferred wallet.
     * Using QR
        1. Click "Refresh and show qr" button.
        2. Scan this qr from your preferred wallet to transfer founds.

     * Using Address
        1. Click "Refresh and copy" button.

        2. Use this address to transfer founds from your preferred wallet.
<div style="text-align: center">
<img src="./assets/nbv_receive_address.png" style="width: 30vw; min-width: 250px" />
</div>

4. Click **Refresh** button positioned on bottom right corner to confirm the sats was received successfully.
<div style="text-align: center">
<img src="./assets/nbv_refresh_button.png" style="width: 30vw; min-width: 250px" />
</div>
<div style="text-align: center">
<img src="./assets/nbv_balance_widget.png" style="width: 30vw; min-width: 250px" />
</div>



<hr/>

<div id="refCreateProposal"></div>

### How to create a proposal

*Note:* The vault balance must be greather than 546 sats to create a proposal.

1. Go to *Vault Details* page.
2. Click "Create proposal" button.
<div style="text-align: center">
<img src="./assets/nbv_crate_proposal_btn.png" style="width: 30vw; min-width: 250px" />
</div>

3. Fill out the form with the following fields:
    * Amount
    * Recipient address
    * Description
<div style="text-align: center">
<img src="./assets/nbv_create_proposal.png" style="width: 30vw; min-width: 250px" />
</div>

4. Click "Create proposal" button.
5. Sing transaction using polkadot extension.
6. You should see your new proposal on *Vault Details* screen.
<div style="text-align: center">
<img src="./assets/nbv_proposals_list.png" style="width: 30vw; min-width: 250px" />
</div>

<hr/>

<div id="refSignProposal"></div>

### How to sign a proposal.
#### With Blue Wallet

**Note:** Remember to import the vault on Blue Wallet app if you have't already.

1. Go to "My Vaults" page.
2. Click the vault that contains the proposal you want to sign, now we are on *Vault details* screen.
3. Click the proposal you want to sign, now we are on *Proposal details* screen.
4. Click "Sign PSBT" button.
<div style="text-align: center">
<img src="./assets/nbv_sign_psbt_button.png" style="width: 30vw; min-width: 250px" />
</div>

5. You should see the next screen.

    **Note:** Please follow the steps showed on the modal.

    **Note:** If you followed successfully the modal steps you can skip the followings steps to sign a proposal.

<div style="text-align: center">
<img src="./assets/nbv_signing_psbt_1.png" style="width: 30vw; min-width: 250px" />
</div>

6. On Blue Wallet go to home screen and click on previously imported vault.
<div style="text-align: center">
<img src="./assets/bw_vault_details.png" style="width: 30vw; min-width: 250px" />
</div>

7. Tap on "Send" button.
8. Tap on "..." button, positioned on top right corner.
9. Tap on "Sign a transaction" option.
    **Note:** If this option is not available please confirm you have imported your seed correctly on Blue Wallet. [Tutorial](#refExportVault)

<div style="text-align: center">
<img src="./assets/bw_sign_a_transaction_btn.png" style="width: 30vw; min-width: 250px" />
</div>

10. Scan this qr from Blue Wallet.
<div style="text-align: center">
<img src="./assets/bw_scanning_descriptor.png" style="width: 30vw; min-width: 250px" />
</div>

11. When appear "Co-sign this transaction" message tap on "Yes" button.
<div style="text-align: center">
<img src="./assets/bw_cosign_transaction.png" style="width: 30vw; min-width: 250px" />
</div>

12. Tap on "Provide signature" button, now you should see a QR.
<div style="text-align: center">
<img src="./assets/bw_provide_signature.png" style="width: 30vw; min-width: 250px" />
<img src="./assets/bw_qr_psbt_signed.png" style="width: 30vw; min-width: 250px" />
</div>

13. From web app click on "Continue" button.
<div style="text-align: center">
<img src="./assets/nbv_signing_psbt_1.png" style="width: 30vw; min-width: 250px" />
</div>

14. Scan QR generated from Blue Wallet on Web app.
<div style="text-align: center">
<img src="./assets/nbv_signing_psbt_2.png" style="width: 30vw; min-width: 250px" />
</div>

15. Sign transaction using polkadot extension.

#### With Hashed Confidential Docs
1. Go to "My Vaults" page.
2. Click the vault that contains the proposal you want to sign, now we are on *Vault details* screen.
3. Click the proposal you want to sign, now we are on *Proposal details* screen.
4. Click "Sign PSBT (HCD)" button.
<div style="text-align: center">
<img src="./assets/hcd_nbv_sign_psbt_button.png" style="width: 50vw; min-width: 250px" />
</div>

5. You should see the next modal and click confirm button to continue
<div style="text-align: center">
<img src="./assets/hcd_nbv_signing_psbt_1.png" style="width: 50vw; min-width: 250px" />
</div>

6. Click "Confirm" button to sign PSBT
<div style="text-align: center">
<img src="./assets/hcd_nvb_sign_psbt.png" style="width: 50vw; min-width: 250px" />
</div>

7. Click "Finish" button to save the sign PSBT
<div style="text-align: center">
<img src="./assets/hcd_nbv_signing_psbt_1.png" style="width: 50vw; min-width: 250px" />
</div>

8. Click "Confirm" button to call the extrinsic
<div style="text-align: center">
<img src="./assets/hcd_nbv_call_extrinsic.png" style="width: 50vw; min-width: 250px" />
</div>

<hr/>

### How to create a Proof of Reserves

#### With Hashed Confidential Docs
1. Go to "My Vaults" page.
2. Click a vault in vault list, we are on Vault details screen.
3. Scrool down to Proof of Reserves section.
4. Click "Create pool of reserves" button

    *Note:* The vault must have balance (sats) to create a proof of reserves.
    <div style="text-align: center">
      <img src="./assets/hcd_create_proof_of_reserves.png" style="width: 50vw; min-width: 250px" />
    </div>

5. Click "Confirm" button to sign the extrinsic
    <div style="text-align: center">
      <img src="./assets/hcd_create_pr_sign_extrinsic.png" style="width: 50vw; min-width: 250px" />
    </div>
6. Now you have created a new Proof of Reserves.
  <div style="text-align: center">
    <img src="./assets/hcd_pr_created.png" style="width: 50vw; min-width: 250px" />
  </div>

### How to sign Proof of Reserves
#### With Hashed Confidential Docs
1. Go to "My Vaults" page.
2. Click a vault in vault list, we are on Vault details screen.
3. Scrool down to Proof of Reserves section.
4. Click the proof of reserve in the list, now we are on *Proof of Reserves Details* screen.
5. Click "Sign PSBT" button.
<div style="text-align: center">
<img src="./assets/hcd_sign_psbt_pr.png" style="width: 30vw; min-width: 250px" />
</div>
6. You should see the next modal and click "Continue" button to continue
<div style="text-align: center">
<img src="./assets/hcd_sign_psbt_pr_2.png" style="width: 30vw; min-width: 250px" />
</div>
7. Click "Confirm" button to sign PSBT
<div style="text-align: center">
<img src="./assets/hcd_sign_psbt_pr_2.png" style="width: 30vw; min-width: 250px" />
</div>
8. Click "Finish" Button to save signed PSBT
<div style="text-align: center">
<img src="./assets/hcd_sign_psbt_pr_2.png" style="width: 30vw; min-width: 250px" />
</div>

9. Click "Confirm" button to save
<div style="text-align: center">
<img src="./assets/hcd_call_extrinsic_pr.png" style="width: 30vw; min-width: 250px" />
</div>


<div id="refFinalizeProposal"></div>

### How to finalize and broadcast a proposal.

**Note:** Remember to import the vault on Blue Wallet app if you have't already.

**Note:** To finalize and broadcast a proposal make sure the threshold of multisignature has been met. To sign a proposal review  <a>previous</a> step.

1. Go to proposal page details.
<div style="text-align: center">
<img src="./assets/nbv_proposal_home.png" style="width: 30vw; min-width: 250px" />
</div>

2. Click "Finalize and Broadcast" button.
<div style="text-align: center">
<img src="./assets/nbv_finalize_btn.png" style="width: 30vw; min-width: 250px" />
</div>

3. Sign proposal using polkadot extension.
4. Now the proposal is doing broadcasted, in a few minutes you should see the proposal with *Broadcasted* status.

    **Note:** You can click on *Refresh* button positioned on bottom right corner to validate if the status has changed.
<div style="text-align: center">
<img src="./assets/nbv_refresh_button.png" style="width: 30vw; min-width: 250px" />
</div>
<div style="text-align: center">
<img src="./assets/nbv_broadcasted_status.png" style="width: 30vw; min-width: 250px" />
</div>

5. You can click on "Click to open explorer" link to see the transaction details in a btc explorer.
<div style="text-align: center">
<img src="./assets/nbv_see_transaction_details_btn.png" style="width: 30vw; min-width: 250px" />
<img src="./assets/nbv_btc_explorer.png" style="width: 30vw; min-width: 250px" />
</div>

<hr />
<div id="refConcepts"></div>


# **How to Safely Store Your Wallet**

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
