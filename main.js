var ipNum;
var subnet;
var netclass;
var netclassS;
var hosts;
var hostsUse;
var id;
var idBin;
var idHex;
var temp;
var ipType;
var addr;
var netAddr; // TODO: Group that IP belong in
var subnetBin;
var subnetAddr;
var range;
var broad;
var wildSubnetAddr;
var wildIp;
function getData() {
    ipNum = document.getElementById('ip');
    subnet = document.getElementById("subnet");
    netclass = document.getElementById("netclass");
    updateData();
}

function getBroadCastAddr(netAddr, wildCard) {
    if (parseInt(wildCard.join('')) === 0) {
        return netAddr;
    }
    var tmp = netAddr.split('.');
    for (i in tmp) {
        tmp[i] = parseInt(tmp[i]);
    }
    for (var i = 0; i < 4; i++) {
        tmp[i] += parseInt(wildCard[i]);
    }
    return tmp.join('.');
}

function getBinSubnet(subnetCIDR) {
    var subnetBin = '';
    for (var i = 0; i < 32; i++) {
        subnetBin += i < subnetCIDR ? 1 : 0;
    }
    return subnetBin;
}

function binToDecSet(bin) {
    var result = [];
    for (var i = 0; i < 4; i++) {
        result.push(parseInt(bin.slice(i * 8, (i + 1) * 8), 2));
    }
    return result.join('.');
}

function calNetAddr(ip, subnetCIDR) {
    var result = [];
    var subnetSet = binToDecSet(getBinSubnet(subnetCIDR)).split('.');
    for (var i = 0; i < 4; i++) {
        var tmp = Number(ip[i]);
        result.push(tmp & parseInt(subnetSet[i]));
    }
    return result.join('.');
}

