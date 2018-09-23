'use strict';
exports.seed = async knex => {
    await knex( 'mou' ).del();

    await knex( 'mou' ).insert([{
        "value": 1060082,
        "start_date": "1/13/2018",
        "end_date": "8/7/2019",
        "client_name": "Client A",
        "client_type": "Municipal"
    }, {
        "value": 2645225,
        "start_date": "8/20/2018",
        "end_date": "11/6/2018",
        "client_name": "Client C",
        "client_type": "Municipal"
    }, {
        "value": 2214868,
        "start_date": "7/15/2018",
        "end_date": "9/2/2019",
        "client_name": "Client B",
        "client_type": "Other"
    }, {
        "value": 2612761,
        "start_date": "6/2/2018",
        "end_date": "1/27/2019",
        "client_name": "Client D",
        "client_type": "Federal"
    }, {
        "value": 2723322,
        "start_date": "1/13/2018",
        "end_date": "1/5/2020",
        "client_name": "Client D",
        "client_type": "Private"
    }, {
        "value": 35704,
        "start_date": "3/13/2018",
        "end_date": "10/10/2019",
        "client_name": "Client E",
        "client_type": "Municipal"
    }, {
        "value": 3032196,
        "start_date": "10/11/2017",
        "end_date": "4/20/2020",
        "client_name": "Client B",
        "client_type": "Other"
    }, {
        "value": 1485582,
        "start_date": "7/1/2018",
        "end_date": "11/17/2019",
        "client_name": "Client E",
        "client_type": "Private"
    }, {
        "value": 2205328,
        "start_date": "12/2/2017",
        "end_date": "12/17/2018",
        "client_name": "Client C",
        "client_type": "Private"
    }, {
        "value": 1160609,
        "start_date": "2/5/2018",
        "end_date": "12/15/2018",
        "client_name": "Client C",
        "client_type": "Federal"
    }, {
        "value": 1317344,
        "start_date": "3/2/2018",
        "end_date": "10/8/2018",
        "client_name": "Client D",
        "client_type": "Private"
    }, {
        "value": 3164584,
        "start_date": "10/28/2017",
        "end_date": "5/9/2019",
        "client_name": "Client D",
        "client_type": "Private"
    }, {
        "value": 2938803,
        "start_date": "2/7/2018",
        "end_date": "7/14/2020",
        "client_name": "Client B",
        "client_type": "Municipal"
    }, {
        "value": 2969278,
        "start_date": "8/27/2018",
        "end_date": "1/2/2020",
        "client_name": "Client D",
        "client_type": "Federal"
    }, {
        "value": 1682928,
        "start_date": "7/12/2018",
        "end_date": "12/5/2019",
        "client_name": "Client D",
        "client_type": "Federal"
    }, {
        "value": 3105889,
        "start_date": "9/1/2018",
        "end_date": "3/13/2019",
        "client_name": "Client C",
        "client_type": "Federal"
    }, {
        "value": 1315420,
        "start_date": "12/10/2017",
        "end_date": "1/16/2019",
        "client_name": "Client B",
        "client_type": "State"
    }, {
        "value": 3426715,
        "start_date": "11/3/2017",
        "end_date": "2/18/2020",
        "client_name": "Client E",
        "client_type": "Other"
    }, {
        "value": 3069292,
        "start_date": "7/15/2018",
        "end_date": "2/25/2019",
        "client_name": "Client A",
        "client_type": "Municipal"
    }, {
        "value": 2698627,
        "start_date": "12/31/2017",
        "end_date": "12/27/2019",
        "client_name": "Client A",
        "client_type": "Other"
    }, {
        "value": 142016,
        "start_date": "7/24/2018",
        "end_date": "10/3/2019",
        "client_name": "Client C",
        "client_type": "State"
    }, {
        "value": 2691635,
        "start_date": "6/1/2018",
        "end_date": "7/1/2019",
        "client_name": "Client B",
        "client_type": "State"
    }, {
        "value": 1059676,
        "start_date": "2/3/2018",
        "end_date": "11/26/2019",
        "client_name": "Client E",
        "client_type": "Federal"
    }, {
        "value": 1859142,
        "start_date": "12/12/2017",
        "end_date": "9/1/2019",
        "client_name": "Client E",
        "client_type": "Private"
    }, {
        "value": 1267978,
        "start_date": "9/7/2018",
        "end_date": "1/20/2019",
        "client_name": "Client E",
        "client_type": "Municipal"
    }]);
};
