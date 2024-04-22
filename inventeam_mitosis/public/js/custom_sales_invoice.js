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
                    var balance = response.message;
                    var formatted_balance = formatSupplierBalance(balance);
                    frm.set_value('balance', formatted_balance);
                    refresh_field('balance');
                }
            }
        });
    } else {
        frm.set_value('balance', '');
        refresh_field('balance');
    }
}

function formatSupplierBalance(balance) {
    return balance >= 0 ? balance + ' DR' : balance + ' CR';
}