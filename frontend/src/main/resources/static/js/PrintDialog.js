export function PrintDialog() {
    // Select the dialog content
    var dialogContent = document.getElementById("printarea").outerHTML;

    // Open a new window for printing
    var printWindow = window.open("", "", "width=1200,height=1200");

    // Write the dialog content into the new window
    printWindow.document.write(`
      <html>
      <head>
        <title>ZPet Invoice</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      </head>
      <body>
        ${dialogContent}
      </body>
      </html>
    `);

    // Wait until the content is loaded, then print and close the window
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }