

import React, { useState, useEffect } from 'react';
import { Container, TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Grid, Snackbar, TableContainer, TableHead } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './MobilleBill.css';

const MobilleBill = () => {
  const [name, setName] = useState('');
  const [mobileModel, setMobileModel] = useState('');
  const [imeNumber1, setImeNumber1] = useState('');
  const [imeNumber2, setImeNumber2] = useState('');
  const [battery, setBattery] = useState('');
  const [charger, setCharger] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const logoImg = 'https://t3.ftcdn.net/jpg/01/75/21/52/360_F_175215294_iyeIoEZgYgSjGpaEdA8awEroBSWumdMK.jpg';

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toLocaleString());
  }, []);

  const handleImeNumberChange = (value, setIme, setIme2) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = cleanedValue.slice(0, 17);
    const finalValue = formattedValue.length > 15
      ? formattedValue.slice(0, 15) + '/' + formattedValue.slice(15)
      : formattedValue;

    setIme(finalValue);

    if (setIme2) {
      setIme2(finalValue);
    }
  };

  const areAllFieldsFilled = () => {
    return name && mobileModel && imeNumber1 && imeNumber2 && battery && charger && totalAmount;
  };

  const handleGeneratePDF = () => {
    if (!areAllFieldsFilled()) {
      setAlert({ open: true, message: 'Please fill in all fields before generating the PDF.', severity: 'error' });
      return;
    }

    const pdf = new jsPDF('portrait', 'mm', 'letter');

    pdf.addImage(logoImg, 'PNG', 10, 10, 40, 20);
    pdf.setFontSize(16);
    pdf.text("Mobiles", 48, 20);
    pdf.text("Sales & Services", 48, 25);
    pdf.setFontSize(11);
    pdf.setTextColor(40, 40, 40);
    pdf.text("Opp. Ayyappa Swamy Temple, Kittu Complex,", 10, 34);
    pdf.text("Main Road, Devanakonda, Kurnool Dt, A.P", 10, 40);
    pdf.setFontSize(80);
    pdf.text("|", 96, 35);
    pdf.setFontSize(16);
    pdf.text("Prop: Madhu", 105, 20);
    pdf.setFontSize(13);
    pdf.text("Cash-Bill",155, 20);
    pdf.setFontSize(13)
    pdf.text("Cell: 6305405769, 6300057325", 105, 27);
    pdf.setFontSize(15);
    pdf.text("Date: " + currentDateTime, 105, 34);

    const tableColumn = ["Particulars", "Value"];
    const tableRows = [
      ["Name", name],
      ["Mobile Model", mobileModel],
      ["IME Number 1", imeNumber1],
      ["IME Number 2", imeNumber2],
      ["Battery", battery],
      ["Charger", charger],
      ["Total Amount", totalAmount]
    ];

    pdf.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
    });

    const finalY = pdf.previousAutoTable.finalY + 10;
    pdf.setFontSize(11);
    pdf.text("Goods Once sold cannot be taken back", 10, finalY);
    pdf.setFontSize(9);
    pdf.text("1,Used or transferred phones cannot be replaced; only repairs are allowed at official service centers.", 10, finalY + 6);
    pdf.text("2.The warranty period is unrelated to this policy. 3.I’m buying a phone due to the terms and conditions.", 10, finalY + 10);
    pdf.text("Signature of Purchaser", 10, finalY + 22);
    pdf.text("Signature of the seller", 170, finalY + 22);
    pdf.save('Cash-Bill.pdf');
    setAlert({ open: true, message: 'PDF generated successfully!', severity: 'success' });
  };
