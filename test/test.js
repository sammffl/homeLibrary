var row = {
    count :1,
    data_key:"taobao",
    data_name:"taobao",
    data_type_id:20,
    data_type_id1:20,
    dime:'{"showPeculiarity":true,"showPromise":true,"showCredit":true,"showPeoplebase":true,"showPayment":true}',
    groupid:304,
    img:"../img/taobao@2x.png",
    ins_date:new Date(),
    min_count:0,
    name:"电商",
    num:2064209,
    set_id:50,
    sort:1,
    upd_date:null
}

var rgx = /(\d+)(\d{2})/;
while (rgx.test(num)) {
    // $1、$2 正则的子匹配，每个括号
    // rgx 中 $1 : (\d+) ; $2 : (\d{3})
    num = num.replace(rgx, '$1,$2');
    console.log(num)
}

