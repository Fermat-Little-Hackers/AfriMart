import { NFTStorage, File } from 'nft.storage'
const NFT_STORAGE_KEY = 'key goes here'
async function storeNFT(image, name, description) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    return nftstorage.store({
        image,
         name, description
    });
}
async function main(image, name, description,) {
    const result = await storeNFT(image, name, description)
    console.log(result);
    return(result)
}

export default main;