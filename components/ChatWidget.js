import React, { useEffect } from 'react';

const ChatWidget = () => {
  useEffect(() => {
    // Tạo và chèn script vào DOM
    const script = document.createElement('script');
    script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/0.1.0-beta.2/libs/oversea/index.js';
    script.async = true;
    script.onload = () => {
      // Khởi tạo CozeWebSDK sau khi script được tải
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7374076619226710032',
        },
        componentProps: {
          title: 'Coze',
        },
      });
    };

    document.body.appendChild(script);

    // Cleanup function để gỡ bỏ script khi component bị unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="coze-chat-widget"></div>;
};

export default ChatWidget;