function updateData() {
    addr = ipNum.value.trim().split('.');
    var subnetVal = 32 - subnet.value;
    hosts = 2 ** subnetVal;
    subnetAddr = new Array(0, 0, 0, 0);
    wildSubnetAddr = new Array(255, 255, 255, 255);
    netAddr = calNetAddr(addr, subnet.value);
    switch (parseInt(subnet.value)) {
    case 32 :
        subnetAddr[3] = subnetAddr[3] + 1;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 1;
    case 31 :
        subnetAddr[3] = subnetAddr[3] + 2;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 2;
    case 30 :
        subnetAddr[3] = subnetAddr[3] + 4;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 4;
    case 29 :
        subnetAddr[3] = subnetAddr[3] + 8;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 8;
    case 28 :
        subnetAddr[3] = subnetAddr[3] + 16;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 16;
    case 27 :
        subnetAddr[3] = subnetAddr[3] + 32;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 32;
    case 26 :
        subnetAddr[3] = subnetAddr[3] + 64;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 64;
    case 25 :
        subnetAddr[3] = subnetAddr[3] + 128;
        wildSubnetAddr[3] = wildSubnetAddr[3] - 128;
    case 24 :
        subnetAddr[2] = subnetAddr[2] + 1;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 1;
    case 23 :
        subnetAddr[2] = subnetAddr[2] + 2;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 2;
    case 22 :
        subnetAddr[2] = subnetAddr[2] + 4;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 4;
    case 21 :
        subnetAddr[2] = subnetAddr[2] + 8;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 8;
    case 20 :
        subnetAddr[2] = subnetAddr[2] + 16;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 16;
    case 19 :
        subnetAddr[2] = subnetAddr[2] + 32;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 32;
    case 18 :
        subnetAddr[2] = subnetAddr[2] + 64;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 64;
    case 17 :
        subnetAddr[2] = subnetAddr[2] + 128;
        wildSubnetAddr[2] = wildSubnetAddr[2] - 128;
    case 16 :
        subnetAddr[1] = subnetAddr[1] + 1;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 1;
    case 15 :
        subnetAddr[1] = subnetAddr[1] + 2;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 2;
    case 14 :
        subnetAddr[1] = subnetAddr[1] + 4;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 4;
    case 13 :
        subnetAddr[1] = subnetAddr[1] + 8;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 8;
    case 12 :
        subnetAddr[1] = subnetAddr[1] + 16;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 16;
    case 11 :
        subnetAddr[1] = subnetAddr[1] + 32;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 32;
    case 10 :
        subnetAddr[1] = subnetAddr[1] + 64;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 64;
    case  9 :
        subnetAddr[1] = subnetAddr[1] + 128;
        wildSubnetAddr[1] = wildSubnetAddr[1] - 128;
    case  8 :
        subnetAddr[0] = subnetAddr[0] + 1;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 1;
    case  7 :
        subnetAddr[0] = subnetAddr[0] + 2;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 2;
    case  6 :
        subnetAddr[0] = subnetAddr[0] + 4;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 4;
    case  5 :
        subnetAddr[0] = subnetAddr[0] + 8;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 8;
    case  4 :
        subnetAddr[0] = subnetAddr[0] + 16;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 16;
    case  3 :
        subnetAddr[0] = subnetAddr[0] + 32;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 32;
    case  2 :
        subnetAddr[0] = subnetAddr[0] + 64;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 64;
    case  1 :
        subnetAddr[0] = subnetAddr[0] + 128;
        wildSubnetAddr[0] = wildSubnetAddr[0] - 128;
    }
    if (subnet.value > 24) {
        wildIp = new Array(addr[0], addr[1], addr[2], '*');
    }
    else if (subnet.value > 16) {
        wildIp = new Array(addr[0], addr[1], '*', '*');
    }
    else if (subnet.value > 16) {
        wildIp = new Array(addr[0], '*', '*', '*');
    }
    else {
        wildIp = new Array('*', '*', '*', '*');
    }
    switch (parseInt(netclass.value)) {
    case 1:
        netclassS = 'A';

        break;
    case 2:
        netclassS = 'B';
        break;
    case 3:
        netclassS = 'C';
        break;
    case 0:
        if (parseInt(addr[0]) < 128) {
            netclass = '1'
            netclassS = 'A'
        }
        else if (parseInt(addr[0]) < 192) {
            netclass = '2'
            netclassS = 'B'
        }
        else if (parseInt(addr[0]) < 224) {
            netclass = '3'
            netclassS = 'C'
        }
        else {
            netclass = '3'
            netclassS = 'C'
        }
    }
    if (parseInt(addr[0]) == 10 | (parseInt(addr[0]) == 192 && parseInt(addr[1]) == 168) | (parseInt(addr[0]) == 172 && parseInt(addr[1]) >= 16 && parseInt(addr[1]) <= 31)) {
        ipType = 'Private'
    }
    else {
        ipType = 'Public'
    }
    id = parseInt(addr[0]) * 256 * 256 * 256 + parseInt(addr[1]) * 256 * 256 + parseInt(addr[2]) * 256 + parseInt(addr[3]);
    idBin = id.toString(2);
    idHex = id.toString(16);
    subnetBin = (parseInt(subnetAddr[0]) * 256 * 256 * 256 + parseInt(subnetAddr[1]) * 256 * 256 + parseInt(subnetAddr[2]) * 256 + parseInt(subnetAddr[3])).toString(2);
    if (parseInt(hosts) > 1) {
        hostsUse = parseInt(hosts) - 2;
    }
    else {
        hostsUse = 0;
    }
    broad = getBroadCastAddr(netAddr, wildSubnetAddr);
    displayData();
}
function displayData() {
    fillTable();
    document.getElementById("dispIp").innerHTML = ipNum.value;
    document.getElementById("dispHost").innerHTML = hosts;
    document.getElementById("dispNetIp").innerHTML = netAddr;
    document.getElementById("dispIpRange").innerHTML = netAddr + ' - ' + broad;
    document.getElementById("dispIpBroad").innerHTML = broad;
    document.getElementById("dispHostUse").innerHTML = hostsUse;
    document.getElementById("dispSubnet").innerHTML = '/' + subnet.value;
    //    document.getElementById("dispSubnet2").innerHTML = '/' + subnet.value;
    document.getElementById("dispMaskSub").innerHTML = subnetAddr[0] + '.' + subnetAddr[1] + '.' + subnetAddr[2] + '.' + subnetAddr[3];
    document.getElementById("dispMaskWild").innerHTML = wildSubnetAddr[0] + '.' + wildSubnetAddr[1] + '.' + wildSubnetAddr[2] + '.' + wildSubnetAddr[3];
    document.getElementById("dispMaskBin").innerHTML = subnetBin.slice(0, 8) + '.' + subnetBin.slice(9, 16) + '.' + subnetBin.slice(17, 24) + '.' + subnetBin.slice(25, 32);
    document.getElementById("dispNetclass").innerHTML = netclassS;
    document.getElementById("dispType").innerHTML = ipType;
    document.getElementById("dispIpShort").innerHTML = ipNum.value + ' /' + subnet.value;
    document.getElementById("dispIdDec").innerHTML = id;
    document.getElementById("dispIdBin").innerHTML = idBin;
    document.getElementById("dispIdHex").innerHTML = '0x' + idHex;
    //document.getElementById("dispIpWild").innerHTML = wildIp[0] + '.' + wildIp[1] + '.' + wildIp[2] + '.' + wildIp[3];
}
function fillTable() {
    for (var i = 0; i < 11; i += 1) {
        $("#netTable").append("<tr><td>" + i + "</td><td>" + "</td><td>" + "</td></tr>");
    }
}
document.getElementById('inputForm').addEventListener('submit', function(e) {
    getData();
    e.preventDefault();
}, false);
