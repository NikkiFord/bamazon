const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Starbuck6!",
    database: "bamazon"
});

connection.queryAsync = util.promisify(connection.query.bind(connection));

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

let query = "SELECT * FROM products";

const context = {};

function run() {
    connection.queryAsync(query)
        .then(function (results) {
            console.table(results);
            return inquirer
                .prompt({
                    name: "id",
                    type: "number",
                    message: "What is the ID of the item you would like to purchase?"
                });
        })
        .then(function (answer) {
            let query = "SELECT * FROM products WHERE ?";
            context.id = answer.id;
            return connection.queryAsync(query, { item_id: answer.id });
        })
        .then(function (results) {
            console.table(results);
            return inquirer
                .prompt({
                    name: "quantity",
                    type: "number",
                    message: "What is the quantity you would like to purchase?"
                });
        })
        .then(function (answer) {
            let query = "SELECT stock_quantity, price, product_name FROM products WHERE ?";
            context.quantity = answer.quantity;
            return connection.queryAsync(query, { item_id: context.id });
        })
        .then(function (results) {
            let stockQuantity = results[0].stock_quantity;
            context.price = results[0].price;
            context.productName = results[0].product_name;
            if (context.quantity > stockQuantity) {
                throw new Error("Insufficient quantity!");
            }
            let updatedQuantity = stockQuantity - context.quantity;
            let query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
            return connection.queryAsync(query, [updatedQuantity, context.id]);
        })
        .then(function () {
            let query = "SELECT * FROM products WHERE ?";
            return connection.queryAsync(query, { item_id: context.id });
        })
        .then(function (results) {
            console.table(results);
            let totalPrice = Math.round((context.quantity * context.price) * 100) / 100
            console.log(`The cost of ${context.quantity} ${context.productName} is \$${totalPrice}`);
            setTimeout(run, 4000);
        })
        .catch(function (err) {
            console.log(err);
            run();
        });
}
run();