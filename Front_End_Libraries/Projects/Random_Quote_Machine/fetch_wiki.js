import {store, endFetch} from './rdx.js'; 

const fetchWiki = function () {
    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        type: 'GET',
        data: {
            action: 'query',
            format: 'json',
            list: 'random',
            rnlimit: '1',
            rnnamespace: '0',
            origin: '*'
        },
        success: function (data) {
            // console.log('s', data);
            var pageid = data.query.random['0'].id;
            var pagetitle = data.query.random['0'].title; 
            // console.log('title:', pagetitle, ', id:', pageid);

            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                type: 'GET',
                data: {
                    action: 'parse',
                    pageid: pageid,
                    // pageid: 5131957,
                    format: 'json',
                    section: 0,
                    prop: 'text',
                    origin: '*'
                },

                success: function (data) {
                    // console.log('success', data);
                    var ps = data.parse.text['*'];

                    var pst = $(ps).find('p').text();
                    var psh = handleWikiP(ps);

                    store.dispatch(endFetch(pagetitle, pst)); 

                    // console.log(pst); 
                    // console.log(psh); 

                    /*
                    $('#ajax-test').html(
                        psh
                    );
                    */
                },
                error: function (data) {
                    console.log('error', data)
                }
            });

        },
        error: function (data) {
            console.log('f', data)
        }
    })

    const handleWikiP = function (ps) {
        var psh = $(ps).find('p').wrap('<p></p>');
        psh.find('a').contents().unwrap();
        psh.find('sup').remove();
        return psh;
    }
}

export { fetchWiki }; 