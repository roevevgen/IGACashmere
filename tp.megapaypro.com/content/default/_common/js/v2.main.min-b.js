var daysOldStyle = [6, 0, 1, 2, 3, 4, 5];
var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function displayAlertPopUp(tag, cl, buff) {
    var t = tag + '_cl';
    document.getElementById(t).className = cl;
//        var x = document.getElementById(tag).style.display;
    document.getElementById(tag).style.display = '';
    document.getElementById(t).style.display = '';
    t = tag + '_BODY';
    document.getElementById(t).innerHTML = buff;
}
function PopUpSuccessFade(tag, cl, buff) {
    var t = tag + '_cl';
    var t_b = tag + '_BODY';
    document.getElementById(t).className = cl;
    document.getElementById(tag).style.display = '';
    document.getElementById(t).style.display = '';
    document.getElementById(t_b).innerHTML = buff;
    setTimeout(function () {
        $('#' + t).fadeOut("slow");
    }, 1000);
}


function AjaxPOST_Add2Basket(o, opt, item, checkHasOption) {
    var ItemID = o.dataset.item_id;
    var ItemName = o.dataset.title;

    var closeOptionsDialog = false;
    if (checkHasOption === true) {
        ItemHashOptions(o);
    }
//    var closeOptionsDialog = true;
    clearTimeout(ShowHide_shcart_timeout);
    $.post(gv.url_add_item,
            {iopt: opt, ihash: item, ma: gv.mah},
            function (data) {
                console.log("data:", data);
                if (data) {
                    try {
                        j = JSON.parse(data);
                        if (isNaN(j.cnt)) {
                            displayAlertPopUp('msg_Alert', 'alertBox', 'Can\'t add item to the basket(bad server response), please copy/paste this to developer!' + mppHref);
                            console.log('AjaxPOST_Add2Basket FAILED');
                            return;
                        }
                        if (j.err_code !== undefined && isNaN(j.err_code)) {
                            displayAlertPopUp('msg_Alert', 'alertBox', 'Bad server response value of err_code, please copy/paste this to developer' + mppHref);
                            console.log('AjaxPOST_Add2Basket FAILED');
                            return;
                        }
                        var err_code = Number(j.err_code);
                        var err_msg = j.err_msg;
                        if (err_code > 0) {
                            if (err_msg !== undefined && err_msg !== null && err_msg !== "") {
                                displayAlertPopUp('msg_Alert', 'alertBox', 'Error adding item to the basket: ' + "(" + err_code + ") " + err_msg + '<br>Please copy/paste this to developer<br>'
                                        + mppHref);
                            } else {
                                displayAlertPopUp('msg_Alert', 'alertBox', 'Error adding item to the basket. code=(' + err_code + ').<br>Please copy/paste this to developer'
                                        + mppHref);
                            }
                            console.log('AjaxPOST_Add2Basket FAILED');
                            return;
                        }
                        if (closeOptionsDialog && checkHasOption === true) {
                            if (document.getElementById('AddedSuccess2cart.modal.btn.' + ItemID) == null) {
                                displayAlertPopUp('msg_Alert', 'alertBox', 'Page has error, please inform developer!');
                            } else {
                                ShowHide_shcart(false, 'Item added. Please check the cart.');
                                getBasketContent();
                                ShowHide_shcart_timeout = setTimeout(function () {
                                    ShowHide_shcart();
                                }, 2000);
                            }
                        } else {
                            ShowHide_shcart(false, 'Item added. Please check the cart.');
                            getBasketContent();
                            ShowHide_shcart_timeout = setTimeout(function () {
                                ShowHide_shcart();
                            }, 2000);
                        }
                    } catch (e) {
                        displayAlertPopUp('msg_Alert', 'alertBox', 'Page has error(js exception: ' + e.message + '), please inform developer!');
                        console.log('AjaxPOST_Add2Basket FAILED', e);
                    }
                }
            }
    );
}
function Add2WWWBasket_Ajax(opt, item, o, checkHasOption) {
    console.log('Add2WWWBasket_Ajax opt:' + opt);
    console.log('Add2WWWBasket_Ajax item:' + item);
    if (opt === "null") {
        displayAlertPopUp('msg_Alert', 'alertBox', 'Page has error(object opt is null), please inform developer!');
        return;
    }
    AjaxPOST_Add2Basket(o, opt, item, checkHasOption);
    return;
}


