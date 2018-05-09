$( function() {
  function log( message ) {
    $( "<div>" ).text( message ).prependTo( "#log" );
    $( "#log" ).scrollTop( 0 );
  }

  $( "#birds" ).autocomplete({
    source: "search.php",
    minLength: 2,
    select: function( event, ui ) {
      log( "Selected: " + ui.item.value + " aka " + ui.item.id );
    }
  });
} );
