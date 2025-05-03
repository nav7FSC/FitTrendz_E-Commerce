import Stripe from 'stripe'
import dotenv from 'dotenv'
import data from './data.js'
import { writeFile } from 'fs/promises';

dotenv.config()
const stripe = Stripe(process.env.STRIPE_SECRET);

// You can't delete products apparently. Archiving is the way.
// const deleteAllProducts = async (products) => {
//     for (const product of products["data"]) {
//         await stripe.products.del(product["id"]);
//     }
// }

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

// adds all products from data into Stripe
const insertAllProductsFromData = async (data) => {
    for (const element of data) {
        const defaultPrice = toCents(element["newPrice"]);
        const highPrice = toCents(element["prevPrice"]);
        const imageURLs = [element["img"]];
        const title = element["title"];

        const product = await stripe.products.create({
            name: title,
            default_price_data: {
                unit_amount: defaultPrice,
                currency: 'usd',
            },
            images: imageURLs
        })
        element["id"] = product["id"];
        const oldPrice = await stripe.prices.create({
            unit_amount: highPrice,
            currency: 'usd',
            product: product.id,
        });
        element["price"] = oldPrice["id"];
        console.log(product);
        console.log(oldPrice);
        await sleep(100)
    }
}

const addProductIDsToData = async (data) => {
    await sleep(2000 * 60) // using stripe search after writing new data requires a pause to fully update the search with new items
    for (const ele of data) {
        const products = await stripe.products.search({
            query: `active:\'true\' AND name:"${ele["title"]}"`,
          });
        // const products = await stripe.products.list({ // best for read-write but not ordered
        //     limit: 100,
        //     active: true
        // })
        console.log("Products are below:\n")
        console.log(ele["title"])
        console.log(products)
        console.log(products["data"])
        console.log(products["data"][0])
        ele["id"] = products["data"][0]["id"]
    }
    const dataWithPrices = await addPriceToData(data)

    const fileContent = `export const data = ${JSON.stringify(dataWithPrices, null, 2)};\nexport default data;`;
    await writeFile('./dataTest.js', fileContent);
    console.log('data.js has been written')
}

// used in products ids no need to use seperatly
const addPriceToData = async (data) => {
    for (const ele of data) {
        const product = await stripe.products.retrieve(ele["id"]);
        ele["price"] = product["default_price"];
        // console.log(ele);
    }
    return data;
  }

const allProducts = await stripe.products.list({
    active:true,
    limit:100
  });


await archiveAllProducts(allProducts)
await insertAllProductsFromData(data)
await addProductIDsToData(data)  