function Add2WWWBasket_POST(opt, item) {
    console.log('opt:' + opt);
    console.log('item:' + item);
    if (opt.localeCompare("null") === 0) {
        console.log("No options. Do not submit");
        return;
    }
    var oForm = $('form[id="form_item.' + item + '"]');
    console.log('form[id="form_item.' + item + '"] oForm 1:', oForm);
    if (oForm !== undefined) {
        $('form[id="form_item.' + item + '"]').append('<input type="hidden" name="sub_iopt" value="' + opt + '"/>');
        $('form[id="form_item.' + item + '"]').append('<input type="hidden" name="sub_ihash" value="' + item + '"/>');
        $('form[id="form_item.' + item + '"]').submit();
    } else {
        alert("Document has bad structure.");
    }
}

function Add2WWWBasket(opt, item, o, checkHasOption) {
    if (arguments.length === 4) {
        Add2WWWBasket_Ajax(opt, item, o, checkHasOption);
    } else {
        Add2WWWBasket_POST(opt, item);
    }
}
function GetMandatoryNotSelectedOptions(ItemID) {
    var oa = [];
    var a_opt_grp = [];
    var grps_to_select = [];
    console.log("Check mandatory ItemID=" + ItemID);
    $('input[data-item_id="' + ItemID + '"][type="radio"][required]').each(function (index, value) {
        if (jQuery.inArray($(value).data('opt_grp'), a_opt_grp) === -1) {
            a_opt_grp.push($(value).data('opt_grp'));
            oa.push({"name": $(value).attr('name'), "opt_grp": $(value).data('opt_grp')});
        }
    });
    if (a_opt_grp.length > 0) {
        var grpName;
        var checked;
        for (index = 0; index < a_opt_grp.length; ++index) {
            checked = $('input:radio[name="' + oa[index].name + '"]:checked');
            if (checked === undefined || checked.length <= 0) {
                grps_to_select.push(oa[index].opt_grp);
            }
        }
    }
    console.log("Check mandatory ItemID=" + ItemID + " grps_to_select=" + grps_to_select);
    return grps_to_select;
}

function getSelectedOptions(o) {
    var ItemID = o.dataset.item_id;
    var grps_to_select = GetMandatoryNotSelectedOptions(ItemID);
    if (grps_to_select.length > 0) {
        var strMsgGroups2select = "";
        for (index = 0; index < grps_to_select.length; ++index) {
            strMsgGroups2select += index + 1 + ". " + grps_to_select[index] + "<br>";
        }
        if (gv.fhandler === "mpp_add") {
            displayAlertPopUp('msg_Alert', 'alertBox error', 'Please select option in all mandatory groups in the basket on your device:<hr>' + strMsgGroups2select);
        } else if (gv.fhandler === "window.webkit.messageHandlers.mpp_add.postMessage") {
            displayAlertPopUp('msg_Alert', 'alertBox error', 'Please select option in all mandatory groups before adding to your device:<hr>' + strMsgGroups2select);
            return null;
        } else {
            OpenOptionsInput(o);
            displayAlertPopUp('msg_Alert', 'alertBox error', 'Please select option in all mandatory groups:<hr>' + strMsgGroups2select);
            return null;
        }
    }
    var oInput = $('input[data-item_id="' + ItemID + '"]');
    var options = {
        option: [],
        property: [],
        pamount: 0,
        inotes: '',
        ihash: ''
    };
    var o_pamount = $('div[id="pamount.' + ItemID + '"]');
    var amountOrig = o_pamount[0].dataset.amount_orig;
    var namountOrig = Number(amountOrig);
    console.log('ItemID=' + ItemID + ' oInput.length=' + oInput.length);
    if (oInput.length > 0) {
        var ItemID = oInput[0].dataset.item_id;
//            console.log('ItemID=' + ItemID + ' oInput:', oInput);
//            console.log("############## o_pamount.data-amount_orig=" + amountOrig + " o_pamount:", o_pamount[0] + " namountOrig=" + namountOrig);
        var o_options = $('input[data-item_id="' + ItemID + '"][data-clearall!="1"]');
        for (var i = 0; i < o_options.length; i++) {
            var curr = o_options[i];
            if ((curr.type === "radio" || curr.type === "checkbox") && curr.checked) {
//                console.log("*** curr.type=" + curr.type + " curr.id=" + curr.id + " curr.name=" + curr.name + " curr.required=" + curr.required + " checked=%o", curr.checked);
                options.option.push({
                    "id": curr.dataset.id,
                    "n": curr.dataset.n,
                    "d": curr.dataset.d,
                    "node_id": curr.dataset.node_id,
                    "iamnt": curr.dataset.iamnt,
                    "curr": curr.dataset.currency,
                    "opt_grp": curr.dataset.opt_grp,
                    "text": curr.text,
                    "cnt": curr.dataset.cnt
                });
            }
        }
    }
    if (!gv || !gv.currOrig) {
        displayAlertPopUp('msg_Alert', 'alertBox', 'Can\'t add item to the basket(no currency), please copy/paste this to developer!' + mppHref);
        return null;
    }
    options.property.push({"amount": amountOrig, "curr": gv.currOrig});
    var str = $('textarea[id="inotes_input_text.' + ItemID + '"]').val();
    options.inotes = str;
    options.pamount = document.getElementById("pamount." + ItemID).innerHTML;
    options.ihash = o.id;
//        console.log('ItemID=' + ItemID + ' options:', options);
//        console.log('ItemID=' + ItemID + ' options:' + options.stringify());  
    return options;
}

