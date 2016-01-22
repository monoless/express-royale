/**
 * Created by monoless on 2015-12-15.
 */
module.exports = function (io, options, socket, req, res) {
    var util = options.container.get('util');

    var eventName = 'info';
    var eventLog = [];

    var poisonSlot = util.findItemSlotByEquip(
        options.container.get('items'),
        'poison',
        res.account.item0,
        res.account.item1,
        res.account.item2,
        res.account.item3,
        res.account.item4,
        res.account.item5
    );

    if (null !== poisonSlot && typeof req.value !== 'undefined') {
        var item = res.account[req.value];
        var itemInfo = options.container.get('items').getInfo(item.idx);
        if (-1 !== ['health', 'stamina'].indexOf(itemInfo.equip)) {
            eventLog.push([itemInfo.name, '에 독을 섞었습니다. 스스로 먹지 않도록 조심하자...'].join(''));

            res.account[poisonSlot] = util.setConsumeItem(item);
            res.account[req.value].point = Math.abs(res.account[req.value].point) * -1;
        }
    } else if (null !== poisonSlot) {
        var poisonInfo = options.container.get('items').getInfo(res.account[poisonSlot].idx);
        eventName = 'poisonStart';
        eventLog.push(['이 ', poisonInfo.name, '을(를) 섞으면... 후후후.'].join(''));
    }

    require('./finalize')(io, options, socket, req, res, eventName, true, eventLog);
};