import React, { useEffect } from "react";

const ChatBot = () => {
  const resizeIframe = () => {
    const iframe = document.getElementById("ChatBot");
    const container = iframe.parentElement;
    iframe.width = container.clientWidth;
    iframe.height = container.clientHeight;
  };
  useEffect(() => {
    // Call resizeIframe when the window is resized
    window.addEventListener("resize", resizeIframe);

    // Initial resize
    resizeIframe();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", resizeIframe);
    };
  }, []);

  const handleIframeLoad = () => {
    // Delay resizing to ensure the content is fully loaded
    setTimeout(resizeIframe, 1000); // Adjust the delay time as needed
  };

  return (
    <div>
      {/* <iframe
        id="ChatBot"
        title="ksptestpowerbi"
        width="1150"
        height="900"
        src="https://app.powerbi.com/reportEmbed?reportId=40c2a340-0f97-4297-902f-638e74731f28&autoAuth=true&ctid=aa74b0a8-dc31-4e56-b78a-68531b73a97b&filterPaneEnabled=false&navContentPaneEnabled=false"
        frameBorder="0"
        allowFullScreen
        onLoad={handleIframeLoad}
      ></iframe> */}
      <iframe
        id="ChatBot"
        src="https://app.vectorshift.ai/chatbots/embedded/66759e50b3baa63ecd056ebd?openChatbot=true"
        width="1100px"
        height="500px"
        // style={{ border: 'none', position: 'fixed', bottom: '0', right: '0', margin: '10px' }}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
};

export default ChatBot;
