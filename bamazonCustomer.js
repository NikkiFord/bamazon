const mysql = require("mysql");
const inquirer = require("inquirer");
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

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

let query = "SELECT * FROM products";
connection.query(query, function (err, results) {
    if (err) return console.log(err);
    console.table(results);
    searchId();
    // results.forEach(function(result){
    //     for (let key in result){
    //         console.log(`${key}: ${result[key]}`);
    //     }
    //     console.log();
    // })

});

function searchId() {
    inquirer
        .prompt({
            name: "id",
            type: "number",
            message: "What is the ID of the item you would like to purchase?"
        })
        .then(function (answer) {
            let query = "SELECT * FROM products WHERE ?";
            connection.query(query, { item_id: answer.id }, function (err, results) {
                if (err) return console.log(err);
                console.table(results);
                searchId();
            });
        });
}

