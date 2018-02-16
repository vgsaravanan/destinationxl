(function ($) {
    $.chatBot = function (options) {
        var Message, Image, getMessageText,
            $chatContainer, messageSide, $templateButtons,
            requestBotImage, $chatWindow, sendMessage,
            $messages, $imageWrapper, CartItems, $cartWrapper,
            TableItems, $tableWrapper;
        var settings = {};

        // List of default settings for the modal and images
        var defaultSettings = {
            icon: 'http://res.cloudinary.com/hrscywv4p/image/upload/c_limit,fl_lossy,h_1440,w_720,f_auto,q_auto/v1/1101070/High5Logo_wvucwm.png',
            apiUrl: 'http://magebot.nodemendev.tk/chat/bot/',
            bot_header: {
                title: "ChatBot",
                background: "red",
                dropdown: false,
                expand: false,
                remove: true
            },
            bot_body: {
                background: "#f7f7f6",
                bot_message: {
                    right: null,
                    left: null,
                    right_avatar: null,
                    left_avatar: null
                },
                label: {
                    request_data: "Requesting Bot",
                    bot: "You",
                    user: "Bot",
                }
            },
            bot_footer: {
                label: {
                    send_message: "send",
                    message_input: "Chat with me here...",
                }
            }
        };

        var templates = {
            chatBot: `<div class="chat-container"><div id="chat-icon"> <input type="image" src="__CHAT_BOT_ICON__" width="70px" height="70px" /></div><div class="modal fade" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content chat-window"><div class="modal-header top-menu"><div class="buttons"><div class="dropdown chat-button glyphicon glyphicon-circle-arrow-down"> <a class="dropdown-toggle" data-toggle="dropdown" data-toggle="tooltip" data-placement="bottom" title="Default Templates"> <span class="caret"></span> </a><ul class="dropdown-menu"></ul></div><div class="chat-button minimize glyphicon glyphicon-minus-sign"></div><div class="chat-button maximize glyphicon glyphicon-plus-sign"></div><div data-dismiss="modal" aria-label="Close" class="chat-button remove glyphicon glyphicon-remove-sign"></div></div><div class="title">__CHAT_TITLE__</div></div><div class="modal-body"><ul class="bot-messages"></ul></div><div class="modal-footer bottom-wrapper"><div class="options hide"></div><div class="message-input-wrapper"> <input class="message-input" placeholder="__CHAT__PLACEHOLDER__" /></div><div class="send-message"><div class="chat-button send glyphicon glyphicon-send"></div></div></div></div></div></div></div>`,
            messages: '<li class="message __CLASS__"><div class="avatar"></div><div class="text-wrapper"><div class="text">__TEXT__</div></div></li>',
            imageWrapper: '<li class="message image __CLASS__"><div class="avatar"></div><div class="image-wrapper"></div></li>',
            images: '<div class="image"><div class="img text-center"> <img width="150" height="150" src="__SRC__" title="__TITLE__"></div><div class="details"><div class="bold title">__PROD_TITLE__</div><div class="price">Price - __PRICE__</div></div><div class="actions __ACTIONS_SHOW__">__ACTIONS__</div></div>',
            action: '<a class="link bold pull-left text-uppercase" data-value="__VALUE__" data-action="__ACTION__" data-id="__ID__">__DISPLAY_TEXT__</a>',
            actionWithExternalLink: '<a class="external-link bold pull-right text-uppercase" href="__EXTERNAL_LINK__" target="_blank">__DISPLAY_TEXT__</a>',
            cssDefinition: `<style> #chat-icon input,#chat-icon input:focus,.bottom-wrapper .message-input-wrapper .message-input:focus{outline:0!important}.bottom-wrapper,.top-menu{box-shadow:0 1px 30px rgba(0,0,0,.1)}*{box-sizing:border-box}body{background-color:#edeff2;font-family:Calibri,Roboto,sans-serif}.chat-container{font-family:Calibri,Roboto,sans-serif!important}.bold{font-weight:700}.chat-window,.top-menu{background-color:__TOPMENU_BACKGROUND__;width:100%}.chat-window{position:absolute;border-radius:10px;overflow:hidden}.top-menu{padding:20px 0 15px}.top-menu .buttons{margin:3px 0 0 20px;position:absolute;right:0}.top-menu .buttons .chat-button{width:16px;height:16px;border-radius:50%;display:inline-block;margin-right:8px;position:relative;font-size:18px;cursor:pointer}.top-menu .buttons .chat-button.remove{color:#cd5c5c}.top-menu .buttons .chat-button.minimize{color:#9acd32}.top-menu .buttons .chat-button.maximize{color:green}.top-menu .buttons .chat-button.dropdown .dropdown-toggle{position:absolute;top:0;color:transparent;width:16px;height:16px}.top-menu .buttons .chat-button.dropdown .dropdown-menu{font-family:Calibri,Roboto,sans-serif!important;right:0;left:auto!important}.top-menu .title{text-align:center;color:#bcbdc0;font-size:20px}.bot-messages{position:relative;list-style:none;margin:0;padding:0;height:auto!important;min-height:340px;max-height:340px}.bot-messages .message{position:relative;clear:both;overflow:hidden;margin-bottom:10px;transition:all .5s linear;opacity:0}.bot-messages .message .image-wrapper,div.options{word-wrap:normal;white-space:nowrap;overflow-x:auto}.bot-messages .message.left .avatar{background-color:__MESSAGE_LEFT_AVATAR__;left:0}.bot-messages .message.left .cart-wrapper,.bot-messages .message.left .table-wrapper,.bot-messages .message.left .text-wrapper{background-color:__MESSAGE_LEFT_TEXT_WRAPPER_BACKGROUND__;left:57px}.bot-messages .message.left .cart-wrapper::after,.bot-messages .message.left .cart-wrapper::before,.bot-messages .message.left .table-wrapper::after,.bot-messages .message.left .table-wrapper::before,.bot-messages .message.left .text-wrapper::after,.bot-messages .message.left .text-wrapper::before{right:100%;border-right-color:__MESSAGE_LEFT_BORDER_COLOR}.bot-messages .message.left .text{color:#C48765}.bot-messages .message.right .avatar{background-color:__MESSAGE_RIGHT_AVATAR__;right:0}.bot-messages .message.right .cart-wrapper,.bot-messages .message.right .table-wrapper,.bot-messages .message.right .text-wrapper{background-color: __MESSAGE_RIGHT_TEXT_WRAPPER_BACKGROUND__;right:-25px}.bot-messages .message.right .cart-wrapper::after,.bot-messages .message.right .cart-wrapper::before,.bot-messages .message.right .table-wrapper::after,.bot-messages .message.right .table-wrapper::before,.bot-messages .message.right .text-wrapper::after,.bot-messages .message.right .text-wrapper::before{left:100%;border-left-color:__MESSAGE_RIGHT_BORDER_COLOR__}.bot-messages .message.right .text{color:#45829b}.bot-messages .message.appeared{opacity:1}.bot-messages .message .avatar{position:absolute;width:40px;height:40px;border-radius:50%;display:inline-block;text-align:center;line-height:40px;color:brown}.bot-messages .message .cart-wrapper,.bot-messages .message .table-wrapper,.bot-messages .message .text-wrapper{display:inline-block;padding:14px;border-radius:6px;width:calc(100% - 85px);min-width:100px;position:inherit}.bot-messages .message .cart-wrapper::after,.bot-messages .message .cart-wrapper::before,.bot-messages .message .table-wrapper::after,.bot-messages .message .table-wrapper:before,.bot-messages .message .text-wrapper::after,.bot-messages .message .text-wrapper:before{top:18px;border:solid transparent;content:" ";height:0;width:0;position:absolute;pointer-events:none}.bot-messages .message .cart-wrapper::before,.bot-messages .message .table-wrapper::before,.bot-messages .message .text-wrapper::before{border-width:8px;margin-top:-10px}.bot-messages .message .text-wrapper .text{font-size:16px;font-weight:300}.bot-messages .message .cart-wrapper .item{margin-bottom:10px;padding:4px;background-color:#F5F5BA;border-radius:7px}.bot-messages .message .image-wrapper{overflow-y:hidden;padding:10px;width:92%;position:inherit}.bot-messages .message .image-wrapper .image{min-height:230px;width:230px;display:inline-block;padding:4px;background-color:#fff;border:1px solid #f7f7f6;margin-right:4px}.image-wrapper .image .img{border-bottom:1px solid #f7f7f6;margin-bottom:2px}.image-wrapper .image .actions .external-link,.image-wrapper .image .actions .link{padding:2px;color:#00ced1;margin-top:2px;font-size:x-small;cursor:pointer}.bot-messages .message.left .image-wrapper{left:41px}.bot-messages .message.right .image-wrapper{right:-33px}.table-wrapper .table .rows tr td{background-color:#efedc5}a.cursor{cursor:pointer}.table-wrapper .table tr.headers th{background-color:#add8e6}.table.table-bordered>thead>tr>th{border:1px solid #ffebcd!important}.bottom-wrapper{position:relative;width:100%;background-color:#fff;padding:20px}.bottom-wrapper .message-input-wrapper{display:inline-block;height:40px;border-radius:12px;border:1px solid #bcbdc0;width:calc(100% - 120px);position:relative;padding:0 20px;float:left}.bottom-wrapper .message-input-wrapper .message-input{border:none;height:100%;width:100%;box-sizing:border-box;outline:0!important;color:gray}.bottom-wrapper .send-message{width:100px;height:40px;display:inline-block;cursor:pointer;transition:all .2s linear;text-align:center}.bottom-wrapper .button.send{color:grey;font-size:35px;display:inline-block;position:relative;cursor:pointer}.message-template{display:none}.modal .modal-dialog{position:fixed;right:0;margin:0}.modal.expanded{left:10px!important}.modal.expanded .modal-dialog{width:100%!important}.modal-body{overflow-y:scroll;background-color:__MODAL_BODY_BACKGROUND__}.modal-body.with-options{margin-bottom:62px}.modal-dialog{width:400px!important;margin:0!important}.modal-content{-webkit-box-shadow:none!important;box-shadow:none!important}.modal-header{padding:8px!important}#chat-icon{border:0;position:fixed;bottom:10px;right:30px;z-index:1000;-webkit-filter:drop-shadow(2px 4px 1px #111);filter:drop-shadow(2px 4px 1px #222);animation:bounce 1s infinite alternate;-webkit-animation:bounce 1s infinite alternate}#chat-icon input{cursor:pointer}@keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-15px)}}@-webkit-keyframes bounce{from{transform:translateY(0)}to{transform:translateY(-15px)}}div.options{overflow-y:hidden;position:absolute;bottom:100%;width:85%;height:60px;transform:translateY(-5px)}div.options .option{padding:7px 12px;border:1px solid rgba(6,153,184,.3);display:inline-block;margin:5px;background:#00ced1;color:#fff;cursor:pointer;border-radius:15px;font-size:13px;float:left}div.options .option:hover{background:#fff;color:#00ced1;font-weight:700}@media only screen and (min-device-width:768px) and (max-device-width:1024px){.modal .modal-dialog{width:100%!important}.chat-window .bot-messages{min-height:60vh!important}.chat-window{width:90%!important;position:relative!important;margin:0 auto!important}.top-menu{padding:45px 0!important}.top-menu .buttons .chat-button{font-size:42px!important;margin-right:55px!important}.top-menu .title{font-size:50px!important}.top-menu .buttons{margin:19px 0!important}.bottom-wrapper{padding:30px!important}.bottom-wrapper .message-input-wrapper{height:69px!important;font-size:35px!important}.bottom-wrapper .send-message{height:69px!important}.bottom-wrapper .send-message .text{font-size:35px!important;line-height:56px!important}.bot-messages .message .avatar{width:90px!important;height:90px!important;line-height:8rem!important;font-size:3rem!important}.bot-messages .message.right .cart-wrapper,.bot-messages .message.right .table-wrapper,.bot-messages .message.right .text-wrapper{margin-right:40px!important}.bot-messages .message.left .cart-wrapper,.bot-messages .message.left .table-wrapper,.bot-messages .message.left .text-wrapper{margin-left:40px!important}.bot-messages .message .cart-wrapper,.bot-messages .message .table-wrapper,.bot-messages .message .text-wrapper{padding:36px!important;border-radius:18px!important;width:80%!important}.bot-messages .message .text-wrapper .text{font-size:36px!important}.bot-messages .message .cart-wrapper::before,.bot-messages .message .table-wrapper::before,.bot-messages .message .text-wrapper::before{border-width:25px!important;margin-top:-9px!important}.top-menu .buttons .chat-button.dropdown .dropdown-menu{font-size:34px!important}}.preloader{display:inline-block;width:44px;height:20px}.preloader>div{margin-bottom:-9px;background-color:#C48765;height:5px;width:5px;margin-right:3px;border-radius:50%;display:inline-block;-webkit-animation:stretchdelay .7s infinite ease-in-out;animation:stretchdelay .7s infinite ease-in-out}.preloader .circ2{-webkit-animation-delay:-.6s;animation-delay:-.6s}.preloader .circ3{-webkit-animation-delay:-.5s;animation-delay:-.5s}.preloader .circ4{-webkit-animation-delay:-.4s;animation-delay:-.4s}.preloader .circ5{-webkit-animation-delay:-.3s;animation-delay:-.3s}@-webkit-keyframes stretchdelay{0%,100%,40%{-webkit-transform:translateY(-10px)}20%{-webkit-transform:translateY(-20px)}}@keyframes stretchdelay{0%,100%,40%{transform:translateY(-10px);-webkit-transform:translateY(-10px)}20%{transform:translateY(-20px);-webkit-transform:translateY(-20px)}}</style>`,
            buttons: '<div class="option" data-id="__ID__" data-action="__ACTION__" data-value="__VALUE__">__VALUE__</div>',
            templatesDropdown: '<li><a href="#" data-value="__VALUE__">__NAME__</a></li>',
            cartWrapper: '<li class="message __CLASS__"><div class="avatar"></div><div class="cart-wrapper"></div></li>',
            cartItem: '<div class="item"><div class="title"><span class="bold">___LABEL_TITLE__ - </span>__TITLE__</div><div class="price"><span class="bold">___LABEL_PRICE__ - </span>__PRICE__</div></div>',
            tableWrapper: '<li class="message __CLASS__"><div class="avatar"></div><div class="table-wrapper"><div class="table-responsive"><table class="table table-bordered table-dark"><thead><tr class="headers"></tr></thead><tbody class="rows"></tbody></table></div></div></li>',
            tableHead: '<th scope="col">__VALUE__</th>',
            tableRow: '<td>__VALUE__</td>',
            tableRowAction: '<td><a class="cursor action" data-value="__VALUE__" data-action="__ACTION__">__TEXT__</a></td>',
            loader: '<div class="preloader"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>'
        };

        var initializeOption = function (options) {
            if (options == undefined) {
                options = {};
            }
            settings = $.extend(true,defaultSettings, options);
        };

        var addImages = function (images, messageSide) {
            var imageWrapper = templates.imageWrapper.replace(/__CLASS__/g, messageSide);
            $messages.append(imageWrapper);
            $imageWrapper = $messages.find('.image-wrapper:last');
            $imageWrapper.addClass('hide');
            jQuery.each(images, function (index, item) {
                var image = new Image({
                    src: item.src,
                    title: item.title,
                    link: item.link,
                    prodTitle: item.prodTitle,
                    price: item.price,
                    id: item.id,
                    actions: item.actions
                });
                image.draw();
            });
            $imageWrapper.removeClass('hide');
            if (isMsgFromSameUser(messageSide)) {
                $messages.find('.message:last').prev().find('.avatar').addClass('hide');
            }
            $imageWrapper.find('.link').click(function (event) {
                sendMessage($(event.target).data('value'), { id: $(event.target).data('id'), action: $(event.target).data('action') });
            });
            $chatWindow.find('.modal-body').animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        Image = function (arg) {
            this.src = arg.src;
            this.title = arg.title;
            this.link = arg.link;
            this.prodTitle = arg.prodTitle;
            this.price = arg.price;
            this.id = arg.id;
            this.actions = arg.actions;
            this.draw = function (_this) {
                return function () {
                    var actionsList = '',
                        actionsClass = 'hide';
                    var image = templates.images
                        .replace(/__SRC__/g, _this.src)
                        .replace(/__TITLE__/g, _this.title)
                        .replace(/__PRICE__/g, _this.price)
                        .replace(/__PROD_TITLE__/g, _this.prodTitle)
                        .replace(/__ID__/g, _this.id)
                        .replace(/__LINK__/g, _this.link);
                    if (_this.actions) {
                        var actionDiv = '',
                            actionsClass = 'show';
                        jQuery.each(_this.actions, function (index, action) {
                            if (action.action !== undefined) {
                                actionDiv = templates.action
                                    .replace(/__ACTION__/g, action.action)
                                    .replace(/__VALUE__/g, action.value)
                                    .replace(/__ID__/g, _this.id)
                                    .replace(/__DISPLAY_TEXT__/g, action.displayText);
                            } else if (action.externalLink !== undefined) {
                                actionDiv = templates.actionWithExternalLink
                                    .replace(/__EXTERNAL_LINK__/g, action.externalLink)
                                    .replace(/__DISPLAY_TEXT__/g, action.displayText);
                            }
                            actionsList += actionDiv;
                        });
                    }
                    image = image.replace(/__ACTIONS__/g, actionsList)
                        .replace(/__ACTIONS_SHOW__/g, actionsClass);

                    $imageWrapper.append(image);
                    return setTimeout(function () {
                        return $messages.find('.message').addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };

        function isMsgFromSameUser(side) {
            return $messages.find('.message:last').prev().hasClass(side);
        }

        CartItems = function (items, messageSide) {
            this.items = items, this.messageSide = messageSide;
            this.draw = function (_this) {
                return function () {
                    var cartWrapper = templates.cartWrapper.replace(/__CLASS__/g, _this.messageSide);
                    $messages.append(cartWrapper);
                    $cartWrapper = $messages.find('.cart-wrapper:last');
                    jQuery.each(_this.items, function (index, item) {
                        var items = templates.cartItem.replace(/__TITLE__/g, item.title)
                            .replace(/__PRICE__/g, item.price)
                            .replace(/___LABEL_TITLE__/g, item.titleLabel)
                            .replace(/___LABEL_PRICE__/g, item.titlePrice);
                        $cartWrapper.append(items);
                    });

                    if (isMsgFromSameUser(_this.messageSide)) {
                        $messages.find('.message:last').prev().find('.avatar').addClass('hide');
                    }

                    return setTimeout(function () {
                        return $messages.find('.message').addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };

        TableItems = function (items, messageSide) {
            this.items = items, this.messageSide = messageSide;
            this.draw = function (_this) {
                return function () {
                    var tableWrapper = templates.tableWrapper.replace(/__CLASS__/g, _this.messageSide);
                    $messages.append(tableWrapper);
                    $tableWrapper = $messages.find('.table-wrapper:last');
                    updateTableItems(_this.items);
                    if (isMsgFromSameUser(_this.messageSide)) {
                        $messages.find('.message:last').prev().find('.avatar').addClass('hide');
                    }

                    return setTimeout(function () {
                        return $messages.find('.message').addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };

        Message = function (arg) {
            this.text = arg.text, this.messageSide = arg.messageSide;
            if (arg.loader) {
                this.loader = arg.loader;
            }
            this.draw = function (_this) {
                return function () {
                    var message = templates.messages.replace(/__CLASS__/g, _this.messageSide)
                        .replace(/__TEXT__/g, _this.text);
                    $messages.append(message);
                    if (_this.loader) {
                        $messages.find('.message:last').find('.text').append(templates.loader);
                    }
                    if (isMsgFromSameUser(_this.messageSide)) {
                        $messages.find('.message:last').prev().find('.avatar').addClass('hide');
                    }

                    return setTimeout(function () {
                        return $messages.find('.message').addClass('appeared');
                    }, 0);
                };
            }(this);
            return this;
        };

        function sendButtonAction(text, action, id) {
            if (id !== 'undefined') {
                sendMessage(text, { action: action, id: id });
            } else {
                sendMessage(text, { action: action });
            }
            $chatWindow.find('.options').html('').addClass('hide');
            $chatWindow.find('.modal-body').removeClass('with-options');
        }

        function checkButtonAction(text) {
            return $chatWindow.find('.modal-body').hasClass('with-options');
        }

        requestBot = function (text, options) {
            var requestData = {
                text: text
            };
            if (options) {
                requestData = $.extend(requestData, options);
            }
            var message = new Message({
                text: settings.bot_body.label.request_data,
                messageSide: 'left',
                loader: true
            });
            message.draw();

            return $.ajax({
                method: 'POST',
                url: settings.apiUrl,
                data: requestData
            }).done(function (response) {
                $messages.find('.message:last').remove();
                if (response.message) {
                    var message = new Message({
                        text: response.message,
                        messageSide: 'left'
                    });
                    message.draw();
                }
                if (response.tableItems) {
                    var tableItems = new TableItems(response.tableItems, 'left');
                    tableItems.draw();
                }
                if (response.cartItems) {
                    var cartItems = new CartItems(response.cartItems, 'left');
                    cartItems.draw();
                }
                if (response.images) {
                    addImages(response.images, 'left');
                }
                if (response.buttons) {
                    $chatWindow.find('.modal-body').addClass('with-options');
                    $chatWindow.find('.options').removeClass('hide');
                    jQuery.each(response.buttons, function (index, item) {
                        var option = templates.buttons.replace(/__VALUE__/g, item.value)
                            .replace(/__ACTION__/g, item.action).replace(/__ID__/g, item.id);
                        $chatWindow.find('.options').append(option);
                    });
                    $chatWindow.find('.modal-body').animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                    $chatWindow.find('.options .option').click(function (event) {
                        sendButtonAction($(event.target).data('value'), $(event.target).data('action'), $(event.target).data('id'));
                    });
                }
                $messages.find('.message.left:last .avatar').addClass('bold').html(settings.bot_body.label.bot);

                return $chatWindow.find('.modal-body').animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
            });
        };

        getMessageText = function () {
            return $chatWindow.find('.message-input').val();
        };

        sendMessage = function (text, options) {
            var message;
            if (!options && text.trim() === '') {
                return;
            }
            $chatWindow.find('.options').html('').addClass('hide');
            $chatWindow.find('.modal-body').removeClass('with-options');
            $chatWindow.find('.message-input').val('');
            message = new Message({
                text: text,
                messageSide: 'right'
            });
            message.draw();
            requestBot(text, options);
            $messages.find('.message.right:last .avatar').addClass('bold').html(settings.bot_body.label.user);

            return $chatWindow.find('.modal-body').animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };

        function updateTableItems(tableItems) {
            jQuery.each(tableItems.headers, function (index, value) {
                $tableWrapper.find('.headers').append(templates.tableHead.replace(/__VALUE__/g, value));
            });
            jQuery.each(tableItems.rows, function (index, rowData) {
                var row = '<tr>';
                jQuery.each(rowData.data, function (index, cellData) {
                    if (cellData.action) {
                        row += templates.tableRowAction.replace(/__VALUE__/g, cellData.value)
                            .replace(/__TEXT__/g, cellData.text)
                            .replace(/__ACTION__/g, cellData.action);
                    } else {
                        row += templates.tableRow.replace(/__VALUE__/g, cellData.value);
                    }
                });
                row += '</tr>';
                $tableWrapper.find('.rows').append(row);
            });
            $tableWrapper.find('.rows .action').click(function (event) {
                sendMessage($(event.target).data('value'), { action: $(event.target).data('action') });
            });
        }

        var initBot = function () {
            $('head').append(templates.cssDefinition
                .replace(/__TOPMENU_BACKGROUND__/g, settings.bot_header.background)
                .replace(/__MODAL_BODY_BACKGROUND__/g, settings.bot_body.background)
                .replace(/__MESSAGE_LEFT_AVATAR__/g, settings.bot_body.bot_message.left_avatar)
                .replace(/__MESSAGE_RIGHT_AVATAR__/g,settings.bot_body.bot_message.right_avatar)
                .replace(/__MESSAGE_RIGHT_TEXT_WRAPPER_BACKGROUND__/g,settings.bot_body.bot_message.right)
                .replace(/__MESSAGE_LEFT_TEXT_WRAPPER_BACKGROUND__/g, settings.bot_body.bot_message.left)
                .replace(/__MESSAGE_RIGHT_BORDER_COLOR__/g, settings.bot_body.bot_message.right)
                .replace(/__MESSAGE_LEFT_BORDER_COLOR/g, settings.bot_body.bot_message.left)
            );
            $('body').append(templates.chatBot
                .replace(/__CHAT_BOT_ICON__/g, settings.icon)
                .replace(/__CHAT_TITLE__/g, settings.bot_header.title)
                .replace(/__SEND__/g, settings.bot_footer.label.send_message)
                .replace(/__CHAT__PLACEHOLDER__/g, settings.bot_footer.label.message_input)
            );
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
            $chatContainer = $('.chat-container');
            $chatWindow = $chatContainer.find('.chat-window');
            $chatContainer.find('#chat-icon').click(function () {
                $chatContainer.find('.modal').modal({
                    backdrop: false
                });
                $chatContainer.find('.modal').on('hide.bs.modal', function () {
                    $chatContainer.find('#chat-icon').removeClass('hide');
                });
                $chatContainer.find('#chat-icon').addClass('hide');
            })
            $chatWindow.find('.send-message').click(function (e) {
                if (checkButtonAction(getMessageText())) {
                    var foundMatch = false;
                    jQuery.each($chatWindow.find('.options .option'), function (index, option) {
                        if ($(option).data('value') === getMessageText()) {
                            foundMatch = true;
                            return sendButtonAction($(option).data('value'), $(option).data('action'), $(option).data('id'));
                        }
                    });
                    if (!foundMatch) {
                        return sendMessage(getMessageText());
                    }
                } else {
                    return sendMessage(getMessageText());
                }
            });
            $messages = $chatWindow.find('.bot-messages');
            $templateButtons = $chatWindow.find('ul.dropdown-menu');
            updateTemplates();
            $chatWindow.find('.message-input').keyup(function (e) {
                if (e.keyCode === 13) {
                    if (checkButtonAction(getMessageText())) {
                        var foundMatch = false;
                        jQuery.each($chatWindow.find('.options .option'), function (index, option) {
                            if ($(option).data('value') === getMessageText()) {
                                foundMatch = true;

                                return sendButtonAction($(option).data('value'), $(option).data('action'), $(option).data('id'));
                            }
                        });
                        if (!foundMatch) {
                            return sendMessage(getMessageText());
                        }
                    } else {
                        return sendMessage(getMessageText());
                    }
                }
            });

            $chatWindow.find('.top-menu .chat-button.maximize').toggle(settings.bot_header.expand);
            $chatWindow.find('.top-menu .chat-button.dropdown').toggle(settings.bot_header.dropdown);
            $chatWindow.find('.top-menu .chat-button.remove').toggle(settings.bot_header.remove);

            $chatWindow.find('.top-menu .chat-button.minimize').hide();
            $chatWindow.find('.top-menu .chat-button.maximize').click(function (event) {
                $('.modal').addClass('expanded');
                $(this).hide();
                $chatWindow.find('.top-menu .chat-button.minimize').show();
            });

            $chatWindow.find('.top-menu .chat-button.minimize').click(function (event) {
                $('.modal').removeClass('expanded');
                $(this).hide();
                $chatWindow.find('.top-menu .chat-button.maximize').show();
            });

            $chatWindow.find('.message-input').on('keyup' ,function () {
                let value = $(this).val() == "" ? "grey" : " #0f6d10";
                $chatWindow.find('.bottom-wrapper .chat-button.send').css("color", value);
            });
        };

        function updateTemplates() {
            // TODO - Change with API
            var items = [{
                name: 'Get Orders',
                value: 'show my orders'
            },
            {
                name: 'Cancel Order',
                value: 'cancel my order'
            },
            {
                name: 'Get Cart Items',
                value: 'check cart'
            },
            {
                name: 'Order History',
                value: 'show my order history'
            },
            {
                name: 'Remove Cart Item(s)',
                value: 'remove my cart item(s)'
            },
            {
                name: 'Return Policy',
                value: 'return policy'
            },
            {
                name: 'Sizing Guides',
                value: 'sizing guides'
            }];
            jQuery.each(items, function (index, item) {
                var option = templates.templatesDropdown.replace(/__VALUE__/g, item.value)
                    // .replace(/__ACTION__/g, item.action)
                    .replace(/__NAME__/g, item.name);
                $templateButtons.append(option);
            });
            $templateButtons.find('a').click(function (event) {
                sendMessage($(event.target).data('value'));
            });
        }

        initializeOption(options);
        initBot();
    }


    $.fn.chatBot = function (options) {
        return this.each(function () {
            var plugin = new $.chatBot(options);
        });
    }

})(jQuery);
