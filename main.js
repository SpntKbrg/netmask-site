function formChanged() {
    var ipNum = document.getElementsByName("ip")[0].value;
    document.getElementById("recvIp").innerHTML = ipNum;
}
formChanged()
