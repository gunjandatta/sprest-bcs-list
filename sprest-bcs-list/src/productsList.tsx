/// <reference path="../node_modules/gd-sprest/dist/gd-sprest.d.ts" />
import * as React from "react"
import { DetailsList } from "office-ui-fabric-react"

export interface IProduct {
    /**
     * Product Description
     */
    Description: string;

    /**
     * Product ID
     */
    ID: number;

    /**
     * Product Name
     */
    Name: string;

    /**
     * Product Release Date
     */
    ReleaseDate: string;

    /**
     * Product Discontinued Date
     */
    DiscontinuedDate?: string;

    /**
     * Product Rating
     */
    Rating: number;

    /**
     * Product Price
     */
    Price: number;
}

export interface IProductsList {
    /**
     * The product list items.
     */
    items: Array<IProduct>;
}

/**
 * Products List
 */
export class ProductsList extends React.Component<IProductsList, any> {
    /**
     * Renders the products list
     */
    render() {
        return (
            <DetailsList
                items={ this.props.items }
                onRenderItemColumn={ (item, index, column) => {
                    // See if this is the "Price" column
                    if(column.key == "Price") {
                        // Render as currency
                        return "$" + item[column.key].toFixed(2).replace(/(\d)(?=(\d{3})+\x)/g, "$1,");
                    }

                    // Return the item value
                    return item[column.key];
                }}
            />
        );
    }
}