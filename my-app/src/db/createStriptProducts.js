import Stripe from 'stripe'
import dotenv from 'dotenv'
import {data} from './data.js'
import { writeFile } from 'fs/promises';

dotenv.config()
const stripe = Stripe(process.env.STRIPE_SECRET);

// You can't delete products apparently. Archiving is the way.
const deleteAllProducts = async (products) => {
    for (const product of products["data"]) {
        await stripe.products.del(product["id"]);
    }
}

const archiveAllProducts = async (products) => {
    for (const product of products["data"]) {
        await stripe.products.update(product["id"], {
            active: false
        });
    }
}

const toCents = (price) => {
    return price.replace(/[$.]/g, '');
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const insertAllProductsFromData = (data) => {
//     for (const element of data) {
//         const defaultPrice = toCents(element["newPrice"]);
//         const highPrice = toCents(element["prevPrice"]);
//         const imageURLs = [element["img"]];
//         const title = element["title"];

//         const product = await stripe.products.create({
//             name: title,
//             default_price_data: {
//                 unit_amount: defaultPrice,
//                 currency: 'usd',
//             },
//             images: imageURLs
//         })

//         const oldPrice = await stripe.prices.create({
//             unit_amount: highPrice,
//             currency: 'usd',
//             product: product.id,
//         });
//         console.log(product);
//         console.log(oldPrice);
//         await sleep(100)
//     }
// }

const addProductIDsToData = async (data) => {
    for (const ele of data) {
        const products = await stripe.products.search({
            query: `active:\'true\' AND name~\"${ele["title"]}\"`,
          });
        ele["id"] = products["data"][0]["id"]
    }

    const fileContent = `export const data = ${JSON.stringify(data, null, 2)};\nexport default data;`;
    await writeFile('./dataTest.js', fileContent);
    console.log('data.js has been written')
}

const allProducts = await stripe.products.list({
    active:true,
    limit:100
  });

addProductIDsToData(data)  