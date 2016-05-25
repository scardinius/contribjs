// set default amount based on param donation_amount in url
var name = 'donation_amount';
var da = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
if (da > 0) {
  da = da.replace('.', '\\.');
  jQuery(".price-set-row input[data-amount="+da+"]").prop("checked", true).click();
}

//Show / hide other amount input
jQuery('.price-set-row input').on('change', function(e) {
  var $other = jQuery('.crm-container .crm-section.other_amount-section'); 
  var val = jQuery(this).val();
  if (val == 0) {
    $other.show();
  } else {
    $other.hide();
  }
});


/* Convert daily/weekly donations to monthly donations */

function isConvertedToMonthly() {
  return true;
}

function updateMonthlyPayment() {
  var $montlyInfo = jQuery('#monthlyInfo');
  var amount = jQuery('.price-set-row input').filter(':checked').attr('data-amount');
  if (amount) {
    amount = parseFloat(amount);
  } else {
    amount = parseFloat(jQuery('.other_amount-section input').val());
  }
  var monthlyValue = amount * 4;
  jQuery('#monthlyValue').text(monthlyValue);
}

if (isConvertedToMonthly()) {
  var $monthlyInfo = jQuery('<span id="monthlyInfo">Per month: <span id="monthlyValue"></span></span>');
  jQuery('#is_recur').click().hide();
  jQuery('label[for=is_recur]').hide();
  jQuery('#recurHelp').append($monthlyInfo);
  //Remove "every month" text node
  jQuery('.is_recur-section .content').contents().filter(function(){return this.nodeType == 3;}).remove();
  jQuery('.price-set-row input, .other_amount-section input').on('change', function(e) {
    updateMonthlyPayment();
  });
  updateMonthlyPayment();
}

