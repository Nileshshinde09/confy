import Head from "next/head";
import { useEffect, useRef } from "react";
import config from "../lib/config";
import { randomID, getUrlParams, getRandomName } from "../lib/util";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { conferenceModeChangeAction } from "../redux/reducer";
export default function Home() {
  const dispatch = useDispatch()
  
  const root = useRef();
  
  useEffect(() => {
    if (root) {
      const userID = randomID(5);
      const appID = config.appID;
      let UIKitsConfig=
        JSON.parse(
          config.UIKitsConfig.replaceAll("\n", "")
            .replaceAll("\t", "")
            .replaceAll(/(\w+):/gi, '"$1":')
            .replaceAll(/,\s+\}/gi, "}")
        ) || {};
      const roomID = getUrlParams().get("roomID") || randomID(5);
      let role = getUrlParams().get("role") || "Host";
      let sharedLinks = [];
      if (UIKitsConfig && UIKitsConfig.scenario && UIKitsConfig.scenario.mode) {
        //change mode of conversation 
        // const sce = useSelector((state)=>state.app.client)
        const scenariomode = UIKitsConfig.scenario.mode
        dispatch(conferenceModeChangeAction(UIKitsConfig.scenario.mode))
        // console.log(sce)
        if (scenariomode === "OneONoneCall") {
          sharedLinks.push({
            name: "Personal link",
            url:
              window.location.origin +
              window.location.pathname +
              "?roomID=" +
              roomID,
          });
        } else if (scenariomode === "LiveStreaming") {
          UIKitsConfig.scenario.config.role = role;
          if (role === "Cohost" || role === "Host") {
            sharedLinks.push({
              name: "Join as co-host",
              url:
                window.location.origin +
                window.location.pathname +
                "?roomID=" +
                roomID +
                "&role=Cohost",
            });
          } else {
            UIKitsConfig = {
              scenario: UIKitsConfig.scenario,
            };
          }
          sharedLinks.push({
            name: "Join as audience",
            url:
              window.location.origin +
              window.location.pathname +
              "?roomID=" +
              roomID +
              "&role=Audience",
          });
        } else if (
          scenariomode === "VideoConference" ||
          scenariomode === "GroupCall"
        ) {
          sharedLinks.push({
            name: "Personal link",
            url:
              window.location.origin +
              window.location.pathname +
              "?roomID=" +
              roomID,
          });
        }
      }

      fetch("./api/token", {
        method: "post",
        body: JSON.stringify({
          userID,
          expiration: 7200,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(async ({ token }) => {
          const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
          const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
            appID,
            token,
            roomID,
            userID,

            getRandomName()
          );
          const zp = ZegoUIKitPrebuilt.create(kitToken);
          zp.joinRoom({
            container: root.current,
            sharedLinks,
            ...UIKitsConfig,
          });
        });
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Create VideoCall / Conference</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-700">
        <div className="videoContainer" ref={root}></div>
      </main>
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .videoContainer {
          width: 100vw;
          height: 100vh;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
