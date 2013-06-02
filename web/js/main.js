$( function () {
    // @see .dev file for usage example
    all_strokes = [];
    gesture = $.gesture()               // gesture recognition instance
        , board = gesture.board( 960, 400 ) // canvas to test gesture recognition
            .on( 'selectstart.gesture contextmenu.gesture keydown.gesture', false )
            .on( 'keyup.gesture', function () {
                if ( event.which == 32 ) // space
                    return board.triggerHandler( 'recognize.gesture' );
                //if ( event.which == 13 ) // enter
                if ( event.which == 76 ) // l
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
                console.log( 'Stroke #' + all_strokes.length);
                board.triggerHandler( 'run.dp' );
            } )
            .on( 'reset.gesture', function () {
                all_strokes = [];
                console.log( 'Board & gesture recording cleared' );
            } )
            .on( 'run.dp', function () {
                console.log('run dp');
                calcMaxScore.setStrokes(all_strokes);
                calcMaxScore.setGesture(gesture);
                var score = calcMaxScore.getDpScore();
                var path = calcMaxScore.getDpPath();
                console.log(path);
                var current = 0;
                var eq = "";
                for (var i = 0; i < path.length; i++) {
                    console.log(current, path[i] + 1);
                    gesture.strokes = all_strokes.slice(current, path[i] + 1);
                    eq += gesture.recognize(true).name[0];
                    current = path[i] + 1;
                }
                gesture.strokes = all_strokes.slice(current);
                eq += gesture.recognize(true).name[0];
                console.log(eq);
                eq = eq.replace('--', '=');
                console.log(eq);
                $('#equation').text(eq);
            } );
    $( '.container .row .span8' ).prepend( board );

    // load json
    $.getJSON('data/model.json', function (data) {
//        gesture.gestures = data;
    });
    $.getJSON('data/1.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/2.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/3.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/4.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/5.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/6.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/7.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/8.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/9.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/add.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/sub.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/mul.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/div.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });
    $.getJSON('data/eq.json', function (data) { for (var i in data) gesture.gestures[i] = data[i]; });

    // bind event
    $('#speak').click( function() {
        console.log($('#equation').text());
        jellyfishAudio.stingSequence($('#equation').text());
    });
} );

