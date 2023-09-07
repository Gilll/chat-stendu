
'use strict';

let stompClient = null;
let username = null
let uniqueQueueName = new Date().valueOf() + ""
let jwt = null
let exchangeName = null

function notificationConnect() {

    console.log("Go")

    let url = "wss://" + location.host + ":15673/ws";
    //var url = "https://chatdev.mayabiorobotics.com:15673/ws";

    stompClient = Stomp.client(url);
    stompClient.heartbeat.outgoing = 10000; // client will send heartbeats every 20000ms
    stompClient.heartbeat.incoming = 10000;
    stompClient.connect('test', 'test', onConnectedNotif, onErrorNotif)

}

function onConnectedNotif() {

    let xhrExchange = new XMLHttpRequest();
    xhrExchange.open('GET', '/exchange', false);
    xhrExchange.onreadystatechange = function () {
        if (xhrExchange.readyState === XMLHttpRequest.DONE && xhrExchange.status === 200) {
            exchangeName = xhrExchange.responseText
        }
    }
    xhrExchange.send();

    if (location.pathname.includes("chat")) {
        stompClient.subscribe('/exchange/' + exchangeName, onMessageReceived,
            {
                "id": "sub", "auto-delete": false, "x-queue-name": uniqueQueueName, "ack": "client"
            });
    } else {
        stompClient.subscribe('/exchange/' + exchangeName, onMessageReceived)
    }
}

function onErrorNotif(error) {
    console.log("fail")
    console.log('STOMP: ' + error);
    stompClient.disconnect()
    setTimeout( () => {notificationConnect()}, 5000);
    console.log('STOMP: Reconecting in 5 seconds');
    console.log("try")
}

function onMessageReceived(payload) {
    payload.ack()
    let message = JSON.parse(payload.body);
    let toastLiveExample
    let toast
    // username = frame.headers['type'];

    if (message.type === "MESSAGE" && !location.pathname.includes(message.payload.dialogId)) {
        if (username !== message.payload.sender.username) {
            let body = document.getElementById("toast-text-msg")
            let head = document.getElementById("toast-head-msg")

            toastLiveExample = document.getElementById('liveToastMessage')
            body.textContent = message.payload.content
            head.textContent = message.payload.sender.username

            toast = new bootstrap.Toast(toastLiveExample, null)
            toast.show()
        }
    }



    if (message.type === "MESSAGE" && !location.pathname.includes(message.payload.dialogId)
        && location.pathname.includes("/chat")) {
        console.log("Успех")
        console.log(message)

        let dialog = document.getElementById("dialogs")

        //console.log(freme.headers['type'])

        let dialogsName = document.getElementsByClassName("dialogsuser")
        let dialogsNameArr = []

        for (let i = 0; i < dialogsName.length; i++) {
            dialogsNameArr.push(dialogsName[i].textContent)
            //  console.log(dialogsName[i].textContent)
        }


        let div2 = document.createElement("div")
        div2.setAttribute('class', "chat_list")
        div2.setAttribute('id', message.payload.dialogId)
        //div2.setAttribute('onclick', "activeChat(" + message.payload.dialogId + ")")


        if (username !== message.payload.sender.username) {

            div2.innerHTML = "<a id="+ message.payload.dialogId + "href\" href=\"/chat/" + message.payload.dialogId + "\">" +
                "                                    <div class=\"chat_people\">\n" +
                "                                        <div class=\"chat_img\"> <img class='rounded-circle' src=" + message.payload.sender.avatar + " alt=\"sunil\"> </div>\n" +
                "                                        <div class=\"chat_ib\">\n" +
                "                                            <h5 class=\"dialogsuser\">" + message.payload.sender.username + "<span class=\"chat_date\"></span></h5>\n" +
                "                                            <p id=\"lastMsg" + message.payload.dialogId + "\">" + message.payload.content + "</p>\n" +
                "                                        </div>\n" +
                "                                    </div></a>"



            if (dialogsNameArr.indexOf(message.payload.sender.username) === -1) {
                dialog.prepend(div2)
            }


            //if (dialogsNameArr.indexOf(message.payload.sender.username) === 0) {
            let existDialog = document.getElementById(message.payload.dialogId)
            existDialog.remove()
            dialog.prepend(existDialog)
            document.getElementById("lastMsg" + message.payload.dialogId).textContent = message.payload.content
            //}




        }







    }


    if (message.type === "MESSAGE" && location.pathname.includes(message.payload.dialogId)) {
        console.log("Успех")
        console.log(message)

        let uniqueCodeFromMsg = message.payload.uniqueCode

        let msgWithUniqueCode = document.getElementById(uniqueCodeFromMsg)

        if (msgWithUniqueCode !== null) {
            msgWithUniqueCode.id = message.payload.messageId
        }

        if (username !== message.payload.sender.username ||
            (username === message.payload.sender.username && msgWithUniqueCode === null)) {
            let dialog = document.getElementById("dialogs")

            //console.log(freme.headers['type'])

            let dialogsName = document.getElementsByClassName("chat_list")
            console.log(dialogsName)
            let dialogsNameArr = []

            for (let i = 0; i < dialogsName.length; i++) {
                dialogsNameArr.push(Number(dialogsName[i].id))
                //  console.log(dialogsName[i].textContent)
            }

            console.log(dialogsNameArr)


            let div2 = document.createElement("div")
            div2.setAttribute('class', "chat_list")
            div2.setAttribute('id', message.payload.dialogId)
            //div2.setAttribute('onclick', "activeChat(" + message.payload.sender.username + ")")
            //div2.setAttribute('data-barba-prevent', "")

            if (username !== message.payload.sender.username) {

                div2.innerHTML="<a data-barba-prevent id="+ message.payload.dialogId + "href\" href=\"/chat/" + message.payload.dialogId + "\">" +
                    "                                    <div class=\"chat_people\">\n" +
                    "                                        <div class=\"chat_img\"> <img class='rounded-circle' src=" + message.payload.sender.avatar + " alt=\"sunil\"> </div>\n" +
                    "                                        <div class=\"chat_ib\">\n" +
                    "                                            <h5 class=\"dialogsuser\">" + message.payload.sender.username + "<span class=\"chat_date\"></span></h5>\n" +
                    "                                            <p id=\"lastMsg" + message.payload.dialogId + "\">" + message.payload.content + "</p>\n" +
                    "                                        </div>\n" +
                    "                                    </div></a>"

                if (dialogsNameArr.indexOf(message.payload.dialogId) === -1) {
                    dialog.prepend(div2)
                }


                //if (dialogsNameArr.indexOf(message.payload.sender.username) === 0) {
                //document.getElementById("lastMsg" + message.payload.dialogId).textContent = message.payload.content
                //}
                let existDialog = document.getElementById(message.payload.dialogId)
                existDialog.remove()
                dialog.prepend(existDialog)
                document.getElementById("lastMsg" + message.payload.dialogId).textContent = message.payload.content


            }


            let div = document.createElement("div");

            if (username !== message.payload.sender.username) {
                div.setAttribute('class', "incoming_msg")
                let date = new Date(message.payload.timestamp)
                div.innerHTML =
                    "<div class=\"incoming_msg_img\"> <img class='rounded-circle' src=" + message.payload.sender.avatar + " alt=\"sunil\"> </div>" +
                    "                        <div class=\"received_msg\">\n" +
                    "                        <div class=\"received_withd_msg\">\n" +
                    "                            <p>" + message.payload.content + "</p>\n" +
                    "                            <span id=\"" + message.payload.messageId + "\" class=\"time_date\">" + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</span> </div> </div>\n"

            } else {
                div.setAttribute('class', "outgoing_msg")
                let date = new Date(message.payload.timestamp)
                div.innerHTML = "<div class=\"sent_msg\">\n" +
                    "                                    <p>" + message.payload.content + "</p>\n" +
                    "                                    <span id=\"" + message.payload.messageId + "\" class=\"time_date\">" + date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</span> </div>\n" +
                    "                            "


                //if (dialogsNameArr.indexOf(message.payload.sender.username) === 0) {
                document.getElementById("lastMsg" + message.payload.dialogId).textContent = message.payload.content
                //}
            }


            let last = document.getElementById("msg");


            last.append(div)


            //var div3 = $("#msg");
            var div3 = document.getElementById('msg');
            div3.scrollTop(div3.prop('scrollHeight'));
        }
    }
}

