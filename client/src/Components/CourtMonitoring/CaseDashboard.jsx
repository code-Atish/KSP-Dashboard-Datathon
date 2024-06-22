import React, { useEffect } from "react";

const CaseDashboard = () => {
  const resizeIframe = () => {
    const iframe = document.getElementById("powerBIReport");
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
        id="powerBIReport"
        title="ksptestpowerbi"
        width="1150"
        height="900"
        src="https://app.powerbi.com/reportEmbed?reportId=40c2a340-0f97-4297-902f-638e74731f28&autoAuth=true&ctid=aa74b0a8-dc31-4e56-b78a-68531b73a97b&filterPaneEnabled=false&navContentPaneEnabled=false"
        frameBorder="0"
        allowFullScreen
        onLoad={handleIframeLoad}
      ></iframe> */}
      <iframe
        id="powerBIReport"
        title="ASP & DYSP dashboard"
        width="1180"
        height="900"
        src="https://app.powerbi.com/view?r=eyJrIjoiZDJkYzk5NTItYzBiMi00NmQ0LTliNjMtYWE5ZmQ2NWVlYTVmIiwidCI6ImI1MzYyMTYxLTgyMWEtNDk3Mi04NGEwLTg2ZGQzNjA2OGVkOCJ9"
        frameBorder={"0"}
        allowFullScreen={true}
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

export default CaseDashboard;
