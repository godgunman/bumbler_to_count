$( function () {
    // @see .dev file for usage example
    all_strokes = [];
    gesture = $.gesture()               // gesture recognition instance
        , board = gesture.board( 960, 400 ) // canvas to test gesture recognition
            .on( 'selectstart.gesture contextmenu.gesture keydown.gesture', false )
            .on( 'keyup.gesture', function () {
                if ( event.which == 32 ) // space
                    return board.triggerHandler( 'recognize.gesture' );
                if ( event.which == 13 ) // enter
                    return board.triggerHandler( 'learn.gesture' );
                if ( event.which == 27 ) // escape
                    return board.triggerHandler( 'reset.gesture' );
            } )
            .on( 'recognize.gesture', function ( event ) {
                if ( $.isEmptyObject( gesture.gestures ) )
                    return console.log( 'You should save a gesture before trying to recognize anything !' );
                if ( ! event.result  )
                    return console.log( 'No result' );
                console.log( event.result.name + ' gesture recognized (' + event.result.strokes + ' strokes), score: ' + Math.ceil( event.result.score ) );
                board.triggerHandler( 'reset.gesture' );
            } )
            .on( 'learn.gesture', function ( event ) {
                var name = event.result.name;
                if ( ! event.result )
                    return;
                console.log( 'Learned ' + event.result.name + ' gesture (' + event.result.strokes.length + ' strokes)' );
                console.log( 'Export of ' + name + ' gesture: { "' + name + '" :', gesture.export( name ), '}' );
                board.triggerHandler( 'reset.gesture' );
            } )
            .on( 'save.gesture', function () {
                var result = event.result;
                all_strokes.push(result[result.length - 1]);
                console.log( 'Stroke #' + result.length + ': ' + result );
            } )
            .on( 'reset.gesture', function () {
                console.log( 'Board & gesture recording cleared' );
            } );
    $( '.container .row .span8' ).prepend( board );

    // load json
    $.getJSON('data/model.json', function (data) {
        gesture.gestures = data;
    });
} );

