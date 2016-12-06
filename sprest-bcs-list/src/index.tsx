/// <reference path="../node_modules/gd-sprest/dist/gd-sprest.d.ts" />
import * as React from "react"
import * as ReactDOM from "react-dom"
import { IProduct, IProductsList, ProductsList} from "./productsList"

declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

// Include the $REST library
var gd_sprest = require("../node_modules/gd-sprest/dist/gd-sprest.min.js");

// Ensure this is the SP Web
if(window["_spPageContext"]) {
    // Get the product information
    (new $REST.List("Products")).Items().execute((items:$REST.Types.IListItems) => {
        let products:IProductsList = { items: [] };

        // Parse the items
        for(let item of items.results) {
            products.items.push({
                ID: item["ID"],
                Name: item["Name"],
                Description: item["Description"],
                Price: item["Price"],
                Rating: item["Rating"],
                ReleaseDate: item["ReleaseDate"],
                DiscontinuedDate: item["DiscontinuedDate"]
            })
        }

        // Render the list
        ReactDOM.render(<ProductsList items={ products.items } />, document.querySelector("#main"));
    });
} else {
    // Create sample data
    let products:IProductsList = {
        items: [
            {
                ID: 1,
                Name: "Product 1",
                Description: "This is a description for product 1.",
                Price: 5000,
                Rating: 4.3,
                ReleaseDate: "January 2015",
                DiscontinuedDate: "Fall 2017"
            },
            {
                ID: 2,
                Name: "Product 2",
                Description: "This is a description for product 2.",
                Price: 500,
                Rating: 2.3,
                ReleaseDate: "January 2014"
            },
            {
                ID: 3,
                Name: "Product 3",
                Description: "This is a description for product 3.",
                Price: 50.25,
                Rating: 4.5,
                ReleaseDate: "January 2013"
            },
            {
                ID: 4,
                Name: "Product 4",
                Description: "This is a description for product 4.",
                Price: 589237487329823.99,
                Rating: 3.3,
                ReleaseDate: "January 2017",
                DiscontinuedDate: "Fall 2019",
            },
            {
                ID: 5,
                Name: "Product 5",
                Description: "This is a description for product 5.",
                Price: 234.83,
                Rating: 5,
                ReleaseDate: "January 2012"
            },
        ]
    }

    // Render the products list
    ReactDOM.render(<ProductsList items={ products.items } />, document.querySelector("#main"));
}