function sendMessage(dialog) {

    let messageInput = document.getElementById("inputtextarea");
    console.log(messageInput.value)
    if (messageInput.value.length !== 0) {

        let date = new Date()
        let uniqueCode = date.valueOf() + ""

        var messageContent = messageInput.value.trim();
        if(messageContent && stompClient) {
            var chatMessage = {
                content: messageContent,
                dialogId: dialog,
                uniqueCode: uniqueCode
            };

            let rabbitMessage = {
                type: "MESSAGE",
                payload: chatMessage
            }

            stompClient.send("/queue/chat-application-messages", {"Authorization": "Bearer " + jwt}, JSON.stringify(rabbitMessage));

        }


        console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

        let div = document.createElement("div");
        div.setAttribute('class', "outgoing_msg")

        div.innerHTML =
            "                        <div class=\"sent_msg\">\n" +
            "                            <p>" + messageContent + "</p>\n" +
            "                            <span id=\"" + uniqueCode + "\" class=\"time_date\">" +  date.toLocaleDateString() + " " + date.toLocaleTimeString() + "</span> </div>\n"


        let last = document.getElementById("msg");

        last.append(div)

        //var div2 = $("#msg");
        var div2 = document.getElementById('msg');
        div2.scrollTop(div2.prop('scrollHeight'));

        let lastMsg = document.getElementById("lastMsg" + dialog)
        //console.log(lastMsg)
        //let msgInput = messageInput.value

        let dialogList = document.getElementById("dialogs")
        let existDialog = document.getElementById(dialog)
        existDialog.remove()
        dialogList.prepend(existDialog)
        //document.getElementById("lastMsg" + dialog).textContent = message.payload.content


        messageInput.value = ''
        lastMsg.textContent = messageContent

    }
}