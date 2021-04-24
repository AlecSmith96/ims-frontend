import React from 'react'
import {Row} from 'react-bootstrap'

const Documentation = () => {
    return(
        <center>
            <p className="h2">Frequently Asked Questions</p>
            <div className="col-md-10">
                <Row>
                    <h4>How do I record a Supplier Order Delivery?</h4>
                </Row>
                <Row>
                    <ol className="lead text-left">
                        <p className="lead">Employee must be a <b>SUPERVISOR</b> or <b>ADMIN</b> to complete this task.</p>
                        <li>Check the invoice for the delivered supplier order to find the order number.</li>
                        <li>From the dashboard, click on the Supplier Orders button on the navbar.</li>
                        <li>On the Purchase Orders page, click the 'Record order delivery button'.</li>
                        <li>In the popup modal, enter the order number of the supplier order that has been delivered.</li>
                        <li>Press the submit order button.</li>
                    </ol>
                </Row>
                <Row>
                    <h4>How do I submit a waste report?</h4>
                </Row>
                <Row>
                    <ol className="lead text-left">
                        <p className="lead"><b>All</b> employees can:</p>
                        <li>From the dashboard, click on the 'Submit Waste Report' button in the bottom right corner.</li>
                        <li>In the new waste report window, enter the Sku number, reason for wastage and the quantity for each product.</li>
                        <li>When complete, click on the 'Submit Waste Report' button on the right side of screen.</li>
                        <li>The generated waste report will be sent to the manager email for your business.</li>
                    </ol>
                    <ol className="lead text-left">
                        <p className="lead">Employees that are <b>SUPERVISOR</b> or <b>ADMIN</b> can also:</p>
                        <li>Click on the Reports button on the navbar.</li>
                        <li>From the Reports dashboard, click on the 'Waste Reports' button.</li>
                        <li>Fill out the waste report in the same way as previously described.</li>
                    </ol>
                </Row>
                <Row>
                    <h4>How do I submit a new supplier order?</h4>
                </Row>
                <Row>
                    <ol className="lead text-left">
                        <p className="lead">Employee must be a <b>SUPERVISOR</b> or <b>ADMIN</b> to complete this task.</p>
                        <li>Click on the 'Supplier Orders' button on the navbar.</li>
                        <li>On the Purchase Orders page, click on the 'Create New' button.</li>
                        <li>In the New Purchase Order popup form, select the products you wish to order from the search box.</li>
                        <li>When complete, click on the 'Submit Order' button.</li>
                        <li>An invoice will then be sent to the manager email for your business.</li>
                    </ol>
                </Row>
                <Row>
                    <h4>Where can I get the generated reports?</h4>
                </Row>
                <Row>
                    <p className="lead text-left">All reports will be sent to the manager email for the business, which is specified when the system is first set up.</p>
                </Row>
            </div>
            <p className="h2">User Documentation</p>
            <div className="col-md-10">
                <Row>
                    <h5>Dashboard</h5>
                </Row>
                <Row>
                    <p className="lead text-left">The dashboard is the homepage of the system and contains the main utility functions for the user. The table at the top of 
                    the page displays all products that are within 20 of their reorder threshold. This is to allow a higher degree of visibility of products 
                    that are low on stock to allow pre-emptive reordering of them if needed. The User Accounts functions contain different functions depending on the authority 
                    of the logged in user. If the user has an assigned authority of 'USER' then the only function available is to update their password to a new one. Any other 
                    users also have the ability to reset a different users password (All passwords are reset to 'password'), and update a users details, such as their email 
                    address, name and authority. To the right of the User Accounts section, there is a section to submit the Daily Waste Report.</p>
                </Row>
                <Row>
                    <h5>Product Lookup</h5>
                </Row>
                <Row>
                    <p className="lead text-left">The product lookup page provides an interface to allow the user to search for products and navigate to their details page. 
                    There are two methods that can be used to search for a product. If you know the Sku of the product you want to view, you can enter that into the search 
                    box at the top of the page and the system with redirect to that products details page immediately. If the products Sku is not known, you can search for 
                    it  by searching its name in the search table underneath the Sku search box. All products on record can be viewed by typing into the search box and then 
                    removing it, it does not display all products initially for performance reasons. Users that are SUPERVISOR's or ADMIN's also have access to manager 
                    functions, which in this case allow for adding a new product to the system, or filtering the lookup table by suspended products. This filter can then be 
                    turned off by selecting the 'View All Products' button that replaces the suspended products button after it is pressed.</p>
                </Row>
                <Row>
                    <h5>Product Details</h5>
                </Row>
                <Row>
                    <p className="lead text-left">The Product Details page is used to look up information regarding a specific product. Each product details page contains 
                    details including the Id number of the product, the Sku, Price, Current Inventory for the product, Reorder Threshold, Reorder Quantity and the Supplier 
                    for the product. As well as this, all Customer and Supplier orders that contain the product are displayed in tables below its details. The user can navigate 
                    to those specific order details pages by clicking on their entries in those tables. Users that are SUPERVISOR's or ADMIN's also have access to manager 
                    functions. These functions include updating the reorder threshold or reorder amount for the product, and suspending the product. A suspended product 
                    cannot be ordered by a customer or supplier.</p>
                </Row>
                <Row>
                    <h5>Customer Orders</h5>
                    <p className="lead text-left">The Customer orders page is used to look up and view customer orders. All orders in the system are listed in the table 
                    with the newest orders appearing first. Orders that appear yellow are orders that have been processed and shipped, and orders that appear blue are orders 
                    that have been delivered to the customer. If the user clicks on one of the orders in the table, the system will navigate to that orders details page. 
                    There is also a button at the top of the page to navigate to the Customer Search page.</p>
                </Row>
                <Row>
                    <h5>Customer Order Details</h5>
                    <p className="lead text-left">The Order Details page for a customer is used to display all details relating to the customer order. On the left hand side 
                    of the page, all the customer information is displayed, including the customers name and address, the order date and the status of the order. On the right 
                    side of the page, the order basket is displayed, showing all of the products that were ordered including their id number, name, and price. The total cost 
                    of the order is also displayed at the bottom of the table.</p>
                </Row>
                <Row>
                    <h5>Customer Search</h5>
                    <p className="lead text-left">The Customer Search page is used as a utility to look up a Customer Details page. The seach box can be used to search for a 
                    customer by their Title, First Name, Last Name, Email Address or Phone Number. When found, the user can click on their name in the table to navigate to 
                    their details page.</p>
                </Row>
                <Row>
                    <h5>Customer Details</h5>
                    <p className="lead text-left">The Customer details page is used to look up any details relating to the customer, including their name, address, email 
                    address, phone number, or any orders that they have created. All their orders are displayed in a table at the bottom of the page, and the user can 
                    navigate to that orders details page by clicking on it.</p>
                </Row>
                <Row>
                    <h5>Purchase Orders</h5>
                    <p className="lead text-left">The Purchase Orders page is only viewable by SUPERVISOR or ADMIN employees. It is used to look up specific supplier orders, 
                    create new supplier orders, record order deliveries or search for a specific supplier. The table lists all supplier orders in the system with the newest 
                    appearing first. Orders that appear yellow are orders that have been processed and shipped, and orders that appear blue have been delivered to the business.</p>
                </Row>
                <Row>
                    <h5>Create New Purchase Order Form</h5>
                    <p className="lead text-left">The New Purchase Order form is used to reorder products to be delivered to the store. Any products can be added to it from any 
                    supplier. Multiple products can be searched for by name and selected in the text field, and when all the wanted products are selected, it can be submitted 
                    using the 'Submit Order' button. Once submitted, the system will create separate supplier orders for each of the suppliers that supply products in the order, 
                    and invoices will be generated for each of them and sent to the manager email for the business.</p>
                </Row>
                <Row>
                    <h5>Record Order Delivery Form</h5>
                    <p className="lead text-left">The Record Order Delivery form is a simple form where the order number for a supplier order that has just been delivered to the 
                    store is entered, when submitted the system will update the order's status to DELIVERED and log the date it was delivered.</p>
                </Row>
                <Row>
                    <h5>Supplier Search</h5>
                    <p className="lead text-left">The Supplier Search page is used as a utility to look up a Suppliers Details page. The search box can be used to searcg for a
                    supplier by their id or name. The user can click on their entry in the table to navigate to their details page.</p>
                </Row>
                <Row>
                    <h5>Supplier Details</h5>
                    <p className="lead text-left">The Supplier details page is used to look up any details relating to the supplier, including their name, lead time for ordered
                    products to arrive at the store, and a list of orders for products from the supplier. The orders in the list can be selected to view the purchase order details
                    page for the order.</p>
                </Row>
                <Row>
                    <h5>Reports Dashboard</h5>
                    <p className="lead text-left">The Reports dashboard is only available for SUPERVISOR and ADMIN employees and is the central location for the generation of 
                    HTML reports. There are 4 different HTML reports that can be generated. Firstly, a Stock Movement report can be generated by selecting a start date and end date 
                    to generate a list of all stock that has either been bought from a supplier or sold to a customer during the timesframe given. Next, reports can be generated to 
                    show all customer or supplier orders from within a given time frame, these are called the Order Summary and Purchase Summary reports respectively. Finally, a 
                    Daily Waste report can be generated to log any stock that cannot be sold due to damage or going out of date.</p>
                </Row>
            </div>
        </center>
    )
}

export default Documentation;