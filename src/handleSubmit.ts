import config from "./config";
import log from "./log";

export const isContestProblem = (problemUrl: string) => {
  return problemUrl.indexOf("contest") != -1 || problemUrl.indexOf("gym") != -1;
};

export const getSubmitUrl = (problemUrl: string) => {
  if (!isContestProblem(problemUrl)) {
    return config.cfSubmitPage.href;
  }

  const contestType = problemUrl.indexOf("contest") != -1 ? "contest" : "gym";
  const url = new URL(problemUrl);
  const contestNumber = url.pathname.split("/")[2];
  const submitURL = `https://codeforces.com/${contestType}/${contestNumber}/submit`;
  return submitURL;
};

/** Opens the codefoces submit page and injects script to submit code. */
export const handleSubmit = async (problemName: string, languageId: number, sourceCode: string, problemUrl: string) => {
  if (problemName === "" || languageId == -1 || sourceCode == "") {
    log("Ivalid arguments to handleSubmit");
    return;
  }

  log("isContestProblem", isContestProblem(problemUrl));

  chrome.tabs.create(
    {
      active: true,
      url: getSubmitUrl(problemUrl),
    },
    (tab: any) => {
      chrome.windows.update(tab.windowId, {
        focused: true,
      });
  
      if (tab.id == undefined) {
        log("No tab id to send message to", tab);
        return;
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/dist/injectedScript.js"],
      })
      .then(() => {
        console.log("Injecting script to tab");
          chrome.runtime.sendMessage({
          type: "cph-submit",
          problemName: problemName,
          languageId: languageId,
          sourceCode: sourceCode,
          url: problemUrl,
        });
      
        console.log("Sending message to tab with script");
      })
      .catch(error => {
        console.error("Error injecting script:", error);
      });
      
  
  
      const filter = {
        url: [{ urlContains: "codeforces.com/problemset/status" }],
      };
  
      log("Adding nav listener");
  
      chrome.webNavigation.onCommitted.addListener(
        (args) => {
          log("Navigation about to happen");
  
          if (args.tabId === tab.id) {
            log("Our tab is navigating");
          }
        },
        filter
      );
    }
  );
  
};
