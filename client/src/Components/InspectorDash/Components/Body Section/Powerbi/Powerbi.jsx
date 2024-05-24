import React, { useEffect } from "react";

const powerbi = () => {
  useEffect(() => {
    const resizeIframe = () => {
      const iframe = document.getElementById("powerBIReport");
      const container = iframe.parentElement;
      iframe.width = container.clientWidth;
      iframe.height = container.clientHeight;
    };

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
      <iframe
        id="powerBIReport"
        title="Inspector Dashboard"
        width="1100"
        height="530"
        src="https://app.powerbi.com/view?r=eyJrIjoiODk0YTEwZTUtYzNkZC00ZDViLTkzZTMtNzI5NGNlNTEwNDY2IiwidCI6ImI1MzYyMTYxLTgyMWEtNDk3Mi04NGEwLTg2ZGQzNjA2OGVkOCJ9"
        frameborder="0"
        allowFullScreen="true"
        onLoad={handleIframeLoad}
      ></iframe>
      {/* <iframe
        id="powerBIReport"
        title="ksptestpowerbi"
        width="1150"
        height="530"
        src="https://app.powerbi.com/reportEmbed?reportId=a5635986-d252-4589-ae00-01001b73ae4d&autoAuth=true&ctid=aa74b0a8-dc31-4e56-b78a-68531b73a97b&filterPaneEnabled=false&navContentPaneEnabled=false&pageName=ReportSection"
        frameBorder="0"
        allowFullScreen
        onLoad={handleIframeLoad}
      ></iframe> */}
    </div>
  );
};

export default powerbi;
