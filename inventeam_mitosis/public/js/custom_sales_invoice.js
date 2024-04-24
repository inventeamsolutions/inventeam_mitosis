frappe.ui.form.on("Sales Invoice", {
    customer: function(frm) {
        fetchBalance(frm);
    }
});

function fetchBalance(frm) {
    var customer = frm.doc.customer;
    if (customer) {
        frappe.call({
            method: 'inventeam_mitosis.get_balance.get_customer_balance',
            args: {
                customer: customer
            },
            callback: function(response) {
                if (response.message !== null && response.message !== undefined) {
                    var customer_balance = response.message;
                    var formatted_balance = formatCustomerBalance(customer_balance);
                    frm.set_value('customer_balance', formatted_balance);
                    refresh_field('customer_balance');
                }
            }
        });
    } else {
        frm.set_value('customer_balance', '');
        refresh_field('customer_balance');
    }
}

function formatCustomerBalance(customer_balance) {
    var formatted_balance = customer_balance.toLocaleString('en-US');
    return customer_balance >= 0 ? formatted_balance + ' DR' : formatted_balance + ' CR';
}