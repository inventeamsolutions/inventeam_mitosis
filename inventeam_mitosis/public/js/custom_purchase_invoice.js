frappe.ui.form.on("Purchase Invoice", {
    supplier: function(frm) {
        fetchSupplierBalance(frm);
    }
});

function fetchSupplierBalance(frm) {
    var supplier = frm.doc.supplier;
    if (supplier) {
        frappe.call({
            method: 'inventeam_mitosis.get_balance.get_supplier_balance',
            args: {
                supplier: supplier
            },
            callback: function(response) {
                if (response.message !== null && response.message !== undefined) {
                    var supplier_balance = response.message;
                    var formatted_balance = formatSupplierBalance(supplier_balance);
                    frm.set_value('supplier_balance', formatted_balance);
                    refresh_field('supplier_balance');
                }
            }
        });
    } else {
        frm.set_value('supplier_balance', '');
        refresh_field('supplier_balance');
    }
}

function formatSupplierBalance(supplier_balance) {
    return supplier_balance >= 0 ? supplier_balance + ' DR' : supplier_balance + ' CR';
}