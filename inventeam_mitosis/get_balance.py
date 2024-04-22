import frappe
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_customer_balance(customer):
    ledger_entries = frappe.get_list('GL Entry', 
        filters={'party_type': 'Customer', 'party': customer},
        fields=['sum(debit) as debit', 'sum(credit) as credit']
    )

    if ledger_entries and ledger_entries[0].debit is not None and ledger_entries[0].credit is not None:
        balance = ledger_entries[0].debit - ledger_entries[0].credit
    else:
        balance = 0

    return balance

@frappe.whitelist(allow_guest=True)
def get_supplier_balance(supplier):
    ledger_entries = frappe.get_list('GL Entry', 
        filters={'party_type': 'Supplier', 'party': supplier},
        fields=['sum(debit) as debit', 'sum(credit) as credit']
    )

    if ledger_entries and ledger_entries[0].debit is not None and ledger_entries[0].credit is not None:
        supplier_balance = ledger_entries[0].debit - ledger_entries[0].credit
    else:
        supplier_balance = 0

    return supplier_balance