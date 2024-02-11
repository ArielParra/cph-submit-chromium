import config from "./config";
import log from "./log";

export const isContestProblem = (problemUrl: string) => {
  return problemUrl.indexOf("contest") !== -1;
};

export const getSubmitUrl = (problemUrl: string) => {
  if (!isContestProblem(problemUrl)) {
    return config.cfSubmitPage.href;
  }
  const url = new URL(problemUrl);
  const contestNumber = url.pathname.split("/")[2];
  const submitURL = `https://codeforces.com/contest/${contestNumber}/submit`;
  return submitURL;
};

/** Opens the codeforces submit page and injects script to submit code. */
export const handleSubmit = async (problemName: string, languageId: number, sourceCode: string, problemUrl: string) => {
  if (problemName === "" || languageId === -1 || sourceCode === "") {
    log("Invalid arguments to handleSubmit");
    return;
  }

  log("isContestProblem", isContestProblem(problemUrl));

  chrome.tabs.create({
    active: true,
    url: getSubmitUrl(problemUrl),
  }, (tab: any) => {
    chrome.windows.update(tab.windowId, {
      focused: true,
    });

    if (tab.id === undefined) {
      log("No tab id to send message to", tab);
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (problemName: string, languageId: number, sourceCode: string, url: string) => {
        // Injected script logic for submitting code
        // Use the parameters problemName, languageId, sourceCode, url as needed
      },
      args: [problemName, languageId, sourceCode, problemUrl],
    }, () => {
      log("Sending message to tab with script");
    });

    const filter = {
      url: [{ urlContains: "codeforces.com/problemset/status" }],
    };

    log("Adding nav listener");

    chrome.webNavigation.onCommitted.addListener((args) => {
      log("Navigation about to happen");

      if (args.tabId === tab.id) {
        log("Our tab is navigating");
        // Add your navigation logic if needed
      }
    }, filter);
  });
};
