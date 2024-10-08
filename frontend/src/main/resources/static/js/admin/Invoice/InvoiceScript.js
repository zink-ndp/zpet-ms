import { fetchInvoices } from "./InvoiceUtils.js";
import { PrintDialog } from "../../PrintDialog.js";

export const InvoiceScript = () => {
  $(() => {
    // Invoice page

    fetchInvoices();

    $("#btn-print").click(() => {
      PrintDialog();
    });
  });
};