function ItemHashOptions(o) {
    var ItemID = o.dataset.item_id;
    if ($('div[id="cO.' + ItemID + '"]').length) {
        return true;
    }
    return false;
}
function getBasketContent() {
    $.post(gv.url_get_cart,
            {m: gv.mah},
            function (data) {
//                console.log("data=" + data);
                let jo;
                try {
                    jo = JSON.parse(data);
                    if (jo !== undefined) {
                        $('#shcart_topbtn_html').html(jo.html);
                        var cart_count = parseInt(jo.cart_count, 10);
                        if (!isNaN(cart_count)) {
                            $('.zindex p').html(cart_count);
                        }
                    }
                } catch (e) {
                }

//console.log("#ma_status_ajax/statusID=" + statusID);
//$("#pay").prop('disabled', true);
            });
}
function clearBasket(o, e) {
    e.preventDefault();
    e.stopPropagation()
    var ItemID = o.dataset.id;
    var ItemH = o.dataset.ihash;
    var url;
    if (ItemID !== undefined) {
        url = gv.url_clear_cart_item + '&del[' + ItemID + ']=' + ItemH;
    } else {
        url = gv.url_clear_cart;
    }
    $.post(url,
            {m: gv.mah},
            function (data) {
                console.log("data=" + data);
                let jo;
                try {
                    jo = JSON.parse(data);
                    if (jo !== undefined) {
                        $('#shcart_topbtn_html').html(jo.html);
                        var cart_count = parseInt(jo.cart_count, 10);
                        if (!isNaN(cart_count)) {
                            $('.zindex p').html(cart_count);
                        }
                    }
                } catch (e) {
                }
            });
    return false;
}


function mpp_add(arg, opt) {
    console.log('mpp_add arg=' + arg);
    console.log('mpp_add opt=' + opt);
    android.mpp_add(arg, opt);
}
function DoSubmit(formid, arg) {
    $(formid).append("<input type='hidden' name='Submit' value='" + arg + "'/>");
    $(formid).submit();
}
function DoSubmit(formid, arg, argName, argVal) {
    $(formid).append("<input type='hidden' name='Submit' value='" + arg + "'/>");
    $(formid).append("<input type='hidden' name='del[" + argName + "]' value='" + argVal + "'/>");
    $(formid).submit();
}

function getWHours_TodayDateTIme() {
    var jWH = JSON.parse(gv.time_m_is_open);
    var tNow = new Date();
    var getDay = tNow.getDay();
    console.log('jWH=' + jWH);
    if (jWH.length === 14) {
        var dNow = daysOldStyle[getDay];
        var tOpen = jWH[dNow * 2];
        var tClose = jWH[dNow * 2 + 1];
        var taOpen = tOpen.split(":");
        var taClose = tClose.split(":");
        var d1 = new Date(tNow.getFullYear(), tNow.getMonth(), tNow.getDate(), 0, 0, 0);
        var d2 = new Date(tNow.getFullYear(), tNow.getMonth(), tNow.getDate(), 0, 0, 0);
        d1.setHours(taOpen[0]);
        d1.setMinutes(taOpen[1]);
        d2.setHours(taClose[0]);
        d2.setMinutes(taClose[1]);
        var r = {
            d1: d1,
            d2: d2
        };
        return r;
    } else {
        return null;
    }
}