const handlePrint = () => {
  if (!areAllFieldsFilled()) {
    setAlert({ open: true, message: 'Please fill in all fields before printing.', severity: 'error' });
    return;
  }

  const printWindow = window.open('', '', 'height=800,width=600');
  printWindow.document.write('<html><head><title>Print</title><style>');
  printWindow.document.write(`
    body { font-family: Arial, sans-serif; }
    .print-container { width: 100%; padding: 20px; }
    .header { text-align: center; }
    .content { margin-top: 20px; }
    .footer { margin-top: 20px; }
    .footer p { margin: 0; }
    .dd_tabless { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .dd_tabless, .DD_th, .DD_td { border: 1px solid black; }
    .DD_th, .DD_td { padding: 8px; text-align: left; }
    .DD_HerderBorder { border: 1px double black; }
    .DD_ms { font-size: 45px; }
    .DD_Mobil { font-size: 30px; margin-left: 10px; }
    .DD_Sarv { font-size: 20px; }
  `);
  printWindow.document.write('</style></head><body>');
  printWindow.document.write('<div class="print-container">');
  printWindow.document.write('<div class="header">');
  printWindow.document.write('<table>');
  printWindow.document.write('<tr><td><span class="DD_ms"><b><i>M.S</i></b></span><span class="DD_Mobil">Mobiles</span><br/><span class="DD_Sarv">Sales & Services</span></td>');
  printWindow.document.write('<td><p>Prop: <b>Madhu</b></p><p><u>Cash-Bill</u></p><p><b>Phone No:</b> 6305405769, 6300057325</p></td></tr>');
  printWindow.document.write('<tr><td><p>Opp. Ayyappa Swamy Temple, Kittu Complex,</p><p>Main Road, Devanakonda, Kurnool Dt, A.P</p></td>');
  printWindow.document.write('<td><p>Date: ' + currentDateTime + '</p></td></tr>');
  printWindow.document.write('</table>');
  printWindow.document.write('</div>');

  printWindow.document.write('<div class="content">');
  printWindow.document.write('<table class="dd_tabless">');
  printWindow.document.write('<thead><tr><th class="DD_th">Particulars</th><th class="DD_th">Value</th></tr></thead>');
  printWindow.document.write('<tbody>');
  printWindow.document.write('<tr><td class="DD_td">Name</td><td class="DD_td">' + name + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">Mobile Model</td><td class="DD_td">' + mobileModel + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">IME Number 1</td><td class="DD_td">' + imeNumber1 + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">IME Number 2</td><td class="DD_td">' + imeNumber2 + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">Battery</td><td class="DD_td">' + battery + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">Charger</td><td class="DD_td">' + charger + '</td></tr>');
  printWindow.document.write('<tr><td class="DD_td">Total Amount</td><td class="DD_td">' + totalAmount + '</td></tr>');
  printWindow.document.write('</tbody>');
  printWindow.document.write('</table>');
  printWindow.document.write('</div>');

  printWindow.document.write('<div class="footer">');
  printWindow.document.write('<p>Goods Once sold cannot be taken back</p>');
  printWindow.document.write('<p>1. Used or transferred phones cannot be replaced; only repairs are allowed at official service centers.</p>');
  printWindow.document.write('<p>2. The warranty period is unrelated to this policy. 3. I’m buying a phone due to the terms and conditions.</p>');
  printWindow.document.write('<br/><br/>');
  printWindow.document.write('<p>Signature of Purchaser _______ &nbsp;&nbsp;&nbsp;&nbsp; Signature of the seller</p>');
  printWindow.document.write('</div>');
  printWindow.document.write('</div>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
};


  const handleSubmit = (e) => {
    e.preventDefault();
    handleGeneratePDF();
  };

  return (
    <div className='d-flex'>
      
    
      <div style={{ marginTop: '90px', marginRight: '10px', marginLeft: '20px' }}>
        <img className='DD_image' src='https://www.shutterstock.com/shutterstock/photos/2292915265/display_1500/stock-vector-woman-buys-new-mobile-phone-in-consultation-with-employee-of-digital-gadget-store-man-and-girl-are-2292915265.jpg' width={500} />
      </div>
      <div>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            New Mobile Bill
          </Typography>
          <form id="pdf-content" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>                
                
                  <TextField
                  label="Costomer Name"
                  variant="standard"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />                
                
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Mobile Model"
                  variant="standard"
                  fullWidth
                  value={mobileModel}
                  onChange={(e) => setMobileModel(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Enter IME Number 1"
                  variant="standard"
                  fullWidth
                  value={imeNumber1}
                  onChange={(e) => handleImeNumberChange(e.target.value, setImeNumber1, setImeNumber2)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="IME Number 2"
                  variant="standard"
                  fullWidth
                  value={imeNumber2}
                  onChange={(e) => handleImeNumberChange(e.target.value, setImeNumber2)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Battery"
                  variant="standard"
                  fullWidth
                  value={battery}
                  onChange={(e) => setBattery(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Charger"
                  variant="standard"
                  fullWidth
                  value={charger}
                  onChange={(e) => setCharger(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Total Amount"
                  type="number"
                  variant="standard"
                  fullWidth
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Current Date and Time"
                  variant="outlined"
                  fullWidth
                  value={currentDateTime}
                  InputProps={{ readOnly: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                  Generate PDF
                </Button>
                <Button variant="outlined" color="secondary" onClick={handlePrint} sx={{ mt: 2, ml: 2 }}>
                  Print
                </Button>
              </Grid>
            </Grid>
          </form>

          <Snackbar
            open={alert.open}
            autoHideDuration={6000}
            onClose={() => setAlert({ ...alert, open: false })}
            message={alert.message}
            severity={alert.severity}
          />
        </Container>
      </div>
    </div>
  );
};

export default MobilleBill;