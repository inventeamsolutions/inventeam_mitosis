frappe.ui.form.on('Purchase Receipt Item', {
    total_stock_quantity_uom: function (frm, cdt, cdn) {
        updateConversionFactor(frm, cdt, cdn);
    },
    qty: function (frm, cdt, cdn) {
        updateConversionFactor(frm, cdt, cdn);
    },
    conversion_factor: function (frm, cdt, cdn) {
        updatePriceList(frm, cdt, cdn);
    },
    stock_rate_uom: function (frm, cdt, cdn) {
        updatePriceList(frm, cdt, cdn);
    },
    uom: function (frm, cdt, cdn) {
        updatePriceList(frm, cdt, cdn);
    },
});

function updateConversionFactor(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var accepted_qty = child.qty;
    var total_qty = child.total_stock_quantity_uom;

    if(accepted_qty !== 0) {
        var updated_conversion_factor = total_qty / accepted_qty;
        frappe.model.set_value(child.doctype, child.name, 'conversion_factor', updated_conversion_factor);
    } else {
        frappe.msgprint(__("Accepted Qty should be greater than zero for accurate conversion."));
        frappe.model.set_value(child.doctype, child.name, 'conversion_factor', '');
    }
}

function updatePriceList(frm, cdt, cdn) {
    var child = locals[cdt][cdn];
    var conversion_factor = child.conversion_factor;
    var stock_rate_uom = child.stock_rate_uom;

    if(child.uom != child.stock_uom) {
        var updated_price_list = stock_rate_uom * conversion_factor;
        frappe.model.set_value(child.doctype, child.name, 'price_list_rate', updated_price_list);
        frm.fields_dict['items'].grid.toggle_display('stock_rate_uom', true);
        frm.fields_dict['items'].grid.toggle_display('total_stock_quantity_uom', true);
    } else {
        frm.fields_dict['items'].grid.toggle_display('stock_rate_uom', false);
        frm.fields_dict['items'].grid.toggle_display('total_stock_quantity_uom', false);
        frappe.model.set_value(child.doctype, child.name, 'price_list_rate', '');
    }
}