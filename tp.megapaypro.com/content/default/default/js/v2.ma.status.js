//function displayAlertPopUp(tag, cl, buff) {
//    var t = tag + '_cl';
//    document.getElementById(t).className = cl;
////        var x = document.getElementById(tag).style.display;
//    document.getElementById(tag).style.display = '';
//    document.getElementById(t).style.display = '';
//    t = tag + '_BODY';
//    document.getElementById(t).innerHTML = buff;
//}
//
//function displayMessageOld(statusID) {
//    if (statusID && statusID !== 0) {
//        switch (statusID) {
//            case 1:
//                displayAlertPopUp('mast_Alert', 'alertBox error', 'Merchant is busy and unable to accept order, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.');
//                break;
//            case 2:
//                displayAlertPopUp('mast_Alert', 'alertBox error', 'Merchant set sales on pause due to internal reasons, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.');
//                break;
//            case 10:
//                displayAlertPopUp('mast_Alert', 'alertBox error', 'Merchant is unable to accept payments, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.');
//                break;
//            case 1001:
//                displayAlertPopUp('mast_Alert', 'alertBox error', 'Merchant is unable to accept online payments at this time, sorry. Please check online hours.');
//                break;
//        }
//    }
//}
//function displayMessage(statusID) {
//    if (statusID && statusID !== 0) {
//        var MAState_msg = '';
//        switch (statusID) {
//            case 1:
//                MAState_msg = 'Merchant is busy and unable to accept order, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.';
//                break;
//            case 2:
//                MAState_msg = 'Merchant set sales on pause due to internal reasons, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.';
//                break;
//            case 10:
//                MAState_msg = 'Merchant is unable to accept payments, sorry. Please contact "<?= $GDATA->getJSLD() ? $GDATA->getJSLD() : "" ?>" directly.';
//                break;
//            case 1001:
//                MAState_msg = 'Merchant is unable to accept online payments at this time, sorry. Please check online hours.';
//                break;
//            default:
//                $("#MAState_alert_box").html('');
//                $("#MAState_alert_box").attr("style", "display:none");
//                return;
//        }
//        $("#MAState_alert_box").html(MAState_msg);
//        $("#MAState_alert_box").attr("style", "display:block");
//    }
//}

function getMAStatus() {
//            $.post("<?= $_SERVER['REQUEST_SCHEME'] . "://" . $_SERVER['SERVER_NAME'] ?>/<?= $GDATA->getMah_IfIsNotVH(); ?>?cmd=aj_ma_status&key=<?= $ajax_pub ?>", function (data) {

    $.post(gv.url_ma_status, function (data) {
        console.log("ma status=" + data);
        let jo;
        try {
            jo = JSON.parse(data);
        } catch (e) {
        }
        if (typeof (jo.ma_status) === 'undefined') {
            displayAlertPopUp('msg_Alert', 'alertBox error', 'Can\'t get status of the restaurant "' + gv.ma_name + '", please inform developer!');
            return;
        }

        var statusID = parseInt(jo.ma_status, 10);
        $("#ma_status_ajax").val(statusID);
        if (statusID && statusID !== 0) {
            switch (statusID) {
                case 1:
                    MAState_msg = 'Merchant is busy and unable to accept orders, sorry. Please contact ' + gv.ma_name + ' directly.';
                    break;
                case 2:
                    MAState_msg = 'Merchant paused accepting ortders due to internal reasons, sorry. Please contact ' + gv.ma_name + ' directly.';
                    break;
                case 10:
                    MAState_msg = 'Merchant stopped accepting orders, sorry. Please contact ' + gv.ma_name + ' directly.';
                    break;
                case 1001:
                    MAState_msg = 'Merchant is unable to accept online payments at this time, sorry. Please check online hours.';
                    break;
                default:
                    $("#MAState_alert_box").html('');
                    $("#MAState_alert_box").attr("style", "display:none");
                    return;
            }
            $("#MAState_alert_box").html(MAState_msg);
            $("#MAState_alert_box").attr("style", "display:inline-block");
        }
    });
}