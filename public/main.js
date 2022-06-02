//data tables
$(document).ready(function () {
  $('#customer_list').DataTable({
    columnDefs: [
      {
        targets: '_all',
        className: 'dt-head-left',
      },
    ],
    lengthMenu: [5, 10, 20, 50, 100, 500],
  });
  $('#market_table').DataTable({
    columnDefs: [
      {
        targets: '_all',
        className: 'dt-head-left',
      },
    ],
    lengthMenu: [5, 10, 20, 50, 100, 500],
  });

  $(window).on('load', function () {
    setTimeout(function () {
      $('.loader-wrapper').fadeOut('slow');
    }, 500);
  });
});

//Menu
//New menu
function openNav() {
  document.querySelector('.container-sidebar').style.width = '300px';
}

function closeNav() {
  document.querySelector('.container-sidebar').style.width = '0';
  document.querySelector('.container-sidebar').style.width = '';
}
